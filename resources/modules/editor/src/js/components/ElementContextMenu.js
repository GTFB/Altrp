import React, {Component} from "react";
import { Menu, Item, Separator } from "react-contexify";

import "react-contexify/scss/main.scss";
import {connect} from "react-redux";
import Column from "../classes/elements/Column";

class ElementContextMenu extends Component{
  constructor(props) {
    super(props);
    this.onSelectItem = this.onSelectItem.bind(this);
    this.deleteElement = this.deleteElement.bind(this);
    this.duplicateElement = this.duplicateElement.bind(this);
    this.addNewColumn = this.addNewColumn.bind(this);
  }
  // Событие вызова контекстного меню
   onSelectItem(event)  {
    console.log(event);
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
   * Сохраняем стили в locale storage
   */
  copySettings = e => {
    const { name, settings } = e.props.element.toObject();
    localStorage.setItem(name, JSON.stringify(settings));
  }
  /**
   * Применяем для выбранного элемента стили из locale storage
   */
  pasteSettings = e => {
    const name = e.props.element.getName();
    const settings = JSON.parse(localStorage.getItem(name));

    e.props.element.setSettings(settings);
    e.props.element.updateStyles();
  }
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

    return (
        <Menu id="element-menu">
          <Item onClick={this.onSelectItem}>Edit {elementTitle}</Item>
          <Separator/>
          <Item onClick={this.onSelectItem}>Copy</Item>
          <Item onClick={this.duplicateElement}>Duplicate {elementTitle}</Item>
          <Item onClick={this.onSelectItem}>Paste</Item>
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
