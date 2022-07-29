const {
  altrpCompare,
  convertData,
  isEditor,
  parseOptionsFromSettings,
  parseParamsFromString,
  parseURLTemplate,
  replaceContentWithData,
  renderAssetIcon,
  getDataByPath,
  getDataFromLocalStorage
} = window.altrpHelpers;
import Resource from "../../classes/Resource";
import { changeFormFieldValue } from "../../../../../front-app/src/js/store/forms-data-storage/actions";
import AltrpModel from "../../classes/AltrpModel";
import getResponsiveSetting from "../../../../../front-app/src/js/helpers/get-responsive-setting";
const Checkbox = window.altrpLibs.Blueprint.Checkbox;

(window.globalDefaults = window.globalDefaults || []).push(`
  .altrp-field-option-span {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .altrp-field-radio .bp3-control-indicator.bp3-control-indicator {
    background-image: none;
  }

  .altrp-field-container .altrp-field-checkbox.altrp-field-checkbox {
    margin: 0
  }

  .altrp-field-container .altrp-field-checkbox .bp3-control-indicator {
    background-image: none;
  }

  .altrp-field-container .altrp-field-checkbox .bp3-control-indicator:before {
    position: absolute;
    left: 0;
    top: 0;
  }

.altrp-field {
  border-style: solid;
  width: 100%;
}
.altrp-field-file{
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.altrp-label-icon svg,
.altrp-label-icon img {
  width: 20px;
}
.altrp-label-icon svg{
  height: 20px;
}
.altrp-field-file__field{
  display: none;
}
.altrp-field-file__placeholder{
  display: none;
}
.altrp-field-file_empty .altrp-field-file__placeholder{
  display: block;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  background-color: rgb(52,59,76);
  color: #fff;
}
.input-clear-btn {
  background: transparent;
  padding: 0;
  position: absolute;
  bottom: calc(50% - 7px);
  right: 15px;
  display: none;
}
.input-clear-btn:hover {
  font-weight: bold;
}
.altrp-field:hover + .input-clear-btn, .input-clear-btn:hover {
  display: block;
}
.altrp-input-wrapper, .altrp-field-select2 {
  position: relative;
  flex-grow: 1;
}
.altrp-field-label--required::after {
  content: "*";
  color: red;
  font-size: inherit;
  padding-left: 10px;
}
.altrp-field-label {
  font-family: "Open Sans";
  line-height: 1.5;
  letter-spacing: 0;
}
.altrp-field-select2__single-value, .altrp-field {
  font-size: 16px;
  font-family: "Open Sans";
  line-height: 1.5;
  letter-spacing: 0;
}
.altrp-field-select2__control, .altrp-field {
  text-align: left;
  padding-top: 2px;
  padding-right: 2px;
  padding-bottom: 2px;
  padding-left: 2px;
  border-width: 1px;
}
.altrp-field-select2__control:hover{
  border-width: 1px;
}
.altrp-field-container {
  min-height: 10px;
  margin: 0;
}
.altrp-field::placeholder, .altrp-field-select2__placeholder {
  font-size: 13px;
  font-family: "Open Sans";
  line-height: 1.5;
  letter-spacing: 0;
}
.altrp-image-select {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.altrp-image-select img {
  flex-grow: 1;
  object-fit: contain;
}
.altrp-field {
  overflow: hidden;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.altrp-field.active {
  border-color: lightcoral;
}
.altrp-field-label {
  text-align: center;
  display: block;
}
.altrp-pagination__select-size .altrp-field-select2__single-value {
  font-size: 14px;
}
.altrp-pagination__select-size .altrp-field-select2__indicator-separator {
  display: none;
}
.altrp-pagination__select-size .altrp-field-select2__indicator {
  align-items: center;
}
.altrp-pagination__select-size .altrp-field-select2__control {
  width: 100px;
  min-height: 32px;
  padding: 0;
  border-radius: 0;
  outline: none;
  border-color: rgb(142,148,170);
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
}
.altrp-pagination__select-size .altrp-field-select2__control input {
  border: none;
}
.altrp-field-select2 {
  position: relative;
  box-sizing: border-box;
  pointer-events: none;
}
.altrp-field-select2__control {
  webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  background-color: hsl(0,0%,100%);
  border-color: hsl(0,0%,80%);
  border-style: solid;
  border-width: 1px;
  cursor: default;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  min-height: 38px;
  outline: 0 !important;
  position: relative;
  -webkit-transition: all 100ms;
  transition: all 100ms;
  box-sizing: border-box;
}
.altrp-field-select2__value-container {
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
  -webkit-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  padding: 2px 8px;
  -webkit-overflow-scrolling: touch;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
}
.altrp-field-select2__single-value {
  color: hsl(0,0%,20%);
  margin-left: 2px;
  margin-right: 2px;
  max-width: calc(100% - 8px);
  overflow: hidden;
  position: absolute;
  text-overflow: ellipsis;
  white-space: nowrap;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  box-sizing: border-box;
}
.altrp-field-select2__indicators {
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-align-self: stretch;
  -ms-flex-item-align: stretch;
  align-self: stretch;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-shrink: 0;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  box-sizing: border-box;
}
.altrp-field-select2__indicator-separator {
  -webkit-align-self: stretch;
  -ms-flex-item-align: stretch;
  align-self: stretch;
  background-color: hsl(0,0%,80%);
  margin-bottom: 8px;
  margin-top: 8px;
  width: 1px;
  box-sizing: border-box;
}
.altrp-field-select2__indicator {
  color: hsl(0,0%,80%);
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  padding: 8px;
  -webkit-transition: color 150ms;
  transition: color 150ms;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
}
.tba-placeholder {
  display: flex;
  justify-content: center;
  font-size: 28px;
  font-weight: bold;
}
.altrp-field-subgroup {
  display: flex;
  flex-wrap: wrap;
}
.altrp-field-option {
  display: flex;
  padding: 10px;
}
.altrp-field-option__label {
  cursor: pointer;
}
textarea.altrp-field {
  display: block;
}
.altrp-table__filter-select .altrp-field-select2__placeholder {
  white-space: nowrap;
}
.altrp-table__filter-select .altrp-field-select2__single-value {
  font-size: 14px;
}
.altrp-table__filter-select .altrp-field-select2__indicator-separator {
  display: none;
}
.altrp-table__filter-select .altrp-field-select2__indicator {
  align-items: center;
}
.altrp-table__filter-select .altrp-field-select2__control {
  width: 100%;
  min-height: 19px;
  padding: 0;
  border-radius: 0;
  outline: none;
  border-color: rgb(142, 148, 170);
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
}
.altrp-table__filter-select .altrp-field-select2__control input {
  border: none;
}
.altrp-table__filter-select .altrp-field-select2__value-container {
  padding-top: 0;
  padding-bottom: 0;
  line-height: 13px;
}
.altrp-field-required {
  color: red;
  font-size: 18px;
  padding-left: 10px;
}
.altrp-field-container-label {
  display: flex;
  flex-direction: row;
}

.altrp-field-label-container-left {
  display: flex;
  align-items: center;
}

.altrp-field-label-container {
  display: inline-flex;
  align-items: center;
}
.altrp-field-select2__indicator.altrp-field-select2__dropdown-indicator {
  padding: 0 8px;
  max-height: 14px;
  overflow: hidden;
}
.altrp-field-select2 .altrp-field-select2__value-container {
  padding: 0px 8px;
}
.altrp-field-select2 .css-b8ldur-Input {
  padding-bottom: 0px;
  padding-top: 0px;
  margin: 0 2px;
}
.altrp-field-select2 .altrp-field-select2__control {
  min-height: 14px;
}
`)
const AltrpFieldContainer = styled.div`
  ${({settings}) => {
    const content_label_position_type = getResponsiveSetting(settings, 'content_label_position_type')
    switch (content_label_position_type) {
      case "left": {
        return "display: flex";
      }
      case "right": {
        return "display:flex;flex-direction:row-reverse;justify-content:flex-end;";
      }
    }
    return "";
  }}
`;

