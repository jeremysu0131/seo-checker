import fs from 'fs';
import * as check from './checker';
/**
 * Class representing a checker
 */
class Detect {
  /**
   * Create a checker
   * @param {string} path - File location
   */
  constructor(path) {
    this.path = path;
    this.data = '';
    this.results = {
      h1: {
        called: false,
        count: 0,
        message: () => {
          if (this.results.h1.count <= 1) {
            return '<h1> tag isn\'t more than one.';
          }
          return '<h1> tag is more than one.';
        },
      },
      strong: {
        called: false,
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
        called: false,
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
        called: false,
        has: false,
        message: () => (this.results.title.has ? 'Has Title' : 'No title'),
      },
      link: {
        called: false,
        count: 0,
        message: () => `There are ${this.results.link.count} <a> tag without rel attribute.`,
      },
      image: {
        called: false,
        count: 0,
        message: () => `There are ${this.results.image.count} <img> tag without alt attribute.`,
      },
    };
  }

  /**
   * Check <img> tag without alt attribute
   */
  checkImage() {
    this.results.image.called = true;
    this.results.image.count = check.image(this.data);
    return this;
  }

  /**
   * Check <a> tag without rel attribute
   */
  checkLink() {
    this.results.link.called = true;
    this.results.link.count = check.link(this.data);
    return this;
  }

  /**
   * Check if has <title> tag
   */
  checkTitle() {
    this.results.title.called = true;
    this.results.title.has = check.strong(this.data) > 0;
    return this;
  }

  /**
   * Check meta name
   * @param {strig} metaName - Meta name value
   */
  checkMeta(metaName) {
    this.results.meta.called = true;
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
    this.results.strong.called = true;
    this.results.strong.limit = limit;
    this.results.strong.count = check.strong(this.data);
    return this;
  }

  /**
   * Check if more than one <h1> Tag
   */
  checkH1() {
    this.results.h1.called = true;
    this.results.h1.count = check.h1(this.data);
    return this;
  }


  printResult() {
    Object.keys(this.results).forEach((key) => {
      const result = this.results[key];
      if (result.called) {
        console.log(result.message());
      }
    });
  }

  writeResult() {
    const ws = fs.createWriteStream('./result.txt', {
      encoding: 'utf8',
    });
    ws.once('open', () => {
      Object.keys(this.results).forEach((key) => {
        const result = this.results[key];
        if (result.called) {
          ws.write(`${result.message()}\n`);
        }
      });
      ws.end();
    });
  }
}

export default Detect;
