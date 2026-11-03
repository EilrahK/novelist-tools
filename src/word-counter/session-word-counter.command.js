const { WORD_RE } = require('./word-counter.constants')
const vscode = require('vscode');

const commandId = 'novelist-tools.session-word-counter'
let state = 'NOT_STARTED'
let write
let interval
let duration = 0
let startingWordCount = 0
let textEditor
let wordsCount = 0

function activate({ subscriptions }, writeFunction) {
	subscriptions.push(vscode.commands.registerCommand(commandId, onClicked))
	write = writeFunction
	init()
	return commandId
}

function init() {
	write('Start writing')
}

function onClicked() {
	if (state === 'NOT_STARTED') {
		start()
	} else if (state === 'RUNNING') {
		stop()
	}
}

function start() {
	duration = 0
	wordsCount = 0
	state = 'RUNNING'
	displayState()
	textEditor = vscode.window.activeTextEditor
	textEditor.show()
	startingWordCount = countWords(textEditor.document.getText())
	vscode.workspace.onDidChangeTextDocument(onChangeText)
	interval = setInterval(() => {
		duration++
		displayState()
	}, 60000)
}

function onChangeText(e) {
	if (state === 'RUNNING' && e.document.fileName === textEditor.document.fileName) {
		let newCount = countWords(e.document.getText())
		wordsCount = newCount - startingWordCount
		displayState()
	}
}

function stop() {
	clearInterval(interval)
	textEditor.show()
	state = 'NOT_STARTED'
	const time = getReadableDuration()
	vscode.window.showInformationMessage(`Ending a ${time} session, ${wordsCount} words`)
	init()
}

function displayState() {
	const time = getReadableDuration()
	write(`${time}|${wordsCount} words`)
}

function getReadableDuration() {
	const hours = parseInt(duration/60)
	let time = ''
	if (hours) {
		time += `${hours}h`
	}
	time += `${duration%60}m`
	return time
}

function countWords(text) {
  return (text.match(WORD_RE) || []).length;
}


module.exports = {
	activate
}