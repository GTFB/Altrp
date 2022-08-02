import { readFileSync } from 'fs';
import * as envfile from 'envfile';
import base_path from './path/base_path';
import Logger from '@ioc:Adonis/Core/Logger';

export default function envFromFile() {
  const path = base_path('/.env');
  try {
  } catch (e) {
    Logger.error(e);
    return;
  }
  let data = readFileSync(path, { encoding: 'utf8' });

  const parsedFile = envfile.parse(data);

  return parsedFile;
}
