import { app } from 'electron';
import { sync } from 'glob';
import { base64Sync } from 'base64-img';

const getPath = path => `${app.getAppPath()}/${path}`;

function getBase64Image(file, pattern) {
  const match = sync(getPath(pattern + file));
  const data = match ? base64Sync(match[0]) : '';
  return data;
}

export { getBase64Image };
export default { getBase64Image };
