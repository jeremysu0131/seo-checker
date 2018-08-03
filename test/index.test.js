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

describe('Detect Link Arrtibute', () => {
  it('Should return 2', () => {
    expect(checker.detectLink(
      `
      <a href="http://google.com">Google</a>
      <a href="http://google.com">Google</a>
      <a href="http://google.com" rel="nofollow">Google</a>
      `,
    )).to.equal('There are 2 <a> tag without rel attribute.');
  });
  it('Should return 0', () => {
    expect(checker.detectLink(
      `
      <a href="http://google.com" rel="author">Google</a>
      <a href="http://google.com" rel="bookmark">Google</a>
      <a href="http://google.com" rel="nofollow">Google</a>
      `,
    )).to.equal('There are 0 <a> tag without rel attribute.');
  });
});

describe('Detect Header Arrtibute', () => {
  it('Should return without everything', () => {
    expect(checker.detectHead(
      `
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
      </head>
      `,
    )).to.equal('This HTML without <title> <meta name="descriptions" /> <meta name="keywords" /> tag.');
  });
  it('Should return without title tag', () => {
    expect(checker.detectHead(
      `
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="I want to be hired!">
        <meta name="keywords" content="HTML,CSS,XML,JavaScript">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
      </head>
      `,
    )).to.equal('This HTML without <title> tag.');
  });
  it('Should return header is ok', () => {
    expect(checker.detectHead(
      `
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="I want to be hired!">
        <meta name="keywords" content="HTML,CSS,XML,JavaScript">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Jeremy test</title>
      </head>
      `,
    )).to.equal('Header setup ok.');
  });
});

describe('Detect The Number of Strong Tags', () => {
  const limit = 15;
  it('Should return less', () => {
    expect(checker.detectStrong(
      `
      <strong>Nihil, velit!</strong>
      <strong>Cumque, ab.</strong>
      <strong>Totam, aspernatur!</strong>
      <strong>Nesciunt, illum?</strong>
      <strong>Possimus, accusamus!</strong>
      <strong>Rem, maxime.</strong>
      <strong>Quia, a.</strong>
      <strong>Eos, perspiciatis.</strong>
      `, limit,
    )).to.equal(`<strong> tag isn't more than ${limit}. Total: 8.`);
  });
  it('Should return more', () => {
    expect(checker.detectStrong(
      `
      <strong>Lorem, ipsum.</strong>
      <strong>Quisquam, accusamus?</strong>
      <strong>Quae, laboriosam!</strong>
      <strong>Quia, tempore?</strong>
      <strong>Laborum, optio.</strong>
      <strong>Labore, quasi.</strong>
      <strong>Totam, sapiente?</strong>
      <strong>Quam, sapiente.</strong>
      <strong>Similique, ullam.</strong>
      <strong>Tempore, laborum.</strong>
      <strong>Suscipit, ipsam?</strong>
      <strong>Ex, fuga!</strong>
      <strong>Perferendis, eos.</strong>
      <strong>Nobis, accusamus?</strong>
      <strong>Quidem, suscipit!</strong>
      <strong>Omnis, ratione!</strong>
      `, limit,
    )).to.equal(`<strong> tag is more than ${limit}. Total: 16.`);
  });
});

describe('Detect The Number of Strong Tags', () => {
  const limit = 15;
  it('Should return less', () => {
    expect(checker.detectH1(
      `
      <h1>Helllo World!</h1>
      `, limit,
    )).to.equal('<h1> tag isn\'t more than one.');
  });
  it('Should return more', () => {
    expect(checker.detectH1(
      `
      <h1>Helllo World!</h1>
      <h1>Helllo World!</h1>
      `, limit,
    )).to.equal('<h1> tag is more than one.');
  });
});
