
/**
 * Проверка на включение BVI
 */
(async function (){
  console.log(window.Cookies);
  if(window.Cookies.get('bvi-theme')){
    const  loadVIPlugin =  (await import(/* webpackChunkName: 'altrp-js-plugins' */'./js/helpers/plugins')).loadVIPlugin;
    await loadVIPlugin(false);
    $.bvi();
  }
})();
/**
 * Запускаем обновление списка страниц
 */
(async function () {

  // const pageUpdater = (await import('./js/classes/modules/PageUpdater')).default;
  // function updater(){
  //   pageUpdater.startUpdating();
  //   window.removeEventListener('render-altrp', updater);
  // }
  window.addEventListener('render-altrp', replaceApp);
  // window.addEventListener('render-altrp', updater);
})();
/**
 * Смена Разрешения
 */
(async function (){
  const  setCurrentScreen =  (await import(/* webpackChunkName: 'media-screen-storage-actions' */'./js/store/media-screen-storage/actions')).setCurrentScreen;
  const  CONSTANTS =  (await import(/* webpackChunkName: 'CONSTANTS' */'../../editor/src/js/consts')).default;
  window.CONSTANTS = CONSTANTS;
  window.addEventListener('resize', e=>{
    const {currentMediaScreen} = appStore.getState();
    const changedScreen = CONSTANTS.SCREENS.find(screen=>{
      if(! screen.fullMediaQuery){
        return false;
      }
      let query = screen.fullMediaQuery;
      query = query.replace('@media', '');
      return window.matchMedia(query).matches;
    }) || CONSTANTS.SCREENS[0];
    if(currentMediaScreen !== changedScreen){
      appStore.dispatch(setCurrentScreen(changedScreen));
    }
  });
})();

function replaceApp(){
  if(! document.getElementById('front-app-server')){
    console.error(document.getElementById('front-app-server'));
    return;
  }
  const appElement = document.getElementById('front-app');
  const appServer = document.getElementById('front-app-server');
  appServer.remove();
  appElement.removeAttribute('style');
  window.removeEventListener('render-altrp', replaceApp);
}
