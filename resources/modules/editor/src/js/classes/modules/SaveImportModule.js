import BaseModule from "./BaseModule";
import Resource from "../Resource";
import {getEditor, getTemplateId} from "../../helpers";
import RootElement from "../elements/RootElement";

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
    if(this.template_id){
      this.resource.get(this.template_id).then(res => {
        return res.json()
      }).then(templateData => {
        console.log(templateData);
        let parsedData = this.modules.elementsFabric.parseData(templateData.template.data.children[0]);
        getEditor().modules.templateDataStorage.replaceAll(parsedData);
        getEditor().endLoading();
      }).catch(err=>{
        console.error(err);
      });
    } else {
      getEditor().modules.templateDataStorage.replaceAll(new RootElement());
      let templateData = getEditor().modules.templateDataStorage.getTemplateDataForSave();
      this.resource.post(templateData).then(res => {
        return res.json()
      }).then(res=>{
        console.log(res);
        let newId = res.id;

      });
    }
  }

  saveTemplate(){
    let templateData = getEditor().modules.templateDataStorage.getTemplateData();
    this.resource.put(this.template_id, templateData).then().then(res => {
      return res.json()
    }).then(res=>{
      console.log(res);
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