import Input from "../elements/Input";
import RootElement from "../elements/RootElement";


class ElementClasses {

  constructor(){
    this.elements = {};
    this.elements[Input.getName()] = Input;
    this.elements[RootElement.getName()] = RootElement;
  }

  getElementClass(name){
    if(! this.elements[name] ){
      throw 'Не найден элемент с именем ' + name;
    }
    return this.elements[name];
  }

}
export default ElementClasses;