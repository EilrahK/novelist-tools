const vscode = require('vscode')

const commandId = 'novelist-tools.open-characters'

/**
 * Activate the command
 * @param {Object} param0 the context
 * @param {Object} charactersDataProvider
 * @returns the command id
 */
function activate({ subscriptions }) {
    subscriptions.push(vscode.commands.registerCommand(commandId, onClicked))
}

async function onClicked(e) {
    var openPath = vscode.Uri.file(e.path)
    vscode.window.showTextDocument(openPath)
}

/**
 * Command that open a character's file.
 */
module.exports = {
    activate,
    onClicked
}