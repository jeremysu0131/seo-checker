import fs from 'fs';
import * as check from './checker';

/**
 * Class representing a checker
 */
class Checker {
  /**
   * Create a checker
   * @param {string} path - File location
   */
  constructor(path) {
    this.path = path;
    this.data = '';
    this.results = {
      h1: {
        count: 0,
        message: () => {
          if (this.results.h1.count <= 1) {
            return '<h1> tag isn\'t more than one.';
          }
          return '<h1> tag is more than one.';
        },
      },
      strong: {
        count: 0,
        limit: 0,
        message: () => {
          const {
            count,
            limit,
          } = this.results.strong;
          if (count <= limit) {
            return `<strong> tag isn't more than ${limit}. Total: ${count}.`;
          }
          return `<strong> tag is more than ${limit}. Total: ${count}.`;
        },
      },
      meta: {
        have: [],
        nothave: [],
        message: () => {
          const {
            have,
            nothave,
          } = this.results.meta;
          let s = 'Meta have ';
          have.forEach((tag) => {
            s += `"${tag}" `;
          });

          if (nothave.length > 0) {
            s += 'but not have ';
            nothave.forEach((tag) => {
              s += `"${tag}" `;
            });
          }
          return s;
        },
      },
      title: {
        has: false,
        message: () => (this.results.title.has ? 'Has Title' : 'No title'),
      },
      link: {
        count: 0,
        message: () => `There are ${this.results.link.count} <a> tag without rel attribute.`,
      },
      image: {
        count: 0,
        message: () => `There are ${this.results.image.count} <img> tag without alt attribute.`,
      },
    };
  }

  /**
   * Check <img> tag without alt attribute
   */
  checkImage() {
    this.results.image.count = check.image(this.data);
    return this;
  }

  /**
   * Check <a> tag without rel attribute
   */
  checkLink() {
    this.results.link.count = check.link(this.data);
    return this;
  }

  /**
   * Check if has <title> tag
   */
  checkTitle() {
    this.results.title.has = check.strong(this.data) > 0;
    return this;
  }

  /**
   * Check meta name
   * @param {strig} metaName - Meta name value
   */
  checkMeta(metaName) {
    if (check.meta(this.data, metaName)) {
      this.results.meta.have.push(metaName);
    } else {
      this.results.meta.nothave.push(metaName);
    }
    return this;
  }

  /**
   * Check if <strong> tag exceed limit
   * @param {number} [limit=15] - Limit of <strong>
   */
  checkStrong(limit = 15) {
    this.results.strong.limit = limit;
    this.results.strong.count = check.strong(this.data);
    return this;
  }

  /**
   * Check if more than one <h1> Tag
   */
  checkH1() {
    this.results.h1.count = check.h1(this.data);
    return this;
  }


  printResult() {
    const {
      h1,
      link,
      image,
      title,
      strong,
      meta,
    } = this.results;
    console.log(h1.message());
    console.log(link.message());
    console.log(image.message());
    console.log(title.message());
    console.log(meta.message());
    console.log(strong.message());
  }

  /**
   * @param {string} path - File location
   *
   * @returns {string} data - File Content
   */
  readFile() {
    this.data = fs.readFileSync(this.path, 'utf8');
    return this;
  }

  /**
   *
   * @param {string} option
   */
  readFileStream() {
    const rs = fs.createReadStream(this.path);
    rs.setEncoding('utf8');

    // rs.on('data', (chunk) => {
    //   console.log(checker.detectHead(chunk));
    //   console.log(checker.detectH1(chunk));
    // });
  }
}

// Use this to let IDE read
module.exports = Checker;
