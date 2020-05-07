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
      let res = this.resource.get(this.template_id).then(templateData => {
        let data = JSON.parse(templateData.data);
        let parsedData = this.modules.elementsFactory.parseData(data);
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

    }
  }

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

}

export default SaveImportModule;