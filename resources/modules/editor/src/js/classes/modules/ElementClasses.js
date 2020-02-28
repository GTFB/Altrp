import Input from "../elements/Input";
import RootElement from "../elements/RootElement";
import RootComponent from "../../components/RootComponent";


class ElementClasses {

  constructor(){
    this.elements = {};
    // this.elements[Input.getName()] = Input;
    this.elements[RootElement.getName()] = RootElement;
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

}

window.elementClasses = new ElementClasses();
