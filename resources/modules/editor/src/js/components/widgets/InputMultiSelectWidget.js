import Resource from "../../classes/Resource";
import isEditor from "../../../../../front-app/src/js/functions/isEditor";
import convertData from "../../../../../front-app/src/js/functions/convertData";
import parseOptionsFromSettings from "../../../../../front-app/src/js/functions/parseOptionsFromSettings";
import parseParamsFromString from "../../../../../front-app/src/js/functions/parseParamsFromString";
import replaceContentWithData from "../../../../../front-app/src/js/functions/replaceContentWithData";
import renderAssetIcon from "../../../../../front-app/src/js/functions/renderAssetIcon";
import getDataByPath from "../../../../../front-app/src/js/functions/getDataByPath";
import getDataFromLocalStorage from "../../../../../front-app/src/js/functions/getDataFromLocalStorage";
import {changeFormFieldValue} from "../../../../../front-app/src/js/store/forms-data-storage/actions";
import AltrpModel from "../../classes/AltrpModel";
import {MultiSelect} from "@blueprintjs/select";
import {MenuItem, Button} from "@blueprintjs/core";
import getResponsiveSetting from "../../../../../front-app/src/js/helpers/get-responsive-setting";
import '../../../../../editor/src/sass/blueprint.scss'


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
.altrp-portal_input-select .bp3-menu{
  max-height: 300px;
  overflow: auto;
}
.altrp-widget_input-multi-select .bp3-icon_right{
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
.altrp-widget_input-multi-select.altrp-widget_input-multi-select .bp3-icon:first-child:last-child{
   margin: 0;
}
.altrp-widget_input-multi-select .bp3-popover-wrapper{
  display: flex;
}
.altrp-widget_input-multi-select .bp3-popover-target > div{
  width: 100%;
}
.altrp-widget_input-multi-select .bp3-popover-target{
  display: flex;
  flex-grow: 1;
}
.altrp-widget_input-multi-select .bp3-popover-target .bp3-button{
  justify-content: flex-end;
}
.altrp-widget_input-multi-select .bp3-popover-target .bp3-button .bp3-button-text{
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

class InputMultiSelectWidget extends Component {
  timeInput = null;

  constructor(props) {
    super(props);
    this.onItemSelect = this.onItemSelect.bind(this)
    props.element.component = this;
    if (window.elementDecorator) {
      window.elementDecorator(this);
    }
    this.defaultValue =
      this.getContentDefaultValue() || []
    if (!_.isArray(this.defaultValue)) {
      this.defaultValue = [];
    }
    this.state = {
      settings: {...props.element.getSettings()},
      value: this.defaultValue,
      options: parseOptionsFromSettings(
        props.element.getSettings("content_options")
      ),
      paramsForUpdate: null,
    };
    this.popoverProps = {
      usePortal: true,
      position: 'bottom',
      minimal: props.element.getResponsiveLockedSetting('minimal'),
      // isOpen:true ,
      portalClassName: `altrp-portal altrp-portal_input-select altrp-portal${this.props.element.getId()} ${this.state.widgetDisabled ? 'pointer-event-none' : ''}`,
      portalContainer: window.EditorFrame ? window.EditorFrame.contentWindow.document.body : document.body,
    };

    if(! isEditor()){
      // this.popoverProps.boundary = '#front-app'
    }
    this.altrpSelectRef = React.createRef();
    if (this.getContentDefaultValue()) {
      this.dispatchFieldValueToStore(this.getContentDefaultValue());
    }
  }


  getContentDefaultValue(){
    let value = this.getLockedContent("content_default_value", true)
    if(_.isString(value) && value.indexOf('|') !== -1){
      value = value.split('|')
    }
    return value;
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
   * Загрузка виджета
   * @param {{}} prevProps
   * @param {{}} prevState
   */
  async _componentDidMount(prevProps, prevState) {
    if (this.props.element.getSettings("content_options")) {
      let options = parseOptionsFromSettings(
        this.props.element.getSettings("content_options")
      );

      this.setState(state => ({...state, options}));
    } else if (
      this.state.settings.model_for_options
    ) {
      let options = await new Resource({route: this.getRoute()}).getAll();
      options = !_.isArray(options) ? options.data : options;
      options = _.isArray(options) ? options : [];
      this.setState(state => ({...state, options, optionsUpdated: true}));
    }
    let value = this.state.value;


    /**
     * Если модель обновилась при смене URL
     */
    if (
      prevProps &&
      ! prevProps.currentModel.getProperty("altrpModelUpdated") &&
      this.props.currentModel.getProperty("altrpModelUpdated")
    ) {
      value = this.getContentDefaultValue();
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
      value = this.getContentDefaultValue();
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
    let url = this.props.element.getSettings("model_for_options");

    if (url.indexOf("/") === -1) {
      return `/ajax/models/${url}_options`;
    }
    if (url.indexOf("{{") !== -1) {
      url = replaceContentWithData(url);
    }
    return url;
  }

  onQueryChange = async (s)=>{
    const searchActions = this.props.element.getSettings("s_actions");
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
   * Обновление виджета
   */
  async _componentDidUpdate(prevProps, prevState) {
    const {content_options, model_for_options} = this.state.settings;
    if (
      prevProps &&
      !prevProps.currentDataStorage.getProperty("currentDataStorageLoaded") &&
      this.props.currentDataStorage.getProperty("currentDataStorageLoaded")
    ) {
      let value = this.getContentDefaultValue();
      this.setState(
        state => ({...state, value, contentLoaded: true}),
        () => {
          this.dispatchFieldValueToStore(value);
        }
      );
    }
    if (
      this.props.element.getSettings("model_for_options")
    ) {
      if (
        !(
          this.state.settings.model_for_options ===
          prevProps.element.getSettings("model_for_options")
        )
      ) {
        let model_for_options = prevProps.element.getSettings(
          "model_for_options"
        );
        let options = await new Resource({route: this.getRoute()}).getAll();
        options = !_.isArray(options) ? options.data : options;
        options = _.isArray(options) ? options : [];
        this.setState(state => ({...state, options, model_for_options}));
      }
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
    // if (content_options && !model_for_options) {
    //   let options = parseOptionsFromSettings(content_options);
    //   if (!_.isEqual(options, this.state.options)) {
    //     this.setState(state => ({...state, options}));
    //   }
    // }
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

  /**
   * Изменение значения в виджете
   * @param e
   */
  onChange = (e) => {
    let value = "";
    let valueToDispatch;
    const settings = this.props.element.getSettings();
    value = e?.target?.value || [];

    if (e && e.value) {
      value = e.value;
    }

    if (_.isArray(e)) {
      value = _.cloneDeep(e);
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

        this.dispatchFieldValueToStore(
          valueToDispatch !== undefined ? valueToDispatch : value,
          true
        );

      }
    );
  }

  /**
   *
   * @param item
   * @param idx
   */
  handleTagRemove = (item, idx)=>{
    let value = this.getValue()
    value = [...value]
    value.splice(idx, 1)
    value = value.map(v=>v.value)
    this.dispatchFieldValueToStore(value, true)
  }

  /**
   *
   * @param value
   * @returns {Promise<void>}
   */
  async onItemSelect(value) {
    const currentValue = this.getValue();
    if (value.value) {
      value = value.value;
    }
    const options = [...this.state.options];
    const element = this.props.element;
    if (!options.find(option => option.value == value)) {
      const create_url = element.getResponsiveLockedSetting('create_url');
      if (element.getResponsiveLockedSetting('create') && create_url) {
        this.setState(state => ({...state, widgetDisabled: true}))
        let params = element.getResponsiveLockedSetting('create_params') || '';
        params = params.replace(/\{\{__query__\}\}/g, value);
        params = parseParamsFromString(params, element.getCurrentModel(), true)
        const resource = new Resource({route: create_url});
        try {
          let res = await resource.post(params)
          if (res.data) {
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
          console.error(e);
        } finally {
          this.setState(state => ({...state, widgetDisabled: false}))
        }
      } else {
        options.unshift(arguments[0])
      }
    }

    if(! options.find(o=>o.value == value)){
      value = currentValue
    } else if(! currentValue.find(v => v.value == value)){
      value = currentValue.concat({value})
    }
    value = value.map(v => v.value)
    this.setState(state => ({
        ...state,
        options,
        value
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
    let options = [...this.state.options];
    const {element} = this.props
    const optionsDynamicSetting = this.props.element.getDynamicSetting(
      "content_options"
    );
    const content_options = this.props.element.getResponsiveLockedSetting('content_options');
    const model_for_options = this.props.element.getResponsiveLockedSetting('model_for_options');
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
      options = _.sortBy(options, o => {
        if(!_.isNaN(Number(o))){
          return Number(o)
        }
        return o && (o.label ? o.label.toString() : o)
      });
      if (this.props.element.getSettings("options_sorting") === 'desc') {
        options = _.reverse(options)
      }
    }
    let value = this.getValue()
    options = options.filter(o => {
      return ! value.find(v => v.value == o.value)
    })
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
   * @returns {[]}
   */
  getValue = () => {
    let value;
    let formId = this.props.element.getFormId();
    let fieldName = this.props.element.getFieldId();

    if (isEditor()) {
      value = this.state.value;
    } else {
      if(this.props.element.getSettings('model_for_options') && ! this.state.optionsUpdated){
        return [];
      }
      value = _.get(appStore.getState().formsStore, `${formId}`, '')
      value = _.get(value, fieldName, '')
    }
    if (value && !_.isArray(value)) {
      value = [value];
    }
    if (!value) {
      value = [];
    }
    let options = [...this.state.options]
    value = value.map(v => {
      let option = options.find(o => {
        return o.value == v;
      })
      if (! option) {
        return {value: v, label: v}
      }
      return  option;
    })
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
   * Обработка клика по кнопке
   * @return {Promise<void>}
   */
  onClick = async () => {
    if (this.props.element.getSettings("click_actions", []) && !isEditor()) {
      const actionsManager = (
        await import(
          /* webpackChunkName: 'ActionsManager' */
          "../../../../../front-app/src/js/classes/modules/ActionsManager.js"
          )
      ).default;
      await actionsManager.callAllWidgetActions(
        this.props.element.getIdForAction(),
        "click",
        this.props.element.getSettings("click_actions", []),
        this.props.element
      );
    }
  }
  /**
   * Создаем элемент из поисковой строки
   * @param title
   * @return {{label, value}}
   */
  createNewItemFromQuery = (title) => {
    return {label: title, value: title};
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

    if (!element.getResponsiveLockedSetting('create')) {
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

  /**
   *
   * @param {
   *   {
   *     label: string
   *     value: string
   *   }
   * }value
   * @returns {string}
   */
  tagRender(value) {
    return value.label || ''
  }

  /**
   *
   * @param item1
   * @param item2
   * @returns {boolean}
   */
  itemsEqual(item1, item2) {
    return item1?.value == item2?.value
  }

  /**
   *
   */
  handleClear = ()=>{
    this.dispatchFieldValueToStore([], true)
  }


  /**
   * Получить css классы для input multiselect
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
    const element = this.props.element;
    let label = null;
    const settings = this.props.element.getSettings();

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
    let classes =
      this.getClasses() + (element.getResponsiveLockedSetting('position_css_classes', '', '') || "")


    let content_label = this.props.element.getResponsiveLockedSetting("content_label")
    content_label = replaceContentWithData(content_label, this.props.element.getCurrentModel()?.getData())
    let label_icon = this.props.element.getResponsiveLockedSetting("label_icon")

    if (content_label || label_icon) {
      label = (
        <div
          className={`${classes} altrp-field-label-container ${classLabel}`}
          style={styleLabel}
        >
          <label
            className={`${classes} altrp-field-label ${this.state.settings.content_required
              ? `${classes} altrp-field-label--required`
              : ""
            }`}
          >
            {content_label}
          </label>
          {label_icon && label_icon.assetType && (
            <span className={`${classes} altrp-label-icon`}>
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
    const reset_input = element.getResponsiveLockedSetting('reset__input');

    const inputProps = {
    };

    let input = null;

    let itemsOptions = this.getOptions();

    const position_css_id = this.getLockedContent('position_css_id')
    const selectedItems = this.getValue()
    const clearButton =
      selectedItems.length > 0 ? <Button icon="cross" minimal={true} className={`${classes} altrp-clear`} onClick={this.handleClear} /> : undefined;
    input = (
      <MultiSelect
        placeholder={placeholder}
        inputProps={inputProps}
        onQueryChange={this.onQueryChange}
        itemsEqual={this.itemsEqual}
        disabled={content_readonly}
        resetOnSelect={reset_input}
        popoverProps={this.popoverProps}
        createNewItemFromQuery={element.getResponsiveLockedSetting('create') ? this.createNewItemFromQuery : null}
        createNewItemRenderer={this.createNewItemRenderer}
        itemRenderer={(item, {handleClick, modifiers, query}) => {
          if (!modifiers.matchesPredicate) {
            return null;
          }
          return <MenuItem
            text={item.label}
            key={item.value}
            disabled={modifiers.disabled || item.disabled}
            onClick={handleClick}
            className={`${classes}`}
          />
        }}
        itemPredicate={(query, item) => {
          if (query === undefined || query.length === 0) {
            return true
          }
          return `${item?.label?.toLowerCase() || ''}`.indexOf(query.toLowerCase()) >= 0;
        }}
        items={itemsOptions}
        // itemRenderer={({label})=>label}
        noResults={<MenuItem disabled={true} text={no_results_text || 'No results'}/>}
        name={this.getName()}
        onItemSelect={this.onItemSelect}
        selectedItems={selectedItems}
        tagInputProps={{
          onRemove: this.handleTagRemove,
          rightElement: clearButton,
          // tagProps: getTagProps,
        }}
        id={position_css_id}
        tagRenderer={this.tagRender}
        className={classes}
      >
      </MultiSelect>
    );

    return (
      <AltrpFieldContainer
        settings={settings}
        className={`${classes} altrp-field-container `}
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

export default InputMultiSelectWidget;
