import React from "react";
import { Menu, Item } from "react-contexify";
import { useDispatch, useSelector } from "react-redux";

import { MENU_PASTE_WIDGET } from "../store/types";
import { ItemTypes } from "../helpers/itemTypes";
import { pasteWidget } from "../store/sections/actions";

const ColumnContextMenu = () => {
  const dispatch = useDispatch();
  const tmpWidget = useSelector((state) => state.sections.present.tmpWidget);

  const onClick = ({ props }) => {
    switch (props.action) {
      case MENU_PASTE_WIDGET:
        return dispatch(pasteWidget(props.sectionIndex, props.columnIndex));
      default:
        break;
    }
  };

  return (
    <Menu id={ItemTypes.SECTIONS}>
      <Item
        data={{ action: MENU_PASTE_WIDGET }}
        disabled={Object.keys(tmpWidget).length === 0}
        onClick={onClick}
      >
        Вставить виджет
      </Item>
      <Item data={{ action: MENU_PASTE_WIDGET }} disabled onClick={onClick}>
        Удалить колонку
      </Item>
    </Menu>
  );
};

export default ColumnContextMenu;
