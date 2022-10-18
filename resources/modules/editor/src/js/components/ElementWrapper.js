import CKEditor from "./ckeditor/CKeditor";
import AddIcon from "../../svgs/add.svg";
import store, {getCurrentElement} from "../store/store";
import {  startDrag } from "../store/element-drag/actions";
import { contextMenu } from "react-contexify";
import { setCurrentContextElement } from "../store/current-context-element/actions";
import NavComponent from "./widgets/styled-components/NavComponent";
import Column from "../classes/elements/Column";
import {
  getEditor,
  topOrBottomHover,
  editorSetCurrentElement
} from "../helpers";
import AltrpTooltip2 from "./altrp-tooltip/AltrpTooltip2";
import Overlay from "./Overlay";

const { connect } = window.reactRedux;
import replaceContentWithData from "../../../../front-app/src/js/functions/replaceContentWithData";
import ElementWrapperGlobalStyles from "./ElementWrapperGlobalStyles";
import AltrpSkeletonBox from "./altrp-skeleton-box/AltrpSkeletonBox";


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
    if(nextProps.currentScreen !== this.props.currentScreen) return true;
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


    /**
     * не обновляем элемент, если изменился контроллер не текущего элемента
     */


    if(this.state.cursorPos !== nextState.cursorPos) return true;
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
    const showSkeleton = this.element.settings['skeleton:preview'] && this.element.settings['skeleton:enable']
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
    console.log(this.wrapper);

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
              errorContent ||
              <>
              {this.element.settings['skeleton:enable'] &&
                <AltrpSkeletonBox
                  settings={{...this.element.settings}}
                  element={this.element}/>}
              {! showSkeleton && React.createElement(this.props.component, elementProps)}
              </>
            }
            {emptyColumn}
            <ElementWrapperGlobalStyles
                settings={this.props.element.getSettings()}
                elementName={this.props.element.getName()}
                element={this.props.element}
                elementId={this.elementId}
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
    historyStore: state.historyStore
  };
}

export default connect(mapStateToProps)(ElementWrapper);
