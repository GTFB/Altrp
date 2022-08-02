import { readFileSync, writeFileSync } from 'fs';
import base_path from '../path/base_path';
import file_exists from '../file_exists';

export default function set_plugin_setting(envVariables: { key: string; value: any }[]) {
  //check for file exists
  if (!file_exists(base_path('pluginSettings.json'))) {
    //create if not exist
    writeFileSync(base_path('pluginSettings.json'), '{}');
  }
  // read file and make object
  let settings = JSON.parse(readFileSync(base_path('pluginSettings.json'), 'utf8'));
  // edit or add property
  envVariables.forEach((envVar: { key: string; value: any }) => {
    if (envVar.key) {
      settings[envVar.key] = envVar.value;
    }
  });
  //write file
  writeFileSync(base_path('pluginSettings.json'), JSON.stringify(settings));
}
