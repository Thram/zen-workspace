import { app } from 'electron';
import { readFileSync } from 'fs';
import { sync } from 'glob';
import { base64Sync } from 'base64-img';

const scriptFixes = () => readFileSync(`${__dirname}/fixes.js`, 'utf-8');

const getPath = path => `${app.getAppPath()}/${path}`;

function getBase64Image(file, pattern) {
  const match = sync(getPath(pattern + file));
  const data = match ? base64Sync(match[0]) : '';
  return data;
}

export { scriptFixes, getBase64Image };
export default { scriptFixes, getBase64Image };
