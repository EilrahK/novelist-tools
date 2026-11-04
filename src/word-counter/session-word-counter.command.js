const {countWords} = require('./word-counter.utils')
const vscode = require('vscode')

const commandId = 'novelist-tools.session-word-counter'
let state = 'NOT_STARTED'
let write
let interval
let duration = 0
let startingWordCount = 0
let textEditor
let wordsCount = 0

/**
 * Activate the command
 * @param {Object} param0 the context
 * @param {Function} writeFunction the function that allow writing somewhere
 * @returns the command id
 */
function activate({ subscriptions }, writeFunction) {
	subscriptions.push(vscode.commands.registerCommand(commandId, onClicked))
	write = writeFunction
	init()
	return commandId
}

/**
 * Display the initial state.
 */
function init() {
	write('Start writing')
}

/**
 * Triggered when the command is launched.
 * Toggle start/stop.
 */
function onClicked() {
	if (state === 'NOT_STARTED') {
		start()
	} else if (state === 'RUNNING') {
		stop()
	}
}

/**
 * Start the session.
 * The current textEditor is registered as THE textEditor.
 * Start the timer.
 * Start watching what's typed.
 */
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

/**
 * Method called when something is typed on the selected TextEditor.
 * @param {Object} e 
 */
function onChangeText(e) {
	if (state === 'RUNNING' && e.document.fileName === textEditor.document.fileName) {
		let newCount = countWords(e.document.getText())
		wordsCount = newCount - startingWordCount
		displayState()
	}
}

/**
 * Stop the running session, display a message with a resume.
 */
function stop() {
	clearInterval(interval)
	textEditor.show()
	state = 'NOT_STARTED'
	const time = getReadableDuration()
	vscode.window.showInformationMessage(`Ending a ${time} session, ${wordsCount} words`)
	init()
}

/**
 * Display the actual state on the bar.
 */
function displayState() {
	const time = getReadableDuration()
	write(`${time}|${wordsCount} words`)
}

/**
 * Transform the actual duration on something readable.
 * @returns {String}
 */
function getReadableDuration() {
	const hours = parseInt(duration/60)
	let time = ''
	if (hours) {
		time += `${hours}h`
	}
	time += `${duration%60}m`
	return time
}

/**
 * Command that manage the session word counter.
 */
module.exports = {
	activate
}