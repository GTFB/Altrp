import isProd from '../../helpers/isProd';
import base_path from '../../helpers/path/base_path';
import fs from 'fs';
import path from 'path';

export default class AltrpEvent {
  public async listener({ type, data }) {
    const dir = base_path(`app/altrp-listeners/${type}`);

    if (isProd()) {
      Object.keys(require.cache).forEach(function (key) {
        delete require.cache[key];
      });
    }

    if (!fs.existsSync(dir)) {
      return;
    }

    const files = fs.readdirSync(dir);

    for (const filename of files) {
      let func;

      try {
        if (!isProd()) {
          func = (await import(path.join(dir, filename))).default;
        } else {
          func = require(path.join(dir, filename)).default;
        }

        await func(data);
      } catch (e) {
        console.log(e);
      }
    }

    // if (fs.existsSync(dir) && fs.existsSync(file)){
    //   import(file).then((r) => {
    //     r.default(type, data)
    //   })
    // }
  }
}
