import Application from "@ioc:Adonis/Core/Application";
import _path from "path"

export default function storage_path(path: string) {
  path = 'storage' + _path.sep + path
  return Application.makePath(path);
}
