/**
 * Get the app latest version
 *
 * @return \Illuminate\Config\Repository|mixed|string
 */
import checkAndUseSemVer from './checkAndUseSemVer';
import config from './config';

export default function getLatestVersion() {
  return checkAndUseSemVer(config('app.altrp_version'));
}
