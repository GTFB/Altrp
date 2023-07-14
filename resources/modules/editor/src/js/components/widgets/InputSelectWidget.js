import {iconsManager} from "../../../../../admin/src/js/helpers";
import Resource from "../../classes/Resource";
import isEditor from "../../../../../front-app/src/js/functions/isEditor";
import convertData from "../../../../../front-app/src/js/functions/convertData";
import renderAssetIcon from "../../../../../front-app/src/js/functions/renderAssetIcon";
import getDataByPath from "../../../../../front-app/src/js/functions/getDataByPath";
import replaceContentWithData from "../../../../../front-app/src/js/functions/replaceContentWithData";
import getDataFromLocalStorage from "../../../../../front-app/src/js/functions/getDataFromLocalStorage";
import renderAsset from "../../../../../front-app/src/js/functions/renderAsset";
import parseOptionsFromSettings from "../../../../../front-app/src/js/functions/parseOptionsFromSettings";
import parseParamsFromString from "../../../../../front-app/src/js/functions/parseParamsFromString";
import {changeFormFieldValue} from "../../../../../front-app/src/js/store/forms-data-storage/actions";
import AltrpModel from "../../classes/AltrpModel";
import {Select} from "@blueprintjs/select";
import {MenuItem, Button} from "@blueprintjs/core";
import getResponsiveSetting from "../../../../../front-app/src/js/helpers/get-responsive-setting";

(window.globalDefaults = window.globalDefaults || []).push(`
.bp3-popover {
  width: 100%;
}

ul.bp3-menu {
  min-width: initial;
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
.altrp-portal_input-select .bp3-menu{
  max-height: 300px;
  overflow: auto;
}
.altrp-widget_input-select .bp3-icon_right{
    margin:  0 0 0 7px;
}
.bp3-icon_text-widget img{
  width: 16px;
  height: 16px;
  object-fit: contain;
  pointer-events: none;
}
.bp3-icon_text-widget svg{
  width: 16px;
  height: 16px;
  pointer-events: none;
}
.altrp-widget_input-select.altrp-widget_input-select .bp3-icon:first-child:last-child{
   margin: 0;
}
.altrp-widget_input-select .bp3-popover-wrapper{
  overflow: hidden;
  display: flex;
}
.altrp-widget_input-select .bp3-popover-target > div{
  width: 100%;
}
.altrp-widget_input-select .bp3-popover-target{
  display: flex;
  flex-grow: 1;
}
.altrp-widget_input-select .bp3-popover-target .bp3-button{
  width: 100%;
  justify-content: flex-end;
  /*flex-direction: row-reverse;*/

}
.altrp-widget_input-select .bp3-popover-target .bp3-button .bp3-button-text{
  flex-grow: 1;
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
  font-family: "Open Sans", Arial, sans-serif;
  line-height: 1.5;
  letter-spacing: 0;
}
.altrp-field-select2__single-value, .altrp-field {
  font-size: 16px;
  font-family: "Open Sans", Arial, sans-serif;
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
  font-family: "Open Sans", Arial, sans-serif;
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

.bp3-active .altrp-select-delete-icon path {
  fill: #FFFFFF;

}

.altrp-select-delete-icon {
  margin-left: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.altrp-select-center {
  display: flex;
  align-items: center;
  justify-content: space-between
}

#editor-content .altrp-section .btn_transparent {
   box-shadow: none;
   background-image: initial;
   background-color: transparent;
}

.altrp-section .btn_transparent {
   box-shadow: none;
   background-image: initial;
   background-color: transparent;
}

.altrp-section .btn_transparent:hover {
   box-shadow: none;
   background-image: initial;
   background-color: transparent;
}

.altrp-section .btn_transparent:active {
   box-shadow: none;
   background-image: initial;
   background-color: transparent;
}

`)

const AltrpFieldContainer = styled.div`
  ${({settings}) => {
    const content_label_position_type = getResponsiveSetting(settings, 'content_label_position_type')
  switch (content_label_position_type) {
    case "left": {
      return "display: flex;";
    }
    case "right": {
      return "display:flex;flex-direction:row-reverse;justify-content:flex-end;";
    }
  }
  return "";
}}

  & .bp3-popover-wrapper {
    width: 100%
  }
`;

