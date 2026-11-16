const vscode = require('vscode')
const CharactersDataProvider = require('./character-list.data-provider')

/**
 * Activate the character tree view.
 * @param {Object} context 
 * @returns 
 */
function activate(context, charactersDataProvider) {
    const view = vscode.window.createTreeView('novelistToolsCharacters', { treeDataProvider: charactersDataProvider, showCollapseAll: true });
    context.subscriptions.push(view)
}

module.exports = {
	activate
}