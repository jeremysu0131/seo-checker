'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var cheerio = require('cheerio');

var fs = require('fs');

/**
 * @param {string} path - File location
 *
 * @returns {string} data - File Content
 */
var readFile = exports.readFile = function readFile(path) {
  return fs.readFileSync(path, 'utf8');
};

/**
 * Detect <img> tag without alt attribute
 * TODO:
 *  - if the tag has alt attribute but value is null
 * @param {string} data - Html text
 * @returns {string} Check result
 */
var detectImage = exports.detectImage = function detectImage(data) {
  var $ = cheerio.load(data);
  var i = 0;
  $('img').each(function (index, el) {
    if (!el.attribs.alt) i += 1;
  });
  return 'There are ' + i + ' <img> tag without alt attribute.';
};

/**
 * Detect <a> link without rel attribute
 * TODO:
 *  - if the link has rel attribute but value is null
 * @param {string} data - Html text
 * @returns {string} Check result
 */
var detectLink = exports.detectLink = function detectLink(data) {
  var $ = cheerio.load(data);
  var i = 0;
  $('a').each(function (index, el) {
    if (!el.attribs.rel) i += 1;
  });
  return 'There are ' + i + ' <a> tag without rel attribute.';
};

/**
 * Detect <title> and <meta> tag
 * @param {string} data - Html text
 * @returns {string} Check result
 */
var detectHead = exports.detectHead = function detectHead(data) {
  var $ = cheerio.load(data);
  var hasTitle = false;
  var hasDescription = false;
  var hasKeywords = false;
  if ($('head title').html()) hasTitle = true;
  $('head meta').each(function (index, el) {
    if (el.attribs.name === 'description') hasDescription = true;
    if (el.attribs.name === 'keywords') hasKeywords = true;
  });

  if (hasTitle && hasDescription && hasKeywords) {
    return 'Header setup ok.';
  }

  return 'This HTML without' + (hasTitle ? '' : ' <title>') + (hasDescription ? '' : ' <meta name="descriptions" />') + (hasKeywords ? '' : ' <meta name="keywords" />') + ' tag.';
};

/**
 * Detect <strong> tag if exceed limit
 * @param {string} data - Html text
 * @param {number} [limit=15] - Limit of <strong>
 * @returns {string} Check result
 */
var detectStrong = exports.detectStrong = function detectStrong(data) {
  var limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 15;

  var $ = cheerio.load(data);
  var i = $('strong').length;

  if (i <= limit) {
    return '<strong> tag isn\'t more than ' + limit + '. Total: ' + i + '.';
  }
  return '<strong> tag is more than ' + limit + '. Total: ' + i + '.';
};

/**
 * Detect <h1> tag if more than one
 * @param {string} data - Html text
 * @returns {string} Check result
 */
var detectH1 = exports.detectH1 = function detectH1(data) {
  var $ = cheerio.load(data);

  if ($('h1').length <= 1) {
    return '<h1> tag isn\'t more than one.';
  }
  return '<h1> tag is more than one.';
};