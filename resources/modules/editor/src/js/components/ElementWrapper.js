import CKEditor from "./ckeditor/CKeditor";
import EditIcon from "../../svgs/edit.svg";
import DotsIcon from "../../svgs/dots_section.svg";
import ColumnIcon from "../../svgs/columns.svg";
import AddIcon from "../../svgs/add.svg";
import DuplicateIcon from "../../svgs/duplicate.svg";
import CloseIcon from "../../svgs/close.svg";
import store from "../store/store";
import { START_DRAG, startDrag } from "../store/element-drag/actions";
import { contextMenu } from "react-contexify";
import { setCurrentContextElement } from "../store/current-context-element/actions";
import AltrpTooltip from "./altrp-tooltip/AltrpTooltip";
import NavComponent from "./widgets/styled-components/NavComponent";
import Column from "../classes/elements/Column";
import DiagramComponent from "./widgets/styled-components/DiagramComponent";
import ButtonComponent from "./widgets/styled-components/ButtonComponent";
import CarouselComponent from "./widgets/styled-components/CarouselComponent";
import GalleryComponent from "./widgets/styled-components/GalleryComponent";
import DividerComponent from "./widgets/styled-components/DividerComponent";
import VideoComponent from "./widgets/styled-components/VideoComponent";
import ListComponent from "./widgets/styled-components/ListComponent";
import AccordionComponent from "./widgets/styled-components/AccordionComponent";
import SectionWidgetComponent from "./widgets/styled-components/SectionWidgetComponent";
import ColumnComponent from "./widgets/styled-components/ColumnComponents";
import DropbarWidgetComponent from "./widgets/styled-components/DropbarWidgetComponent";
import DashboardComponent from "./widgets/styled-components/DashboardComponent";
import getImageStyles from "../../../../front-app/src/js/components/helpers/stylesForTheImage";
import getTabsStyles from "../../../../front-app/src/js/components/helpers/stylesForTheTabs";
import getMenuStyles from "../../../../front-app/src/js/components/helpers/stylesForTheMenu";
import getBreadcrumbsStyles from "../../../../front-app/src/js/components/helpers/stylesForTheBreadcrumbs";
import {getHeadingStyles} from "../../../../front-app/src/js/components/helpers/stylesForTheHeading";
import {getTextStyles} from "../../../../front-app/src/js/components/helpers/stylesForTheText";
import {getTableStyles} from "../../../../front-app/src/js/components/helpers/stylesForTheTable";
import {getPostsStyles} from "../../../../front-app/src/js/components/helpers/stylesForThePosts";
import FormComponent from "./widgets/styled-components/FormComponent";
import MapComponent from "./widgets/styled-components/MapComponent";
import MapConstructorComponent from "./widgets/styled-components/MapConstructorComponent";
import AdvancedComponent from "./widgets/styled-components/AdvancedComponent";
import {getEditor, topOrBottomHover, editorSetCurrentElement} from "../helpers";
const { connect } = window.reactRedux;

