import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import classNames from "classnames";

import useGlobalSettings from "../hooks/useGlobalSettings";
import { addSection, selectSection } from "../store/sections/actions";
import { toggleWidgets, switchSettingsTab } from "../store/app/actions";

import { generateId } from "../helpers/string";
import { ItemTypes } from "../helpers/itemTypes";

import WidgetContextMenu from "./WidgetContextMenu";
import ColumnContextMenu from "./ColumnContextMenu";
import Sections from "./Sections";

import "react-contexify/dist/ReactContexify.min.css";

const Preview = () => {
  const dispatch = useDispatch();
  const sections = useSelector((state) => state.sections.present.sections);
  const [globalSettings] = useGlobalSettings();

  const addNewSection = useCallback(
    (item) => {
      delete item.icon;
      item.id = generateId();
      // Проверяем тип секции
      if (item.type === ItemTypes.COMPONENTS) {
        item.type = ItemTypes.ELEMENTS;
        item.columns = [
          [
            {
              id: generateId(),
              name: item.name,
              type: ItemTypes.ELEMENTS,
              params: { ...item.params },
            },
          ],
        ];
      } else {
        // Устанавливаем дефолтное количество колонок
        item.columns = new Array(item.params.columns).fill([]);
      }
      // Добавляем новую секцию
      dispatch(addSection({ ...item }));
      // Делаем новую секцию активной
      dispatch(selectSection(sections.length));
      // Скрываем виджеты
      dispatch(toggleWidgets(false));
      // Делаем вкладку секция активной
      dispatch(switchSettingsTab(ItemTypes.SECTIONS));
    },
    [dispatch, sections.length]
  );

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: [ItemTypes.SECTIONS, ItemTypes.COMPONENTS],
    drop: addNewSection,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <div
      ref={drop}
      className={classNames({
        "rrbe__right-container": true,
        dropSection: true,
        canDrop,
        isActive: isOver && canDrop,
      })}
    >
      <div className="rrbe__preview" style={globalSettings}>
        {sections.map((section, sectionIndex) => (
          <Sections key={section.id} section={section} sectionIndex={sectionIndex} />
        ))}
      </div>
      <WidgetContextMenu />
      <ColumnContextMenu />
    </div>
  );
};

export default Preview;
