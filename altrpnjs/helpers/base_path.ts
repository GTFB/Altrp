import Application from "@ioc:Adonis/Core/Application";

export default function base_path(path: string) {
  return Application.makePath(path) ;
}
