import Input from "../elements/Input";
import RootElement from "../elements/RootElement";
import RootComponent from "../../components/RootComponent";
import Heading from "../elements/Heading";


class ElementClasses {

  constructor(){
    this.elements = {};
    // this.elements[Input.getName()] = Input;
    //список элементов
    this.elements[RootElement.getName()] = RootElement;
    this.elements[Heading.getName()] = Heading;
    //список компонентов
    this.components = {};
    this.components[RootElement.getName()] = RootComponent;
  }

  getElementClass(name){
    if(! this.elements[name] ){
      throw 'Не найден элемент с именем ' + name;
    }
    return this.elements[name];
  }

  getComponentClass(name){
    if(! this.components[name] ){
      throw 'Не найден компонент с именем ' + name;
    }
    return this.components[name];
  }

  getWidgetsList(){
    if(! this.widgetList){
      this.widgetList = [];
      for(let elementName in this.elements){
        console.log(this.elements[elementName]);
        if(this.elements.hasOwnProperty(elementName)
            && this.elements[elementName].getType() === 'widget' ){
          this.widgetList.push(this.elements[elementName]);
        }
      }
    }
    return this.widgetList;
  }

}

window.elementClasses = new ElementClasses();
