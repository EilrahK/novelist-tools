const sessionWordCounterCommand = require('./session-word-counter.command')
const vscode = require('vscode');

let wordCounterBarItem

/**
 * Activate the session bar item.
 * @param {Object} context 
 */
function activate(context) {
	wordCounterBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100)
	wordCounterBarItem.command = sessionWordCounterCommand.activate(context, write)
}

/**
 * Write on the bar item.
 * @param {String} text 
 */
function write(text) {
	wordCounterBarItem.text = text
	if (!wordCounterBarItem._visible) {
		wordCounterBarItem.show()
	}
}


module.exports = {
	activate
}