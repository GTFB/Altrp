import { readFileSync,  } from 'fs';
import base_path from '../base_path';
import file_exists from "../file_exists";
import _ from "lodash";

export default function get_plugin_setting (
 key: string, _default?:any ,
) {
    //check for file exists
    if(!file_exists(base_path('pluginSettings.json'))){
      //create if not exist
      return _default || null
    }
    let settings = JSON.parse(readFileSync(base_path('pluginSettings.json'), 'utf8'));

    return _.get(settings, key, _default)
};
