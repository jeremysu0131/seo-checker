import Read from './file';
import * as Checker from './detectStream';
// For npm
export {
  Read,
  Checker,
};

const file = new Read('./test/testfiles/test2.html');


file.readFile()
  .checkImage()
  .checkH1()
  .writeResult();

// file.readFileStream()
//   .pipe(Checker.detectH1Stream)
//   .pipe(Checker.detectStrongStream)
//   .pipe(Checker.writeReaultStream);
