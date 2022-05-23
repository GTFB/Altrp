import { combineReducers } from "redux";
import { appRoutesReducer } from "./routes/reducers";
import { currentModelReducer } from "./current-model/reducers";
import { formsStoreReducer } from "./forms-data-storage/reducers";
import { currentUserReducer } from "./current-user/reducers";
import { currentDataStorageReducer } from "./current-data-storage/reducers";
import { scrollReducer } from "./scroll-position/reducers";
import { popupReducer } from "./popup-trigger/reducers";
import { elementsStorageReducer } from "./elements-storage/reducers";
import { hideTriggersReducer } from "./hide-triggers/reducers";
import { responsesStorageReducer } from "./responses-storage/reducers";
import { elementReducer } from "../../../../editor/src/js/store/altrp-dashboard/reducers";
import { altrpMetaReducer } from "./altrp-meta-storage/reducers";
import { altrpPageStateReducer } from "./altrp-page-state-storage/reducers";
import { fontsReducer } from "./fonts-storage/reducers";
import { changeLocalStorageReducer } from "./user-local-storage/reducers";
import { exportDashboard } from "./altrp-dashboard-export/reducers";
import { mediaScreenReducer } from "./media-screen-storage/reducers";
import { currentTitleReducer } from "./current-title/reducers";
import { currentEmailTemplateReducer } from "./current-email-template/reducers";
import { currentPageReducer } from "./current-page/reducers";
import {menusReducer} from "./menus-storage/reducers";
import {elementsSettingsReducer} from "./elements-settings/reducers";
import {areasReducer} from "./areas/reducers";
import {lightboxImagesReducer} from "./ligtbox-images-storage/reducers";
import {frontElementsReducer} from "./front-elements-store/reducers";
import {elementTableReducer} from "./element-table/reducers";

export default combineReducers({
  appRoutes: appRoutesReducer,
  currentModel: currentModelReducer,
  formsStore: formsStoreReducer,
  currentUser: currentUserReducer,
  currentDataStorage: currentDataStorageReducer,
  scrollPosition: scrollReducer,
  popupTrigger: popupReducer,
  elements: elementsStorageReducer,
  hideTriggers: hideTriggersReducer,
  altrpresponses: responsesStorageReducer,
  editElement: elementReducer,
  altrpMeta: altrpMetaReducer,
  altrpPageState: altrpPageStateReducer,
  altrpFonts: fontsReducer,
  userLocalStorage: changeLocalStorageReducer,
  exportDashboard: exportDashboard,
  currentScreen: mediaScreenReducer,
  currentTitle: currentTitleReducer,
  currentEmailTemplate: currentEmailTemplateReducer,
  altrpPage: currentPageReducer,
  altrpMenus: menusReducer,
  elementsSettings: elementsSettingsReducer,
  areas: areasReducer,
  lightboxImages: lightboxImagesReducer,
  frontElementsState: frontElementsReducer,
  elementTableState: elementTableReducer
});
