const cheerio = require('cheerio');

const fs = require('fs');

/**
 * @param {string} path - File location
 *
 * @returns {string} data - File Content
 */
export const readFile = path => fs.readFileSync(path, 'utf8');

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
export const detectLink = (data) => {
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
export const detectHead = (data) => {
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
export const detectStrong = (data, limit = 15) => {
  const $ = cheerio.load(data);
  const i = $('strong').length;

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
export const detectH1 = (data) => {
  const $ = cheerio.load(data);

  if ($('h1').length <= 1) {
    return '<h1> tag isn\'t more than one.';
  }
  return '<h1> tag is more than one.';
};