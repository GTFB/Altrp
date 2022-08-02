import Application from '@ioc:Adonis/Core/Application';

export default function app_path(path: string): string {
  path = '/app/' + path;
  return Application.makePath(path);
}
