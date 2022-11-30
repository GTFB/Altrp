import Plugin from 'App/Plugin';
export default function getPlugin(dirName: string): Plugin | null{
const _m = dirName.match(/AltrpPlugins([\s\S]+?)(?=[\/\\])/)
  if(! _m){
    return null
  }
  let [,pluginName] =_m
  pluginName = pluginName.replace(/[\/\\]/g, '')
  return new Plugin({name: pluginName})
}
