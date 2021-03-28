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
  copyStyles = e => {
    console.log(e.props.element);
    const dataToStore = {
      settings: e.props.element.getSettings(),
      elementName: e.props.element.getName(),
    };
    localStorage.setItem('copied_element_settings', JSON.stringify(dataToStore));
  };
  /**
   * Применяем для выбранного элемента стили из locale storage
   */
  pasteStyles = e => {
    let elementSettingsStore = getDataFromLocalStorage('copied_element_settings', {});
    if(elementSettingsStore.elementName !== this.props.element.getName()){
      return;
    }
    this.props.element.pasteStylesFromSettings(elementSettingsStore.settings)
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
    let elementSettingsStore = getDataFromLocalStorage('copied_element_settings', {});
    const stylesPasteEnable = Boolean(this.props.element.getName) && elementSettingsStore.elementName === this.props.element.getName();

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
          <Item onClick={()=>{this.props.element.resetStyles()}}>Reset Styles</Item>
          <Item onClick={this.copyStyles}>Copy Styles</Item>
          <Item disabled={! stylesPasteEnable} onClick={this.pasteStyles}>
            Paste Styles
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
