import { readFileSync } from 'fs';
import base_path from './path/base_path';
import file_exists from './file_exists';

export default function readPluginSetting(key: any) {
  if (!file_exists(base_path('pluginSettings.json'))) {
    return '';
  }
  let settings = JSON.parse(readFileSync(base_path('pluginSettings.json'), 'utf8'));
  return settings[key];
}
