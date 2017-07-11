import { remote } from 'electron';
import { EXTENSIONS_SCRIPT, TOOLS_SCRIPT } from '../references';

const htmlMetadata = remote.require('html-metadata');
const extensions = remote.require(EXTENSIONS_SCRIPT);
const tools = remote.require(TOOLS_SCRIPT);
const getPath = path => `${remote.app.getAppPath()}/${path}`;
const webviewDependencies = () => `${remote.app.getAppPath()}/webview-dependencies.js`;

export { extensions, htmlMetadata, tools, getPath, webviewDependencies };
export default { extensions, htmlMetadata, tools, getPath, webviewDependencies };
