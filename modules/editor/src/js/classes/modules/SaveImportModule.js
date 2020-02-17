import BaseModule from "./BaseModule";

class SaveImportModule extends BaseModule{
  /**
   * @param {Resource} resource
   * @param {string} action
   * */
  loadTemplateData(resource, action) {

    const elementsFabric = this.modules.elementsFabric;
    const templateDataStorage = this.modules.templateDataStorage;

    resource.get().json(function (data) {

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