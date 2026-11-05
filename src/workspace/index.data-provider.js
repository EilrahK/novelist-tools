const vscode = require('vscode')
const {countWords} = require('../word-counter/word-counter.utils')

/**
 * Provide the list of parts and chapters as a tree.
 */
const IndexDataProvider = class {

    _onDidChangeTreeData  = new vscode.EventEmitter();
    onDidChangeTreeData = this._onDidChangeTreeData.event;

    /**
     * Return the children of the element or the roots elements.
     * @param {Object|null} element 
     * @returns 
     */
    async getChildren (element) {
        if (!element?.key) {
            return this.getRoot()
        } else {
            const content = await this.readFile(element.key)
            const chapters = content.match(/\#\#([^\#]+)/dg)
            return chapters.map(c => {
                const split = c.split('\n', 1)
                const length = countWords(c.replace(split[0], ''))
                return {key: split[0], label: split[0].replace('##', '').trim(), length }
            })
        }
    }
    /**
     * Return an item identified by the key present in the element.
     * @param {Object} element 
     * @returns 
     */
    async getTreeItem(element) {
        if (element.label) {
            return {label: `${element.label} (${element.length} mots)`, collapsibleState:vscode.TreeItemCollapsibleState.None}
        } else {
            let label = element.key.split('/')[0]
            const content = await this.readFile(element.key)
            let collapsibleState = vscode.TreeItemCollapsibleState.None
            if (content.includes('##')) {
                collapsibleState = vscode.TreeItemCollapsibleState.Collapsed
            }
            const count = countWords(content)
            label += ` (${count} words)`
            return {label, collapsibleState}
        }
    }

    getParent({ key }) {
        return undefined;
    }

    refresh() {
        this._onDidChangeTreeData.fire();
    }

    /**
     * Read a workspace file.
     * @param {String} relativePath path relative to the workspace root
     * @returns 
     */
    async readFile(relativePath) {
        const doc = await vscode.workspace.openTextDocument(vscode.Uri.file(`${vscode.workspace.rootPath}/${relativePath}`))
        return doc.getText()
    }

    /**
     * Returns the root of the workspace.
     * If no workspace, returns nothing.
     * If no sub-directories, return the .md file at the root of the workspace.
     * Else return the list of sub-directories.
     * @returns 
     */
    async getRoot() {
        if (!vscode.workspace.rootPath) {
            return
        }
        const files = await vscode.workspace.findFiles('**/*.md')
        const paths = files.map(f => f.path.replace(vscode.workspace.rootPath + '/', ''))
        const hasSubDir = paths.some(p => p.includes('/'))
        let selectedPaths = paths
        if (hasSubDir) {
            selectedPaths = paths.filter(p => {
                const split = p.split('/')
                if (split.length !== 2) {
                    return false
                }
                return split[1] === `${split[0]}.md`
            })
        }
        return selectedPaths.map(p => ({key:p}))
    }
}

module.exports = IndexDataProvider