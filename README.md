[![Build Status](https://travis-ci.org/jeremysu0131/seo-checker.svg?branch=master)](https://travis-ci.org/jeremysu0131/seo-checker)

# SEO Checker

## Features

1. Check if the HTML file applies the SEO rules.
2. You can use `Stream` to Read/Write file.

## Installing

Using npm:

```bash
npm install @jeremysu0131/seo-checker
```

## Input Methods

1. `readFile`: Read a HTML file
2. Use `fs.createReadStream` to create a read stream, then use `pipe` to pipe chunk to the method you specified.

## Check Methods

1. `checkImage`: Detect if any `img` tag without alt attribute
2. `checkLink`: Detect if any `a` tag without rel attribute
3. `checkTitle`: Detect if header doesn’t have `title` tag
4. `checkMeta`: Detect if header doesn’t have the tag you specified
5. `checkStrong`: Detect if there’re more than 15 `strong` tag in HTML (15 is a default value and you can configurable by yourself)
6. `checkH1`: Detect if a HTML have more than one `h1` tag

## Output Methods

1. `printResultsToConsole`: Print check results to console
2. `writeResultsToFile`: Write results to file
3. **Custom**: You can write your custom results style by pipe the chunk to your custom method

## Example

Performing a read HTML file sample

```js
import { Check } from '@jeremysu0131/seo-checker';

Check.readFile('./test.html')
  .checkImage()
  .checkH1()
  .checkMeta('keywords', 'descriptions')
  .printResultsToConsole();

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
  .pipe(CheckStream.writeResultsToFile('./test.txt')); // Save results to file
```
