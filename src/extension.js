const vscode = require('vscode');
const statusWordCounterBarItem = require('./word-counter/status-word-counter.bar-item')
const sessionWordCounterBarItem = require('./word-counter/session-word-counter.bar-item')

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	statusWordCounterBarItem.activate(context)
	sessionWordCounterBarItem.activate(context)
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
