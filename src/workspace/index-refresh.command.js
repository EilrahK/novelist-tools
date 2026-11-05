const vscode = require('vscode')

const commandId = 'novelist-tools.refresh-index'

let indexDataProvider

/**
 * Activate the command
 * @param {Object} param0 the context
 * @returns the command id
 */
function activate({ subscriptions }, inputIndexDataProvider) {
	subscriptions.push(vscode.commands.registerCommand(commandId, onClicked))
	indexDataProvider = inputIndexDataProvider
	return commandId
}

function onClicked() {
	indexDataProvider?.refresh()
}

/**
 * Command that refresh the workspace index.
 */
module.exports = {
	activate
}