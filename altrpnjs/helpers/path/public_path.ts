import Application from '@ioc:Adonis/Core/Application';

export default function public_path(path: string): string {
  return Application.publicPath(path);
}
