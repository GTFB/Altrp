import React, { useCallback } from "react";
import { Row, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import classNames from "classnames";

import { addWidget, selectSection, selectWidget } from "../store/sections/actions";
import { toggleWidgets, switchSettingsTab } from "../store/app/actions";
import { generateId } from "../helpers/string";
import { ItemTypes } from "../helpers/itemTypes";
import { sectionTypes } from "../helpers/sectionTypes";
import useSectionSettings from "../hooks/useSectionSettings";

import Column from "./Column";

const Sections = ({ section, sectionIndex }) => {
  const dispatch = useDispatch();

  const [type] = useSectionSettings("type", sectionTypes.PAGE_BODY);

  const addNewWidget = useCallback(
    (item, columnIndex) => {
      delete item.icon;
      // Добавляем новый виджет
      dispatch(addWidget(sectionIndex, columnIndex, { ...item, id: generateId() }));
      // Делаем секцию в которую добавили активной
      dispatch(selectSection(sectionIndex));
      // Смотрим сколько виджетов в колонке
      const countWidgets = section.columns[columnIndex].length;
      // Делаем последний добавленный виджет активным
      dispatch(selectWidget(sectionIndex, columnIndex, countWidgets, item.name));
      // Скрываем виджеты
      dispatch(toggleWidgets(false));
      // Делаем вкладку виджет активной
      dispatch(switchSettingsTab(ItemTypes.ELEMENTS));
    },
    [dispatch, section.columns, sectionIndex]
  );

  const setCurrentSection = useCallback(() => {
    dispatch(selectSection(sectionIndex));
  }, [dispatch, sectionIndex]);

  const { widthColumns, styles } = section.params;

  return (
    <div
      className={classNames({
        rrbe__section: true,
        [type]: true,
      })}
      id={section.id}
      style={{ ...styles }}
      onClick={setCurrentSection}
    >
      <Container>
        <Row>
          {section.columns.map((rows, columnIndex) => {
            const md = widthColumns?.[columnIndex];
            return (
              <Column
                key={`${sectionIndex}-${columnIndex}`}
                rows={rows}
                md={md}
                sectionIndex={sectionIndex}
                columnIndex={columnIndex}
                accept={[ItemTypes.ELEMENTS]}
                onDrop={(item) => addNewWidget(item, columnIndex)}
              />
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

export default Sections;
