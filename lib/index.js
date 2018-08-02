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

  /**
   * Detect <a> tag without rel attribute
   * TODO:
   *  - if the tag has rel attribute but value is null
   * @param {data} html text
   * @returns {string} result
   */
  detectLink: (data) => {
    const $ = cheerio.load(data);
    let i = 0;
    $('a').each((index, el) => {
      if (!el.attribs.rel) i += 1;
    });
    return `There are ${i} <a> tag without rel attribute.`;
  },

  /**
   * Detect <title> and <meta> tag
   * TODO:
   *  - if the tag has rel attribute but value is null
   * @param {data} html text
   * @returns {string} result
   */
  detectHead: (data) => {
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
  },
};
