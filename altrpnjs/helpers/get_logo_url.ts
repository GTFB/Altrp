import env from './env';
import mbParseJSON from './mbParseJSON';
import data_get from './data_get';

export default function get_logo_url() {
  return data_get(mbParseJSON(env('ALTRP_SETTING_ADMIN_LOGO'), {}), 'url', '');
}
