import isEditor from "../../../../../front-app/src/js/functions/isEditor";
import convertData from "../../../../../front-app/src/js/functions/convertData";
import parseOptionsFromSettings from "../../../../../front-app/src/js/functions/parseOptionsFromSettings";
import parseParamsFromString from "../../../../../front-app/src/js/functions/parseParamsFromString";
import parseURLTemplate from "../../../../../front-app/src/js/functions/parseURLTemplate";
import replaceContentWithData from "../../../../../front-app/src/js/functions/replaceContentWithData";
import getDataByPath from "../../../../../front-app/src/js/functions/getDataByPath";
import getDataFromLocalStorage from "../../../../../front-app/src/js/functions/getDataFromLocalStorage";
import renderAssetIcon from "../../../../../front-app/src/js/functions/renderAssetIcon";
import Resource from "../../classes/Resource";
import AltrpSelect from "../../../../../admin/src/components/altrp-select/AltrpSelect";
import { changeFormFieldValue } from "../../../../../front-app/src/js/store/forms-data-storage/actions";
import AltrpModel from "../../classes/AltrpModel";
import AltrpInput from "../altrp-input/AltrpInput";
import moment from 'moment';
import getResponsiveSetting from "../../../../../front-app/src/js/helpers/get-responsive-setting";

