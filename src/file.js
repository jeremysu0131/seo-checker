import fs from 'fs';

class ReadFile {
  constructor(path) {
    this.data = '';
    this.path = path;
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
}

class ReadFileStream {
  constructor(path) {
    this.path = path;
  }

  /**
   *
   * @param {object} New ReadStream Object
   */
  readFileStream() {
    return fs.createReadStream(this.path);
  }
}

class Read {
  constructor(path) {
    this.data = '';
    this.path = path;
  }

  readFile() {
    return new ReadFile(this.path).readFile();
  }

  readFileStream() {
    return new ReadFileStream(this.path).readFileStream();
  }
}

export default Read;