class InputSelectWidget extends Component {
  timeInput = null;

  constructor(props) {
    super(props);
    props.element.component = this;
    if (window.elementDecorator) {
      window.elementDecorator(this);
    }

    let options = parseOptionsFromSettings(
      props.element.getLockedSettings("content_options")
    )

    const content_options = props.element.getResponsiveLockedSetting('content_options');
    const model_for_options = props.element.getResponsiveLockedSetting('model_for_options');
    if (content_options?.indexOf('{{') === 0 && ! model_for_options) {
      options = getDataByPath(content_options.replace('{{', '').replace('}}', ''), [], props.element.getCurrentModel())
    }

    this.defaultValue =
      this.getLockedContent("content_default_value") ||
      (this.valueMustArray() ? [] : "");
    if (this.valueMustArray() && !_.isArray(this.defaultValue)) {
      this.defaultValue = [];
    }
    this.state = {
      settings: {...props.element.getSettings()},
      value: this.defaultValue,
      options,
      isOpen: false,
      paramsForUpdate: null,
    };

    this.popoverProps = {
      usePortal: true,
      targetClassName: "altrp-select-popover",
      position: 'bottom',
      minimal: props.element.getResponsiveLockedSetting('minimal'),
      portalClassName: `altrp-portal altrp-portal_input-select altrp-portal${this.props.element.getId()} ${this.state.widgetDisabled ? 'pointer-event-none' : ''}`,
      portalContainer: window.EditorFrame ? window.EditorFrame.contentWindow.document.body : document.body,
    };
    if(! isEditor()){
      // this.popoverProps.boundary = '#front-app'
    }
    this.altrpSelectRef = React.createRef();
    const value = this.getValue();
    if (!value && this.getLockedContent("content_default_value")) {
      this.dispatchFieldValueToStore(this.getLockedContent("content_default_value"));
    }
    this.popoverRef = React.createRef();
    this.inputRef = React.createRef();

    this.onClick = this.onClick.bind(this)

  }

  /**
   * В некоторых случаях значение поля должно быть массивом
   * @return {boolean}
   */
  valueMustArray() {
    return false;
  }

  /**
   * Чистит значение
   */
  clearValue() {
    let value = "";
    this.dispatchFieldValueToStore(value, true);
  }


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

