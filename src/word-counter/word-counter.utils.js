const { WORD_RE } = require('./word-counter.constants')

/**
 * Count words in the text.
 * @param {string} text 
 * @returns {Integer}
 */
function countWords(text) {
  return (text.match(WORD_RE) || []).length;
}

module.exports = {
	countWords
}