(window.globalDefaults = window.globalDefaults || []).push(`
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
  font-size: 16px;
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

class InputSelect2Widget extends Component {
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
      this.getContent("content_default_value") ||
      (this.valueMustArray() ? [] : "");
    if (this.valueMustArray() && !_.isArray(this.defaultValue)) {
      this.defaultValue = [];
    }
    this.state = {
      settings: { ...props.element.getSettings() },
      value: this.defaultValue,
      options: parseOptionsFromSettings(
        props.element.getSettings("content_options")
      ),
      paramsForUpdate: null
    };
    this.altrpSelectRef = React.createRef();
    if (this.getContent("content_default_value")) {
      this.dispatchFieldValueToStore(this.getContent("content_default_value"));
    }
  }

  /**
   * В некоторых случаях значение поля должно быть массивом
   * @return {boolean}
   */
  valueMustArray() {
    if (
      this.props.element.getName() === "input-select2" &&
      this.props.element.getSettings("select2_multiple")
    ) {
      return true;
    }
    return false;
  }
  /**
   * Чистит значение
   */
  clearValue() {
    let value = "";
    if (
      ["input-select2"].indexOf(
        this.props.element.getName()
      ) >= 0 &&
      this.props.element.getSettings("select2_multiple")
    ) {
      value = [];
    }
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
    if (
      ["input-select2"].indexOf(
        this.props.element.getName()
      ) >= 0 &&
      this.props.element.getSettings("select2_multiple")
    ) {
      let options = [...this.state.options];
      if (!_.isArray(options)) {
        options = [];
      } else {
        if (optionsDynamicSetting) {
          options = convertData(optionsDynamicSetting, options);
        }
      }
      this.onChange(options);
    }
  }

  /**
   * Загрузка виджета
   * @param {{}} prevProps
   * @param {{}} prevState
   */
  async _componentDidMount(prevProps, prevState) {
    if (this.props.element.getSettings("content_options")) {
      let options = parseOptionsFromSettings(
        this.props.element.getSettings("content_options")
      );

      this.setState(state => ({ ...state, options }));
    } else if (
      ["input-select2"].indexOf(this.props.element.getName()) >= 0 &&
      this.state.settings.model_for_options
    ) {
      let options = await new Resource({ route: this.getRoute() }).getAll();
      options = !_.isArray(options) ? options.data : options;
      options = _.isArray(options) ? options : [];
      this.setState(state => ({ ...state, options }));
    }
    let value = this.state.value;
    /**
     * Если динамическое значение загрузилось,
     * то используем this.getContent для получение этого динамического значения
     * старые динамические данные
     * */
    if (
      _.get(value, "dynamic") &&
      this.props.currentModel.getProperty("altrpModelUpdated")
    ) {
      value = this.getContent("content_default_value");
    }

    if (
      prevProps &&
      !prevProps.currentModel.getProperty("altrpModelUpdated") &&
      this.props.currentModel.getProperty("altrpModelUpdated")
    ) {
      value = this.getContent("content_default_value");
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
      value = this.getContent("content_default_value");
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
    let url = this.props.element.getSettings("model_for_options");

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
      let value = this.getContent(
        "content_default_value",
        this.props.element.getSettings("select2_multiple")
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
      this.dispatchFieldValueToStore(this.getContent("content_default_value"));
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
    let content_calculation = this.props.element.getSettings(
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
      let paramsForUpdate = this.props.element.getSettings("params_for_update");
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
          if (this.props.element.getSettings("params_as_filters", false)) {
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
    const settings = this.props.element.getSettings();
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
    if (this.props.element.getName() === "input-select2") {
      if (this.props.element.getSettings("select2_multiple", false) && !e) {
        value = [];
      }
      if (this.props.element.getSettings("select2_multiple", false)) {
        value = value.map(item => item.value);
      }
    }
    if (
      this.props.element.getSettings("content_options_nullable") &&
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

        const change_actions = this.props.element.getSettings("change_actions");
        const change_change_end = this.props.element.getSettings(
          "change_change_end"
        );
        const change_change_end_delay = this.props.element.getSettings(
          "change_change_end_delay"
        );

        if (
          ["text", "email", "phone", "tel", "number", "password"].indexOf(
            this.state.settings.content_type
          ) === -1
        ) {
          this.dispatchFieldValueToStore(
            valueToDispatch !== undefined ? valueToDispatch : value,
            true
          );
        }
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
    const {element} = this.props
    const optionsDynamicSetting = this.props.element.getDynamicSetting(
      "content_options"
    );
    const content_options = this.props.element.getResponsiveSetting('content_options');
    const model_for_options = this.props.element.getResponsiveSetting('model_for_options');
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
    if (!this.props.element.getSettings("sort_default")) {
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
    const focus_actions = this.props.element.getSettings("focus_actions");

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
    if (this.props.element.getSettings("actions", []) && !isEditor()) {
      const actionsManager = (
        await import(
          /* webpackChunkName: 'ActionsManager' */
          "../../../../../front-app/src/js/classes/modules/ActionsManager.js"
        )
      ).default;
      await actionsManager.callAllWidgetActions(
        this.props.element.getIdForAction(),
        "blur",
        this.props.element.getSettings("actions", []),
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
        const change_actions = this.props.element.getSettings("change_actions");

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
    } = this.props.element.getSettings();
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

  render() {
    let label = null;
    const settings = this.props.element.getSettings();
    const {
      content_readonly,
      select2_multiple: isMultiple,
      label_icon
    } = settings;

    let value = this.state.value;

    if (
      _.get(value, "dynamic") &&
      this.props.currentModel.getProperty("altrpModelUpdated")
    ) {
      value = this.getContent("content_default_value");
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
    const content_label_position_type = this.props.element.getResponsiveSetting(
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
        // this.label.current.classList.add("hello")

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
    content_label = replaceContentWithData(content_label, this.props.element.getCurrentModel()?.getData())

    if (content_label) {
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
            {this.state.settings.content_label}
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
    } else {
      autocomplete = "off";
    }

    let input = null;
    switch (this.props.element.getName()) {
      case "input-select2":
        {
          input = this.renderSelect2();
        }
        break;
      default: {
        const isClearable = this.state.settings.content_clearable;
        const isDate = this.state.settings.content_type === "date";
        const timestamp = this.props.element.getSettings("content_timestamp");
        if (isDate && timestamp) {
          const isValid = moment.unix(value).isValid();
          if (isValid) {
            try {
              value = moment.unix(value / 1000).format("YYYY-MM-DD");
            } catch (error) {
              console.log(error);
            }
          }
        }
        input = (
          <div className="altrp-input-wrapper">
            <AltrpInput
              type="select2"
              name={this.getName()}
              value={value || ""}
              element={this.props.element}
              readOnly={content_readonly}
              autoComplete={autocomplete}
              placeholder={this.state.settings.content_placeholder}
              className={
                "altrp-field " + this.state.settings.position_css_classes
              }
              settings={this.props.element.getSettings()}
              onKeyDown={this.handleEnter}
              onChange={this.onChange}
              onBlur={this.onBlur}
              onFocus={this.onFocus}
              id={this.state.settings.position_css_id}
            />
            {isClearable && (
              <button
                className="input-clear-btn"
                onClick={() => this.setState({ value: this.defaultValue })}
              >
                ✖
              </button>
            )}
          </div>
        );
      }
    }
    return (
      <AltrpFieldContainer
        settings={settings}
        className={"altrp-field-container "}
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
   * Выводит инпут-select2, используя компонент AltrpSelect
   */
  renderSelect2() {
    const {
      content_options_nullable,
      nulled_option_title,
      content_placeholder
    } = this.props.element.getSettings();

    let options = this.getOptions();
    let value = this.state.value;
    if (
      _.get(value, "dynamic") &&
      this.props.currentModel.getProperty("altrpModelUpdated")
    ) {
      value = this.getContent("content_default_value", true);
    }
    /**
     * Пока динамический контент загружается, нужно вывести пустую строку
     */
    if (value && value.dynamic) {
      value = "";
    }
    if (!this.props.element.getSettings("select2_multiple", false)) {
      options.forEach(option => {
        if (!option) {
          return;
        }
        if (option.value === value) {
          value = { ...option };
        }
        if (_.isArray(option.options)) {
          option.options.forEach(option => {
            if (option.value == value) {
              value = { ...option };
            }
          });
        }
      });
    } else {
      /**
       * Если включен мультиселект
       */
      value = value ? (_.isArray(value) ? value : [value]) : [];
      value = value.map(v => {
        let _v = v;
        options.forEach(option => {
          if (option.value && option.value.toString() === _v.toString()) {
            _v = { ...option };
          }
          if (_.isArray(option.options)) {
            option.options.forEach(option => {
              if (option.value && option.value.toString() === _v.toString()) {
                _v = { ...option };
              }
            });
          }
        });
        return _v;
      });
      /**
       * Добавим опцию, если для какого-то значения ее нет
       */
      value.forEach(valueItem => {
        if (!_.isObject(valueItem)) {
          options.push({
            value: valueItem,
            label: valueItem
          });
        }
      });
    }
    /**
     * Сортируем опции
     * @type {Array|*}
     */
    if (
      content_options_nullable &&
      (this.props.element.getName() !== "input-select2" ||
        this.props.element.getSettings("select2_multiple") !== true)
    ) {
      options = _.union(
        [{ label: nulled_option_title, value: "<null>" }],
        options
      );
    }
    const select2Props = {
      className: "altrp-field-select2",
      onFocus: this.onFocus,
      element: this.props.element,
      classNamePrefix: this.props.element.getId() + " altrp-field-select2",
      options,
      name: this.props.element.getFieldId(),
      ref: this.altrpSelectRef,
      settings: this.props.element.getSettings(),
      onChange: this.onChange,
      onBlur: this.onBlur,
      value: value || _.find(options, o => o && o.value == this.state.value),
      isOptionSelected: option => {
        if (_.isNumber(this.state.value) || _.isString(this.state.value)) {
          return this.state.value == option.value;
        }
        return this.state.value && this.state.value.includes(option.value);
      },
      placeholder: content_placeholder,
      isMulti: this.props.element.getSettings("select2_multiple", false),
      onKeyDown: this.handleEnter
      // menuIsOpen: true,
    };
    return (
      <div className="altrp-input-wrapper">
        <AltrpSelect {...select2Props} />
      </div>
    );
  }
}

export default InputSelect2Widget;
