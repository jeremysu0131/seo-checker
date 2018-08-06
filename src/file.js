import fs from 'fs';
import * as checker from './checker';

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
  }

  checkH1() {
    console.log(checker.detectH1(this.data));
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
