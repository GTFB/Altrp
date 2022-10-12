// import isProd from "../../helpers/isProd";
// import fs from "fs";
// import path from "path";

export default class AltrpEvent {
  public async listener({  }) {
    // const [_namespace, modelName, eventType] = type.split('.')
    //
    //
    // let actionType = eventType.replace('after', '').replace('before', '').toLowerCase()
    //
    // if (actionType === 'find') {
    //   actionType = 'read'
    // }
    //
    // if (['create', 'read', 'update', 'delete'].includes(actionType)) {
    //   // console.trace(`new crud: ${modelName} ${before ? 'before' : 'after'} ${actionType} ${data.id}`)
    //   // console.log(Application.environment);
    //
    //
    //   // exec(`node ${base_path('ace')} customizer:crud ${modelName} ${actionType} ${data.id} ${before ? '--before' : ''}`).then((data) => {
    //   //   console.log(data);
    //   // })
    // }

    // const dir = base_path(`app/altrp-listeners/${type}`);
    //
    // if(isProd()) {
    //   Object.keys(require.cache).forEach(function(key) { delete require.cache[key] })
    // }
    //
    // if(!fs.existsSync(dir)) {
    //   return
    // }
    //
    // const files = fs.readdirSync(dir);
    //
    // for (const filename of files) {
    //   let func;
    //
    //   try {
    //     if(!isProd()) {
    //       func = (await import(path.join(dir, filename))).default;
    //     } else {
    //       func = require(path.join(dir, filename)).default;
    //     }
    //
    //     await func(data)
    //   } catch (e) {
    //     console.error(e)
    //   }
    // }


    // if (fs.existsSync(dir) && fs.existsSync(file)){
    //   import(file).then((r) => {
    //     r.default(type, data)
    //   })
    // }
  }
}
