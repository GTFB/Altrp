import Application from "@ioc:Adonis/Core/Application";

export default function storage_path(path: string) {
  return Application.appRoot + path;
}
