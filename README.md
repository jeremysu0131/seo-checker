[![Build Status](https://travis-ci.org/jeremysu0131/seo-checker.svg?branch=master)](https://travis-ci.org/jeremysu0131/seo-checker)

# SEO Checker

## Features

1. Check if the HTML file applies the SEO rules.
2. You can use `Stream` to Read/Write file.

## Installing

Using npm:

```bash
$ npm install @jeremysu0131/seo-checker
```

## Example

Performing a read HTML file sample

```js
import Check from './detect';

Check.readFile('./test/testfiles/test2.html')
  .checkImage()
  .checkH1()
  .printResult();
```

Performing a read HTML file as Stream sample

```js
import fs from 'fs';
import CheckStream from './detectStream';

const rs = fs.createReadStream('./test/testfiles/test2.html');
rs.pipe(CheckStream.detectImage())
  .pipe(CheckStream.detectLink())
  .pipe(CheckStream.detectTitle())
  .pipe(CheckStream.detectMeta('keywords', 'descriptions'))
  .pipe(CheckStream.detectStrong())
  .pipe(CheckStream.detectH1())
  .pipe(CheckStream.printResults());
```
