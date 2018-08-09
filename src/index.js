import fs from 'fs';
import Check from './detect';
import CheckStream from './detectStream';
// For npm
export {
  Check,
  CheckStream,
};

Check.readFile('./test/testfiles/test2.html')
  .checkImage()
  .checkH1()
  .printResult();


const rs = fs.createReadStream('./test/testfiles/test2.html');
rs
  .pipe(CheckStream.detectImage())
  .pipe(CheckStream.detectLink())
  .pipe(CheckStream.detectTitle())
  .pipe(CheckStream.detectMeta('keywords', 'descriptions'))
  .pipe(CheckStream.detectStrong())
  .pipe(CheckStream.detectH1())
  .pipe(CheckStream.printResults());
