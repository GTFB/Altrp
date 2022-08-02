import Application from '@ioc:Adonis/Core/Application';

export default function base_path(path: string = ''): string {
  return Application.makePath(path);
}
