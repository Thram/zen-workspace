import { app, shell } from 'electron';
import { readFileSync } from 'fs';
import { sync } from 'glob';
import { base64Sync } from 'base64-img';
import { SCRIPTS } from '../references';

const getPath = path => `${app.getAppPath()}/${path}`;

const getBase64Image = (file, pattern) => {
  const match = sync(getPath(pattern + file));
  const data = match ? base64Sync(match[0]) : '';
  return data;
};

const setupScript = () => {
  const scrappers = readFileSync(`${app.getAppPath()}/${SCRIPTS.scrappers}`, 'utf-8');
  const messenger = readFileSync(`${app.getAppPath()}/${SCRIPTS.messenger}`, 'utf-8');
  const setup = readFileSync(`${app.getAppPath()}/${SCRIPTS.setup}`, 'utf-8');
  return `
  ${scrappers}
  ${messenger}
  ${setup}
  `;
};

const openExternal = url => shell.openExternal(url);

export { openExternal, setupScript, getBase64Image };
export default { openExternal, setupScript, getBase64Image };
