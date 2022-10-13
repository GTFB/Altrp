// import isProd from "../../helpers/isProd";
import Application from "@ioc:Adonis/Core/Application";
import Customizer from 'App/Models/Customizer'
// import fs from "fs";
// import path from "path";

export default class AltrpEvent {
  public async listener({ type, data }) {
    const [_namespace, modelName, eventType] = type.split('.')

    const hookType = eventType.indexOf('before') === 0 ? 'before' : 'after'
    let actionType = eventType.replace('after', '').replace('before', '').toLowerCase()

    if (actionType === 'find') {
      actionType = 'read'
    }

    if (['create', 'read', 'update', 'delete'].includes(actionType)) {
      console.log(Application.environment);

      let customizers = await Customizer.query()
        .preload('altrp_model', modelQuery => {
          modelQuery.where('name', modelName)
        })
        .where('type', 'crud')

      customizers = customizers.filter(
        customizer => customizer.settings.event_type === actionType
          && customizer.settings.event_hook_type === hookType
      )

      for (let customizer of customizers) {
        customizer.callCrud(data.id)
      }
    }

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
