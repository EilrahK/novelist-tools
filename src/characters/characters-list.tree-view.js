const vscode = require('vscode')
const CharactersDataProvider = require('./character-list.data-provider')
const refreshCharactersCommand = require('./refresh-characters.command')

/**
 * Activate the character tree view.
 * @param {Object} context 
 * @returns 
 */
function activate(context) {
    init(context)
}

async function init(context) {
    const charactersDataProvider = new CharactersDataProvider()
	refreshCharactersCommand.activate(context, charactersDataProvider)
    await refreshCharactersCommand.onClicked()
    const view = vscode.window.createTreeView('novelistToolsCharacters', { treeDataProvider: charactersDataProvider, showCollapseAll: true });
    context.subscriptions.push(view)
}

module.exports = {
	activate
}