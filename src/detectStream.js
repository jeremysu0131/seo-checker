import {
  Transform,
  Writable,
} from 'stream';
import fs from 'fs';
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
        // Check if it still needs to check
        if (!this.results.meta.finish) {
          // Check if leave <head> tag
          if (chunk.indexOf('</head>')) this.results.meta.finish = true;
          options.forEach((o) => {
            const checkResult = checker.meta(chunk.toString(), o);
            if (checkResult > 0) this.results.meta.have.push(o);
            else this.results.meta.nothave.push(o);
          });
        }
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

  writeResultsToFile(path) {
    if (!path) {
      throw new Error("You didn't choose where the result to save.");
    }
    return new Writable({
      objectMode: true,
      write: (data, _, done) => {
        done();
      },
      final: () => {
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
      },
    });
  }
}
export default new DetectStream();
