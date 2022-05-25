import CKEditor from "./ckeditor/CKeditor";
import EditIcon from "../../svgs/edit.svg";
import DotsIcon from "../../svgs/dots_section.svg";
import ColumnIcon from "../../svgs/columns.svg";
import AddIcon from "../../svgs/add.svg";
import store, {getCurrentElement} from "../store/store";
import { START_DRAG, startDrag } from "../store/element-drag/actions";
import { contextMenu } from "react-contexify";
import { setCurrentContextElement } from "../store/current-context-element/actions";
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
import getMenuStyles from "../../../../front-app/src/js/components/helpers/getMenuStyles";
import getBreadcrumbsStyles from "../../../../front-app/src/js/components/helpers/stylesForTheBreadcrumbs";
import { getHeadingTypeHeadingStyles } from "../../../../front-app/src/js/components/helpers/stylesForTheHeadingTypeHeading";
import { getHeadingTypeAnimatingStyles } from "../../../../front-app/src/js/components/helpers/stylesForTheHeadingTypeAnimating";
import { getTextStyles } from "../../../../front-app/src/js/components/helpers/stylesForTheText";
import { getTableStyles } from "../../../../front-app/src/js/components/helpers/stylesForTheTable";
import getInputTextCommonStyles from "../../../../front-app/src/js/components/helpers/getInputTextCommonStyles";
import { getPostsStyles } from "../../../../front-app/src/js/components/helpers/stylesForThePosts";
import FormComponent from "./widgets/styled-components/FormComponent";
import MapComponent from "./widgets/styled-components/MapComponent";
import MapConstructorComponent from "./widgets/styled-components/MapConstructorComponent";
import AdvancedComponent from "./widgets/styled-components/AdvancedComponent";
import {
  getEditor,
  topOrBottomHover,
  editorSetCurrentElement
} from "../helpers";
import TabsSwitcherComponent from "./widgets/styled-components/TabsSwitcherComponent";
import ImageLightboxComponent from "./widgets/styled-components/ImageLightboxComponent";
import InputDateComponent from "./widgets/styled-components/InputDateComponent";
import DatePickerComponent from "./widgets/styled-components/DatePickerComponent";
import InputCheckboxComponent from "./widgets/styled-components/InputCheckboxComponent";
import getInputSelectStyles, {
  getInputSelectPopoverStyles
} from "../../../../front-app/src/js/components/helpers/getInputSelectStyles";
import InputRadioComponent from "./widgets/styled-components/InputRadioComponent";
import InputSliderComponent from "./widgets/styled-components/InputSliderComponent";
import getInputFileStyles from "../../../../front-app/src/js/components/helpers/getInputFileStyles";
import getInputGalleryStyles from "../../../../front-app/src/js/components/helpers/getInputGalleryStyles";
import {getResponsiveSetting, isEditor} from "../../../../front-app/src/js/helpers";
import InputRangeSliderComponent from "./widgets/styled-components/InputRangeSliderComponent";
import RangeSliderTableComponent from "./widgets/styled-components/RangeSliderTableComponent"
import getTemplateStyles from "../../../../front-app/src/js/components/helpers/getTemplateStyles";
import getInputMultiSelectStyles, {
  getInputMultiSelectPopoverStyles
} from "../../../../front-app/src/js/components/helpers/getInputMultiSelectStyles";
import TooltipComponent from "./widgets/styled-components/TooltipComponent";
import AltrpTooltip2 from "./altrp-tooltip/AltrpTooltip2";
import React from "react";
import getSchedulerStyles from "../../../../front-app/src/js/components/helpers/getSchedulerStyles";
import getTournamentStyles from "../../../../front-app/src/js/components/helpers/getTournamentStyles";
import getIconStyles from "../../../../front-app/src/js/components/helpers/getIconStyles";
import getInputTextAutocompleteStyles
  from "../../../../front-app/src/js/components/helpers/getInputTextAutocompleteStyles";
