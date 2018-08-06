import Detector from './file';

const detector = new Detector('./test/testfiles/test2.html');

detector.readFile().checkH1().checkStrong()
  .printResult();
