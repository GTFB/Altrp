import BaseModule from "./BaseModule";
import Resource from "../Resource";
import {getEditor, getTemplateDataStorage, getTemplateId} from "../../helpers";
import CONSTANTS from "../../consts";
import RootElement from "../elements/RootElement";
import store from "../../store/store";
import {changeTemplateStatus} from "../../store/template-status/actions";
import {setTitle} from "../../../../../front-app/src/js/helpers";
import {setTemplateData} from "../../store/template-data/actions";

class SaveImportModule extends BaseModule{

  constructor(modules){
    super(modules);

    this.resource = new Resource({
      route: '/admin/ajax/templates',
    });
    this.globalStorageResource = new Resource({
      route: '/admin/ajax/global_styles',
    });
  }

  /**
   * Загружаем шаблон
   */
  load(){
    this.template_id = getTemplateId();
    // console.log(this.template_id);
    store.dispatch(changeTemplateStatus(CONSTANTS.TEMPLATE_SAVING));
    if(this.template_id){
      let res = this.resource.get(this.template_id).then(templateData => {
        setTitle(templateData.title);
        let data = JSON.parse(templateData.data);
        store.dispatch(setTemplateData(templateData));
        let parsedData = this.modules.elementsFactory.parseData(data);
        let templateDataStorage = getEditor().modules.templateDataStorage;
        templateDataStorage.replaceAll(parsedData);
        templateDataStorage.setTitle(templateData.title);
        templateDataStorage.setName(templateData.name);
        getEditor().endLoading();
        store.dispatch(changeTemplateStatus(CONSTANTS.TEMPLATE_UPDATED));
      }).catch(err=>{
        console.error(err);
        store.dispatch(changeTemplateStatus(CONSTANTS.TEMPLATE_UPDATED));
      });
    } else {

    }
  }

  /**
   * Сохраняем шаблон
   */
  saveTemplate(){
    store.dispatch(changeTemplateStatus(CONSTANTS.TEMPLATE_SAVING));
    let templateData = getEditor().modules.templateDataStorage.getTemplateDataForSave();
    this.resource.put(this.template_id, templateData).then(res=>{
      store.dispatch(changeTemplateStatus(CONSTANTS.TEMPLATE_UPDATED));
    }).catch(err=>{
      console.error(err);
      store.dispatch(changeTemplateStatus(CONSTANTS.TEMPLATE_UPDATED));
    });
  }

  /**
   * Сохраняем настройки корневого элемента в бд, таблица altrp_global_styles
   */
  async saveRootElementSettings(){
    const rootElement = getTemplateDataStorage().getRootElement();
    const title = rootElement.getSettings('settings_save_title');
    if(! title){
      return {
        success: false,
        message: 'Global Style Title'
      };
    }
    const data = rootElement.getSettings();
    return this.globalStorageResource.post({
      data,
      title,
    });
  }

  /**
   * Импортируем глобальные настройки в настройки текущего шаблона
   * @return {Promise<{success: boolean, message: string}>}
   */
  async importGlobalSettings(){
    const rootElement = getTemplateDataStorage().getRootElement();
    const globalSettingId = rootElement.getSettings('settings_choose');
    const oldChoosePage = rootElement.getSettings('choose_page');
    if(! globalSettingId){
      return {
        success: false,
        message: 'Global Style not Selected'
      };
    }
    const data = this.globalStorageResource.get(globalSettingId);
    _.set(data, 'choose_page', oldChoosePage);
    rootElement.setSettings(data);
  }
}

export default SaveImportModule;