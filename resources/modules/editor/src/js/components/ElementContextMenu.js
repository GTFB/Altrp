import React, {Component} from "react";
import {Menu, Item, Separator, contextMenu} from "react-contexify";


import("react-contexify/scss/main.scss");
import {connect} from "react-redux";
import Column from "../classes/elements/Column";
import {getEditor, getFactory} from "../helpers";
import {
  getDataFromLocalStorage,
  saveDataToLocalStorage
} from "../../../../front-app/src/js/helpers";
import {Portal} from "@blueprintjs/core"

class ElementContextMenu extends Component {
  constructor(props) {
    super(props);
    this.onSelectItem = this.onSelectItem.bind(this);
    this.onEditItem = this.onEditItem.bind(this);
    this.deleteElement = this.deleteElement.bind(this);
    this.duplicateElement = this.duplicateElement.bind(this);
    this.addNewColumn = this.addNewColumn.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  // Событие вызова контекстного меню
  onEditItem(e) {
    //e.stopPropagation();
    contextMenu.hideAll();

    this.props.element.setElementAsCurrent();
    getEditor().showSettingsPanel();
  }

  // component mount, add window listener
   componentDidMount() {
     window.EditorFrame.contentWindow.document.addEventListener('keydown', this.handleKeyDown)
   }
   componentWillUnmount() {
     window.EditorFrame.contentWindow.document.removeEventListener('keydown', this.handleKeyDown)
   }

  handleKeyDown = (e) => {
    let charCode = String.fromCharCode(e.which).toLowerCase()
    if((e.ctrlKey || e.metaKey) && charCode === 's') {
      e.preventDefault()
      if (window.appStore.getState().templateStatus.status !== 'TEMPLATE_UPDATED') {
        getEditor().modules.saveImportModule.saveTemplate()
      }
    }else if((e.ctrlKey || e.metaKey) && charCode === 'c') {
      e.preventDefault()
      this.onSelectItem(null, window.appStore.getState().currentElement.currentElement.toObject())
    }else if((e.ctrlKey || e.metaKey) && charCode === 'v') {
      e.preventDefault()
      this.onPasteElement(e)
    }
   }

  // Событие вызова контекстного меню
  onSelectItem(e, element) {
   if (!element) {
    const data = e.props.element.toObject();
    saveDataToLocalStorage("altrp_element_to_copy", data);
    contextMenu.hideAll();
   } else {
     saveDataToLocalStorage("altrp_element_to_copy", element);
   }
  }

  /**
   * Удаляет элемент используя контекстоное меню
   */
  deleteElement() {
    this.props.element.deleteThisElement();
    contextMenu.hideAll();
  }

  /**
   * Добавляет новую колонку
   */
  addNewColumn() {
    this.props.element.insertSiblingAfter(new Column());
    contextMenu.hideAll();
  }

  /**
   * Дублирует элемент используя контекстоное меню
   */
  duplicateElement() {
    this.props.element.duplicate();
    contextMenu.hideAll();
  }

  /**
   * Дублирует элемент используя контекстоное меню
   */
  onPasteElement = (e) => {
    contextMenu.hideAll();
    /**
     * @member {BaseElement} currentElement
     */
    let currentElement
    if (e?.props?.element) {
      currentElement = e.props.element
    } else {
      currentElement = window.appStore.getState().currentElement.currentElement
    }
    const factory = getFactory();
    let newElement = getDataFromLocalStorage("altrp_element_to_copy");
    if (!_.isObject(newElement)) {
      return;
    }
    newElement = factory.parseData(newElement, null, true);
    // newElement = factory.parseData(newElement);
    if (newElement.getType() === "section") {
      let section = currentElement.findClosestByType("section");
      section.insertSiblingAfter(newElement);
    } else if (newElement.getType() === "column") {
      let section = currentElement.findClosestByType("section");
      section.appendChild(newElement);
    } else if (newElement.getType() === "widget") {
      if (currentElement.getType() === "section") {
        currentElement.children[0].appendChild(newElement);
      } else if (currentElement.getType() === "column") {
        currentElement.appendChild(newElement);
      } else if (newElement.getType() === "widget") {
        currentElement.insertSiblingAfter(newElement);
      }
    }
    // newElement.update();
  };
  /**
   * Сохраняем стили в locale storage
   */
  copyStyles = e => {
    contextMenu.hideAll();
    const dataToStore = {
      settings: e.props.element.getSettings(),
      elementName: e.props.element.getName()
    };
    localStorage.setItem(
      "copied_element_settings",
      JSON.stringify(dataToStore)
    );
  };
  /**
   * Применяем для выбранного элемента стили из locale storage
   */
  pasteStyles = e => {
    contextMenu.hideAll();
    let elementSettingsStore = getDataFromLocalStorage(
      "copied_element_settings",
      {}
    );
    if (elementSettingsStore.elementName !== this.props.element.getName()) {
      return;
    }
    this.props.element.pasteStylesFromSettings(elementSettingsStore.settings);
  };

  /**
   * Отборажает пункт удалить, если можно удалить текущую колонку (в секции обязательна одна колонка)
   * @return {boolean}
   */
  showDeleteItem() {
    return (
      !this.props.element.getType ||
      this.props.element.getType() !== "column" ||
      this.props.element.canDeleteThis()
    );
  }

  /**
   * Отборажает пункт удалить, если можно удалить текущую колонку (в секции обязательна одна колонка)
   * @return {boolean}
   */
  showAddNewColumnItem() {
    return (
      !this.props.element.getType || this.props.element.getType() === "column"
    );
  }

  render() {
    let elementTitle = this.props.element.getTitle
      ? this.props.element.getTitle()
      : "";
    let elementSettingsStore = getDataFromLocalStorage(
      "copied_element_settings",
      {}
    );
    const stylesPasteEnable =
      Boolean(this.props.element.getName) &&
      elementSettingsStore.elementName === this.props.element.getName();

    if (getDataFromLocalStorage("altrp_element_to_copy")) {
    }
    const elementPasteDisabled = !Boolean(
      getDataFromLocalStorage("altrp_element_to_copy")
    );
    return (
      <Portal
        className="altrp-portal altrp-portal_context-menu"
        container={window.EditorFrame.contentWindow.document.body}>
        <Menu id="element-menu">
          <Item onClick={this.onEditItem}>Edit {elementTitle}</Item>
          <Separator/>
          <Item onClick={this.onSelectItem}>Copy</Item>
          <Item onClick={this.duplicateElement}>Duplicate {elementTitle}</Item>
          <Item onClick={this.onPasteElement} disabled={elementPasteDisabled}>
            Paste
          </Item>
          <Separator/>
          <Item
            onClick={() => {
              this.props.element.resetStyles();
            }}
          >
            Reset Styles
          </Item>
          <Item onClick={this.copyStyles}>Copy Styles</Item>
          <Item disabled={!stylesPasteEnable} onClick={this.pasteStyles}>
            Paste Styles
          </Item>
          {this.showAddNewColumnItem() ? <Separator/> : ""}
          {this.showAddNewColumnItem() ? (
            <Item onClick={this.addNewColumn}>Add New Column</Item>
          ) : (
            ""
          )}
          <Separator/>
          <Item onClick={this.onSelectItem}>Navigator</Item>
          {this.showDeleteItem() ? (
            <Item onClick={this.deleteElement}>Delete {elementTitle}</Item>
          ) : (
            ""
          )}
        </Menu>
      </Portal>
    );
  }
}

function mapStateToProps(state) {
  return {
    element: state.currentContextElement.currentElement
  };
}

export default connect(mapStateToProps)(ElementContextMenu);

