import ElementsFactory from './modules/ElementsFactory';
import SaveImportModule from "./modules/SaveImportModule";
import SettingsChangeModule from "./modules/SettingsChangeModule";
import TemplateSettingsChangeModule from "./modules/TemplateSettingsChangeModule";
import TemplateDataStorage from "./modules/TemplateDataStorage";

class Modules {
  /**
   * @param {Editor} editor
   * */
  constructor(editor){
    this.elementsFactory = new ElementsFactory(this);
    this.saveImportModule = new SaveImportModule(this);
    window.saveImportModule = new SaveImportModule(this);
    this.settingsChangeModule = new SettingsChangeModule(this);
    this.templateSettingsChangeModule = new  TemplateSettingsChangeModule(this);
    this.templateDataStorage = new TemplateDataStorage(this);
  }
  loaded(){
    console.error('t');
    this.saveImportModule.load();
  }
}
export default Modules;
