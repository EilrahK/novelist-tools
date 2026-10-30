const vscode = require('vscode');

let wordCounterBarItem
const WORD_RE = /[\p{L}\p{N}]+(?:['’\-][\p{L}\p{N}]+)*/gu;

function activate({ subscriptions }) {
	wordCounterBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100)
	vscode.workspace.onDidOpenTextDocument(refreshStatusBarItem)
	vscode.workspace.onDidChangeTextDocument(refreshStatusBarItem)
	vscode.window.onDidChangeActiveTextEditor(refreshStatusBarItem)
	refreshStatusBarItem()
}

function refreshStatusBarItem() {
	updateStatusBarItem(vscode.window.activeTextEditor)
}

function updateStatusBarItem(textEditor) {
	if (!textEditor || textEditor.document.languageId !== 'markdown') {
		wordCounterBarItem.hide()
		return
	}
	const count = countWords(textEditor.document.getText())
	let unit = 'mots'
	if (count === 1) {
		unit = 'mot'
	}
	wordCounterBarItem.text = `${count} ${unit}`
	if (!wordCounterBarItem._visible) {
		wordCounterBarItem.show()
	}
}

function countWords(text) {
  return (text.match(WORD_RE) || []).length;
}


module.exports = {
	activate
}