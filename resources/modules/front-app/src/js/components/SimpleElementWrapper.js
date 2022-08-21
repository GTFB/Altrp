import { addElement } from "../store/elements-storage/actions";
import { changeCurrentPageProperty } from "../store/current-page/actions";
import NavComponent from "../../../../editor/src/js/components/widgets/styled-components/NavComponent";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import styled from "styled-components";
import AltrpTooltip2 from "../../../../editor/src/js/components/altrp-tooltip/AltrpTooltip2";
import React from "react";
import EntranceAnimationsStyles from "./EntranceAnimationsStyles";
import isEditor from "../functions/isEditor";
import replaceContentWithData from "../functions/replaceContentWithData";
import setTitle from "../functions/setTitle";
import altrpRandomId from "../functions/altrpRandomId";
import conditionsChecker from "../functions/conditionsChecker";
import altrpCompare from "../functions/altrpCompare";

const TransparentDiv = styled.div`
`;

class SimpleElementWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elementDisplay: !this.props.element.getSettings("default_hidden")
    };
    props.element.wrapper = this;
    this.elementWrapperRef = this.props.elementWrapperRef;
    this.elementRef = React.createRef();
    this.wrapper = React.createRef();
    this.settings = props.element.getSettings();
    this.onClickTooltip = this.onClickTooltip.bind(this);
    this.closeTooltip = this.closeTooltip.bind(this);
    this.tooltipOnMouseEnter = this.tooltipOnMouseEnter.bind(this);
    this.tooltipOnMouseLeave = this.tooltipOnMouseLeave.bind(this);
    appStore.dispatch(addElement(this));
    this.elementId = props.element.getId();

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
   * Иногда надо обновить элемент (FrontElement)
   */
  componentDidMount() {
    !isEditor() && window?.frontApp?.onWidgetMount();
    if (_.isFunction(this.props.element.update)) {
      this.props.element.update();
      this.props.element.updateFonts();
    }
    this.checkElementDisplay();

    window.addEventListener("load", () => {
      window.dispatchEvent(new Event("resize"));
    })

    const {element} = this.props
    // const mountElementEvent = new Event(`altrp-mount-element:${element.getId()}` );
    // const mountElementTypeEvent = new Event(`altrp-mount-element:${element.getName()}` );
    // document.dispatchEvent(mountElementEvent)
    // document.dispatchEvent(mountElementTypeEvent)
  }

  componentWillUnmount() {
    const {element} = this.props
    const unmountElementEvent = new Event(`altrp-unmount-element:${element.getId()}` );
    const unmountElementTypeEvent = new Event(`altrp-unmount-element:${element.getName()}` );
    document.dispatchEvent(unmountElementEvent)
    document.dispatchEvent(unmountElementTypeEvent)
  }
  /**
   * Подписываемся на обновление store редакса
   */
  updateStore = () => {
    if (this.state.currentModel !== appStore.getState().currentModel) {
      this.setState(state => ({
        ...state,
        currentModel: appStore.getState().currentModel
      }));
    }
    /**
     * Обновляем пользователя
     */
    if (this.state.currentUser !== appStore.getState().currentUser) {
      this.setState(state => ({
        ...state,
        currentModel: appStore.getState().currentUser
      }));
    }

    /**
     * Обновляем currentDataStorage
     */
    if (
      this.state.currentDataStorage !== appStore.getState().currentDataStorage
    ) {
      this.setState(state => ({
        ...state,
        currentDataStorage: appStore.getState().currentDataStorage
      }));
    }
  };

  /**
   * Вернет HTMLElement, в котором записаны css стили текущего компонента
   * @return {null | HTMLElement}
   */
  getStylesHTMLElement() {
    if (!_.get(window, "stylesModule.stylesContainer.current")) {
      return null;
    }

    return (
      window.stylesModule.stylesContainer.current.getElementsByClassName(
        `altrp-styles${this.props.element.getId()}`
      )[0] || null
    );
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
      document.removeEventListener("click", this.closeTooltip, {
        capture: true
      });
    } else {
      document.addEventListener("click", this.closeTooltip, {
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
   * Нужно ли обновить отображение обертки элементов
   * @param {{}} prevProps
   * @param {{}} prevState
   */
  componentDidUpdate(prevProps, prevState) {
    this.checkElementDisplay();
    if (
      appStore.getState().currentModel.getProperty("altrpModelUpdated") &&
      appStore
        .getState()
        .currentDataStorage.getProperty("currentDataStorageLoaded") &&
      !isEditor() &&
      this.props.element.getName() === "section"
    ) {
      let title = appStore.getState().currentTitle;
      title = replaceContentWithData(title);
      if (appStore.getState().altrpPage.getProperty("title") !== title) {
        appStore.dispatch(changeCurrentPageProperty("title", title));
      }
      setTitle(title);
    }
  }
  /**
   * Обновить элемент изменив this.state.updateToken
   */
  updateElement() {
    this.setState(state => ({
      ...state,
      updateToken: altrpRandomId()
    }));
  }

  /**
   * Проверка видимости элемента
   * @param {{}} prevProps
   * @param {{}} prevState
   */
  checkElementDisplay(prevProps, prevState) {
    /**
     * @member {FrontElement} element
     */
    const { element } = this.props;
    if (! element.getSettings("conditional_other")) {
      return;
    }
    let conditions = element.getSettings("conditions", []);
    conditions = conditions.map(c => {
      const {
        conditional_model_field: modelField,
        conditional_other_operator: operator,
        conditional_other_condition_value: value
      } = c;
      return {
        modelField,
        operator,
        value
      };
    });
    let elementDisplay = conditionsChecker(
      conditions,
      element.getSettings("conditional_other_display") === "AND",
      this.props.element.getCurrentModel(),
      true
    );

    if (this.state.elementDisplay === elementDisplay) {
      return;
    }
    this.setState(state => ({
      ...state,
      elementDisplay
    }));
  }

  shouldComponentUpdate(newProps, newState){
    const {element} = this.props;
    let {dependencies} = element;
    if(isEditor()){
      return false
    }
    dependencies = dependencies || []

    if(newState.elementDisplay !== this.state.elementDisplay){
      return true
    }

    if(newProps.altrpPageState !== this.props.altrpPageState
      && dependencies.indexOf('altrppagestate') === -1){
      ++window.countReduced
      return false
    }
    if(newProps.currentDataStorage !== this.props.currentDataStorage
      && dependencies.indexOf('altrpdata') === -1){
      ++window.countReduced
      return false
    }
    if(newProps.altrpresponses !== this.props.altrpresponses
      && dependencies.indexOf('altrpresponses') === -1){
      ++window.countReduced
      return false
    }
    if(newProps.formsStore !== this.props.formsStore
      && dependencies.indexOf('altrpforms') === -1){
      ++window.countReduced
      if(element.getName().indexOf('input') > -1 || element.getName() === 'textarea'){
        if(! newProps.formsStore.changedField){
          return true
        }
        return `${element.getFormId()}.${element.getFieldId()}`
          === newProps.formsStore.changedField
      }
      return false
    }
    if(newProps.altrpMeta !== this.props.altrpMeta
      && dependencies.indexOf('altrpmeta') === -1){
      ++window.countReduced
      return false
    }
    ++window.count;
    return true
  }
  /**
   * Переключает видимость элемента
   */
  toggleElementDisplay() {
    this.setState(state => ({
      ...state,
      elementDisplay: !state.elementDisplay
    }));
  }
  /**
   * Метод для проверки видимости поля формы
   * @return {boolean}
   */
  inputIsDisplay() {
    const { formsStore } = this.state;
    const formId = this.props.element.getSettings("form_id", "");
    const logic = this.props.element.getSettings(
      "form_condition_display_on",
      "AND"
    );
    const formConditions = this.props.element.getSettings(
      "form_conditions",
      []
    );
    let display = true;
    formConditions.forEach(c => {
      if (logic === "AND") {
        display *= altrpCompare(
          _.get(formsStore, `${formId}.${c.field_id}`),
          c.value,
          c.operator
        );
      } else {
        display += altrpCompare(
          _.get(formsStore, `${formId}.${c.field_id}`),
          c.value,
          c.operator
        );
      }
    });
    return display;
  }

  render() {
    /**
     * @member {FrontElement} element
     */
    const {
      element
    } = this.props;
    const tooltip_position = element.getResponsiveSetting('tooltip_position') || 'bottom'
    let tooltip_text = this.props.element.getResponsiveSetting('tooltip_text')
    const tooltip_minimal = this.props.element.getResponsiveSetting('tooltip_minimal')
    let tooltip_show_type = this.props.element.getResponsiveSetting('tooltip_show_type')
    const tooltip_horizontal_offset = this.props.element.getResponsiveSetting('tooltip_horizontal_offset')
    const tooltip_vertical_offset = this.props.element.getResponsiveSetting('tooltip_vertical_offset')


    if (this.state.errorInfo) {
      return (
        <div className="altrp-error" data-eltype={this.props.element.getType()}>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: "pre-wrap" }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    const styles = {};

    if (!this.state.elementDisplay) {
      styles.display = "none";
    }
    let CSSId = this.props.element.getSettings("advanced_element_id", "");
    CSSId = replaceContentWithData(
      CSSId,
      this.props.element.getCurrentModel().getData()
    );
    if (this.CSSId !== CSSId) {
      this.CSSId = CSSId;
    }
    let ContentComponent = frontElementsManager.getComponentClass(
      this.props.element.getName()
    );
    let content
    if (this.props.element.getName() === "table") {
      content = <DndProvider backend={HTML5Backend}>{
        React.createElement(ContentComponent, {
          ref: this.elementRef,
          rootElement: this.props.rootElement,
          ElementWrapper: this.props.ElementWrapper,
          element: this.props.element,
          children: this.props.element.getChildren(),
          match: this.props.match,
          currentModel: this.props.currentModel,
          currentUser: this.props.currentUser,
          currentDataStorage: this.props.currentDataStorage,
          altrpresponses: this.props.altrpresponses,
          formsStore: this.props.formsStore,
          elementDisplay: this.state.elementDisplay,
          altrpPageState: this.props.altrpPageState,
          altrpMeta: this.props.altrpMeta,
          updateToken: this.state.updateToken,
          currentScreen: this.props.currentScreen,
          baseRender: this.props.baseRender,
          history: this.props.history,
          appStore
        })}</DndProvider>;
    } else {
      content =
        React.createElement(ContentComponent, {
          ref: this.elementRef,
          rootElement: this.props.rootElement,
          ElementWrapper: this.props.ElementWrapper,
          element: this.props.element,
          children: this.props.element.getChildren(),
          match: this.props.match,
          currentModel: this.props.currentModel,
          currentUser: this.props.currentUser,
          currentDataStorage: this.props.currentDataStorage,
          altrpresponses: this.props.altrpresponses,
          formsStore: this.props.formsStore,
          elementDisplay: this.state.elementDisplay,
          altrpPageState: this.props.altrpPageState,
          altrpMeta: this.props.altrpMeta,
          updateToken: this.state.updateToken,
          currentScreen: this.props.currentScreen,
          baseRender: this.props.baseRender,
          history: this.props.history,
          appStore
        })
      ;
    }
    let WrapperComponent = TransparentDiv;

    switch (this.props.element.getName()) {
      case "nav":
        WrapperComponent = NavComponent;
        break;
      case "menu":
      case "input-file":
      case "section":
      case "section_widget":
      case "input-crop-image":
      case "icon":
      case "column":
        WrapperComponent = React.Fragment;
        break;
    }
    tooltip_text = replaceContentWithData(
      tooltip_text,
      this.props.element.getCurrentModel().getData()
    );

    let wrapperProps = {
      elementId: this.elementId,
      settings: this.settings,
      ref: this.wrapper,
      style: styles,
      onClick: tooltip_show_type === "click" ? this.onClickTooltip : null,
      onMouseEnter: tooltip_show_type === "hover" ? this.tooltipOnMouseEnter : null,
      onMouseLeave: tooltip_show_type === "hover" ? this.tooltipOnMouseLeave : null,
    };
    const entranceAnimationType = element.getResponsiveSetting('en_an');
    if (entranceAnimationType) {
      wrapperProps['data-enter-animation-type'] = entranceAnimationType;
      wrapperProps['data-enter-animation-delay'] = element.getResponsiveSetting('en_a_delay')?.size || 0;
      wrapperProps.className = 'dynamic-animation altrp-invisible'
      content = <>
        <EntranceAnimationsStyles settings={element.getSettings()} elementId={element.getId()}/>
        {content}
      </>
    }
    if (WrapperComponent === React.Fragment) {
      wrapperProps = {};
    }
    this.updateHTMLElementDisplay()

    if(['column', 'section'].indexOf(this.props.element.getType()) !== -1){
      tooltip_show_type = 'never'
    }
    if(! this.props.element.getResponsiveSetting('tooltip_enable')){
      tooltip_show_type = 'never'
    }
    return (
      <>
        {
          tooltip_show_type && (tooltip_show_type !== "never" && tooltip_show_type !== "Never") ?
            <AltrpTooltip2
              element={this.wrapper}
              text={tooltip_text}
              id={this.props.element.getId()}
              open={tooltip_show_type === "always" ? true : this.state.tooltipOpen}
              position={tooltip_position}
              minimal={tooltip_minimal}
              horizontal={tooltip_horizontal_offset}
              vertical={tooltip_vertical_offset}
            /> : ''
        }
        <WrapperComponent {...wrapperProps} >
          {content}
        </WrapperComponent>

      </>
    );
  }

  updateHTMLElementDisplay() {
    const HTMLElement = document.querySelector(`[data-react-element="${this.props.element.getId()}"]`)
    if(HTMLElement){
      HTMLElement.style.display = this.state.elementDisplay ? null : 'none';
    }
  }
}

function mapStateToProps(state) {
  return {
    hideTriggers: state.hideTriggers,
    altrpresponses: state.altrpresponses,
    formsStore: state.formsStore,
    currentDataStorage: state.currentDataStorage,
    currentModel: state.currentModel,
    currentUser: state.currentUser,
    altrpMeta: state.altrpMeta,
    altrpPageState: state.altrpPageState,
    currentScreen: state.currentScreen
  };
}

export default window.reactRedux.connect(mapStateToProps)(SimpleElementWrapper);
