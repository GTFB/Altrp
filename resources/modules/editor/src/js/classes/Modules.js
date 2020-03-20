import ElementsFabric from './modules/ElementsFabric';
import SaveImportModule from "./modules/SaveImportModule";
import SettingsChangeModule from "./modules/SettingsChangeModule";
import TemplateSettingsChangeModule from "./modules/TemplateSettingsChangeModule";
import TemplateDataStorage from "./modules/TemplateDataStorage";

class Modules {
  /**
   * @param {Editor} editor
   * */
  constructor(editor){
    this.elementsFabric = new ElementsFabric(this);
    this.saveImportModule = new SaveImportModule(this);
    this.settingsChangeModule = new SettingsChangeModule(this);
    this.templateSettingsChangeModule = new  TemplateSettingsChangeModule(this);
    this.templateDataStorage = new TemplateDataStorage(this);
  }
  loaded(){
    this.saveImportModule.load();
  }
}
export default Modules;