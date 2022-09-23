import execa from 'execa'
import isProd from "../../helpers/isProd";
import base_path from "../../helpers/path/base_path";
import fs from "fs";
import path from "path";

export default class AltrpEvent {
  public async listener({ type, data }) {

    const dir = base_path(`app/altrp-listeners/${type}`);

    if(isProd()) {
      Object.keys(require.cache).forEach(function(key) { delete require.cache[key] })
    }

    if(!fs.existsSync(dir)) {
      return
    }

    const files = fs.readdirSync(dir);

    for (const filename of files) {
      let func;

      try {
        if(!isProd()) {
          func = (await import(path.join(dir, filename))).default;
        } else {
          func = require(path.join(dir, filename)).default;
        }

        await func(data)
      } catch (e) {
        console.error(e)
      }
    }


    // if (fs.existsSync(dir) && fs.existsSync(file)){
    //   import(file).then((r) => {
    //     r.default(type, data)
    //   })
    // }

    const [_namespace, modelName, eventType] = type.split('.')

    const before = eventType.indexOf('before') === 0
    const actionType = eventType.replace('after', '').replace('before', '').toLowerCase()

    await execa.node('ace', ['hook:crud', modelName, actionType, data.id], {
      before,
    })
  }
}
