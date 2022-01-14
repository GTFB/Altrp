import Application from "@ioc:Adonis/Core/Application";

export default function app_path(path: string):string {
  path += '/app/'
  return Application.makePath(path) ;
}
