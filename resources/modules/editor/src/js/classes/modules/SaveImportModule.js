import BaseModule from "./BaseModule";
import Resource from "../Resource";
import {CONSTANTS, getEditor, getTemplateId} from "../../helpers";
import RootElement from "../elements/RootElement";
import store from "../../store/store";
import {changeTemplateStatus} from "../../store/template-status/actions";

class SaveImportModule extends BaseModule{

  constructor(modules){
    super(modules);

    this.resource = new Resource({
      route: '/admin/ajax/templates',
    });
  }

  load(){
    this.template_id = getTemplateId();
    // console.log(this.template_id);
    store.dispatch(changeTemplateStatus(CONSTANTS.TEMPLATE_SAVING));
    if(this.template_id){
      let res = this.resource.get(this.template_id).then(res => {
        if(res.ok === false){
          return Promise.reject(res.text(), res.status);
        }
        return res.json()
      }).then(templateData => {
        let data = JSON.parse(templateData.data);
        let parsedData = this.modules.elementsFabric.parseData(data);
        getEditor().modules.templateDataStorage.replaceAll(parsedData);
        getEditor().endLoading();
        getEditor().modules.templateDataStorage.title = data.title;
        getEditor().modules.templateDataStorage.name = data.name;
        store.dispatch(changeTemplateStatus(CONSTANTS.TEMPLATE_UPDATED));
      }).catch(err=>{
        console.error(err);
        store.dispatch(changeTemplateStatus(CONSTANTS.TEMPLATE_UPDATED));
      });
    } else {
      getEditor().modules.templateDataStorage.replaceAll(new RootElement());
      let templateData = getEditor().modules.templateDataStorage.getTemplateDataForSave();
      this.resource.post(templateData).then(res => {
        return res.json()
      }).then(res=>{
        let newId = res.id;
        console.log(newId);

        store.dispatch(changeTemplateStatus(CONSTANTS.TEMPLATE_UPDATED));
      }).catch(err=>{
        console.error(err);
        store.dispatch(changeTemplateStatus(CONSTANTS.TEMPLATE_UPDATED));
      });
    }
  }

  saveTemplate(){
    store.dispatch(changeTemplateStatus(CONSTANTS.TEMPLATE_SAVING));
    let templateData = getEditor().modules.templateDataStorage.getTemplateDataForSave();
    this.resource.put(this.template_id, templateData).then(res => {
      if(res.ok === false){
        return Promise.reject(res.text(), res.status);
      }
      return res.text()
    }).then(res=>{
      store.dispatch(changeTemplateStatus(CONSTANTS.TEMPLATE_UPDATED));
    }).catch(err=>{
      console.error(err);
      store.dispatch(changeTemplateStatus(CONSTANTS.TEMPLATE_UPDATED));
    });
  }

  /**
   * @param {any} templateId
   * */
  loadTemplateData(templateId) {

    const elementsFabric = this.modules.elementsFabric;
    const templateDataStorage = this.modules.templateDataStorage;

    this.resource.get().json(function (data) {

      let element = elementsFabric.parseData(data);
      switch (action) {
        case 'replace': {
          templateDataStorage.replaceAll(element);
        }
          break;
      }

    });

  }

}

export default SaveImportModule;