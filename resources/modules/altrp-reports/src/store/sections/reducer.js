import mutate from "dot-prop-immutable";
import { generateId } from "../../helpers/string";

import {
  ADD_SECTION,
  ADD_WIDGET,
  CHANGE_WIDGET,
  SELECT_WIDGET,
  SELECT_SECTION,
  CHANGE_SECTION,
  ADD_COLUMNS,
  REMOVE_COLUMNS,
  REMOVE_WIDGET,
  IMPORT_STRUCTURE,
  REMOVE_SECTION,
  CHANGE_COLUMNS,
  CHANGE_SETTINGS,
  MENU_COPY_STYLES,
  MENU_PASTE_STYLES,
  MENU_COPY_WIDGET,
  MENU_PASTE_WIDGET,
} from "../types";

const initialState = {
  selectedWidget: {
    sectionIndex: null,
    columnIndex: null,
    rowIndex: null,
    name: null,
  },
  selectedSection: null,
  sections: [],
  settings: {},
  tmpWidget: {},
  tmpWidgetStyles: {},
};

export const sectionsReducer = (state = initialState, action) => {
  const { sectionIndex, columnIndex, rowIndex } = state.selectedWidget;

  switch (action.type) {
    case ADD_SECTION:
      // Добавляем новую секцию
      return { ...state, sections: [...state.sections, action.payload] };

    case ADD_WIDGET:
      // Добавляем новый виджет
      return mutate.set(
        state,
        `sections.${action.payload.sectionIndex}.columns.${action.payload.columnIndex}`,
        (column) => [...column, action.payload.data]
      );

    case CHANGE_WIDGET:
      // Изменяем настройки виджета
      return mutate.set(
        state,
        `sections.${sectionIndex}.columns.${columnIndex}.${rowIndex}.params`,
        action.payload.settings
      );

    case SELECT_WIDGET:
      // Сделать виджет активным (выбранным)
      return { ...state, selectedWidget: action.payload };

    case SELECT_SECTION:
      // Сделать секцию активной (выбранной)
      return { ...state, selectedSection: action.payload };

    case CHANGE_SECTION:
      return mutate.set(state, `sections.${state.selectedSection}.params`, action.payload.settings);

    case ADD_COLUMNS:
      return mutate.set(state, `sections.${state.selectedSection}.columns`, (columns) => [
        ...columns,
        ...Array(action.payload).fill([]),
      ]);
    case CHANGE_COLUMNS:
      return mutate.set(
        state,
        `sections.${action.payload.sectionIndex}.columns.${action.payload.columnIndex}`,
        action.payload.data
      );

    case REMOVE_COLUMNS:
      return mutate.set(state, `sections.${state.selectedSection}.columns`, (columns) =>
        columns.slice(0, action.payload)
      );

    case REMOVE_WIDGET:
      return mutate.delete(state, `sections.${sectionIndex}.columns.${columnIndex}.${rowIndex}`);

    case REMOVE_SECTION:
      return mutate.delete(state, `sections.${state.selectedSection}`);

    case IMPORT_STRUCTURE:
      return mutate.set(state, `sections`, action.payload);

    case CHANGE_SETTINGS:
      // Изменяем настройки виджета
      return mutate.set(state, `settings`, action.payload);

    case MENU_COPY_STYLES:
      // Копируем стиль виджета
      return mutate.set(state, `tmpWidgetStyles`, action.payload);

    case MENU_PASTE_STYLES:
      // Вставляем стиль виджета
      return mutate.set(
        state,
        `sections.${sectionIndex}.columns.${columnIndex}.${rowIndex}.params.styles`,
        state.tmpWidgetStyles
      );

    case MENU_COPY_WIDGET:
      // Копируем данные виджета
      return mutate.set(state, `tmpWidget`, action.payload);

    case MENU_PASTE_WIDGET:
      // Вставляем виджет в колонку
      return mutate.set(
        state,
        `sections.${action.payload.sectionIndex}.columns.${action.payload.columnIndex}`,
        (columns) => [...columns, { ...state.tmpWidget, id: generateId() }]
      );
    default:
      return state;
  }
};
