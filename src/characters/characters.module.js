const characterTreeView = require('./characters-list.tree-view')
const openCharacterCommand = require('./open-character.command')
const characterSemanticTokenProvider = require('./characters.semantic-token-provider')
const refreshCharactersCommand = require('./refresh-characters.command')
const CharactersDataProvider = require('./character-list.data-provider')

/**
 * Activate the character module.
 * @param {Object} context 
 * @returns 
 */
async function activate(context) {
    const charactersDataProvider = new CharactersDataProvider()
	const semanticTokenProvider = characterSemanticTokenProvider.activate(context)
	refreshCharactersCommand.activate(context, () => {
        charactersDataProvider.refresh()
        semanticTokenProvider.refresh()
    })
	characterTreeView.activate(context, charactersDataProvider)
	openCharacterCommand.activate(context)
    await refreshCharactersCommand.onClicked()
}

module.exports = {
    activate
}