(async function (){

  window.altrpHelpers = await import('./js/helpers');
  /**
   * Библиотека для работы с датами/временем
   * @type {{iconsManager?, recurseCount?, getConverter?, setTitle?, mbParseJSON?, getTopPosition?, getComponentByElementId?, elementsToPdf?, extractPathFromString?, parseOptionsFromSettings?, isEditor?, getObjectByPrefix?, isElementTopInViewport?, prepareContext?, getWindowWidth?, startOfWeek?, storeWidgetState?, prepareURLForEmail?, altrpRandomId?, getHTMLElementById?, getDataFromLocalStorage?, setDataByPath?, conditionsChecker?, dataToXLS?, isAltrpTestMode?, parseParamsFromString?, scrollbarWidth?, startOfYear?, altrpCompare?, parseURLTemplate?, sortOptions?, renderAssetIcon?, dataFromTable?, getWidgetState?, generateButtonsArray?, getDataByPath?, parseIDFromYoutubeURL?, redirect?, isValueMatchMask?, getResponsiveSetting?, printElements?, cutString?, getMediaSettingsByName?, getTimeValue?, isJSON?, delay?, CONDITIONS_OPTIONS?, getMediaQueryByName?, getCurrentStoreState?, altrpLogin?, renderAsset?, convertData?, clearEmptyProps?, replaceContentWithData?, dataToCSV?, renderIcon?, scrollToElement?, setAltrpIndex?, startOfMonth?, getRoutes?, validateEmail?, getCurrentBreakpoint?, renderFontLink?, altrpLogout?, saveDataToLocalStorage?, valueReplacement?, getAppContext?}|*}
   */
  let momentModule = (await import('moment'));
  window.altrpHelpers.moment = momentModule.default;
  await import('moment/locale/ru');
  window.altrpHelpers.momentModule = momentModule;
  window.altrpHelpers.moment.locale('ru');
  window.altrpHelpers.moment.updateLocale('ru', {
    week : {
      dow : 1,
    }
  });
})();
/**
 * Проверка на включение BVI
 */
(async function (){
  window.Cookies = (await import('js-cookie')).default;
  if(window.Cookies.get('bvi-theme')){
    const  loadVIPlugin =  (await import('./js/helpers/plugins')).loadVIPlugin;
    await loadVIPlugin(false);
    $.bvi();
  }
})();
/**
 * Запускаем обновление списка страниц
 */
(async function () {
  fetch
  const pageUpdater = (await import('./js/classes/modules/PageUpdater')).default;
  function updater(){
    pageUpdater.startUpdating();
    window.removeEventListener('render-altrp', updater);
  }
  window.addEventListener('render-altrp', replaceApp);
  window.addEventListener('render-altrp', updater);
})();
/**
 * Смена Разрешения
 */
(async function (){
  const  setCurrentScreen =  (await import('./js/store/media-screen-storage/actions')).setCurrentScreen;
  const  CONSTANTS =  (await import('../../editor/src/js/consts')).default;
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
