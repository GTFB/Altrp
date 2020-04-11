import RootComponent from "../components/RootComponent";
import HeadingWidget from "../components/widgets/HeadingWidget";
import SectionComponent from "../components/SectionComponent";
import ColumnComponent from "../components/ColumnComponent";

export default class FrontElementsManager {

  constructor(){
    //список компонентов
    this.components = {};
    this.components['root-element'] = RootComponent;
    this.components['heading'] = HeadingWidget;
    this.components['section'] = SectionComponent;
    this.components['column'] = ColumnComponent;
  }

  getComponentClass(name){
    if(! this.components[name] ){
      throw 'Не найден компонент с именем ' + name;
    }
    return this.components[name];
  }

}
window.frontElementsManager = new FrontElementsManager();

