/**
 * Character list manager.
 */
class CharacterList {

    /**
     * Character list
     * @type {Character[]}
     */
    characterList

    constructor() {
        this.characterList = []
    }

    /**
     * Add a character
     * @param {Character} character 
     */
    add(character) {
        this.characterList.push(character)
    }

    remove(fileName) {
        
    }

    clean() {
        this.characterList = []
    }
}

/**
 * @typedef Character
 * @type {object}
 * @property {string} id the character id, relative path of the file defining it
 * @property {string} name the character name
 * @property {string} path absolute path of the file
 */

/**
 * Store that keep the list of characters.
 */
const store = new CharacterList()

module.exports = store