import React, {Component} from "react";
import { Menu, Item, Separator } from "react-contexify";

import "react-contexify/scss/main.scss";
import {connect} from "react-redux";
import Column from "../classes/elements/Column";
import {getFactory,} from "../helpers";
import {getDataFromLocalStorage, saveDataToLocalStorage} from "../../../../front-app/src/js/helpers";

class ElementContextMenu extends Component{
  constructor(props) {
    super(props);
    this.onSelectItem = this.onSelectItem.bind(this);
    this.deleteElement = this.deleteElement.bind(this);
    this.duplicateElement = this.duplicateElement.bind(this);
    this.addNewColumn = this.addNewColumn.bind(this);
  }
  // Событие вызова контекстного меню
   onSelectItem(e)  {
     const data = e.props.element.toObject();
     saveDataToLocalStorage('altrp_element_to_copy', data);
   };

  /**
   * Удаляет элемент используя контекстоное меню
   */
  deleteElement(){
    this.props.element.deleteThisElement()
  }

  /**
   * Добавляет новую колонку
   */
  addNewColumn(){
    this.props.element.insertSiblingAfter(new Column());
  }

  /**
   * Дублирует элемент используя контекстоное меню
   */
  duplicateElement(){
    this.props.element.duplicate();
  }
  /**
   * Дублирует элемент используя контекстоное меню
   */
  onPasteElement = (e)=>{
    /**
     * @member {BaseElement} currentElement
     */
    const currentElement = e.props.element;
    const factory = getFactory();
    let newElement = getDataFromLocalStorage('altrp_element_to_copy');
    if(! _.isObject(newElement)){
      return;
    }
    newElement = factory.parseData(newElement, null, true);
    // newElement = factory.parseData(newElement);
    console.log(newElement);
    console.log(currentElement);
    if(newElement.getType() === 'section'){
      let section = currentElement.findClosestByType('section');
      section.insertSiblingAfter(newElement);
    } else if(newElement.getType() === 'column'){
      let section = currentElement.findClosestByType('section');
      section.appendChild(newElement);
    } else if(newElement.getType() === 'widget'){
      if(currentElement.getType() === 'section'){
        currentElement.children[0].appendChild(newElement);
      } else if(currentElement.getType() === 'column'){
        currentElement.appendChild(newElement);
      } else if(newElement.getType() === 'widget'){
        currentElement.insertSiblingAfter(newElement);
      }
    }
    // newElement.update();
  };
  /**
   * Сохраняем стили в locale storage
   */
  copySettings = e => {
    const { name, settings } = e.props.element.toObject();
    localStorage.setItem(name, JSON.stringify(settings));
  };
  /**
   * Применяем для выбранного элемента стили из locale storage
   */
  pasteSettings = e => {
    const name = e.props.element.getName();
    const settings = JSON.parse(localStorage.getItem(name));

    e.props.element.setSettings(settings);
    e.props.element.updateStyles();
  };
  /**
   * Отборажает пункт удалить, если можно удалить текущую колонку (в секции обязательна одна колонка)
   * @return {boolean}
   */
  showDeleteItem(){
    return (!this.props.element.getType) || (this.props.element.getType() !== 'column') || this.props.element.canDeleteThis();
  }
  /**
   * Отборажает пункт удалить, если можно удалить текущую колонку (в секции обязательна одна колонка)
   * @return {boolean}
   */
  showAddNewColumnItem(){
    return (!this.props.element.getType) || (this.props.element.getType() === 'column');
  }
  render() {
    let elementTitle =  this.props.element.getTitle ? this.props.element.getTitle() : '';
    const isPasteEnable = Boolean(this.props.element.getName) && Boolean(localStorage.getItem(this.props.element.getName()));
    if( getDataFromLocalStorage('altrp_element_to_copy') ){

    }
    const elementPasteDisabled = ! Boolean(getDataFromLocalStorage('altrp_element_to_copy'));
    return (
        <Menu id="element-menu">
          <Item onClick={this.onSelectItem}>Edit {elementTitle}</Item>
          <Separator/>
          <Item onClick={this.onSelectItem}>Copy</Item>
          <Item onClick={this.duplicateElement}>Duplicate {elementTitle}</Item>
          <Item onClick={this.onPasteElement} disabled={elementPasteDisabled}>Paste</Item>
          <Separator/>
          <Item onClick={this.onSelectItem}>Reset Styles</Item>
          <Item onClick={this.copySettings}>Copy Settings</Item>
          <Item disabled={!isPasteEnable} onClick={this.pasteSettings}>
            Paste Settings
          </Item>
          {
            this.showAddNewColumnItem() ?
                <Separator/> : ''
          }
          {
            this.showAddNewColumnItem() ?
              <Item onClick={this.addNewColumn}>Add New Column</Item> : ''
          }
          <Separator/>
          <Item onClick={this.onSelectItem}>Navigator</Item>
          {this.showDeleteItem() ? <Item onClick={this.deleteElement}>Delete {elementTitle}</Item> : ''}
        </Menu>
    );
  }
}

function mapStateToProps(state) {
  return {
    element: state.currentContextElement.currentElement,
  };
}
export default connect(mapStateToProps)(ElementContextMenu);

// export default ElementContextMenu;
