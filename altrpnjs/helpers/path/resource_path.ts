import Application from '@ioc:Adonis/Core/Application';

export default function resource_path(path: string): string {
  return Application.resourcesPath(path);
}
