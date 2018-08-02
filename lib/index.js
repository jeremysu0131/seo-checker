const cheerio = require('cheerio');

const fs = require('fs');

module.exports = {
  /**
   * @param {string} path
   *
   * @returns {string} data
   */
  readFile: path => fs.readFileSync(path, 'utf8'),

  /**
   * Detect <img> tag without alt attribute
   * TODO:
   *  - if the tag has alt attribute but value is null
   * @param {data} html text
   * @returns {string} result
   */
  detectImage: (data) => {
    const $ = cheerio.load(data);
    let i = 0;
    $('img').each((index, el) => {
      if (!el.attribs.alt) i += 1;
    });
    return `There are ${i} <img> tag without alt attribute.`;
  },
};
