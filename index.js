// module.exports = require('./lib');

const detect = require('./lib/index');

const data = detect.readFile('./test/testfiles/test2.html');
console.log(detect.detectImage(data));
console.log(detect.detectHead(data));