import TreeComponent from "./widgets/styled-components/TreeComponent";
import getInputSelectTreeStyles from "../../../../front-app/src/js/components/helpers/getInputSelectTreeStyles";
import InputDateRange from "../classes/elements/InputDateRange";
import InputDateRangeComponent from "./widgets/styled-components/InputDateRangeComponent";
import StarsComponent from "./widgets/styled-components/StarsComponent";
import ProgressBarComponent from "./widgets/styled-components/ProgressBarComponent";
import InputCropImageComponent from "./widgets/styled-components/InputCropImageComponent";
import getFeedbackStyles from "../../../../front-app/src/js/components/helpers/getFeedbackStyles";
import getInputPagintaionStyles from "../../../../front-app/src/js/components/helpers/getInputPaginationStyles";
import Overlay from "./Overlay";

const { connect } = window.reactRedux;
const { replaceContentWithData } = window.altrpHelpers;
const ElementWrapperGlobalStyles = window.createGlobalStyle`${({
  elementName,
  elementId,
  settings,
  element, globalCssEditor
}) => {
  let styles = "";
  let prefix = "altrp-element";
  switch (elementName) {
    case "image-lightbox":
      styles += ImageLightboxComponent(settings, elementId);
      break;
    case "tabs-switcher":
      styles += `.${prefix}${elementId} {${TabsSwitcherComponent(settings)}}`;
      break;
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
    case "tree":
      styles += `.${prefix}${elementId} {${TreeComponent(settings)}}`;
      break;
    case "section_widget":
    case "section":
      styles += `.${prefix}${elementId} {${SectionWidgetComponent(
        settings,
        element.children.length,
        elementId
      )}}`;
      break;
    case "column":
      styles += `.${prefix}${elementId} {${ColumnComponent(settings)}}`;
      break;
    case "dropbar":
      styles += `.${prefix}${elementId} {${DropbarWidgetComponent(settings)}}`;
      break;
    case "dashboard":
      styles += `.${prefix}${elementId} {${DashboardComponent(settings)}}`;
      break;
    case "image":
      styles += getImageStyles(settings, elementId);
      break;
    case "tabs":
      styles += getTabsStyles(settings, elementId);
      break;
    case "menu":
      styles += getMenuStyles(settings, elementId);
      break;
    case "breadcrumbs":
      styles += getBreadcrumbsStyles(settings, elementId);
      break;
    case "heading":
      {
        styles += getHeadingTypeHeadingStyles(settings, elementId);
      }
      break;
    case "heading-type-animating":
      {
        styles += getHeadingTypeAnimatingStyles(settings, elementId);
      }
      break;
    case "text":
      {
        styles += getTextStyles(settings, elementId);
      }
      break;
    case "table":
      {
        styles += getTableStyles(settings, elementId);
        styles += `.${prefix}${elementId} { ${RangeSliderTableComponent(
          settings
        )}}`;
      }
      break;
    case "posts":
      {
        styles += getPostsStyles(settings, elementId);
      }
      break;
    case "input-select2":
      {
        styles += `.${prefix}${elementId} {${FormComponent.FormComponent(
          settings,
          elementId
        )}}`;
        //select2 options style
        styles += `${FormComponent.select2Options(settings, elementId)}}`;
      }
      break;
    case "input-date":
      {
        styles += InputDateComponent(settings, elementId, prefix);

        styles += `${DatePickerComponent(settings, elementId)}`;
      }
      break
    case "input-date-range": {
      styles += InputDateRangeComponent(settings, elementId, prefix)
      }
      break;
    case "input-checkbox":
      {
        styles += `.${prefix}${elementId} { ${InputCheckboxComponent(
          settings,
          elementId
        )}}`;
      }
      break;
    case "input-slider":
      {
        styles += `.${prefix}${elementId} { ${InputSliderComponent(settings)}}`;
      }
      break;
    case "input-range-slider":
      {
        styles += `.${prefix}${elementId} { ${InputRangeSliderComponent(
          settings
        )}}`;
      }
      break;
    case "input-text-common":
      {
        styles += `.${prefix}${elementId} {${getInputTextCommonStyles(
          settings,
          elementId
        )}}`;
      }
      break;
    case "input-text-autocomplete":
      {
        styles += `.${prefix}${elementId} {${getInputTextAutocompleteStyles(
          settings,
          elementId
        )}}`;
      }
      break;

    case "template":
      {
        styles += `.${prefix}${elementId} {${getTemplateStyles(
          settings,
          elementId
        )}}`;
      }
      break;
    case "input-select":
      {
        styles += `.${prefix}${elementId} {${getInputSelectStyles(
          settings,
          elementId
        )}}`;
        styles += `${getInputSelectPopoverStyles(settings, elementId)}`;
      }
      break;
    case "input-select-tree": {
      styles += `.${prefix}${elementId} {${getInputSelectTreeStyles(settings)}}`;
      styles += `${getInputSelectPopoverStyles(settings, elementId)}`;
      styles += `.altrp-select-tree${elementId} {${TreeComponent(settings, "tree_")}}`;
      }
      break;
    case "input-multi-select":
      {
        styles += `.${prefix}${elementId} {${getInputMultiSelectStyles(
          settings,
          elementId
        )}}`;
        styles += `${getInputMultiSelectPopoverStyles(settings, elementId)}`;
      }
      break;
    case "input-radio": {
      styles += InputRadioComponent(settings, elementId, prefix);
      break;
    }
    case "stars": {
      styles += `.${prefix}${elementId} {${StarsComponent(
        settings,
        elementId
      )}}`;
      break;
    }
    case "progress-bar": {
      styles += `.${prefix}${elementId} {${ProgressBarComponent(
        settings,
        elementId
      )}}`;
      break;
    }
    case "input-text":
    case "input-password":
    case "input-number":
    case "input-email":
    case "input-tel":
    case "input-file":
      {
        styles += `.${prefix}${elementId} {${getInputFileStyles(
          settings,
          elementId
        )}}`;
      }
      break;
    case "input-gallery":
      {
        styles += `.${prefix}${elementId} {${getInputGalleryStyles(
          settings,
          elementId
        )}}`;
      }
      break;
    case "input-image-select":
    case "input-accept":
    case "input-textarea":
    case "input-wysiwyg":
      {
        styles += `.${prefix}${elementId} {${FormComponent.FormComponent(
          settings,
          elementId
        )}}`;
      }
      break;
    case "input-crop-image":
      styles += `.${prefix}${elementId} {${InputCropImageComponent(settings)}}`
      break
    case "map":
      styles += `.${prefix}${elementId} {${MapComponent(settings)}}`;
      break;
    case "map_builder":
      styles += `.${prefix}${elementId} {${MapConstructorComponent(settings)}}`;
      break;
    case "scheduler":
      styles += `.${prefix}${elementId} {${getSchedulerStyles(settings, elementId)}}`;
      break;
    case "icon":
      styles += `.${prefix}${elementId} {${getIconStyles(settings, elementId)}}`
      break;
    case "pie-diagram":
    case "bar-diagram":
    case "line-diagram":
    case "funnel-diagram":
    case "radar-diagram":
      styles += `.${prefix}${elementId} {${DiagramComponent(settings)}}`
      break;
    case 'tournament':
      styles += `.${prefix}${elementId} {${getTournamentStyles(settings, elementId)}}`
      break;
    case 'feedback':
      styles += `.${prefix}${elementId} {${getFeedbackStyles(settings, elementId)}}`
      break;
    case 'input-pagination':
      styles += `.${prefix}${elementId} {${getInputPagintaionStyles(settings)}}`
      break;
  }

  styles += globalCssEditor.globalStylesCss

  const tooltip_show_type = settings.tooltip_show_type || "never";

  if (tooltip_show_type !== "never") {
    styles += `.altrp-tooltip${elementId}.altrp-tooltip${elementId} {${TooltipComponent(
      settings
    )}}`;
  }

  styles += `div.${prefix}${elementId}.${prefix}${elementId} {${AdvancedComponent(
    settings
  )}}`;
  let element_css_editor = getResponsiveSetting(settings, "element_css_editor");
  if (_.isString(element_css_editor)) {
    styles += element_css_editor.replace(
      /__selector__/g,
      `${prefix}${elementId}`
    );
  }
  return styles;
}}`;

