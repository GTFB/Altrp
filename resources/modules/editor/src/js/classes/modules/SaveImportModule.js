import BaseModule from "./BaseModule";
import Resource from "../Resource";
import {getEditor, getTemplateId} from "../../helpers";
import RootElement from "../elements/RootElement";

class SaveImportModule extends BaseModule{

  constructor(modules){
    super(modules);

    this.resource = new Resource({
      get: '/admin/ajax/template/{id}',
      create: '/admin/ajax/templates/create',
      update: '/admin/ajax/templates/update/{id}',
    });
  }

  load(){
    this.template_id = getTemplateId();
    // console.log(this.template_id);
    if(this.template_id){
      this.resource.get(this.template_id).then(res => {
        return res.json()
      }).then(templateData => {
        let parsedData = this.modules.elementsFabric.parseData(templateData.template.data.children[0]);
        console.log(parsedData);
        getEditor().endLoading();
      });
    } else {
      getEditor().modules.templateDataStorage.replaceAll(new RootElement());
      let templateData = getEditor().modules.templateDataStorage.getTemplateData();
      console.log(templateData);
      // this.resource.create()
    }
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