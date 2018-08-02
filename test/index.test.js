const {
  expect,
} = require('chai');
const checker = require('../lib/index');


describe('Detect Image Arrtibute', () => {
  it('Should return 2', () => {
    expect(checker.detectImage(
      `
      <img src="http://via.placeholder.com/300x300">
      <img src="http://via.placeholder.com/200x200">
      <img src="http://via.placeholder.com/150x150" alt="square">
      <img src="http://via.placeholder.com/200x100" alt="rectangle">
      `,
    )).to.equal('There are 2 <img> tag without alt attribute.');
  });
  it('Should return 0', () => {
    expect(checker.detectImage(
      `
      <img src="http://via.placeholder.com/150x150" alt="square">
      <img src="http://via.placeholder.com/200x100" alt="rectangle">
      `,
    )).to.equal('There are 0 <img> tag without alt attribute.');
  });
});
