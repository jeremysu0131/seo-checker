import Read from './file';
import Checker from './detectStream';
// For npm
export {
  Read,
  Checker,
};

const file = new Read('./test/testfiles/test2.html');


// file.readFile()
//   .checkImage()
//   .checkH1()
//   .writeResult('./result.txt');

file.readFileStream()
  .pipe(Checker.detectImage())
  .pipe(Checker.detectLink())
  .pipe(Checker.detectTitle())
  .pipe(Checker.detectMeta('keywords', 'descriptions'))
  .pipe(Checker.detectStrong())
  .pipe(Checker.detectH1())
  .pipe(Checker.printResults());
