/**
 *
 * @param {string} str - Html content
 * @param {string} regex - Regex
 */
const countRegexResult = (str, regex) => ((str || '').match(regex) || []).length;

/**
 * Detect <img> link without alt attribute
 * @param {string} data - Html text
 * @returns {number} Check result
 */
export const image = data => countRegexResult(data, /<img(?!(.*?)alt="(.*?)")(.*?)>/g);

/**
 * Detect <a> link without rel attribute
 * @param {string} data - Html text
 * @returns {number} Check result
 */
export const link = data => countRegexResult(data, /<a(?!(.*?)rel="(.*?)")(.*?)>(.*?)<\/a>/g);

/**
 * Detect <title> and <meta> tag
 * @param {string} data - Html text
 * @returns {number} Check result
 */
export const meta = (data, str) => countRegexResult(data, new RegExp(
  `<meta(.*?)name="${str}"(.*?)>`, 'g',
));

/**
 * Count how many <title> tag
 * @param {string} data - Html text
 * @returns {number} Check result
 */
export const title = data => countRegexResult(data, /<title(.*?)>(.*?)<\/title>/g);

/**
 * Count how many <strong> tag
 * @param {string} data - Html text
 * @returns {number} Check result
 */
export const strong = data => countRegexResult(data, /<strong(.*?)>(.*?)<\/strong>/g);

/**
 * Count how many <h1> tag
 * @param {string} data - Html text
 * @returns {number} Check result
 */
export const h1 = data => countRegexResult(data, /<h1(.*?)>(.*?)<\/h1>/g);