const ElementWrapperGlobalStyles = window.createGlobalStyle`${({elementName, elementId, settings, element})=>{
  let styles = '';
  let prefix = "altrp-element";
  switch (elementName) {
    case "button":
      styles += `.${prefix}${elementId} {${ButtonComponent(settings)}}`;
      break;
    case "carousel":
      styles += `.${prefix}${elementId} {${CarouselComponent(settings)}}`;
      break;
    case "gallery":
      styles += `.${prefix}${elementId} {${GalleryComponent(settings)}}`;
      break;
    case "divider":
      styles += `.${prefix}${elementId} {${DividerComponent(settings)}}`;
      break;
    case "video":
      styles += `.${prefix}${elementId} {${VideoComponent(settings)}}`;
      break;
    case "list":
      styles += `.${prefix}${elementId} {${ListComponent(settings)}}`;
      break;
    case "accordion":
      styles += `.${prefix}${elementId} {${AccordionComponent(settings)}}`;
      break;
    case "section":
      styles += `.${prefix}${elementId} {${SectionWidgetComponent(settings, element.children.length)}}`;
      break;
    case "column":
      styles += `.${prefix}${elementId} {${ColumnComponent(settings)}}`;
      break;
    case "dropbar":
      styles += `.${prefix}${elementId} {${DropbarWidgetComponent(settings)}}`;
      break;
    case "dashboard":
      styles+=`.${prefix}${elementId} {${DashboardComponent(settings)}}`;
      break;
    case "image":
      styles+=getImageStyles(settings,elementId);
      break;
    case "tabs":
      styles+=getTabsStyles(settings, elementId);
      break;
    case "menu":
      styles+=getMenuStyles(settings,elementId);
      break;
    case "breadcrumbs":
      styles+=getBreadcrumbsStyles(settings,elementId);
      break;
    case 'heading': {
      styles += getHeadingStyles(settings, elementId);
    }
      break;
    case 'text': {
      styles += getTextStyles(settings, elementId);
    }
      break;
    case 'table': {
      styles += getTableStyles(settings, elementId);
    }
      break;
    case 'posts': {
      styles += getPostsStyles(settings, elementId);
    }
      break;
    case "input-text":
    case "input-password":
    case "input-number":
    case "input-date":
    case "input-email":
    case "input-tel":
    case "input-file":
    case "input-select":
    case "input-image-select":
    case "input-radio":
    case "input-checkbox":
    case "input-accept":
    case "input-textarea":
    case "input-wysiwyg": {
      styles += `.${prefix}${id} {${FormComponent.FormComponent(
        item.settings,
        id
      )}}`;
    }
      break;
    case "input":
    {
      switch (settings?.content_type) {
        case "select2":
          styles += `.${prefix}${elementId} {${FormComponent.FormComponent(
            settings,
            elementId
          )}}`;
          //select2 options style
          styles += `${FormComponent.select2Options(settings, elementId)}}`;
          break;
        default:
          styles += `.${prefix}${elementId} {${FormComponent.FormComponent(
            settings,
            elementId
          )}}`;
          break;
      }
    }
      break;
    case "map":
      styles += `.${prefix}${elementId} {${MapComponent(settings)}}`;
      break;
    case "map_builder":
      styles += `.${prefix}${elementId} {${MapConstructorComponent(settings)}}`;
      break;
  }
  styles += `div.${prefix}${elementId}.${prefix}${elementId} {${AdvancedComponent(
    settings
  )}}`;
  return styles;
}}`

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
    this.elementId = this.props.element.getId();
    props.element.wrapperComponent = this;
  }
  onDragLeave(e) {
    e.preventDefault();
    this.setState(state => {
      return { ...state, dragOver: false, cursorPos: false };
    });
  }
  onDragOver(e) {
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
      id: "element-menu",
      event: e,
      props: {
        element: this.props.element
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
    e.stopPropagation();
    e.preventDefault();
    let newWidgetName = e.dataTransfer.getData("text/plain");
    if (newWidgetName) {
      e.stopPropagation();
      let newElement = new (elementsManager.getElementClass(newWidgetName))();

      if (newWidgetName === "section_widget") {
        let column = new Column();
        newElement.appendChild(column, false);
      }
      if (
        this.props.element.getType() === "widget" &&
        this.props.element.getName() !== "section_widget"
      ) {
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
  onDragEnd(e) {
    e.preventDefault();
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
    this.setState(state => ({
      ...state,
      error: error,
      errorInfo: errorInfo
    }));
  }

  /**
   * Нужно ли обновлять компонент
   * @param {{}} nextProps
   * @param {{}} nextState
   */
  shouldComponentUpdate(nextProps, nextState) {
    // if(this.state.children) {
    //   if(this.state.children.component) {
    //     if(this.state.children.component.settings.button_text) {
    //       console.log(this.state.children.component.settings.button_text)
    //     }
    //   }
    // }
    /**
     * не обновляем элемент, если изменился контроллер не текущего элемента
     */
    if (
      nextProps.controllerValue !== this.props.controllerValue &&
      this.props.element !== this.props.currentElement
    ) {
      return false;
    }
    return true;
  }
  render() {
    const elementHideTrigger = this.props.element.settings.hide_on_trigger;
    const {
      isFixed,
      tooltip_text,
      tooltip_position
    } = this.props.element.getSettings();

    let errorContent = null;
    if (this.state.errorInfo) {
      errorContent = (
        <div className="altrp-error">
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: "pre-wrap" }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    let classes = `altrp-element ${this.props.element
      .getSelector()
      .replace(".", "")} altrp-element_${this.props.element.getType()}`;
    if (this.props.element.getType() === "widget") {
      classes += ` altrp-widget_${this.props.element.getName()}`;
    }
    let overlayClasses = `overlay`;
    let overlayStyles = { width: "100%" };
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
    const styles = {};
    let layout_column_width = this.props.element.getResponsiveSetting(
      "layout_column_width"
    );
    if (this.props.element.getResponsiveSetting("layout_column_width")) {
      if (
        Number(this.props.element.getResponsiveSetting("layout_column_width"))
      ) {
        layout_column_width =
          this.props.element.getResponsiveSetting("layout_column_width") + "%";
      } else {
        layout_column_width = `${this.props.element.getResponsiveSetting(
          "layout_column_width"
        )}`;
      }
    }
    const elementProps = {
      element: this.props.element,
      children: this.state.children,
      currentModel: this.props.currentModel,
      currentUser: this.props.currentUser,
      currentScreen: this.props.currentScreen,
      currentDataStorage: this.props.currentDataStorage,
      globalStyles: this.props.globalStyles,
      fireAction: this.fireAction,
      CKEditor: CKEditor,
      wrapper: this
    };

    let WrapperComponent = "div";
    switch (this.props.element.getName()) {
      case "diagram":
        WrapperComponent = DiagramComponent;
        break;
      case "nav":
        WrapperComponent = NavComponent;
        break;
    }

    return elementHideTrigger &&
      this.props.hideTriggers.includes(elementHideTrigger) ? null : (
      <WrapperComponent
        className={classes}
        style={{ ...styles, width: layout_column_width }}
        ref={this.wrapper}
        element={this.props.element.getId()}
        onContextMenu={this.handleContext}
        onDragOver={this.onDragOver}
        onClick={this.chooseElement}
        onDrop={this.onDrop}
        settings={this.props.element.getSettings()}
        onDragEnd={this.onDragEnd}
        onDragLeave={this.onDragLeave}
        onDragEnter={this.onDragEnter}
      >
        <div
          className={overlayClasses}
          id={"overlay" + this.props.element.getId()}
          style={overlayStyles}
        >
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
        {errorContent ||
          React.createElement(this.props.component, elementProps)}
        {tooltip_text && (
          <AltrpTooltip position={tooltip_position}>
            {tooltip_text}
          </AltrpTooltip>
        )}
        {emptyColumn}
        <ElementWrapperGlobalStyles
          settings={this.props.element.getSettings()}
          elementName={this.props.element.getName()}
          element={this.props.element}
          elementId={this.elementId}/>
      </WrapperComponent>
    );
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
    // hideTriggers: state.hideTriggers,
    currentScreen: state.currentScreen,
    globalStyles: state.globalStyles,
    historyStore: state.historyStore,
    state,
  };
}

export default connect(mapStateToProps)(ElementWrapper);
