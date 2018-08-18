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
import { Check } from '@jeremysu0131/seo-checker';

Check.readFile('./test.html')
  .checkImage()
  .checkH1()
  .checkMeta('keywords', 'descriptions')
  .printResult();

// Output:
// <h1> tag is more than one. Total: 2
// Meta have "keywords" but not have "descriptions"
// There are 2 <img> tag without alt attribute.
```

Performing a read HTML file as Stream sample

```js
import fs from 'fs';
import { CheckStream } from '@jeremysu0131/seo-checker';

// Create a read stream
const rs = fs.createReadStream('./test.html');

// Pipe the stream to every method
rs.pipe(CheckStream.detectImage())
  .pipe(CheckStream.detectLink())
  .pipe(CheckStream.detectTitle())
  .pipe(CheckStream.detectMeta('keywords', 'descriptions'))
  .pipe(CheckStream.detectStrong())
  .pipe(CheckStream.detectH1())
  .pipe(CheckStream.printResults());
```
