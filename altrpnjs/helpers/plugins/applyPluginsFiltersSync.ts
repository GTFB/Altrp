import Plugin from 'App/Plugin';
import fs from 'fs';
import app_path from '../path/app_path';
import _ from 'lodash'

export default function applyPluginsFiltersAsync(type: string, content, ...params) {

  const base = `AltrpPlugins`

  let hooks:any= []

  const plugins = Plugin.getEnabledPlugins()
  for (const plugin of plugins) {
    const hasType = fs.existsSync(app_path(`${base}/${plugin.name}/hooks/sync/${type}`));
    if (hasType) {
      const hookNames = fs.readdirSync(app_path(`${base}/${plugin.name}/hooks/sync/${type}`))
      for (const hookName of hookNames) {
        const filePath = app_path(`${base}/${plugin.name}/hooks/sync/${type}/${hookName}`)
        try {
          const hook = (require(filePath)).default
          hooks.push({
            fn:hook,
            plugin,
            hookName
          })
        } catch (e) {
          console.error(e);
        }
      }
    }
  }

  hooks = _.sortBy(hooks,[
    hook=>{
      return parseInt(hook.hookName)
    },
    hook=>{
      return hook.hookName
    },])
  for(const hook of hooks){
    try{
      content = hook.fn.bind(hook.plugin)(content, ...params,)
    } catch (e) {
      console.error(e);
    }
  }
  return content
}
