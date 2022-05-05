const {
  convertData,
  isEditor,
  parseOptionsFromSettings,
  parseParamsFromString,
  renderIcon,
  replaceContentWithData,
  getDataFromLocalStorage
} = window.altrpHelpers;
import Resource from "../../classes/Resource";
import { changeFormFieldValue } from "../../../../../front-app/src/js/store/forms-data-storage/actions";
import AltrpModel from "../../classes/AltrpModel";
import FromIcon from "../../../svgs/form-horizontal.svg";


(window.globalDefaults = window.globalDefaults || []).push(`
 /*здесь css стилей по умолчанию с селекторами*/
`)


class InputHiddenWidget extends Component {
  timeInput = null;

  constructor(props) {
    super(props);
    props.element.component = this;
    if (window.elementDecorator) {
      window.elementDecorator(this);
    }
    this.onChange = this.onChange.bind(this);
    this.debounceDispatch = this.debounceDispatch.bind(this);

    this.defaultValue = this.getLockedContent("content_default_value") || "";
    this.state = {
      settings: { ...props.element.getSettings() },
      value: this.defaultValue,
      options: parseOptionsFromSettings(
        props.element.getLockedSettings("content_options")
      ),
      paramsForUpdate: null
    };
    this.altrpSelectRef = React.createRef();
    if (this.getLockedContent("content_default_value")) {
      this.dispatchFieldValueToStore(this.getLockedContent("content_default_value"));
    }
  }

  /**
   * Чистит значение
   */
  clearValue() {
    this.onChange("");
    this.dispatchFieldValueToStore("", true);
  }

  /**
   * Обработка нажатия клавиши
   * @param {{}} e
   */
  handleEnter = e => {
    if (e.keyCode === 13) {
      e.preventDefault();
      const inputs = Array.from(document.querySelectorAll("input,select"));
      const index = inputs.indexOf(e.target);
      if (index === undefined) return;
      inputs[index + 1] && inputs[index + 1].focus();
      const {
        create_allowed,
        create_label,
        create_url
      } = this.props.element.getLockedSettings();
      if (create_allowed && create_label && create_url) {
        this.createItem(e);
      }
    }
  };

  /**
   * Загрузка виджета
   * @param {{}} prevProps
   * @param {{}} prevState
   */
  async _componentDidMount(prevProps, prevState) {
    if (this.props.element.getLockedSettings("content_options")) {
      let options = parseOptionsFromSettings(
        this.props.element.getLockedSettings("content_options")
      );

      this.setState(state => ({ ...state, options }));
    }

    let value = this.state.value;

    /**
     * Если динамическое значение загрузилось,
     * то используем this.getLockedContent для получение этого динамического значения
     * старые динамические данные
     * */
    if (
      _.get(value, "dynamic") &&
      this.props.currentModel.getProperty("altrpModelUpdated")
    ) {
      value = this.getLockedContent("content_default_value");
    }

    /**
     * Если модель обновилась при смене URL
     */
    if (
      prevProps &&
      !prevProps.currentModel.getProperty("altrpModelUpdated") &&
      this.props.currentModel.getProperty("altrpModelUpdated")
    ) {
      value = this.getLockedContent("content_default_value");
      this.setState(
        state => ({ ...state, value, contentLoaded: true }),
        () => {
          this.dispatchFieldValueToStore(value);
        }
      );
      return;
    }

    if (
      this.props.currentModel.getProperty("altrpModelUpdated") &&
      this.props.currentDataStorage.getProperty("currentDataStorageLoaded") &&
      !this.state.contentLoaded
    ) {
      value = this.getLockedContent("content_default_value");
      this.setState(
        state => ({ ...state, value, contentLoaded: true }),
        () => {
          this.dispatchFieldValueToStore(value);
        }
      );
      return;
    }

    if (this.state.value !== value) {
      this.setState(
        state => ({ ...state, value }),
        () => {
          this.dispatchFieldValueToStore(value);
        }
      );
    }
  }

