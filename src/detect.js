import fs from 'fs';
import * as check from './checker';
import resultsModel from './models/results';

/**
 * Class representing a checker
 */
class Detect {
  constructor() {
    this.data = '';
    this.results = resultsModel;
  }

  /**
   * @param {string} path - File location
   */
  readFile(path) {
    this.data = fs.readFileSync(path, 'utf8');
    this.results = this.results;
    return this;
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
  checkMeta(...options) {
    this.results.meta.called = true;
    options.forEach((o) => {
      const checkResult = check.meta(this.data, o);
      if (checkResult > 0) this.results.meta.have.push(o);
      else this.results.meta.nothave.push(o);
    });
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


  printResultsToConsole() {
    Object.keys(this.results).forEach((key) => {
      const result = this.results[key];
      if (result.called) {
        console.log(result.message());
      }
    });
  }

  /**
   * Write results to file
   *
   * @param {string} path - The file where to save
   */
  writeResultsToFile(path) {
    const ws = fs.createWriteStream(path, {
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

export default new Detect();
