import BaseModule from "./BaseModule";
import Resource from "../Resource";
import {
  getEditor,
  getTemplateDataStorage,
  getTemplateId
} from "../../helpers";
import CONSTANTS from "../../consts";
import store from "../../store/store";
import { changeTemplateStatus } from "../../store/template-status/actions";
import { setTitle } from "../../../../../front-app/src/js/helpers";
import { setTemplateData } from "../../store/template-data/actions";
import ElementsFactory from "./ElementsFactory";
import {
  getSheet,
  stringifyStylesheet
} from "../../../../../front-app/src/js/helpers/elements";
import templateStylesModule from "./TemplateStylesModule";
import progressBar from "../../../../../admin/src/js/functions/progressBar";
import upgradeBackend from "../../../../../admin/src/js/functions/upgradeBackend";

class SaveImportModule extends BaseModule {
  constructor(modules) {
    super(modules);

    this.resource = new Resource({
      route: "/admin/ajax/templates"
    });
    this.globalStorageResource = new Resource({
      route: "/admin/ajax/global_styles"
    });
  }

  /**
   * Загружаем шаблон
   */
  load(getDataIfExits) {
    if (getDataIfExits && this.data) {
      setTitle(this.data.title);
      let data = JSON.parse(this.data.data);
      store.dispatch(setTemplateData(this.data));
      let templateDataStorage = getEditor().modules.templateDataStorage;
      templateDataStorage.setType(this.data.template_type);
      let parsedData = this.modules.elementsFactory.parseData(data);
      templateDataStorage.setTitle(this.data.title);
      templateDataStorage.replaceAll(parsedData);
      templateDataStorage.setName(this.data.name);
      getEditor().endLoading();
      store.dispatch(changeTemplateStatus(CONSTANTS.TEMPLATE_UPDATED));
      return
    }

    this.template_id = getTemplateId();

    store.dispatch(changeTemplateStatus(CONSTANTS.TEMPLATE_SAVING));
    if (this.template_id) {
      let res = this.resource
        .get(this.template_id)
        .then(templateData => {
          setTitle(templateData.title);
          let data = JSON.parse(templateData.data);
          this.data = templateData
          store.dispatch(setTemplateData(templateData));
          let templateDataStorage = getEditor().modules.templateDataStorage;
          templateDataStorage.setType(templateData.template_type);
          let parsedData = this.modules.elementsFactory.parseData(data);
          templateDataStorage.setTitle(templateData.title);
          templateDataStorage.replaceAll(parsedData);
          templateDataStorage.setName(templateData.name);
          getEditor().endLoading();
          store.dispatch(changeTemplateStatus(CONSTANTS.TEMPLATE_UPDATED));
        })
        .catch(err => {
          console.error(err);
          store.dispatch(changeTemplateStatus(CONSTANTS.TEMPLATE_UPDATED));
        });
    }
  }

  /**
   * Сохраняем шаблон
   */
  async saveTemplate() {

    let html_content = "";
    let stylesElements = [];
    let rootElement = null;
    if (window.altrpEditorContent.editorWindow.current) {
      rootElement = window.altrpEditorContent.editorWindow.current.getElementsByClassName(
        "sections-wrapper"
      )[0];
      if (rootElement) {
        html_content = rootElement.outerHTML;
        rootElement = rootElement.cloneNode(true);
      }
    }
    let templateData = getEditor().modules.templateDataStorage.getTemplateDataForSave();

    templateData.styles = await templateStylesModule.generateStyles();
    const pagesIds = (await(new Resource({route: `/admin/ajax/get-template-pages-ids/`}))
      .get(this.template_id)).data

    progressBar(0.001)
    try{
      await this.resource.post({
        ...templateData,
        type: "review",
        parent_template: this.template_id
      })
      await this.resource
        .put(this.template_id, templateData)
      store.dispatch(changeTemplateStatus(CONSTANTS.TEMPLATE_UPDATED));
      rootElement && rootElement.remove();
    }catch (e) {
      if(e instanceof Promise){
        e = await e
      }
      console.error(e);
      store.dispatch(changeTemplateStatus(CONSTANTS.TEMPLATE_UPDATED));
      rootElement && rootElement.remove();
      progressBar()
      try {
        e = JSON.stringify(e)
      }catch (e) {

      }
      alert(`template not saved
${e}`)
      return
    }
    if(pagesIds?.length){
      await upgradeBackend(['pages'], pagesIds)
    } else {
      progressBar(1)
    }
    progressBar(0)
  }

  /**
   * Сохраняем настройки корневого элемента в бд, таблица altrp_global_styles
   */
  async saveRootElementSettings() {
    const rootElement = getTemplateDataStorage().getRootElement();
    const title = rootElement.getSettings("settings_save_title");
    if (!title) {
      return {
        success: false,
        message: "Global Style Title"
      };
    }
    const data = rootElement.getSettings();
    return this.globalStorageResource.post({
      data,
      title
    });
  }

  /**
   * Импортируем глобальные настройки в настройки текущего шаблона
   * @return {Promise<{success: boolean, message: string}>}
   */
  async importGlobalSettings() {
    const rootElement = getTemplateDataStorage().getRootElement();
    const globalSettingId = rootElement.getSettings("settings_choose");
    const oldChoosePage = rootElement.getSettings("choose_page");
    if (!globalSettingId) {
      return {
        success: false,
        message: "Global Style not Selected"
      };
    }
    const globalStyle = (await this.globalStorageResource.get(globalSettingId))
      .data;

    _.set(globalStyle.data, "choose_page", oldChoosePage);
    rootElement.setSettings(globalStyle.data);
    rootElement.updateStyles();
    return {
      success: true
    };
  }
}

export default SaveImportModule;
