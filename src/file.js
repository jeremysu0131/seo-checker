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
          if (this.results.strong.count <= limit) {
            return `<strong> tag isn't more than ${limit}. Total: ${count}.`;
          }
          return `<strong> tag is more than ${limit}. Total: ${count}.`;
        },
      },
    };
  }

  checkStrong(limit) {
    this.results.strong.limit = limit;
    this.results.h1.count = check.h1(this.data);
    return this;
  }

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
