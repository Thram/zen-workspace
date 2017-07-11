import { app, shell } from 'electron';
import { readFileSync } from 'fs';
import { SETUP_SCRIPT } from './references';

const setupScript = () => readFileSync(`${app.getAppPath()}/${SETUP_SCRIPT}`, 'utf-8');

const openExternal = url => shell.openExternal(url);

export { openExternal, setupScript };
export default { openExternal, setupScript };
