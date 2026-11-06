const vscode = require('vscode')
const characterListStore = require('./characters-list.store')

class CharactersDataProvider {

    _onDidChangeTreeData  = new vscode.EventEmitter();
    onDidChangeTreeData = this._onDidChangeTreeData.event;

    /**
     * Return the character list
     * @param {Object|null} element 
     * @returns 
     */
    async getChildren (element) {
        return characterListStore.characterList
    }
    /**
     * Return an item identified by the key present in the element.
     * @param {Object} element 
     * @returns 
     */
    async getTreeItem(element) {
        const collapsibleState = vscode.TreeItemCollapsibleState.None
        return {label: element.name, collapsibleState, ...element}
    }

    getParent({ key }) {
        return undefined;
    }

    refresh() {
        this._onDidChangeTreeData.fire();
    }
}

module.exports = CharactersDataProvider