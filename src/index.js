import Detector from './file';

const detector = new Detector('./test/testfiles/test2.html');

detector.readFile()
  .checkMeta('keywords')
  .checkMeta('description')
  .checkMeta('descriptions')
  .checkImage()
  .checkTitle()
  .checkLink()
  .checkH1()
  .checkStrong()
  .printResult();
