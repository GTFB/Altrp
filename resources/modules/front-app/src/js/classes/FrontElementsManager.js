import RootComponent from "../../../../editor/src/js/components/RootComponent";
import HeadingWidget from "../../../../editor/src/js/components/widgets/HeadingWidget";
import SectionComponent from "../../../../editor/src/js/components/SectionComponent";
import ColumnComponent from "../../../../editor/src/js/components/ColumnComponent";
import InputWidget from "../../../../editor/src/js/components/widgets/InputWidget";
import ButtonWidget from "../../../../editor/src/js/components/widgets/ButtonWidget";
import TextWidget from "../../../../editor/src/js/components/widgets/TextWidget";
import ImageWidget from "../../../../editor/src/js/components/widgets/ImageWidget";
import TableWidget from "../../../../editor/src/js/components/widgets/TableWidget";

export default class FrontElementsManager {

  constructor(){
    //список компонентов
    this.components = {};
    this.components['root-element'] = RootComponent;
    this.components['heading'] = HeadingWidget;
    this.components['section'] = SectionComponent;
    this.components['column'] = ColumnComponent;
    this.components['input'] = InputWidget;
    this.components['button'] = ButtonWidget;
    this.components['text'] = TextWidget;
    this.components['image'] = ImageWidget;
    this.components['table'] = TableWidget;
  }

  getComponentClass(name){
    if(! this.components[name] ){
      throw 'Не найден компонент с именем ' + name;
    }
    return this.components[name];
  }

  checkElementExists(elementName){
    return ! ! this.components[elementName];
  }
}
window.frontElementsManager = new FrontElementsManager();

