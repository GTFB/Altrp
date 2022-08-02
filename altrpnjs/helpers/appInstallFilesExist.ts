/**
 * Check if the app's installation files exist
 *
 * @return bool
 */
import base_path from './path/base_path';
import file_exists from './file_exists';
import storage_path from './storage_path';

export default function appInstallFilesExist(): boolean {
  // Check if the '.env' and 'storage/installed' files exist

  return file_exists(base_path('.env')) && file_exists(storage_path('installed'));
}
