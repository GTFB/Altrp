import ElementsFabric from './modules/ElementsFabric';
import ElementClasses from "./modules/ElementClasses";
import SaveImportModule from "./modules/SaveImportModule";
import SettingsChangeModule from "./modules/SettingsChangeModule";
import TemplateSettingsChangeModule from "./modules/TemplateSettingsChangeModule";
import TemplateDataStorage from "./modules/TemplateDataStorage";
import Renderer from "./modules/Renderer";

class Modules {
  constructor(){
    this.elementsFabric = new ElementsFabric(this);
    this.elementClasses = new ElementClasses();
    this.saveImportModule = new SaveImportModule(this);
    this.settingsChangeModule = new SettingsChangeModule();
    this.templateSettingsChangeModule =new  TemplateSettingsChangeModule();
    this.templateDataStorage = new TemplateDataStorage();
    this.renderer = new Renderer();
    console.log(this.elementsFabric.parseData( {
      name: 'input',
      children: [
        {name: 'input',}
      ]
    } ));
  }
}
console.log(module.hot);
export default Modules;