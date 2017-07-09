import { remote } from 'electron';

const htmlMetadata = remote.require('html-metadata');
const extensions = remote.require('./extensions');
const tools = remote.require('./tools');
const getPath = path => `${remote.app.getAppPath()}/${path}`;

export { extensions, htmlMetadata, tools, getPath };
export default { extensions, htmlMetadata, tools, getPath };
