const vscode = require('vscode')
const {countWords} = require('./word-counter.utils')

let wordCounterBarItem

/**
 * Activate the bar item.
 */
function activate() {
	wordCounterBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100)
	vscode.workspace.onDidOpenTextDocument(refreshStatusBarItem)
	vscode.workspace.onDidChangeTextDocument(refreshStatusBarItem)
	vscode.window.onDidChangeActiveTextEditor(refreshStatusBarItem)
	refreshStatusBarItem()
}

/**
 * Refresh the bar with the actual text editor.
 */
function refreshStatusBarItem() {
	updateStatusBarItem(vscode.window.activeTextEditor)
}

/**
 * Update the status bar with the count of words in the textEditor.
 * @param {Object} textEditor 
 * @returns 
 */
function updateStatusBarItem(textEditor) {
	if (!textEditor || textEditor.document.languageId !== 'markdown') {
		wordCounterBarItem.hide()
		return
	}
	const count = countWords(textEditor.document.getText())
	let unit = 'words'
	if (count === 1) {
		unit = 'word'
	}
	wordCounterBarItem.text = `${count} ${unit}`
	if (!wordCounterBarItem._visible) {
		wordCounterBarItem.show()
	}
}

/**
 * Add a word counter as a bar item.
 */
module.exports = {
	activate
}