import Input from "../elements/Input";
import RootElement from "../elements/RootElement";
import RootComponent from "../../components/RootComponent";
import HeadingElement from "../elements/Heading";
import HeadingWidget from '../../components/widgets/HeadingWidget';
import ButtonWidget from '../../components/widgets/ButtonWidget';
import Column from "../elements/Column";
import Section from "../elements/Section";
import SectionComponent from "../../components/SectionComponent";
import ColumnComponent from "../../components/ColumnComponent";
import Button from "../elements/Button";
import Text from "../elements/Text";
import Image from "../elements/Image";
import ImageWidget from '../../components/widgets/ImageWidget';
import TextWidget from '../../components/widgets/TextWidget';
import InputWidget from "../../components/widgets/InputWidget";


export default class ElementsManger {

  constructor(){
    this.elements = {};
    // this.elements[Input.getName()] = Input;
    //список элементов
    this.elements[RootElement.getName()] = RootElement;
    this.elements[HeadingElement.getName()] = HeadingElement;
    this.elements[Column.getName()] = Column;
    this.elements[Section.getName()] = Section;
    this.elements[Button.getName()] = Button;
    this.elements[Input.getName()] = Input;
    this.elements[Text.getName()] = Text;
    this.elements[Image.getName()] = Image;
    //список компонентов
    this.components = {};
    this.components[RootElement.getName()] = RootComponent;
    this.components[HeadingElement.getName()] = HeadingWidget;
    this.components[Section.getName()] = SectionComponent;
    this.components[Column.getName()] = ColumnComponent;
    this.components[Button.getName()] = ButtonWidget;
    this.components[Input.getName()] = InputWidget;
    this.components[Text.getName()] = TextWidget;
    this.components[Image.getName()] = ImageWidget;
  }

  getElements(){
    return this.elements;
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
        if(this.elements.hasOwnProperty(elementName)
            && this.elements[elementName].getType() === 'widget' ){
          this.widgetList.push(this.elements[elementName]);
        }
      }
    }
    return this.widgetList;
  }

  checkElementExists(elementName){
    return ! ! this.elements[elementName];
  }

}
