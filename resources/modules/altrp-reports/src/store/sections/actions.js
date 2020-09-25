import {
  ADD_WIDGET,
  CHANGE_WIDGET,
  SELECT_WIDGET,
  ADD_SECTION,
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
  MENU_PASTE_WIDGET_BEFORE,
  MENU_PASTE_WIDGET_AFTER,
} from "../types";

export function selectWidget(sectionIndex, columnIndex, rowIndex, widgetName) {
  return {
    type: SELECT_WIDGET,
    payload: {
      widgetName,
      sectionIndex,
      columnIndex,
      rowIndex,
    },
  };
}

export function selectSection(sectionIndex) {
  return {
    type: SELECT_SECTION,
    payload: sectionIndex,
  };
}

export function removeSection() {
  return {
    type: REMOVE_SECTION,
  };
}

export function addWidget(sectionIndex, columnIndex, data) {
  return {
    type: ADD_WIDGET,
    payload: {
      sectionIndex,
      columnIndex,
      data,
    },
  };
}

export function changeWidget(settings) {
  return {
    type: CHANGE_WIDGET,
    payload: {
      settings,
    },
  };
}

export function addSection(section) {
  return {
    type: ADD_SECTION,
    payload: {
      ...section,
    },
  };
}

export function changeSection(settings) {
  return {
    type: CHANGE_SECTION,
    payload: {
      settings,
    },
  };
}

export function copyWidget(widget) {
  return {
    type: MENU_COPY_WIDGET,
    payload: widget,
  };
}

export function removeWidget() {
  return {
    type: REMOVE_WIDGET,
  };
}

export function addColumns(len) {
  return {
    type: ADD_COLUMNS,
    payload: len,
  };
}

export function removeColumns(len) {
  return {
    type: REMOVE_COLUMNS,
    payload: len,
  };
}

export function changeColumns(payload) {
  return {
    type: CHANGE_COLUMNS,
    payload,
  };
}

export function importStructure(json) {
  return {
    type: IMPORT_STRUCTURE,
    payload: json,
  };
}

export function changeSettings(settings) {
  return {
    type: CHANGE_SETTINGS,
    payload: settings,
  };
}

export function copyWidgetStyles(styles) {
  return {
    type: MENU_COPY_STYLES,
    payload: styles,
  };
}

export function pasteWidgetStyles() {
  return {
    type: MENU_PASTE_STYLES,
  };
}

export function insertWidgetBefore() {
  return {
    type: MENU_PASTE_WIDGET_BEFORE,
  };
}

export function insertWidgetAfter() {
  return {
    type: MENU_PASTE_WIDGET_AFTER,
  };
}

export function pasteWidget(sectionIndex, columnIndex) {
  return {
    type: MENU_PASTE_WIDGET,
    payload: {
      sectionIndex,
      columnIndex,
    },
  };
}
