import Application from "@ioc:Adonis/Core/Application";

export default function storage_path(path: string):string {
  path = '/storage/' + path
  return Application.makePath(path) ;
}
