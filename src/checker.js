const cheerio = require('cheerio');

const countRegexResult = (str, regex) => ((str || '').match(regex) || []).length;

/**
 * Detect <img> tag without alt attribute
 * TODO:
 *  - if the tag has alt attribute but value is null
 * @param {string} data - Html text
 * @returns {string} Check result
 */
export const detectImage = (data) => {
  const $ = cheerio.load(data);
  let i = 0;
  $('img').each((index, el) => {
    if (!el.attribs.alt) i += 1;
  });
  return `There are ${i} <img> tag without alt attribute.`;
};

/**
 * Detect <a> link without rel attribute
 * TODO:
 *  - if the link has rel attribute but value is null
 * @param {string} data - Html text
 * @returns {string} Check result
 */
export const link = (data) => {
  const $ = cheerio.load(data);
  let i = 0;
  $('a').each((index, el) => {
    if (!el.attribs.rel) i += 1;
  });
  return `There are ${i} <a> tag without rel attribute.`;
};

/**
 * Detect <title> and <meta> tag
 * @param {string} data - Html text
 * @returns {string} Check result
 */
export const head = (data) => {
  const $ = cheerio.load(data);
  let hasTitle = false;
  let hasDescription = false;
  let hasKeywords = false;
  if ($('head title').html()) hasTitle = true;
  $('head meta').each((index, el) => {
    if (el.attribs.name === 'description') hasDescription = true;
    if (el.attribs.name === 'keywords') hasKeywords = true;
  });

  if (hasTitle && hasDescription && hasKeywords) {
    return 'Header setup ok.';
  }

  return `This HTML without${hasTitle ? '' : ' <title>'}${hasDescription ? '' : ' <meta name="descriptions" />'}${hasKeywords ? '' : ' <meta name="keywords" />'} tag.`;
};

/**
 * Detect <strong> tag if exceed limit
 * @param {string} data - Html text
 * @param {number} [limit=15] - Limit of <strong>
 * @returns {string} Check result
 */
export const strong = (data, limit = 15) => {
  countRegexResult(data, /<\s*strong[^>]*>(.*?)<\s*\/s*strong>/g);

  if (i <= limit) {
    return `<strong> tag isn't more than ${limit}. Total: ${i}.`;
  }
  return `<strong> tag is more than ${limit}. Total: ${i}.`;
};

/**
 * Detect <h1> tag if more than one
 * @param {string} data - Html text
 * @returns {string} Check result
 */
export const h1 = data => countRegexResult(data, /<\s*h1[^>]*>(.*?)<\s*\/s*h1>/g);
