const {
  expect,
} = require('chai');
const checker = require('../lib/checker');

describe('Detect Image Arrtibute', () => {
  it('Should return 2', () => {
    expect(checker.image(
      `
      <img src="http://via.placeholder.com/300x300">
      <img src="http://via.placeholder.com/200x200">
      <img src="http://via.placeholder.com/150x150" alt="square">
      <img src="http://via.placeholder.com/200x100" alt="rectangle">
      `,
    )).to.equal(2);
  });
  it('Should return 0', () => {
    expect(checker.image(
      `
      <img src="http://via.placeholder.com/150x150" alt="square">
      <img src="http://via.placeholder.com/200x100" alt="rectangle">
      `,
    )).to.equal(0);
  });
});

describe('Detect Link Arrtibute', () => {
  it('Should return 2', () => {
    expect(checker.link(
      `
      <a href="http://google.com">Google</a>
      <a href="http://google.com">Google</a>
      <a href="http://google.com" rel="nofollow">Google</a>
      `,
    )).to.equal(2);
  });
  it('Should return 0', () => {
    expect(checker.link(
      `
      <a href="http://google.com" rel="author">Google</a>
      <a href="http://google.com" rel="bookmark">Google</a>
      <a href="http://google.com" rel="nofollow">Google</a>
      `,
    )).to.equal(0);
  });
});

describe('Detect Meta Arrtibute', () => {
  it('Should return without everything', () => {
    expect(checker.meta(
      `
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
      </head>
      `, 'keywords',
    )).to.equal(0);
  });
  it('Should return 1', () => {
    expect(checker.meta(
      `
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="I want to be hired!">
        <meta name="keywords" content="HTML,CSS,XML,JavaScript">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
      </head>
      `, 'keywords',
    )).to.equal(1);
  });
  it('Should return 1', () => {
    expect(checker.meta(
      `
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="I want to be hired!">
        <meta name="keywords" content="HTML,CSS,XML,JavaScript">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Jeremy test</title>
      </head>
      `, 'description',
    )).to.equal(1);
  });
});

describe('Detect The Number of Title Tags', () => {
  it('Should return 1', () => {
    expect(checker.title(
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
    )).to.equal(1);
  });
});

describe('Detect The Number of Strong Tags', () => {
  it('Should return 8', () => {
    expect(checker.strong(
      `
      <strong>Nihil, velit!</strong>
      <strong>Cumque, ab.</strong>
      <strong>Totam, aspernatur!</strong>
      <strong>Nesciunt, illum?</strong>
      <strong>Possimus, accusamus!</strong>
      <strong>Rem, maxime.</strong>
      <strong>Quia, a.</strong>
      <strong>Eos, perspiciatis.</strong>
      `,
    )).to.equal(8);
  });
});

describe('Detect The Number of h1 Tags', () => {
  it('Should return 1', () => {
    expect(checker.h1(
      `
      <h1>Helllo World!</h1>
      `,
    )).to.equal(1);
  });
  it('Should return 2', () => {
    expect(checker.h1(
      `
      <h1>Helllo World!</h1>
      <h1>Helllo World!</h1>
      `,
    )).to.equal(2);
  });
});
