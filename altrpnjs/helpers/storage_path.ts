import Application from '@ioc:Adonis/Core/Application';
import _path from 'path';

export default function storage_path(path: string) {
  if (!path) {
    return Application.makePath('storage');
  }
  path = 'storage' + _path.sep + path;
  return Application.makePath(path);
}
