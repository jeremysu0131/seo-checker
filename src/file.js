import fs from 'fs';
import * as check from './checker';

/**
 * Class representing a checker
 */
class Checker {
  /**
   * Create a checker
   * @param {string} path
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
    };
  }

  /**
   * Check meta name
   * @param {strig} metaName
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
   * Detect <strong> tag if exceed limit
   * @param {number} [limit=15] - Limit of <strong>
   */
  checkStrong(limit = 15) {
    this.results.strong.limit = limit;
    this.results.strong.count = check.strong(this.data);
    return this;
  }

  /**
   * Check H1 Tag
   */
  checkH1() {
    this.results.h1.count = check.h1(this.data);
    return this;
  }


  printResult() {
    console.log(this.results);
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

    rs.on('data', (chunk) => {
      console.log(checker.detectHead(chunk));
      console.log(checker.detectH1(chunk));
    });
  }
}

export default Checker;