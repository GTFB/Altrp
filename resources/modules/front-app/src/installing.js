import ElementWrapper from "./js/components/ElementWrapper";
import { window } from "global";
import frontDecorate from "./js/decorators/front-element-component";
import CONSTANTS from "../../editor/src/js/consts";
import { setCurrentScreen } from "./js/store/media-screen-storage/actions";
import { loadVIPlugin } from "./js/helpers/plugins";
if (window) {
  /**
   * Elements Wrapper
   * */
  window.ElementWrapper = ElementWrapper;

  /**
   * Elements Decorator for Front/Editor
   * */

  window.elementDecorator = frontDecorate;
  (async function() {
    /**
     * Менеджер форм загружаем ассинхронно
     */
    await import("../../editor/src/js/classes/modules/FormsManager.js");

    window.altrpHelpers = await import("./js/helpers");
    /**
     * Библиотека для работы с датами/временем
     * @type {{iconsManager?, recurseCount?, getConverter?, setTitle?, mbParseJSON?, getTopPosition?, getComponentByElementId?, elementsToPdf?, extractPathFromString?, parseOptionsFromSettings?, isEditor?, getObjectByPrefix?, isElementTopInViewport?, prepareContext?, getWindowWidth?, startOfWeek?, storeWidgetState?, prepareURLForEmail?, altrpRandomId?, getHTMLElementById?, getDataFromLocalStorage?, setDataByPath?, conditionsChecker?, dataToXLS?, isAltrpTestMode?, parseParamsFromString?, scrollbarWidth?, startOfYear?, altrpCompare?, parseURLTemplate?, sortOptions?, renderAssetIcon?, dataFromTable?, getWidgetState?, generateButtonsArray?, getDataByPath?, parseIDFromYoutubeURL?, redirect?, isValueMatchMask?, getResponsiveSetting?, printElements?, cutString?, getMediaSettingsByName?, getTimeValue?, isJSON?, delay?, CONDITIONS_OPTIONS?, getMediaQueryByName?, getCurrentStoreState?, altrpLogin?, renderAsset?, convertData?, clearEmptyProps?, replaceContentWithData?, dataToCSV?, renderIcon?, scrollToElement?, setAltrpIndex?, startOfMonth?, getRoutes?, validateEmail?, getCurrentBreakpoint?, renderFontLink?, altrpLogout?, saveDataToLocalStorage?, valueReplacement?, getAppContext?}|*}
     */
    window.altrpHelpers.moment = (await import("moment")).default;
    await import("moment/locale/ru");
    window.altrpHelpers.momentModule = await import("moment");
    window.altrpHelpers.moment.locale("ru");
    window.altrpHelpers.moment.updateLocale("ru", {
      week: {
        dow: 1
      }
    });
    /**
     * Проверка на включение BVI
     */
    window.Cookies = (await import("js-cookie")).default;
    if (window.Cookies.get("bvi-theme")) {
      await loadVIPlugin(false);
      $.bvi();
    }
  })();
  window.addEventListener("resize", e => {
    const { currentMediaScreen } = appStore.getState();
    const changedScreen =
      CONSTANTS.SCREENS.find(screen => {
        if (!screen.fullMediaQuery) {
          return false;
        }
        let query = screen.fullMediaQuery;
        query = query.replace("@media", "");
        return window.matchMedia(query).matches;
      }) || CONSTANTS.SCREENS[0];
    if (currentMediaScreen !== changedScreen) {
      appStore.dispatch(setCurrentScreen(changedScreen));
    }
  });
}