  /**
   * Получить url для запросов
   */
  getRoute() {
    let url = this.props.element.getLockedSettings("model_for_options");

    if (url.indexOf("/") === -1) {
      return `/ajax/models/${url}_options`;
    }
    if (url.indexOf("{{") !== -1) {
      url = replaceContentWithData(url);
    }
    return url;
  }

  /**
   * Обновление виджета
   */
  async _componentDidUpdate(prevProps, prevState) {
    const { content_options, model_for_options } = this.state.settings;

    if (
      prevProps &&
      !prevProps.currentDataStorage.getProperty("currentDataStorageLoaded") &&
      this.props.currentDataStorage.getProperty("currentDataStorageLoaded")
    ) {
      let value = this.getLockedContent(
        "content_default_value",
        this.props.element.getLockedSettings("select2_multiple")
      );
      this.setState(
        state => ({ ...state, value, contentLoaded: true }),
        () => {
          this.dispatchFieldValueToStore(value);
        }
      );
    }

    /**
     * Если обновилась модель, то пробрасываем в стор новое значение (старый источник диамических данных)
     */
    if (
      !_.isEqual(this.props.currentModel, prevProps.currentModel) &&
      this.state.value &&
      this.state.value.dynamic
    ) {
      this.dispatchFieldValueToStore(this.getLockedContent("content_default_value"));
    }

    /**
     * Если обновилось хранилище данных формы, currentDataStorage или модель, то получаем новые опции c сервера
     */
    if (
      this.props.formsStore !== prevProps.formsStore ||
      this.props.currentModel !== prevProps.currentModel ||
      this.props.currentDataStorage !== prevProps.currentDataStorage
    ) {
      this.updateOptions();
    }
    if (content_options && !model_for_options) {
      let options = parseOptionsFromSettings(content_options);
      if (!_.isEqual(options, this.state.options)) {
        this.setState(state => ({ ...state, options }));
      }
    }
    this.updateValue(prevProps);
  }

  /**
   * Обновить значение если нужно
   * @param {{}} prevProps
   */
  updateValue(prevProps) {

    if (isEditor()) {
      return;
    }

    let content_calculation = this.props.element.getLockedSettings(
      "content_calculation"
    );
    const altrpforms = this.props.formsStore;
    const fieldName = this.props.element.getFieldId();
    const formId = this.props.element.getFormId();

    if (!content_calculation) {
      /**
       * Обновить значение, если formsStore изменилось из другого компонента
       */
      const path = `${formId}.${fieldName}`;
      if (
        this.props.formsStore !== prevProps.formsStore &&
        _.get(altrpforms, path) !== this.state.value
      ) {
        this.setState(state => ({
          ...state,
          value: _.get(altrpforms, path)
        }));
      }
      return;
    }

    const prevContext = {};
    const altrpdata = this.props.currentDataStorage.getData();
    const altrpmodel = this.props.currentModel.getData();
    const altrpuser = this.props.currentUser.getData();
    const altrppagestate = this.props.altrpPageState.getData();
    const altrpresponses = this.props.altrpresponses.getData();
    const altrpmeta = this.props.altrpMeta.getData();
    const context = this.props.element.getCurrentModel().getData();

    if (content_calculation.indexOf("altrpdata") !== -1) {
      context.altrpdata = altrpdata;
      if (!altrpdata.currentDataStorageLoaded) {
        prevContext.altrpdata = altrpdata;
      } else {
        prevContext.altrpdata = prevProps.currentDataStorage.getData();
      }
    }

    if (content_calculation.indexOf("altrpforms") !== -1) {
      context.altrpforms = altrpforms;
      /**
       * Не производим вычисления, если изменилось текущее поле
       */
      if (`${formId}.${fieldName}` === altrpforms.changedField) {
        prevContext.altrpforms = altrpforms;
      } else {
        prevContext.altrpforms = prevProps.formsStore;
      }
    }

    if (content_calculation.indexOf("altrpmodel") !== -1) {
      context.altrpmodel = altrpmodel;
      prevContext.altrpmodel = prevProps.currentModel.getData();
    }

    if (content_calculation.indexOf("altrpuser") !== -1) {
      context.altrpuser = altrpuser;
      prevContext.altrpuser = prevProps.currentUser.getData();
    }

    if (content_calculation.indexOf("altrpuser") !== -1) {
      context.altrpuser = altrpuser;
      prevContext.altrpuser = prevProps.currentUser.getData();
    }

    if (content_calculation.indexOf("altrppagestate") !== -1) {
      context.altrppagestate = altrppagestate;
      prevContext.altrppagestate = prevProps.altrpPageState.getData();
    }

    if (content_calculation.indexOf("altrpmeta") !== -1) {
      context.altrpmeta = altrpmeta;
      prevContext.altrpmeta = prevProps.altrpMeta.getData();
    }

    if (content_calculation.indexOf("altrpresponses") !== -1) {
      context.altrpresponses = altrpresponses;
      prevContext.altrpresponses = prevProps.altrpresponses.getData();
    }

    if (content_calculation.indexOf("altrpstorage") !== -1) {
      context.altrpstorage = getDataFromLocalStorage("altrpstorage", {});
    }

    if (
      _.isEqual(prevProps.currentDataStorage, this.props.currentDataStorage) &&
      _.isEqual(prevProps.currentUser, this.props.currentUser) &&
      _.isEqual(prevProps.formsStore, this.props.formsStore) &&
      _.isEqual(prevProps.altrpPageState, this.props.altrpPageState) &&
      _.isEqual(prevProps.altrpMeta, this.props.altrpMeta) &&
      _.isEqual(prevProps.altrpresponses, this.props.altrpresponses) &&
      _.isEqual(prevProps.currentModel, this.props.currentModel)
    ) {
      return;
    }

    if (
      !_.isEqual(prevProps.formsStore, this.props.formsStore) &&
      `${formId}.${fieldName}` === altrpforms.changedField
    ) {
      return;
    }

    let value = "";

    try {
      content_calculation = content_calculation
        .replace(/}}/g, "')")
        .replace(/{{/g, "_.get(context, '");
      value = eval(content_calculation);
      if (value === this.state.value) {
        return;
      }
      this.setState(
        state => ({ ...state, value }),
        () => {
          this.dispatchFieldValueToStore(value);
        }
      );
    } catch (e) {
      console.error(
        "Evaluate error in Input: '" + e.message + "'",
        this.props.element.getId()
      );
    }
  }

