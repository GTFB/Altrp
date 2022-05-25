import { combineReducers } from "redux";
import { currentElementReducer } from "./current-element/reducers";
import { templateStatusReducer } from "./template-status/reducers";
import { elementDragReducer } from "./element-drag/reducers";
import { assetsSettingsReducer } from "./assets-browser/reducers";
import { currentElementContextReducer } from "./current-context-element/reducers";
import { dynamicContentReducer } from "./dynamic-content/reducers";
import { controllerReducer } from "./controller-value/reducers";
import { settingSectionMenuReducer } from "./setting-section/reducers";
import { currentTabReducer } from "./active-settings-tab/reducers";
import { currentStateReducer } from "./state-section/reducers";
import { currentScreenReducer } from "./responsive-switcher/reducers";
import { historyStoreReducer } from "./history-store/reducers";
import { currentModelReducer } from "../../../../front-app/src/js/store/current-model/reducers";
import { templateDataReducer } from "./template-data/reducers";
import { currentUserReducer } from "../../../../front-app/src/js/store/current-user/reducers";
import { currentDataStorageReducer } from "../../../../front-app/src/js/store/current-data-storage/reducers";
import { elementsStorageReducer } from "../../../../front-app/src/js/store/elements-storage/reducers";
import { hideTriggersReducer } from "../../../../front-app/src/js/store/hide-triggers/reducers";
import { elementReducer } from "./altrp-dashboard/reducers";
import { altrpMetaReducer } from "../../../../front-app/src/js/store/altrp-meta-storage/reducers";
import { altrpPageStateReducer } from "../../../../front-app/src/js/store/altrp-page-state-storage/reducers";
import { fontsReducer } from "../../../../front-app/src/js/store/fonts-storage/reducers";
import { exportDashboard } from "../../../../front-app/src/js/store/altrp-dashboard-export/reducers";
import { mediaScreenReducer } from "../../../../front-app/src/js/store/media-screen-storage/reducers";
import { editorMetasReducer } from "./editor-metas/reducers";
import { currentPageReducer } from "../../../../front-app/src/js/store/current-page/reducers";
import { globalStyleReducer } from "./altrp-global-colors/reducers";
import {menusReducer} from "../../../../front-app/src/js/store/menus-storage/reducers";
import {elementsSettingsReducer} from "../../../../front-app/src/js/store/elements-settings/reducers";
import {globalStylesPresetsReducer} from "./altrp-global-styles/reducers";
import { widgetsReducer } from "./widgets/reducers";
import {globalStylesCssReducer} from "./global-css-editor/reducers";
import {editorStateReducer} from "./editor-state/reducers";

export default combineReducers({
  currentElement: currentElementReducer,
  currentContextElement: currentElementContextReducer,
  templateStatus: templateStatusReducer,
  elementDrag: elementDragReducer,
  assetsManagerSettings: assetsSettingsReducer,
  dynamicContentState: dynamicContentReducer,
  controllerValue: controllerReducer,
  settingSectionMenu: settingSectionMenuReducer,
  currentTab: currentTabReducer,
  currentState: currentStateReducer,
  currentScreen: currentScreenReducer,
  currentModel: currentModelReducer,
  templateData: templateDataReducer,
  currentUser: currentUserReducer,
  currentDataStorage: currentDataStorageReducer,
  elements: elementsStorageReducer,
  hideTriggers: hideTriggersReducer,
  editElement: elementReducer,
  altrpMeta: altrpMetaReducer,
  altrpPageState: altrpPageStateReducer,
  altrpFonts: fontsReducer,
  historyStore: historyStoreReducer,
  exportDashboard: exportDashboard,
  currentMediaScreen: mediaScreenReducer,
  editorMetas: editorMetasReducer,
  altrpPage: currentPageReducer,
  globalStyles: globalStyleReducer,
  globalStylesPresets: globalStylesPresetsReducer,
  globalStylesCssEditor: globalStylesCssReducer,
  altrpMenus: menusReducer,
  elementsSettings: elementsSettingsReducer,
  editorState: editorStateReducer,
  widgetsManager: widgetsReducer
});
