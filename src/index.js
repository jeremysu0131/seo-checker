import Check from './detect';
import CheckStream from './detectStream';

export {
  Check,
  CheckStream,
};


Check.readFile('./test/testfiles/test2.html')
  .checkImage()
  .checkH1()
  .checkMeta('keywords', 'descriptions')
  .printResult();