  /**
   * Обновляет опции для селекта при обновлении данных, полей формы
   */
  async updateOptions() {
    {
      let formId = this.props.element.getFormId();
      let paramsForUpdate = this.props.element.getLockedSettings("params_for_update");
      let formData = _.get(this.props.formsStore, [formId], {});
      paramsForUpdate = parseParamsFromString(
        paramsForUpdate,
        new AltrpModel(formData)
      );
      /**
       * Сохраняем параметры запроса, и если надо обновляем опции
       */
      let options = [...this.state.options];

      if (!_.isEqual(paramsForUpdate, this.state.paramsForUpdate)) {
        if (!_.isEmpty(paramsForUpdate)) {
          if (this.props.element.getLockedSettings("params_as_filters", false)) {
            paramsForUpdate = JSON.stringify(paramsForUpdate);
            options = await new Resource({
              route: this.getRoute()
            }).getQueried({ filters: paramsForUpdate });
          } else {
            options = await new Resource({ route: this.getRoute() }).getQueried(
              paramsForUpdate
            );
          }
          options = !_.isArray(options) ? options.data : options;
          options = _.isArray(options) ? options : [];
        } else if (this.state.paramsForUpdate) {
          options = await new Resource({ route: this.getRoute() }).getAll();
          options = !_.isArray(options) ? options.data : options;
          options = _.isArray(options) ? options : [];
        }

        this.setState(state => ({
          ...state,
          paramsForUpdate,
          options
        }));
      }
    }
  }

