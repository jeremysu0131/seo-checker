import fs from 'fs';
import Check from './detect';
import CheckStream from './detectStream';

export {
  Check,
  CheckStream,
};

// Create a read stream
const rs = fs.createReadStream('./test/testfiles/test1.html');

// Pipe the stream to every method
rs.pipe(CheckStream.detectImage())
  .pipe(CheckStream.detectLink())
  .pipe(CheckStream.detectTitle())
  .pipe(CheckStream.detectMeta('keywords', 'descriptions'))
  .pipe(CheckStream.detectStrong())
  .pipe(CheckStream.detectH1())
  .pipe(CheckStream.printResults());
