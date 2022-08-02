import { readFileSync, writeFileSync } from 'fs';
import * as envfile from 'envfile';
import base_path from './path/base_path';
import Logger from '@ioc:Adonis/Core/Logger';
import Env from '@ioc:Adonis/Core/Env';

export default function envWriter(envVariables: { key: string; value: any }[]) {
  const path = base_path('/.env');
  try {
  } catch (e) {
    Logger.error(e);
    return;
  }
  let data = readFileSync(path, { encoding: 'utf8' });

  const parsedFile = envfile.parse(data);
  envVariables.forEach((envVar: { key: string; value: any }) => {
    if (envVar.key) {
      parsedFile[envVar.key] = envVar.value;
      Env.set(envVar.key, envVar.value);
    }
  });
  writeFileSync(path, envfile.stringify(parsedFile));
}
