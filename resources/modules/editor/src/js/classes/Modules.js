import ElementsFabric from './modules/ElementsFabric';
import SaveImportModule from "./modules/SaveImportModule";
import SettingsChangeModule from "./modules/SettingsChangeModule";
import TemplateSettingsChangeModule from "./modules/TemplateSettingsChangeModule";
import TemplateDataStorage from "./modules/TemplateDataStorage";
import Renderer from "./modules/Renderer";

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
    this.renderer = new Renderer(editor);
    this.loaded();
  }
  loaded(){
    this.saveImportModule.load();
    this.templateDataStorage.load();
  }
}
export default Modules;