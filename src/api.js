import { remote } from 'electron';

const htmlMetadata = remote.require('html-metadata');
const extensions = remote.require('./extensions');
const tools = remote.require('./tools');

export { extensions, htmlMetadata, tools };
export default { extensions, htmlMetadata, tools };
