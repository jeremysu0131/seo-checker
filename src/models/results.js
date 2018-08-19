const results = {
  h1: {
    called: false,
    count: 0,
    message: () => {
      if (results.h1.count > 1) {
        return `<h1> tag is more than one. Total: ${results.h1.count}`;
      }
      if (results.h1.count === 1) {
        return 'This HTML has one <h1> tag.';
      }
      return 'This HTML without <h1> tag.';
    },
  },
  strong: {
    called: false,
    count: 0,
    limit: 0,
    message: () => {
      const {
        count,
        limit,
      } = results.strong;
      if (count <= limit) {
        return `<strong> tag isn't more than ${limit}. Total: ${count}.`;
      }
      return `<strong> tag is more than ${limit}. Total: ${count}.`;
    },
  },
  meta: {
    called: false,
    have: [],
    nothave: [],
    finish: false,
    message: () => {
      const {
        have,
        nothave,
      } = results.meta;
      let s = '';
      if (have.length > 0) {
        s += 'Meta have ';
        have.forEach((tag) => {
          s += `"${tag}" `;
        });
      }

      if (nothave.length > 0) {
        s += 'Not have ';
        nothave.forEach((tag) => {
          s += `"${tag}" `;
        });
      }
      return s;
    },
  },
  title: {
    called: false,
    count: false,
    message: () => (results.title.count ? 'The HTML with <title> tag.' : 'The HTML without <title> tag.'),
  },
  link: {
    called: false,
    count: 0,
    message: () => `There are ${results.link.count} <a> tag without rel attribute.`,
  },
  image: {
    called: false,
    count: 0,
    message: () => `There are ${results.image.count} <img> tag without alt attribute.`,
  },
};

export default results;
