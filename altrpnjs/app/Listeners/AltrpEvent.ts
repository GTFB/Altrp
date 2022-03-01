import isProd from "../../helpers/isProd";
import base_path from "../../helpers/base_path";
import fs from "fs";
import ListenerGenerator from "App/Generators/ListenerGenerator";

export default class AltrpEvent {
  public listener({ type, data }) {
    type = type.replace(/\s/g, '').split(":");

    const dir = base_path(`app/altrp-listeners/${type[1]}`);

    if(isProd()) {
      require.cache = {}
    }

    const file = dir + "/" + type[2] + ListenerGenerator.ext;

    if (fs.existsSync(dir) && fs.existsSync(file)){
      import(file).then((r) => {
        r.default(type, data)
      })
    }
  }
}
