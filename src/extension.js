const vscode = require('vscode');
const wordCounterStatus = require('./word-counter/word-counter.status')

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	wordCounterStatus.activate(context)
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
