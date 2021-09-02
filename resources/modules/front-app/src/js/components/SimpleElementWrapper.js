import { addElement } from "../store/elements-storage/actions";
import { changeCurrentPageProperty } from "../store/current-page/actions";
import AltrpTooltip from "../../../../editor/src/js/components/altrp-tooltip/AltrpTooltip";
import NavComponent from "../../../../editor/src/js/components/widgets/styled-components/NavComponent";
import DiagramComponent from "../../../../editor/src/js/components/widgets/styled-components/DiagramComponent";
import DashboardComponent from "../../../../editor/src/js/components/widgets/styled-components/DashboardComponent";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";

class SimpleElementWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      elementDisplay: !this.props.element.getSettings("default_hidden"),
    };
    props.element.wrapper = this;
    this.elementWrapperRef = this.props.elementWrapperRef;
    this.elementRef = React.createRef();
    this.settings = props.element.getSettings();
    appStore.dispatch(addElement(this));
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
    ! window.altrpHelpers.isEditor() && window?.frontApp?.onWidgetMount();
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
    if (appStore.getState().currentModel.getProperty('altrpModelUpdated') &&
      appStore.getState().currentDataStorage.getProperty('currentDataStorageLoaded') &&
      !window.altrpHelpers.isEditor() &&
      this.props.element.getName() === 'section') {
      let title = appStore.getState().currentTitle;
      title = window.altrpHelpers.replaceContentWithData(title);
      if (appStore.getState().altrpPage.getProperty('title') !== title) {
        appStore.dispatch(changeCurrentPageProperty('title', title));
      }
      window.altrpHelpers.setTitle(title);
    }
  }

  /**
   * Обновить элемент изменив this.state.updateToken
   */
  updateElement() {
    this.setState(state => ({ ...state, updateToken: window.altrpHelpers.altrpRandomId() }))
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
    let elementDisplay = window.altrpHelpers.conditionsChecker(
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
        display *= window.altrpHelpers.altrpCompare(
          _.get(formsStore, `${formId}.${c.field_id}`),
          c.value,
          c.operator
        );
      } else {
        display += window.altrpHelpers.altrpCompare(
          _.get(formsStore, `${formId}.${c.field_id}`),
          c.value,
          c.operator
        );
      }
    });
    return display;
  }

  render() {
    const {
      hide_on_trigger,
      tooltip_position
    } = this.props.element.settings;
    let {
      tooltip_text,
      tooltip_minimal,
      tooltip_show_type,
      tooltip_horizontal_offset,
      tooltip_vertical_offset,
    } = this.props.element.settings

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

    if (this.props.element.getResponsiveSetting('layout_column_width')) {
      if (Number(this.props.element.getResponsiveSetting('layout_column_width'))) {
        styles.width = this.props.element.getResponsiveSetting('layout_column_width') + '%';
      } else {
        styles.width = this.props.element.getResponsiveSetting('layout_column_width');
      }
    }
    if (!this.state.elementDisplay) {
      styles.display = "none";
    }
    let CSSId = this.props.element.getSettings("advanced_element_id", "");
    CSSId = window.altrpHelpers.replaceContentWithData(CSSId, this.props.element.getCurrentModel().getData());
    if (this.CSSId !== CSSId) {
      this.CSSId = CSSId;
    }
    let ContentComponent = frontElementsManager.getComponentClass(this.props.element.getName());
    let content = React.createElement(ContentComponent, {
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
    });
    if(this.props.element.getName() === 'table'){
      content = <DndProvider backend={HTML5Backend}>
        {content}
      </DndProvider>
      }
    let WrapperComponent = React.Fragment;

    switch (this.props.element.getName()) {
      case "diagram":
        WrapperComponent = DiagramComponent;
        break;
      case "dashboards":
        WrapperComponent = DashboardComponent;
        break;
      case "nav":
        WrapperComponent = NavComponent;
        break;
    }
    tooltip_text = window.altrpHelpers.replaceContentWithData(tooltip_text, this.props.element.getCurrentModel().getData())
    const wrapperProps = {
      elementId: this.elementId,
      settings: this.settings,
      styles
    };
    if(WrapperComponent === React.Fragment){
      delete  wrapperProps.elementId;
      delete  wrapperProps.settings;
      delete  wrapperProps.styles;
      if(this.state.elementDisplay){
        this.elementWrapperRef.current.style.display = null;
      } else {
        this.elementWrapperRef.current.style.display = 'none';
      }
    }

    return this.props.hideTriggers.includes(hide_on_trigger) ? null : (
      <WrapperComponent {...wrapperProps} >
        {
          tooltip_show_type !== "never" ?
            <AltrpTooltip
              text={tooltip_text}
              id={this.props.element.getId()}
              state={tooltip_show_type}
              position={tooltip_position}
              minimal={tooltip_minimal}
              horizontal={tooltip_horizontal_offset}
              vertical={tooltip_vertical_offset}
            >
              {
                content
              }
            </AltrpTooltip>
            : content

        }
      </WrapperComponent>
    );
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
    currentScreen: state.currentScreen,
  };
}

export default window.reactRedux.connect(mapStateToProps)(SimpleElementWrapper);
