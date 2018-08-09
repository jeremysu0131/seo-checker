import {
  Transform,
  Writable,
} from 'stream';
import * as checker from './checker';
import resultsModel from './models/results';

class DetectStream {
  constructor() {
    this.results = resultsModel;
  }

  detectStrong(limit = 15) {
    this.results.strong.called = true;
    return new Transform({
      objectMode: true,
      transform: (chunk, _, next) => {
        this.results.strong.limit = limit;
        this.results.strong.count += checker.strong(chunk.toString());
        next(null, chunk);
      },
    });
  }

  detectH1() {
    this.results.h1.called = true;
    return new Transform({
      objectMode: true,
      transform: (chunk, _, next) => {
        this.results.h1.count += checker.h1(chunk.toString());
        next(null, chunk);
      },
    });
  }

  detectImage() {
    this.results.image.called = true;
    return new Transform({
      objectMode: true,
      transform: (chunk, _, next) => {
        this.results.image.count += checker.image(chunk.toString());
        next(null, chunk);
      },
    });
  }

  detectLink() {
    this.results.link.called = true;
    return new Transform({
      objectMode: true,
      transform: (chunk, _, next) => {
        this.results.link.count += checker.link(chunk.toString());
        next(null, chunk);
      },
    });
  }

  detectTitle() {
    this.results.title.called = true;
    return new Transform({
      objectMode: true,
      transform: (chunk, _, next) => {
        this.results.title.count = checker.title(chunk.toString());
        next(null, chunk);
      },
    });
  }

  detectMeta(...options) {
    this.results.meta.called = true;
    return new Transform({
      objectMode: true,
      transform: (chunk, _, next) => {
        options.forEach((o) => {
          const checkResult = checker.meta(chunk.toString(), o);
          if (checkResult > 0) this.results.meta.have.push(o);
          else this.results.meta.nothave.push(o);
        });
        next(null, chunk);
      },
    });
  }

  printResults() {
    return new Writable({
      objectMode: true,
      write: (data, _, done) => {
        done();
      },
      final: () => {
        Object.keys(this.results).forEach((key) => {
          const result = this.results[key];
          if (result.called) {
            console.log(result.message());
          }
        });
      },
    });
  }
}
export default new DetectStream();


// class DetectH1Stream extends stream.Transform {
//   _transform(chunk, encoding, next) {
//     console.log(checker.h1(chunk.toString()));

//     this.push(chunk);
//     next();
//   }
// }
// export const detectH1Stream = new DetectH1Stream();

// class DetectStrongStream extends stream.Transform {
//   _transform(chunk, encoding, next) {
//     console.log(checker.strong(chunk.toString()));
//     this.push(chunk);
//     next();
//   }
// }
// export const detectStrongStream = new DetectStrongStream();
// /*eslint-disable*/
// export class WriteResultStream extends stream.Writable {
//   _write(chunk, encoding, done) {
//     console.log('finish');
//     done();
//   }
// }
// export const writeReaultStream = new WriteResultStream();
