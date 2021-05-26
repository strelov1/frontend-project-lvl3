// @ts-check
import { beforeEach, test, expect } from '@jest/globals';

import { promises as fs } from 'fs';
import path from 'path';
// import { fileURLToPath } from 'url';
import init from '../src/init';

// const __dirname = path.dirname(fileURLToPath(import.meta.url));

beforeEach(async () => {
  const pathToHtml = path.resolve(__dirname, '__fixtures__/index.html');
  const html = await fs.readFile(pathToHtml, 'utf8');
  document.body.innerHTML = html;
});

test('init', () => {
  init();
  expect(true).toBeDefined();
});
