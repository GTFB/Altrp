import app_path from "./app_path";

export default function plugins_path(path: string):string {
  path = `/AltrpPlugins/` + path
  return app_path(path) ;
}