class InputCheckboxWidget extends Component {
  timeInput = null;

  constructor(props) {
    super(props);
    props.element.component = this;
    if (window.elementDecorator) {
      window.elementDecorator(this);
    }
    this.onChange = this.onChange.bind(this);
    this.debounceDispatch = this.debounceDispatch.bind(this);

    this.defaultValue =
      this.getLockedContent("content_default_value") ||
      (this.valueMustArray() ? [] : "");
    if (this.valueMustArray() && !_.isArray(this.defaultValue)) {
      this.defaultValue = [];
    }
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
   * В некоторых случаях значение поля должно быть массивом
   * @return {boolean}
   */
  valueMustArray() {
    return true;
  }
  /**
   * Чистит значение
   */
  clearValue() {
    let value = [];
    this.onChange(value);
    this.dispatchFieldValueToStore(value, true);
  }
  /**
   * Метод устанавливает все опции как выбранные
   */
  selectAll() {
    const optionsDynamicSetting = this.props.element.getDynamicSetting(
      "content_options"
    );
    let options = [...this.state.options];

    if (optionsDynamicSetting) {
      options = convertData(optionsDynamicSetting, options);
    }
    options = options.map(({ value }) => value);
    this.onChange(options);
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
   */
  onChange(e) {
    let value = "";
    let valueToDispatch;
    if (e && e.target) {
      let inputs = document.getElementsByName(e.target.name);
      value = [];
      inputs.forEach(input => {
        if (input.checked) {
          value.push(input.value);
        }
      });
    }

    if (_.isArray(e)) {
      value = _.cloneDeep(e);
    }
    this.setState(
      state => ({
        ...state,
        value
      }),
      () => {
        this.dispatchFieldValueToStore(
          valueToDispatch !== undefined ? valueToDispatch : value,
          true
        );
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
    const {element} = this.props
    const optionsDynamicSetting = this.props.element.getDynamicSetting(
      "content_options"
    );
    const content_options = element.getResponsiveLockedSetting('content_options');
    const model_for_options = element.getResponsiveLockedSetting('model_for_options');
    if(_.isString(content_options)
      && content_options?.indexOf('{{') === 0
      && ! model_for_options){
      options = getDataByPath(content_options.replace('{{', '').replace('}}', ''), [], element.getCurrentModel())
      if( ! _.isArray(options)){
        options = [];
      }
    }
    if (optionsDynamicSetting) {
      options = convertData(optionsDynamicSetting, options);
    }
    if (!this.props.element.getLockedSettings("sort_default")) {
      options = _.sortBy(options, o => o && (o.label ? o.label.toString() : o));
    }
    return options;
  }

  /**
   * Для действие по фокусу
   * @param e
   * @return {Promise<void>}
   */

  onFocus = async e => {
    const focus_actions = this.props.element.getLockedSettings("focus_actions");

    if (focus_actions && !isEditor()) {
      const actionsManager = (
        await import(
          /* webpackChunkName: 'ActionsManager' */
          "../../../../../front-app/src/js/classes/modules/ActionsManager.js"
          )
      ).default;
      await actionsManager.callAllWidgetActions(
        this.props.element.getIdForAction(),
        "focus",
        focus_actions,
        this.props.element
      );
    }
  };
  /**
   * Потеря фокуса для оптимизации
   * @param  e
   * @param  editor для получения изменений из CKEditor
   */
  onBlur = async (e, editor = null) => {
    if (_.get(editor, "getData")) {
      this.dispatchFieldValueToStore(editor.getData(), true);
    }
    if (this.props.element.getLockedSettings("actions", []) && !isEditor()) {
      const actionsManager = (
        await import(
          /* webpackChunkName: 'ActionsManager' */
          "../../../../../front-app/src/js/classes/modules/ActionsManager.js"
          )
      ).default;
      await actionsManager.callAllWidgetActions(
        this.props.element.getIdForAction(),
        "blur",
        this.props.element.getLockedSettings("actions", []),
        this.props.element
      );
    }
  };
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
   * Обработка добавления опции по ajax
   * @param {SyntheticKeyboardEvent} e
   */
  createItem = async e => {
    const keyCode = e.keyCode;
    const { value: inputValue } = e.target;
    if (keyCode !== 13 || !inputValue) {
      return;
    }
    const {
      create_url,
      create_label,
      create_data,
      select2_multiple
    } = this.props.element.getLockedSettings();
    if (!create_label && !create_url) {
      return;
    }
    const currentModel = this.props.element.getCurrentModel();
    let data = parseParamsFromString(create_data, currentModel, true);
    data[create_label] = inputValue;
    let url = parseURLTemplate(create_url, currentModel.getData());
    this.setState(state => ({ ...state, isDisabled: true }));
    try {
      const resource = new Resource({
        route: url
      });
      let res = await resource.post(data);
      if (res.success && _.get(res, "data.id")) {
        let newOption = {
          label: inputValue,
          value: _.get(res, "data.id")
        };
        this.setState(
          state => ({ ...state, isDisabled: false }),
          () => {
            let options = [...this.state.options];
            options.unshift(newOption);
            let value = this.state.value;
            if (select2_multiple) {
              value = value ? [...value] : [];
              value.push(_.get(res, "data.id"));
            } else {
              value = _.get(res, "data.id");
            }
            this.setState(
              state => ({ ...state, options, value }),
              () => {
                const selectStateManager = _.get(
                  this,
                  "altrpSelectRef.current.selectRef.current"
                );
                if (selectStateManager) {
                  selectStateManager.setState({
                    menuIsOpen: false,
                    inputValue: ""
                  });
                }
              }
            );
          }
        );
      }
      this.setState(state => ({ ...state, isDisabled: false }));
    } catch (error) {
      console.error(error);
      this.setState(state => ({ ...state, isDisabled: false }));
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
   * Получить css классы для input checkbox
   */
  getClasses = ()=>{
    let classes = ` `;
    if(this.isActive()){
      classes += 'active '
    }
    if(this.isDisabled()){
      classes += 'state-disabled '
    }
    return classes;
  }

  render() {
    let label = null;
    const settings = this.props.element.getSettings();
    const {
      position_css_id: cssId,
      position_css_classes: cssClasses
    } = settings;


    let value = this.state.value;

    if (
      _.get(value, "dynamic") &&
      this.props.currentModel.getProperty("altrpModelUpdated")
    ) {
      value = this.getLockedContent("content_default_value");
    }
    /**
     * Пока динамический контент загружается (Еесли это динамический контент),
     * нужно вывести пустую строку
     */
    if (value && value.dynamic) {
      value = "";
    }
    let classLabel = "";
    let styleLabel = {};
    const content_label_position_type = this.props.element.getResponsiveLockedSetting(
      "content_label_position_type"
    );
    switch (content_label_position_type) {
      case "top":
        styleLabel = {
          marginBottom: this.state.settings.label_style_spacing
            ? this.state.settings.label_style_spacing.size +
            this.state.settings.label_style_spacing.unit
            : 2 + "px"
        };
        classLabel = "";
        break;
      case "bottom":
        styleLabel = {
          marginTop: this.state.settings.label_style_spacing
            ? this.state.settings.label_style_spacing.size +
            this.state.settings.label_style_spacing.unit
            : 2 + "px"
        };
        classLabel = "";
        break;
      case "left":
        styleLabel = {
          marginRight: this.state.settings.label_style_spacing
            ? this.state.settings.label_style_spacing.size +
            this.state.settings.label_style_spacing.unit
            : 2 + "px"
        };
        classLabel = "altrp-field-label-container-left";

        break;
      case "absolute":
        styleLabel = {
          position: "absolute",
          zIndex: 2
        };
        classLabel = "";
        break;
    }


    let content_label = this.props.element.getResponsiveLockedSetting("content_label")
    let label_icon = this.props.element.getResponsiveLockedSetting("label_icon")

    if (content_label || label_icon) {
      label = (
        <div
          className={"altrp-field-label-container " + classLabel}
          style={styleLabel}
        >
          <label
            className={`altrp-field-label ${this.state.settings.content_required
              ? "altrp-field-label--required"
              : ""
            }`}
          >
            {content_label}
          </label>
          {label_icon && label_icon.assetType && (
            <span className="altrp-label-icon">
              {renderAssetIcon(label_icon)}
            </span>
          )}
        </div>
      );
    } else {
      label = null;
    }

    let autocomplete = "off";
    if (this.state.settings.content_autocomplete) {
      autocomplete = "on";
    }

    let input = null;

    input = this.renderRepeatedInput();

    return (
      <AltrpFieldContainer
        settings={settings}
        className={`altrp-field-container ${cssClasses ? cssClasses : ''}`}
        id={cssId ? cssId : ''}
      >
        {content_label_position_type === "top" ? label : ""}
        {content_label_position_type === "left" ? label : ""}
        {content_label_position_type === "right" ? label : ""}
        {content_label_position_type === "absolute" ? label : ""}
        {/* .altrp-field-label-container */}
        {input}
        {content_label_position_type === "bottom" ? label : ""}
      </AltrpFieldContainer>
    );
  }


  /**
   * Выводит input type=checkbox|radio
   */
  renderRepeatedInput() {
    let { options = [] } = this.state;
    let { value = "" } = this.state;
    let classes =
      this.getClasses() + (this.state.settings.position_css_classes || "");

    const fieldName =
      this.props.element.getFieldId() ||
      Math.random()
        .toString(36)
        .substr(2, 9);
    const formID =
      this.props.element.getFormId() ||
      Math.random()
        .toString(36)
        .substr(2, 9);

    return (
      <div className="altrp-field-subgroup">
        {options.map((option, idx) => {
          let checked = false;
          /**
           * Если значение или опция число, то приведем к числу перед сравнением
           */
          value = _.isArray(value) ? value : value ? [value] : [];
          checked = altrpCompare(option.value, value, "in");

          return (
            <div
              className={`${classes} altrp-field-option ${checked ? "active" : ""}`}
              key={`${fieldName}-${idx}`}
            >
              <span className="altrp-field-option-span">
                <Checkbox
                  inline
                  name={`${formID}-${fieldName}`}
                  id={`${formID}-${fieldName}-${idx}`}
                  onChange={this.onChange}
                  value={option.value}
                  className={`${classes} altrp-field-checkbox${checked ? " active" : ""}`}
                  checked={checked}
                />
                {/*<input*/}
                {/*  type="checkbox"*/}
                {/*  value={option.value}*/}
                {/*  name={`${formID}-${fieldName}`}*/}
                {/*  className={`altrp-field-option__input ${checked ? "active" : ""*/}
                {/*    }`}*/}
                {/*  onChange={this.onChange}*/}
                {/*  checked={checked}*/}
                {/*  id={`${formID}-${fieldName}-${idx}`}*/}
                {/*/>*/}
              </span>
              <label
                htmlFor={`${formID}-${fieldName}-${idx}`}
                className={`${classes} altrp-field-option__label`}
              >
                {option.label}
              </label>
            </div>
          );
        })}
      </div>
    );
  }
}

export default InputCheckboxWidget;