      this.setState(state => ({...state, options}));
    } else if (
      ["input-select"].indexOf(this.props.element.getName()) >= 0 &&
      this.state.settings.model_for_options
    ) {
      let options = await new Resource({route: this.getRoute()}).getAll();
      options = !_.isArray(options) ? options.data : options;
      options = _.isArray(options) ? options : [];
      this.setState(state => ({...state, options}));
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
        state => ({...state, value, contentLoaded: true}),
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
        state => ({...state, value, contentLoaded: true}),
        () => {
          this.dispatchFieldValueToStore(value);
        }
      );
      return;
    }
    if (this.state.value !== value) {
      this.setState(
        state => ({...state, value}),
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
    const {content_options, model_for_options} = this.state.settings;
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
        state => ({...state, value, contentLoaded: true}),
        () => {
          this.dispatchFieldValueToStore(value);
        }
      );
    }
    if (
      this.props.element.getName() === "input-select" &&
      this.props.element.getLockedSettings("model_for_options")
    ) {
      if (
        !(
          this.state.settings.model_for_options ===
          prevProps.element.getLockedSettings("model_for_options")
        )
      ) {
        let model_for_options = prevProps.element.getLockedSettings(
          "model_for_options"
        );
        let options = await new Resource({route: this.getRoute()}).getAll();
        options = !_.isArray(options) ? options.data : options;
        options = _.isArray(options) ? options : [];
        this.setState(state => ({...state, options, model_for_options}));
      }
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
        state => ({...state, value}),
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
            }).getQueried({filters: paramsForUpdate});
          } else {
            options = await new Resource({route: this.getRoute()}).getQueried(
              paramsForUpdate
            );
          }
          options = !_.isArray(options) ? options.data : options;
          options = _.isArray(options) ? options : [];
        } else if (this.state.paramsForUpdate) {
          options = await new Resource({route: this.getRoute()}).getAll();
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

  async onItemSelect(value, e) {
    if (value.value !== undefined){
      value = value.value;
    }

    for(const el of e.nativeEvent.composedPath()) {
      if(el.classList?.contains("altrp-select-delete-icon")) {
        e.preventDefault()
        return
      }
    }

    if(value === -1) {
      value = null
    }

    document.removeEventListener("mousedown", this.checkOutsideClick)

    const options = this.getOptions();
    const element = this.props.element;
    if(! options.find(option => option.value == value)){
      const create_url = element.getResponsiveLockedSetting('create_url');
      if(element.getResponsiveLockedSetting('create') && create_url){
        this.setState(state =>({...state, widgetDisabled: true}))
        let params = element.getResponsiveLockedSetting('create_params') || '';
        params = params.replace(/\{\{__query__\}\}/g, value);
        params = parseParamsFromString(params, element.getCurrentModel(), true)
        const resource = new Resource({route: create_url});
        try{
          let res = await resource.post(params)
          if(res.data){
            res = res.data
          }
          const label_path = element.getResponsiveLockedSetting('label_path')
          if(label_path){
            res.label = _.get(res, label_path, res.id);
          }
          const value_path = element.getResponsiveLockedSetting('value_path')
          if(value_path){
            res.value = _.get(res, value_path, res.id);
          }
          options.unshift(res)
        } catch (e) {

        }finally {
          this.setState(state =>({...state, widgetDisabled: false}))
        }
      } else {
        options.unshift(arguments[0])
      }
      this.setState(state => ({
          ...state,
          options,
        }))
    }

    this.setState(state => ({
        ...state,
        value,
        isOpen: false
      }),
      () => {
        /**
         * Обновляем хранилище
         */
        this.dispatchFieldValueToStore(
          value,
          true
        );
      })
  }


  /**
   * получить опции
   */
  getOptions() {
    let options = this.state.options;
    const {element} = this.props

    const optionsDynamicSetting = this.props.element.getDynamicSetting(
      "content_options"
    );
    const content_options = this.props.element.getResponsiveLockedSetting('content_options');
    const model_for_options = this.props.element.getResponsiveLockedSetting('model_for_options');
    if(_.isString(content_options)) {
      if(! isEditor()) {
        if (content_options?.indexOf('{{') === 0 && ! model_for_options) {
          options = getDataByPath(content_options.replace('{{', '').replace('}}', ''), [], element.getCurrentModel())
        } else {
          options = parseOptionsFromSettings(this.props.element.getLockedSettings("content_options"));
        }
      }

      if( ! _.isArray(options)){
        options = [];
      }
    }
    if (optionsDynamicSetting) {
      options = convertData(optionsDynamicSetting, options);
    } else {
      options = [...options]
    }
    if (!this.props.element.getLockedSettings("sort_default")) {

      options = _.sortBy(options, o => {
        if(!_.isNaN(Number(o.label))){
          return Number(o.label)
        }
        return o && (o.label ? o.label.toString() : o)
      });
      if(this.props.element.getLockedSettings("options_sorting") === 'desc'){
        options = _.reverse(options)
      }
    }
    if(this.props.element.getResponsiveLockedSetting('content_options_nullable')){
      options.unshift({
        label: this.props.element.getResponsiveLockedSetting('nulled_option_title') || '',
        value: '',
      })
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
      let query_sync = this.props.element.getLockedSettings(
        "query_sync"
      );
      if(!isEditor() && query_sync){
        const updateQueryString = (await import('../../../../../front-app/src/js/functions/updateQueryString')).default
        updateQueryString(fieldName, value)
      }
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

  escapeRegExpChars(text) {
    return text.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
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
   * @return {*}
   */
  getCurrentLabel() {
    const value = this.getValue()

    const options = this.getOptions() || []
    return options.find(option => option.value == value)?.label || ''
  }

  /**
   *
   * @return {JSX.Element|string}
   */
  renderRightIcon = ()=>{
    const right_icon = this.props.element.getResponsiveLockedSetting('right_icon')
    if(_.isEmpty(right_icon)){
      return 'caret-down'
    }
    return <span className="bp3-icon bp3-icon_text-widget bp3-icon_right" >
      {renderAsset(right_icon )}
    </span>
  }
  /**
   *
   * @return {JSX.Element|null}
   */
  renderLeftIcon = ()=>{
    const left_icon = this.props.element.getResponsiveLockedSetting('left_icon')
    if(_.isEmpty(left_icon)){
      return null
    }
    return <span className="bp3-icon bp3-icon_text-widget bp3-icon_left" >
      {renderAsset(left_icon)}
    </span>
  }

  checkOutsideClick = (e)=> {
    for(const el of e.composedPath()) {
      if(el.classList?.contains(`altrp-element${this.props.element.getId()}`)) {

        e.preventDefault()
        return
      }
    }

    for(const el of e.composedPath()) {
      if(el.classList?.contains("bp3-popover")) {
        e.preventDefault()
        return
      }
    }

    document.removeEventListener("mousedown", this.checkOutsideClick)
    this.setState((s) => ({
      ...s,
      isOpen: false
    }))
  }

  /**
   * Обработка клика по кнопке
   * @return {Promise<void>}
   */
  async onClick() {

    this.setState((s) => ({
        ...s,
        isOpen: !s.isOpen
    }), () => {
      if(this.state.isOpen) {
        document.addEventListener("mousedown", this.checkOutsideClick)
      } else {
        document.removeEventListener("mousedown", this.checkOutsideClick)
      }
    })


    if (this.props.element.getLockedSettings("click_actions", []) && !isEditor()) {
      const actionsManager = (
        await import(
          /* webpackChunkName: 'ActionsManager' */
          "../../../../../front-app/src/js/classes/modules/ActionsManager.js"
          )
      ).default;
      await actionsManager.callAllWidgetActions(
        this.props.element.getIdForAction(),
        "click",
        this.props.element.getLockedSettings("click_actions", []),
        this.props.element
      );
    }
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.checkOutsideClick)
  }

  /**
   * Создаем элемент из поисковой строки
   * @param title
   * @return {{label, value}}
   */
  createNewItemFromQuery = (title) => {
    return{label: title,value: title};
  }
  /**
   * отрисовываем создание нового элемента
   * @param query
   * @param active
   * @param handleClick
   * @return {JSX.Element|null}
   */

  createNewItemRenderer = (query, active, handleClick) => {
    /**
     * @type {FrontElement}
     */
    const {element} = this.props;

    if(! element.getResponsiveLockedSetting('create')){
      return null;
    }
    const {options} = this.state;
    if (options.find(option => {
      let label = (option.label || '') + '';
      label = label.toLowerCase();
      query = (query || '') + '';
      return query === label;
    })) {
      return null
    }
    let text = element.getResponsiveLockedSetting('create_text') || ''
    text = text.replace('{{__query__}}', query)
    text = replaceContentWithData(text, element.getCurrentModel().getData())
    return (
      <MenuItem
        icon="add"
        text={text}
        active={active}
        onClick={handleClick}
        shouldDismissPopover={false}
      />)
  }
  onQueryChange = async (s)=>{
    const searchActions = this.props.element.getLockedSettings("s_actions");
    if(_.isEmpty(searchActions)){
      return
    }
    if(this.searchOnPending){
      return
    }
    this.searchOnPending = true;
    try{

      const actionsManager = (
        await import(
          /* webpackChunkName: 'ActionsManager' */
          "../../../../../front-app/src/js/classes/modules/ActionsManager.js"
          )
      ).default;
      this.props.element.getCurrentModel().setProperty('altrp_search', s);
      await actionsManager.callAllWidgetActions(
        this.props.element.getIdForAction(),
        "search",
        searchActions,
        this.props.element
      );
    } catch (e) {
      console.error(e);
    }finally{
      this.searchOnPending = false;
    }
  }

  /**
   * Получить css классы для input select
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

  async deleteItem(value) {
    const deleteActions = this.props.element.getLockedSettings("delete_actions");

    const actionsManager = (
      await import(
        /* webpackChunkName: 'ActionsManager' */
        "../../../../../front-app/src/js/classes/modules/ActionsManager.js"
        )
    ).default;

    this.props.element.getCurrentModel().setProperty('value', value);

    const action = await actionsManager.callAllWidgetActions(
      this.props.element.getIdForAction(),
      "search",
      deleteActions,
      this.props.element
    );

    if(action.success) {
      let options = this.getOptions();

      options = options.filter((elem) => elem.value !== value);

      this.setState(s => ({
        ...s,
        options
      }))
    }
  }

  render() {

    const element = this.props.element;
    let label = null;
    const settings = this.props.element.getSettings();
    let value = this.getCurrentLabel();

    const fullWidth = element.getLockedSettings("full_width")
    this.popoverProps.onOpening = (e) => {
      if(fullWidth) {
        const inputWidth = this.inputRef.current.offsetWidth;

        e.style.width = `${inputWidth}px`
      } else if(e.style.width) {
        e.style.width = ""
      }
    }

    let classLabel = "";
    let styleLabel = {};
    const content_label_position_type = this.props.element.getResponsiveLockedSetting(
      "content_label_position_type"
    ) || 'top';
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

    const placeholder = element.getResponsiveLockedSetting('content_placeholder');
    const content_readonly = element.getResponsiveLockedSetting('content_readonly');
    const no_results_text = element.getResponsiveLockedSetting('no_results_text');
    const transparentBG = element.getResponsiveLockedSetting('background_transparent_btn');

    const inputProps = {
      placeholder,
      className: element.getResponsiveLockedSetting('hide_search') ? 'altrp-hidden' : '',
    };

    let input = null;

    let itemsOptions = this.getOptions();
    let classes =
      this.getClasses() + (element.getResponsiveLockedSetting('position_css_classes', '', '') || "");
    // const position_css_classes = element.getResponsiveLockedSetting('position_css_classes', '', '')
    const position_css_id = this.getLockedContent('position_css_id')

    const hasDeleteActions = this.props.element.getLockedSettings("delete_actions", []).length > 0

    input = (
        <Select
          inputProps={inputProps}

          disabled={content_readonly}
          popoverProps={{
            ...this.popoverProps,
            isOpen: this.state.isOpen,
            popoverRef: this.popoverRef
          }}
          createNewItemFromQuery={element.getResponsiveLockedSetting('create') ? this.createNewItemFromQuery : null}
          createNewItemRenderer={this.createNewItemRenderer}
          itemRenderer={(item, {handleClick, modifiers, query}) => {
            if (!modifiers.matchesPredicate) {
              return null;
            }

            return <MenuItem
              text={<div className="altrp-select-center">
                <div className="altrp-select-center" dangerouslySetInnerHTML={{__html: item.label}}/>
                {
                  hasDeleteActions ? (
                    <div className="altrp-select-delete-icon" onClick={() => this.deleteItem(item.value)}>
                      {
                        iconsManager().renderIcon('close')
                      }
                    </div>
                  ) : ""
                }
              </div>}
              active={item.value === this.getValue()}
              key={item.value}
              disabled={modifiers.disabled || item.disabled}
              onClick={(e) => {
                for(const el of e.nativeEvent.composedPath()) {
                  if(el.classList?.contains("altrp-select-delete-icon")) {
                    e.preventDefault()
                    return
                  }
                }

                handleClick(e)
              }}
            />
          }}
          itemPredicate={(query, item) => {
            if (query === undefined || query.length === 0) {
              return true
            }
            return `${item?.label?.toLowerCase() || ''}`.indexOf(query?.toLowerCase()) >= 0;
          }}
          onQueryChange={this.onQueryChange}
          items={itemsOptions}
          // itemRenderer={({label})=>label}
          noResults={<MenuItem disabled={true} text={no_results_text}/>}
          name={this.getName()}
          onItemSelect={(item, e) => this.onItemSelect(item, e)}
          id={position_css_id}
          className={classes}
        >
          <Button
            // text={value}
            elementRef={this.inputRef}
            disabled={content_readonly}
            onClick={this.onClick}
            icon={this.renderLeftIcon()}
            rightIcon={this.renderRightIcon()}
            className={transparentBG ? "btn_transparent" : ''}
          >
            <span dangerouslySetInnerHTML={{__html: value}}/>
          </Button>
        </Select>
    );

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
}

export default InputSelectWidget;
