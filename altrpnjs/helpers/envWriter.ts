import { resolve } from 'path';
import { readFile, writeFileSync } from 'fs';
import * as envfile from 'envfile';

export default function writeEnvToFile (
  envVariables: { key: string; value: any }[],
) {

  const path = resolve(__dirname, '../.env');
  readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const parsedFile = envfile.parse(data);
    envVariables.forEach((envVar: { key: string; value: any }) => {
      if (envVar.key) {
        parsedFile[envVar.key] = envVar.value;
      }
    });
    writeFileSync(path, envfile.stringify(parsedFile));
    //console.log('Updated .env: ', parsedFile);
  });
};