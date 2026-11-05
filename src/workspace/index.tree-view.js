const vscode = require('vscode')
const IndexDataProvider = require('./index.data-provider')
const indexRefreshCommand = require('./index-refresh.command')

/**
 * Activate the workspace tree view.
 * @param {Object} context 
 * @returns 
 */
function activate(context) {
    if (!vscode.workspace.rootPath) {
        return
    }
    const indexDataProvider = new IndexDataProvider()
	indexRefreshCommand.activate(context, indexDataProvider)
    const view = vscode.window.createTreeView('novelistToolsIndex', { treeDataProvider: indexDataProvider, showCollapseAll: true });
    context.subscriptions.push(view);
}

module.exports = {
	activate
}