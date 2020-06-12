import React from "react";
import { Menu, Item, Separator } from "react-contexify";

import "react-contexify/scss/main.scss";

const SectionContextMenu = () => {
  // Событие вызова контекстного меню
  const onSelectItem = ({ event, props }) => {
    console.log("event, props", event, props);
  };

  return (
    <Menu id="SectionContextMenu">
      <Item onClick={onSelectItem}>Копировать</Item>
      <Item onClick={onSelectItem}>Дублировать</Item>
      <Item onClick={onSelectItem}>Вставить</Item>
      <Separator />
      <Item onClick={onSelectItem}>Сбросить стили</Item>
      <Item onClick={onSelectItem}>Копировать стили</Item>
      <Item disabled onClick={onSelectItem}>
        Вставить стили
      </Item>
      <Separator />
      <Item onClick={onSelectItem}>Навигатор</Item>
      <Item onClick={onSelectItem}>Удалить</Item>
    </Menu>
  );
};

export default SectionContextMenu;