class ElementWrapper extends Component {
  constructor(props) {
    super(props);
    this.chooseElement = this.chooseElement.bind(this);
    this.state = {
      children: this.props.element.getChildren(),
      dragOver: false,
      isDrag: false,
      tooltipOpen: false,
    };
    this.onDragLeave = this.onDragLeave.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.handleContext = this.handleContext.bind(this);
    this.wrapper = React.createRef();
    this.elementId = this.props.element.getId();
    this.element = this.props.element
    this.onClickTooltip = this.onClickTooltip.bind(this);
    this.closeTooltip = this.closeTooltip.bind(this);
    this.tooltipOnMouseEnter = this.tooltipOnMouseEnter.bind(this);
    this.tooltipOnMouseLeave = this.tooltipOnMouseLeave.bind(this);
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

  closeTooltip(e) {
    if(!e.path.includes(this.wrapper.current)) {
      const checkTooltip = e.path.find(domElem => domElem.classList ? domElem.classList.contains("bp3-popover2") : false);


      if(!checkTooltip) {
        this.setState(s => ({
          ...s, tooltipOpen: false
        }))

        this.tooltipOnClickListener(true)
      }
    }

  }

  tooltipOnClickListener(remove) {
    if(remove) {
      document.getElementById("editorContent").contentWindow.document.removeEventListener("click", this.closeTooltip, {
        capture: true
      });
    } else {
      document.getElementById("editorContent").contentWindow.document.addEventListener("click", this.closeTooltip, {
        capture: true
      });
    }
  }

  tooltipOnMouseEnter() {
    this.setState(s => ({
      ...s, tooltipOpen: true
    }))
  }

  tooltipOnMouseLeave() {
    this.setState(s => ({
      ...s, tooltipOpen: false
    }))
  }

  onClickTooltip() {

    this.setState(s => ({
      ...s, tooltipOpen: !s.tooltipOpen
    }))

    this.tooltipOnClickListener()
  };

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
  componentDidUpdate() {
    document
      .getElementById("editorContent")
      ?.contentWindow?.dispatchEvent(new Event("resize"));
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

  componentDidUpdate(prevProps) {
    document.getElementById("editorContent")?.contentWindow?.dispatchEvent(new Event("resize"));

    const prevTooltipState = prevProps.element.getSettings("tooltip_show_type");
    const tooltipState = this.props.element.getSettings("tooltip_show_type");

    if(prevTooltipState !== tooltipState) {
      this.tooltipOnClickListener(true)
    }
  }

  /**
   * Нужно ли обновлять компонент
   * @param {{}} nextProps
   * @param {{}} nextState
   */
  shouldComponentUpdate(nextProps, nextState) {
    if(this.props.ignoreUpdate){
      return false
    }
    let element = getCurrentElement()
    let needUpdate = false;
    while(element){
      needUpdate = element === this.element

      if(needUpdate){
        break;
      }
      element = element?.parent
    }
    element = this.element
    while(element){
      needUpdate = element === getCurrentElement()

      if(needUpdate){
        break;
      }
      element = element?.parent
    }
    if(!needUpdate){
      return false;
    }
    if (nextProps.globalCssEditor.globalStylesCss !== this.props.globalCssEditor.globalStylesCss) {
      return true
    }
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

    if(nextProps.currentElement !== this.props.currentElement) return true
    if(this.state.cursorPos !== nextState.cursorPos) return true;
    if(nextProps.currentScreen !== this.props.currentScreen) return true;
    if (
      nextProps.controllerValue === this.props.controllerValue &&
      this.props.element !== this.props.currentElement
    ) {
      return false;
    }

    return true;
  }
  render() {
    const elementHideTrigger = this.props.element.settings.hide_on_trigger;
    const element = this.props.element
    let {
      isFixed,
      tooltip_text,
      tooltip_minimal,
      tooltip_show_type,
      tooltip_horizontal_offset,
      tooltip_vertical_offset,
    } = this.props.element.getSettings();
    if (["column", "section"].indexOf(this.props.element.getType()) !== -1) {
      tooltip_show_type = "never";
    }
    const tooltip_position = element.getResponsiveSetting('tooltip_position') || 'bottom'

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
    if(! this.props.element?.children?.length){
      if(this.props.element.getType() === 'column'){
        classes += ' altrp-element_empty-column '
      }
    }
    if (this.props.element.getType() === "widget") {
      classes += ` altrp-widget_${this.props.element.getName()}`;
    }
    if (this.props.element.getResponsiveSetting("css_class")) {
      classes += ` ${replaceContentWithData(
        this.props.element.getResponsiveSetting("css_class"),
        this.props.element.getCurrentModel().getData()
      )} `;
    }
    if (this.props.currentElement === this.props.element) {
      classes += " altrp-element_current";
    }
    classes += this.getClasses();

    let emptyColumn = "";
    if (
      this.props.element.getType() === "column" &&
      !this.props.element.getChildren().length
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
      wrapper: this,
    };

    let WrapperComponent = "div";
    switch (this.props.element.getName()) {
      case "nav":
        WrapperComponent = NavComponent;
        break;
      // case "dashboard":
      // WrapperComponent = DashboardComponent;
      // break;
    }
    if(! this.props.element.getResponsiveSetting('tooltip_enable')){
      tooltip_show_type = 'never'
    }
    return elementHideTrigger &&
      this.props.hideTriggers.includes(elementHideTrigger) ? null : (
        <>
          {
            tooltip_show_type !== "never" && !errorContent && tooltip_show_type ?
              <AltrpTooltip2
                element={this.wrapper}
                text={tooltip_text}
                id={this.props.element.getId()}
                open={tooltip_show_type === "always" ? true : this.state.tooltipOpen}
                position={tooltip_position}
                minimal={tooltip_minimal}
                horizontal={tooltip_horizontal_offset}
                vertical={tooltip_vertical_offset}
              /> : ""
          }
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
            onMouseEnter={tooltip_show_type === "hover" ? this.tooltipOnMouseEnter : null}
            onMouseLeave={tooltip_show_type === "hover" ? this.tooltipOnMouseLeave : null}
          >
            <Overlay element={this.element}/>
            {
              errorContent || React.createElement(this.props.component, elementProps)
            }
            {emptyColumn}
            <ElementWrapperGlobalStyles
              settings={this.props.element.getSettings()}
              elementName={this.props.element.getName()}
              element={this.props.element}
              elementId={this.elementId}
              globalCssEditor={this.props.globalCssEditor}
            />
          </WrapperComponent>
        </>
    );
  }

  chooseElement(e) {
    e.stopPropagation();
    if (e.target.closest("button")) {
      e.preventDefault();
    }
    contextMenu.hideAll();

    this.props.element.setElementAsCurrent();
    getEditor().showSettingsPanel();


    if(this.props.element.getSettings("tooltip_show_type") === "click") {
      this.onClickTooltip()
    }
  }

}

function mapStateToProps(state) {
  return {
    ignoreUpdate: state.editorState.ignoreUpdate,
    currentElement: state.currentElement.currentElement,
    dragState: state.elementDrag.dragState,
    currentModel: state.currentModel,
    currentUser: state.currentUser,
    controllerValue: state.controllerValue,
    currentDataStorage: state.currentDataStorage,
    // hideTriggers: state.hideTriggers,
    currentScreen: state.currentScreen,
    globalStyles: state.globalStyles,
    globalCssEditor: state.globalStylesCssEditor,
    historyStore: state.historyStore
  };
}

export default connect(mapStateToProps)(ElementWrapper);
