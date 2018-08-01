const {
  expect,
} = require('chai');
const checker = require('../lib/index');


describe('Test', () => {
  it('Say hello', () => {
    expect(checker.sayHello()).to.be.equal('Hello World');
  });
});
