const vscode = require('vscode')
const characterListStore = require('./characters-list.store')

/**
 * Legend used for token identification.
 */
const characterLegend = new vscode.SemanticTokensLegend(['character'], ['native'])

/**
 * Token provider for characters identification.
 */
class CharacterSemanticTokenProvider {

    _onDidChangeSemanticTokens  = new vscode.EventEmitter();
    onDidChangeSemanticTokens = this._onDidChangeSemanticTokens.event;

    /**
     * Returns the tokens found in a document
     * @param {*} document 
     * @returns 
     */
    async provideDocumentSemanticTokens(document) {
		const allTokens = this.getTokens(document.getText())
		const builder = new vscode.SemanticTokensBuilder()
		allTokens.forEach((token) => {
			builder.push(token.line, token.startCharacter, token.length, 0, 0)
		});
		return builder.build()
	}

    /**
     * Identify the character token found in a text.
     * @param {String} text 
     * @returns 
     */
    getTokens(text) {
        if (characterListStore.characterList.length === 0 || !text || text.length === 0) {
            return []
        }
        const tokens = []
        const lines = text.split('\n')
        for (let i = 0; i < lines.length; i++) {
            for (let c = 0; c < characterListStore.characterList.length; c++) {
                const characterName = characterListStore.characterList[c].name
                const regex = new RegExp(`[^A-Za-z]${characterName}[^A-Za-z]`, 'gi')
                let result
                while ((result = regex.exec(lines[i])) !== null) {
                    tokens.push({line: i, startCharacter: result.index + 1, length: characterName.length})
                }
            }
        }
        return tokens
    }

    refresh() {
        this._onDidChangeSemanticTokens.fire();
    }
}

/**
 * Activate the semantic token provider for characters.
 * @param {Object} context 
 * @returns 
 */
function activate(context) {
    const characterSemanticTokenProvider = new CharacterSemanticTokenProvider()
    context.subscriptions.push(vscode.languages.registerDocumentSemanticTokensProvider({ language: 'markdown' }, characterSemanticTokenProvider, characterLegend))
    return characterSemanticTokenProvider
}

module.exports = {
    activate
}