import { readdirSync, lstatSync, readFileSync } from 'fs';
import { join } from 'path';

const EXTENSIONS_FOLDER = `${__dirname}/extensions`;

const getDirectories = src =>
  readdirSync(src).filter(file => lstatSync(join(src, file)).isDirectory());

const list = () =>
  getDirectories(EXTENSIONS_FOLDER).map((folder) => {
    const extentionFolder = `${EXTENSIONS_FOLDER}/${folder}`;
    const manifest = JSON.parse(readFileSync(`${extentionFolder}/manifest.json`, 'utf-8'));
    return { ...manifest, id: folder, path: extentionFolder };
  });

const getSetup = (manifest) => {
  const { js, css, matches } = manifest.content_scripts[0];

  const concatFiles = files =>
    files.reduce((result, file) => {
      const script = readFileSync(`${manifest.path}/${file}`, 'utf-8');
      return result + script;
    }, '');

  const scripts = concatFiles(js);
  const styles = concatFiles(css);
  return { scripts, styles, matches };
};

export { list, getSetup };
export default { list, getSetup };
