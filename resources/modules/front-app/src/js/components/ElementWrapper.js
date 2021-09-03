import { withRouter } from "react-router-dom";
import { addElement } from "../store/elements-storage/actions";
import AltrpTooltip from "../../../../editor/src/js/components/altrp-tooltip/AltrpTooltip";
import { changeCurrentPageProperty } from "../store/current-page/actions";
import { ElementWrapperDivComponent } from "../../../../editor/src/js/components/widgets/styled-components/ElementWrapperComponent";
import NavComponent from "../../../../editor/src/js/components/widgets/styled-components/NavComponent";
import DEFAULT_REACT_ELEMENTS from "../constants/DEFAULT_REACT_ELEMENTS";
const {
  altrpCompare,
  altrpRandomId,
  conditionsChecker,
  isEditor,
  replaceContentWithData,
  setTitle
} = window.altrpHelpers;

class ElementWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      elementDisplay: !this.props.element.getSettings("default_hidden")
    };
    this.reactElement = this.props.element.getSettings("react_element");
    this.elementId = this.props.element.getId();
    this.settings = this.props.element.getSettings();
    props.element.wrapper = this;
    this.elementWrapperRef = React.createRef();
    this.elementRef = React.createRef();
    if(! isEditor()){
      appStore.dispatch(addElement(this));
    }
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
    this.setState(state => ({ ...state, updateToken: altrpRandomId() }));
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
    if (!element.getSettings("conditional_other")) {
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
    const {element} = this.props;
    const {
      hide_on_wide_screen,
      hide_on_desktop,
      hide_on_laptop,
      hide_on_tablet,
      hide_on_big_phone,
      hide_on_small_phone,
      hide_on_trigger,
      isFixed,
      tooltip_position
    } = element.settings;
    let { tooltip_text } = element.settings;
    let classes = `altrp-element altrp-element${element.getId()} altrp-element_${element.getType()}`;
    classes += element.getPrefixClasses() + " ";
    if (element.getType() === "widget") {
      classes += ` altrp-widget_${element.getName()}`;
    }
    if(this.props.element.getResponsiveSetting('css_class')){
      classes += ` ${replaceContentWithData(
        this.props.element.getResponsiveSetting('css_class'),
        this.props.element.getCurrentModel().getData()
      )} `;
    }
    if (hide_on_wide_screen) {
      classes += " hide_on_wide_screen";
    }
    if (hide_on_desktop) {
      classes += " hide_on_desktop";
    }
    if (hide_on_laptop) {
      classes += " hide_on_laptop";
    }
    if (hide_on_tablet) {
      classes += " hide_on_tablet";
    }
    if (hide_on_big_phone) {
      classes += " hide_on_big_phone";
    }
    if (hide_on_small_phone) {
      classes += " hide_on_small_phone";
    }
    if (isFixed) {
      classes += " fixed-section";
    }
    if (this.state.errorInfo) {
      return (
        <div className="altrp-error" data-eltype={element.getType()}>
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

    if (element.getResponsiveSetting("layout_column_width")) {
      if (
        Number(element.getResponsiveSetting("layout_column_width"))
      ) {
        styles.width =
          element.getResponsiveSetting("layout_column_width") + "%";
      } else {
        styles.width = element.getResponsiveSetting(
          "layout_column_width"
        );
      }
    }
    if (!this.state.elementDisplay) {
      styles.display = "none";
    }
    let CSSId = element.getSettings("advanced_element_id", "");
    CSSId = replaceContentWithData(
      CSSId,
      element.getCurrentModel().getData()
    );
    if (this.CSSId !== CSSId) {
      this.CSSId = CSSId;
    }
    let ContentComponent = frontElementsManager.getComponentClass(
      element.getName()
    );
    const content = React.createElement(ContentComponent, {
      ref: this.elementRef,
      rootElement: this.props.rootElement,
      ElementWrapper: this.props.ElementWrapper,
      element: element,
      children: element.getChildren(),
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
    });
    if (element.getTemplateType() === "email") {
      if (!this.state.elementDisplay) {
        return null;
      }
      return <>{content}</>;
    }

    let WrapperComponent = ElementWrapperDivComponent;
    switch (element.getName()) {
      case "nav":
        WrapperComponent = NavComponent;
        break;
    }

    tooltip_text = replaceContentWithData(
      tooltip_text,
      element.getCurrentModel().getData()
    );

    const wrapperProps = {
      className: classes,
      ref: this.elementWrapperRef,
      elementId: this.elementId,
      settings: this.settings,
      style: styles,
      id: this.CSSId,
    };
    if (
      this.reactElement ||
      DEFAULT_REACT_ELEMENTS.indexOf(element.getName()) !== -1
    ) {
      wrapperProps["data-react-element"] = element.getId();
    }
    if(! _.isEmpty(element.getResponsiveSetting('wrapper_click_actions'))){
      wrapperProps["data-altrp-wrapper-click-actions"] = element.getId();
    }
    if(! _.isEmpty(element.getResponsiveSetting('sticky'))){
      wrapperProps["data-altrp-sticky"] = element.getResponsiveSetting('sticky');
      wrapperProps["data-altrp-sticky-spacing"] = element.getResponsiveSetting('st_spacing');
      wrapperProps["data-margin-top"] = element.getResponsiveSetting('st_spacing') || 0;
    }
    wrapperProps["data-altrp-id"] = element.getId();
    return  (
      <WrapperComponent {...wrapperProps} element={element.getId()}>
        {content}
        {tooltip_text && (
          <AltrpTooltip position={tooltip_position}>
            {tooltip_text}
          </AltrpTooltip>
        )}
      </WrapperComponent>
    );
  }
}

function mapStateToProps(state) {
  return {
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
let _export;
if(window['h-altrp']){
  _export = ElementWrapper;
} else {
  _export = withRouter(ElementWrapper)
}
export default window.reactRedux.connect(mapStateToProps, null, null, {
  forwardRef: true
})(_export);
