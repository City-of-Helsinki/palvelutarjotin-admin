import fs from 'fs';
import path from 'path';

const packageJson = JSON.parse(
  fs.readFileSync(path.resolve('./package.json'), 'utf-8')
);

export const getVersion = () => packageJson.version;

// eslint-disable-next-line no-console
console.log(getVersion());
