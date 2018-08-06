'use strict';

var _file = require('./file');

var _file2 = _interopRequireDefault(_file);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var detector = new _file2.default('./test/testfiles/test2.html');

detector.readFile().checkH1().printResult();