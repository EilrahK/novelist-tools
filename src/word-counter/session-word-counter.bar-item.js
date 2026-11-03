const sessionWordCounterCommand = require('./session-word-counter.command')
const vscode = require('vscode');

let wordCounterBarItem

function activate(context) {
	wordCounterBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100)
	wordCounterBarItem.command = sessionWordCounterCommand.activate(context, write)
}

function write(text) {
	wordCounterBarItem.text = text
	if (!wordCounterBarItem._visible) {
		wordCounterBarItem.show()
	}
}


module.exports = {
	activate
}