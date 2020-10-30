import React, { Component } from "react";
import { connect } from "react-redux";
import {
  editorSetCurrentElement,
  getEditor,
  getFactory,
  getTemplateDataStorage,
  topOrBottomHover
} from "../helpers";
import EditIcon from "../../svgs/edit.svg";
import DeleteIcon from "../../svgs/delete.svg";
import DotsIcon from "../../svgs/dots_section.svg";
import ColumnIcon from "../../svgs/columns.svg";
import AddIcon from "../../svgs/add.svg";
import DuplicateIcon from "../../svgs/duplicate.svg";
import CloseIcon from "../../svgs/close.svg";
import store from "../store/store";
import { START_DRAG, startDrag } from "../store/element-drag/actions";
import { setCurrentElement } from "../store/current-element/actions";
import {changeWidthColumns} from "../store/column-width/actions";
import {contextMenu} from "react-contexify/lib/index";
import {setCurrentContextElement} from "../store/current-context-element/actions";

class ElementWrapper extends Component {
  constructor(props) {
    super(props);
    this.chooseElement = this.chooseElement.bind(this);
    this.deleteElement = this.deleteElement.bind(this);
    this.duplicateElement = this.duplicateElement.bind(this);
    this.state = {
      children: this.props.element.getChildren(),
      dragOver: false,
      isDrag: false
    };
    this.onDragLeave = this.onDragLeave.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.handleContext = this.handleContext.bind(this);
    this.wrapper = React.createRef();
  }
  onDragLeave(e) {
    this.setState(state => {
      return { ...state, dragOver: false, cursorPos: false };
    });
  }
  onDragOver(e) {
    // console.log('over');
    let draggableElement = store.getState().elementDrag.element;
    e.preventDefault();
    let cursorPos = topOrBottomHover(e, this.wrapper.current);
    //если перетаскивается уже созданный элемент
    if (draggableElement && typeof draggableElement.getType === "function") {
      //перетаскивание секции в секцию не всплывает
      if (
        draggableElement.getType() === "section" &&
        this.props.element.getType() === "section"
      ) {
        e.stopPropagation();
      }
      //перетаскивание виджета в колонку не всплывает
      if (
        draggableElement.getType() === "widget" &&
        this.props.element.getType() === "column"
      ) {
        e.stopPropagation();
      }
    }
    //если перетаскивается из панели вджетов, то не всплываем
    if (!draggableElement) {
      e.stopPropagation();
    }
    this.setState(state => {
      return { ...state, dragOver: true, cursorPos };
    });
    return false;
  }

  onDragEnter(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }

  /**
   * Срабатывает при вызывании контекстоного меню
   * @param e - событие
   */
  handleContext(e) {
    store.dispatch(setCurrentContextElement(this.props.element));
    e.persist();
    e.preventDefault();
    e.stopPropagation();
    contextMenu.show({
      id: 'element-menu',
      event: e,
      props: {
        element: this.props.element,
      }
    });
  }

  /**
   * событие дропа
   */
  onDrop(e) {
    /**
     * @member {HTMLElement} target
     * @member {ElementsManger} elementsManager
     * */
      // e.stopPropagation();
    let newWidgetName = e.dataTransfer.getData("text/plain");
    if (newWidgetName) {
      e.stopPropagation();
      let newElement = new (elementsManager.getElementClass(newWidgetName))();
      if (this.props.element.getType() === "widget") {
        switch (this.state.cursorPos) {
          case "top":
          {
            this.props.element.insertSiblingBefore(newElement);
          }
            break;
          case "bottom":
          {
            this.props.element.insertSiblingAfter(newElement);
          }
            break;
        }
      }
      if (this.props.element.getType() === "column") {
        this.props.element.appendChild(newElement);
      }
      editorSetCurrentElement(newElement);
    }
    /**
     * @member {BaseElement} draggableElement
     * */
    let draggableElement = store.getState().elementDrag.element;
    if (draggableElement && typeof draggableElement.getType === "function") {
      if (
        this.props.element.getType() === "widget" &&
        draggableElement.getType() === "widget"
      ) {
        draggableElement.insertAfter(this.props.element);
        e.stopPropagation();
      } else if (
        this.props.element.getType() === "column" &&
        draggableElement.getType() === "widget"
      ) {
        this.props.element.appendChild(draggableElement);
        e.stopPropagation();
      } else if (
        this.props.element.getType() === "section" &&
        draggableElement.getType() === "section"
      ) {
        draggableElement.insertAfter(this.props.element);
        e.stopPropagation();
      }
      editorSetCurrentElement(draggableElement);
    }
    this.setState(state => {
      return { ...state, dragOver: false, cursorPos: false, isDrag: false };
    });
    // e.preventDefault();
    // e.stopPropagation();
    // getEditor().modules.templateDataStorage.addWidgetInSection(newWidgetName);
    return false;
  }

  /**
   * событие начало перетаскивания
   */
  onDragStart(e) {
    store.dispatch(startDrag(this.props.element));
    e.dataTransfer.effectAllowed = "copy";
    e.dataTransfer.setData("altrp-element", this.props.element);
    this.setState(state => {
      return { ...state, isDrag: true };
    });
  }

  /**
   * событие остановки перетаскивания
   */
  onDragEnd() {
    this.stopDrag();
  }

  /**
   * событие остановки перетаскивания
   */
  stopDrag() {
    this.setState(state => {
      return { ...state, isDrag: false, dragOver: false, cursorPos: false };
    });
  }

