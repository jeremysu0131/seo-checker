import Detector from './file';

const detector = new Detector('./test/testfiles/test2.html');

detector.readFile()
  .checkMeta('keywords')
  .checkMeta('description')
  .checkMeta('descriptions')
  .checkH1()
  .checkStrong()
  .printResult();