  /**
   * Изменение значения в виджете
   * @param e
   * @param  editor для получения изменений из CKEditor
   */
  onChange(e, editor = null) {
    let value = "";
    let valueToDispatch;

    if (e && e.target) {
      value = e.target.value;
    }

    if (e && e.value) {
      value = e.value;
    }

    if (_.get(editor, "getData")) {
      value = `<div class="ck ck-content" style="width:100%">${editor.getData()}</div>`;
    }

    if (_.isArray(e)) {
      value = _.cloneDeep(e);
    }

    if (
      this.props.element.getLockedSettings("content_options_nullable") &&
      e &&
      e.value === "<null>"
    ) {
      value = null;
    }

    this.setState(
      state => ({
        ...state,
        value
      }),
      () => {
        /**
         * Обновляем хранилище только если не текстовое поле
         */

        const change_actions = this.props.element.getLockedSettings("change_actions");
        const change_change_end = this.props.element.getLockedSettings(
          "change_change_end"
        );
        const change_change_end_delay = this.props.element.getLockedSettings(
          "change_change_end_delay"
        );

        if (change_actions && !change_change_end && !isEditor()) {
          this.debounceDispatch(
            valueToDispatch !== undefined ? valueToDispatch : value
          );
        }
        if (change_actions && change_change_end && !isEditor()) {
          this.timeInput && clearTimeout(this.timeInput);
          this.timeInput = setTimeout(() => {
            this.debounceDispatch(
              valueToDispatch !== undefined ? valueToDispatch : value
            );
          }, change_change_end_delay);
        }
      }
    );
  }

  debounceDispatch = _.debounce(
    value => this.dispatchFieldValueToStore(value, true),
    150
  );

  /**
   * получить опции
   */
  getOptions() {
    let options = [...this.state.options];
    const optionsDynamicSetting = this.props.element.getDynamicSetting(
      "content_options"
    );

    if (optionsDynamicSetting) {
      options = convertData(optionsDynamicSetting, options);
    }

    if (!this.props.element.getLockedSettings("sort_default")) {
      options = _.sortBy(options, o => o && (o.label ? o.label.toString() : o));
    }

    return options;
  }

  /**
   * Передадим значение в хранилище формы
   * @param {*} value
   * @param {boolean} userInput true - имзенилось пользователем
   */
  dispatchFieldValueToStore = async (value, userInput = false) => {
    let formId = this.props.element.getFormId();
    let fieldName = this.props.element.getFieldId();

    if (fieldName.indexOf("{{") !== -1) {
      fieldName = replaceContentWithData(fieldName);
    }

    if (_.isObject(this.props.appStore) && fieldName && formId) {
      this.props.appStore.dispatch(
        changeFormFieldValue(fieldName, value, formId, userInput)
      );

      if (userInput) {
        const change_actions = this.props.element.getLockedSettings("change_actions");

        if (change_actions && !isEditor()) {
          const actionsManager = (
            await import(
              /* webpackChunkName: 'ActionsManager' */
              "../../../../../front-app/src/js/classes/modules/ActionsManager.js"
            )
          ).default;
          await actionsManager.callAllWidgetActions(
            this.props.element.getIdForAction(),
            "change",
            change_actions,
            this.props.element
          );
        }
      }
    }
  };


  /**
   * Взовращает имя для атрибута name
   * @return {string}
   */
  getName() {
    return `${this.props.element.getFormId()}[${this.props.element.getFieldId()}]`;
  }
  /**
   *
   * @returns {*}
   */
  getValue = () => {
    let value;
    let formId = this.props.element.getFormId();
    let fieldName = this.props.element.getFieldId();
    if (isEditor()) {
      value = this.state.value;
    } else {

      value = _.get(appStore.getState().formsStore, `${formId}`, '')
      value = _.get(value, fieldName, '')
    }
    return value;
  }

  /**
   * Получить css классы для input hidden
   */
  getClasses = ()=>{
    let classes = ``;
    if(this.isActive()){
      classes += 'active '
    }
    if(this.isDisabled()){
      classes += 'state-disabled '
    }
    return classes;
  }

  render() {
    if(isEditor()){
      return <FromIcon/>
    }
    let value = this.getValue()
    let classes =
      this.getClasses() + (this.state.settings.position_css_classes || "")

    return <input
      value={value}
      type="hidden"
      name={this.getName()}
      id={this.getName()}
      className={classes}
    />
  }
}

export default InputHiddenWidget;
