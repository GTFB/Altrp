import fs from 'fs';
/**
 * @return boolean
 */
export default function file_exists(file: string): boolean {
  return fs.existsSync(file);
}
