const vscode = require('vscode')
const characterListStore = require('./characters-list.store')

const commandId = 'novelist-tools.refresh-characters'
let charactersDataProvider

/**
 * Activate the command
 * @param {Object} param0 the context
 * @param {Object} charactersDataProvider
 * @returns the command id
 */
function activate({ subscriptions }, inputCharactersDataProvider) {
    subscriptions.push(vscode.commands.registerCommand(commandId, onClicked))
    charactersDataProvider = inputCharactersDataProvider
    return commandId
}

async function onClicked() {
    characterListStore.clean()
    const files = await vscode.workspace.findFiles('**/*.character.md')
    await Promise.all(files.map(addCharacterFile))
    charactersDataProvider.refresh()
}

/**
 * Add a character file to the store.
 * @param {*} file 
 */
async function addCharacterFile(file) {
    const rootPath = (vscode.workspace?.rootPath || '') + '/'
    const relativePath = file.path.replace(rootPath, '')
    const doc = await vscode.workspace.openTextDocument(vscode.Uri.file(file.path))
    const firstLevelTitle = doc.getText().match(/\#([^\#]+)/dg)
    let name = 'No name'
    if (Array.isArray(firstLevelTitle) && firstLevelTitle.length > 0) {
        const extracted = firstLevelTitle[0].replace('#', '').trim()
        if (extracted) {
            name = extracted
        }
    }
    characterListStore.add({id: relativePath, name, path: file.path })
}

/**
 * Command that refresh the characters list.
 */
module.exports = {
    activate,
    onClicked
}