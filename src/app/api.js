import { remote } from 'electron';
import { SCRIPTS } from '../references';

const extensions = remote.require(SCRIPTS.extensionsManager);
const tools = remote.require(SCRIPTS.tools);
const getPath = path => `${remote.app.getAppPath()}/${path}`;
const webviewDependencies = () => getPath(SCRIPTS.dependencies);

export { extensions, tools, getPath, webviewDependencies };
export default { extensions, tools, getPath, webviewDependencies };
