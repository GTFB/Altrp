export default async function loadPluginsHelpers(){
  if(window.altrpPlugins){
    return
  }
  window.altrpPlugins = {}
  await import(/* webpackChunkName: 'loadFrontAppHooks' */'./loadFrontAppHooks')
}
