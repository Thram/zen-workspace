import { readFileSync } from 'fs';

const scriptFixes = () => readFileSync(`${__dirname}/fixes.js`, 'utf-8');

export { scriptFixes };
export default { scriptFixes };
