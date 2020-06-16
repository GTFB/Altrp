import React, {Component} from "react";
import { Menu, Item, Separator } from "react-contexify";

import "react-contexify/scss/main.scss";

class SectionContextMenu extends Component{
  constructor(props){
    super(props);
    this.onSelectItem = this.onSelectItem.bind(this);
  }
  // Событие вызова контекстного меню
   onSelectItem({ event, props })  {
    console.log(props);
  };
  render() {
    return (
        <Menu id="SectionContextMenu">
          <Item onClick={this.onSelectItem}>Копировать</Item>
          <Item onClick={this.onSelectItem}>Дублировать</Item>
          <Item onClick={this.onSelectItem}>Вставить</Item>
          <Separator/>
          <Item onClick={this.onSelectItem}>Сбросить стили</Item>
          <Item onClick={this.onSelectItem}>Копировать стили</Item>
          <Item disabled onClick={this.onSelectItem}>
            Вставить стили
          </Item>
          <Separator/>
          <Item onClick={this.onSelectItem}>Навигатор</Item>
          <Item onClick={this.onSelectItem}>Удалить</Item>
        </Menu>
    );
  }
}

export default SectionContextMenu;
