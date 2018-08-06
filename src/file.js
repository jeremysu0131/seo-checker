import fs from 'fs';
import * as detector from './detector';

/**
 * Class representing a Detector
 */
class Detector {
  /**
   * Create a detector
   * @param {string} path
   */
  constructor(path) {
    this.path = path;
    this.data = '';
  }

  checkH1() {
    console.log(detector.detectH1(this.data));
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
      console.log(detector.detectHead(chunk));
      console.log(detector.detectH1(chunk));
    });
  }
}

export default Detector;
