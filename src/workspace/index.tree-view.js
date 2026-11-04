const vscode = require('vscode')
const indexDataProvider = require('./index.data-provider')

/**
 * Activate the workspace tree view.
 * @param {Object} context 
 * @returns 
 */
function activate(context) {
    if (!vscode.workspace.rootPath) {
        return
    }
    const view = vscode.window.createTreeView('novelistToolsIndex', { treeDataProvider: new indexDataProvider(), showCollapseAll: true });
    context.subscriptions.push(view);
}



module.exports = {
	activate
}