  /**
   * Css классы
   * @return {string}
   */
  getClasses() {
    let classes = " ";
    classes += this.props.element.getPrefixClasses() + " ";
    let draggableElement = store.getState().elementDrag.element;
    // console.log(draggableElement);
    if (this.state.isDrag) {
      classes += " altrp-element_is-drag";
      return classes;
    }
    if (this.state.dragOver) {
      if (draggableElement && typeof draggableElement.getType === "function") {
        if (
          this.props.element.getType() === "section" &&
          draggableElement.getType() === "section"
        ) {
          classes += " altrp-element_drag-over";
        }
        if (draggableElement.getType() === "widget") {
          classes += " altrp-element_drag-over";
        }
      }
      if (!draggableElement) {
        classes += " altrp-element_drag-over";
      }
    }
    if (this.state.cursorPos) {
      classes += ` altrp-element_drag-${this.state.cursorPos}`;
    }
    return classes;
  }

  /**
   * Отлавливаем ошибки
   * @param error
   * @param errorInfo
   */
  componentDidCatch(error, errorInfo) {
    this.setState(state=>({
      ...state,
      error: error,
      errorInfo: errorInfo
    }));
  }

  render() {
    const elementHideTrigger = this.props.element.settings.hide_on_trigger;
    const { isFixed } = this.props.element.getSettings();

    if(this.state.errorInfo){
      return  <div className="altrp-error">
        <h2>Something went wrong.</h2>
        <details style={{ whiteSpace: 'pre-wrap' }}>
          {this.state.error && this.state.error.toString()}
          <br />
          {this.state.errorInfo.componentStack}
        </details>
      </div>
    }
    let classes = `altrp-element ${this.props.element
      .getSelector()
      .replace(".", "")} altrp-element_${this.props.element.getType()}`;
    if(this.props.element.getType() === 'widget'){
      classes += ` altrp-widget_${this.props.element.getName()}`;
    }
    let overlayClasses = `overlay`;
    let overlayStyles = {width: "100%"};
    if (this.props.currentElement === this.props.element) {
      classes += " altrp-element_current";
    }
    let editText = `Edit ${this.props.element.getTitle()}`;
    let duplicateText = `Duplicate ${this.props.element.getTitle()}`;
    let deleteText = `Delete ${this.props.element.getTitle()}`;
    let _EditIcon = EditIcon;
    classes += this.getClasses();
    switch (this.props.element.getType()) {
      case "section":
      {
        _EditIcon = DotsIcon;
      }
        break;
      case "column":
      {
        _EditIcon = ColumnIcon;
      }
        break;
    }
    let emptyColumn = "";
    if (
      this.props.element.getType() === "column" &&
      !this.state.children.length
    ) {
      emptyColumn = (
        <div className="column-empty-plus" onClick={this.showWidgetsPanel}>
          <AddIcon className="no-transition" />
        </div>
      );
    }
    if (isFixed) {
      classes += " fixed-section";
    }

    return elementHideTrigger && this.props.hideTriggers.includes(elementHideTrigger) ? null : <div
        className={classes}
        style={this.props.width}
        ref={this.wrapper}
        onContextMenu={this.handleContext}
        onDragOver={this.onDragOver}
        onClick={this.chooseElement}
        onDrop={this.onDrop}
        onDragEnd={this.onDragEnd}
        onDragLeave={this.onDragLeave}
        onDragEnter={this.onDragEnter}
      >

        <div className={overlayClasses} id="overlay" style={overlayStyles}>
          <div className="overlay-settings">
            <button
              className="overlay-settings__button overlay-settings__button_add "
              title="Add Section"
            >
              <AddIcon className="icon" />
            </button>
            <button
              className="overlay-settings__button overlay-settings__button_edit "
              onClick={this.chooseElement}
              draggable="true"
              onDragStart={this.onDragStart}
              title={editText}
            >
              <_EditIcon className="icon" />
            </button>
            <button
              className="overlay-settings__button overlay-settings__button_duplicate "
              onClick={this.duplicateElement}
              title={duplicateText}
            >
              <DuplicateIcon className="icon" />
            </button>
            <button
              className="overlay-settings__button overlay-settings__button_delete "
              onClick={this.deleteElement}
              title={deleteText}
            >
              <CloseIcon className="icon" width="35" height="35" />
            </button>
          </div>
        </div>
        {React.createElement(this.props.component, {
          element: this.props.element,
          children: this.state.children,
          currentModel: this.props.currentModel,
          currentUser: this.props.currentUser,
          currentDataStorage: this.props.currentDataStorage,
          wrapper: this,
        })}
        {emptyColumn}
      </div>
  }

  chooseElement(e) {
    e.stopPropagation();
    contextMenu.hideAll();

    this.props.element.setElementAsCurrent();
    getEditor().showSettingsPanel();
  }

  deleteElement(e) {
    e.stopPropagation();
    this.props.element.parent.deleteChild(this.props.element);
  }
  duplicateElement(e) {
    e.stopPropagation();
    this.props.element.duplicate();
  }
  showWidgetsPanel(e) {
    e.stopPropagation();
    getEditor().showWidgetsPanel();
  }
}

function mapStateToProps(state) {
  return {
    currentElement: state.currentElement.currentElement,
    dragState: state.elementDrag.dragState,
    currentModel: state.currentModel,
    currentUser: state.currentUser,
    controllerValue: state.controllerValue,
    currentDataStorage: state.currentDataStorage,
    hideTriggers: state.hideTriggers
  };
}

export default connect(mapStateToProps)(ElementWrapper);
