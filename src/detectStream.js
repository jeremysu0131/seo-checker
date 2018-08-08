// module.exports = require('./file.js');
import stream from 'stream';
import * as checker from './checker';

class DetectH1Stream extends stream.Transform {
  _transform(chunk, encoding, next) {
    console.log(checker.h1(chunk.toString()));

    this.push(chunk);
    next();
  }
}
export const detectH1Stream = new DetectH1Stream();

class DetectStrongStream extends stream.Transform {
  _transform(chunk, encoding, next) {
    console.log(checker.strong(chunk.toString()));
    this.push(chunk);
    next();
  }
}
export const detectStrongStream = new DetectStrongStream();
/*eslint-disable*/
export class WriteResultStream extends stream.Writable {
  _write(chunk, encoding, done) {
    console.log('finish');
    done();
  }
}
export const writeReaultStream = new WriteResultStream();