import React, {Component} from "react";
import { Menu, Item, Separator } from "react-contexify";

import "react-contexify/scss/main.scss";
import {connect} from "react-redux";

class ElementContextMenu extends Component{
  constructor(props) {
    super(props);
    this.onSelectItem = this.onSelectItem.bind(this);
    this.deleteElement = this.deleteElement.bind(this);
  }
  // Событие вызова контекстного меню
   onSelectItem(event)  {
    console.log(event);
  };

  /**
   * Удаляет элемент из контекстоного меню
   */
  deleteElement(){
    console.log(this.props.element);
    this.props.element.deleteThisElement()
  }
  /**
   * Отборажает пункт удалить если можно удалить текущую колонку (в секции обязательна одна колонка)
   * @return {boolean}
   */
  showDeleteItem(){
    return (!this.props.element.getType) || (this.props.element.getType() !== 'column') || this.props.element.canDeleteThis();
  }
  render() {
    let elementTitle =  this.props.element.getTitle ? this.props.element.getTitle() : '';

    return (
        <Menu  id="element-menu">
          <Item onClick={this.onSelectItem}>Edit {elementTitle}</Item>
          <Separator/>
          <Item onClick={this.onSelectItem}>Copy</Item>
          <Item onClick={this.onSelectItem}>Duplicate</Item>
          <Item onClick={this.onSelectItem}>Paste</Item>
          <Separator/>
          <Item onClick={this.onSelectItem}>Reset Styles</Item>
          <Item onClick={this.onSelectItem}>Copy Styles</Item>
          <Item disabled onClick={this.onSelectItem}>
            Paste Styles
          </Item>
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
