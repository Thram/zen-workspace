import { remote } from 'electron';
import { SCRIPTS } from '../references';

const htmlMetadata = remote.require('html-metadata');
const extensions = remote.require(SCRIPTS.extensionsManager);
const tools = remote.require(SCRIPTS.tools);
const getPath = path => `${remote.app.getAppPath()}/${path}`;
const webviewDependencies = () => getPath(SCRIPTS.dependencies);

export { extensions, htmlMetadata, tools, getPath, webviewDependencies };
export default { extensions, htmlMetadata, tools, getPath, webviewDependencies };
