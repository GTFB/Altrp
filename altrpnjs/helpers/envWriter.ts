import { readFile, writeFileSync } from 'fs';
import * as envfile from 'envfile';
import base_path from "./base_path";

export default function writeEnvToFile (
  envVariables: { key: string; value: any }[],
) {

  const path = base_path( '/.env');
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
  });
};

