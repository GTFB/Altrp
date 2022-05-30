import {matchSorter} from "match-sorter";
import isEditor from "../../../../../front-app/src/js/functions/isEditor";
import convertData from "../../../../../front-app/src/js/functions/convertData";
import renderAssetIcon from "../../../../../front-app/src/js/functions/renderAssetIcon";
import getDataByPath from "../../../../../front-app/src/js/functions/getDataByPath";
import replaceContentWithData from "../../../../../front-app/src/js/functions/replaceContentWithData";
import getDataFromLocalStorage from "../../../../../front-app/src/js/functions/getDataFromLocalStorage";
import renderAsset from "../../../../../front-app/src/js/functions/renderAsset";
import {changeFormFieldValue} from "../../../../../front-app/src/js/store/forms-data-storage/actions";
import React from "react";
import recurseEach from "../../helpers/recurse-each";
const Button = window.altrpLibs.Blueprint.Button;
const MenuItem = window.altrpLibs.Blueprint.MenuItem;
const Popover = window.altrpLibs.Popover2;
const TreeBlueprint = window.altrpLibs.Blueprint.Tree;
const Alignment = window.altrpLibs.Blueprint.Alignment;
const InputGroup = window.altrpLibs.Blueprint.InputGroup;

(window.globalDefaults = window.globalDefaults || []).push(`

.altrp-select-tree {
  display: flex;
  grid-gap: 5px;
  flex-direction: column;
}

.altrp-select-tree_popover{
  .bp3-tree{
    max-height: 250px;
    overflow: auto;
  }
  .bp3-tree-node{
    cursor: pointer;
  }
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

.altrp-select-tree-btn.altrp-select-tree-btn {
  justify-content: flex-end;
  padding-right:
}

.altrp-select-tree-btn.altrp-select-tree-btn.altrp-select-tree-btn .bp3-icon-caret-down.bp3-icon-caret-down {
  margin: 0;
}

.altrp-select-tree-btn .bp3-button-text {
  flex: 1;
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
  ${({settings: {content_label_position_type}}) => {
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

class InputSelectTreeWidget extends Component {
  timeInput = null;

  constructor(props) {
    super(props);
    props.element.component = this;
    if (window.elementDecorator) {
      window.elementDecorator(this);
    }
    this.defaultValue =
      this.getLockedContent("content_default_value")
    let options = [];

    const flatOptions = [];
    if(isEditor()){
      options = [
        {
          label: 'Empty First Level',
          value: 1,
          id: 1,
          childNodes: [],
        },
        {
          label: 'First Level With Child',
          value: 2,
          id: 2,
          childNodes: [

            {
              label: 'Empty Second Level',
              value: 3,
              id: 3,
              childNodes: [

              ],
            },

            {
              label: 'Second Level With Child',
              value: 4,
              id: 4,
              childNodes: [
                {
                  label: 'Empty Third Level',
                  value: 5,
                  id: 5,
                  childNodes: [

                  ],
                },
              ],
            },
          ],
        },
      ];
      recurseEach(options, 'childNodes', item => {
        flatOptions.push(item)
      });
    }
    this.state = {
      settings: {...props.element.getSettings()},
      value: this.defaultValue,
      options,
      isOpen:false,
      flatOptions,
      paramsForUpdate: null,
      searchValue: ""
    };

    this.popoverProps = {
      usePortal: true,
      position: 'bottom',
      minimal: props.element.getResponsiveLockedSetting('minimal'),
      portalClassName: `altrp-portal altrp-portal_input-select altrp-portal${this.props.element.getId()} ${this.state.widgetDisabled ? 'pointer-event-none' : ''}`,
      portalContainer: window.EditorFrame ? window.EditorFrame.contentWindow.document.body : document.body,
    };
    if(! isEditor()){
      // this.popoverProps.boundary = '#front-app'
    }
    this.altrpSelectRef = React.createRef();
    if (this.getLockedContent("content_default_value")) {
      this.dispatchFieldValueToStore(this.getLockedContent("content_default_value"));
    }
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

    if (
      prevProps &&
      !prevProps.currentDataStorage.getProperty("currentDataStorageLoaded") &&
      this.props.currentDataStorage.getProperty("currentDataStorageLoaded")
    ) {
      let value = this.getLockedContent(
        "content_default_value",
      );
      this.setState(
        state => ({...state, value, contentLoaded: true}),
        () => {
          this.dispatchFieldValueToStore(value);
        }
      );
    }
    this.updateOptions();
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
    if(isEditor()){
      return;
    }

    let newOptions = this.props.element.getResponsiveLockedSetting('content_options') || '';
    newOptions = getDataByPath(newOptions.replace('{{', '').replace('}}', ''))
    if(! _.isArray(newOptions)) {
      return;
    }
    const flatOptions = []
    recurseEach(newOptions, 'childNodes', item=>{
      flatOptions.push(item)
    })
    if(! _.isEqual(this.state.flatOptions, flatOptions)){
      this.setState(state => ({...state, options: _.cloneDeep(newOptions), flatOptions: _.cloneDeep(flatOptions)}))
    }
  }

  /**
   * получить опции
   * @return []
   */
  getOptions() {
    let options = [...this.state.options];
    if(! _.isArray(options)){
      options = [];
    }
    const optionsDynamicSetting = this.props.element.getDynamicSetting(
      "content_options"
    );
    if (optionsDynamicSetting) {
      options = convertData(optionsDynamicSetting, options);
    }
    if(this.state.searchValue){
      options = matchSorter(options, this.state.searchValue, {
        keys: [o => {
          return o.label
        }]
      })
    }
    if(this.props.element.getResponsiveLockedSetting('content_options_nullable')){
      let nullLabel = '';
      if(this.props.element.getResponsiveLockedSetting('nulled_option_title')){
        nullLabel = this.props.element.getResponsiveLockedSetting('nulled_option_title')
      }
      options.unshift({
        value: '',
        label: nullLabel,
        id: '',
        childNodes: [],
      })
    }
    options = options.map(o=>{
      o = {...o}
      o.hasCaret = ! ! o?.childNodes?.length
      return o;
    })

    return options
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

  handleNodeClick = (node, path)=> {
    const options = this.getOptions();
    path = path.join('.childNodes.')
    let value = _.get(options,`${path}.value`)
    this.dispatchFieldValueToStore(value, true)
    this.setState(state=>({...state, isOpen:false,}))
  }

  /**
   * Вернуть лэйбл текущего значения
   * @return {*}
   */
  getLabel = ()=>{
    const flatOptions = this.state.flatOptions;
    let label =  flatOptions.find(o=>o.value === this.getValue())?.label || '';
    if(! this.getValue() && this.props.element.getResponsiveLockedSetting('content_options_nullable')){
      label = this.props.element.getResponsiveLockedSetting('nulled_option_title') || ''
    }
    return label
  }

  forEachNode(nodes, callback) {
    if (nodes === undefined) {
      return;
    }

    for (const node of nodes) {
      callback(node);
      this.forEachNode(node.childNodes, callback);
    }
  }


  handleNodeToggle = (node, path) => {
    let options = this.state.options
    recurseEach(options, 'childNodes', item=>{
      if(item.value === node.value){
        item.isExpanded = ! item.isExpanded
      }
    })
    this.setState(state=>({...state, options}))
  }


  /**
   * Обработка клика по кнопке
   * @return {Promise<void>}
   */
  onClick = async ()=>{
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

  /**
   * Фильтрация опций
   * @param searchValue
   * @param get
   * @return {T[]}
   */
  handleSearch = (searchValue, get=false) => {
    this.setState(state=>({...state, searchValue}))
  }

  onInteraction = (isOpen)=>{
    this.setState(state=>({...state, isOpen}))
  }

  /**
   * Получить css классы для input select tree
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
    let buttonLabel = this.getLabel();

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
    let label_icon = this.props.element.getResponsiveLockedSetting("label_icon")

    if (content_label || label_icon) {
      label = (
        <div
          className={`${classes} altrp-field-label-container classLabel`}
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
    const s_off = element.getResponsiveLockedSetting('s_off');

    const inputProps = {
      placeholder,
    };

    let input = null;
    const position_css_id = this.getLockedContent('position_css_id')

    let body = isEditor() ?
      document.getElementById("editorContent").contentWindow.document.body
      :
      document.body;
    input = (
      <Popover
        usePortal={true}
        fill={true}
        isOpen={this.state.isOpen}
        onInteraction={this.onInteraction}
        popoverClassName={`${classes} altrp-select-tree_popover altrp-select-tree${this.props.element.getId()}`}
        renderTarget={({isOpen, ref, ...targetProps}) => {
          targetProps.className += " altrp-select-tree-btn"
          return (
            <Button
              className={classes}
              text={buttonLabel}
              fill
              disabled={content_readonly}
              elementRef={ref}
              icon={this.renderLeftIcon()}
              rightIcon={this.renderRightIcon()}
              {...targetProps}
              onClick={(e) => {
                this.onClick();
                targetProps.onClick(e)
              }}
            />
          )
        }}
        portalContainer={body}
        interactionKind="click"
        placement="bottom"
        content={
          <div className={`${classes} altrp-select-tree`} id={position_css_id}>
            {
              ! s_off ? (
                <InputGroup
                  leftIcon="search"
                  placeholder="Filter..."
                  value={this.state.searchValue}
                  onChange={(e) => this.handleSearch(e.target.value)}
                  {...inputProps}
                />
              ) : ""
            }
            {
              this.getOptions().length > 0 ? (
                <TreeBlueprint
                  contents={this.getOptions()}
                  onNodeClick={this.handleNodeClick}
                  onNodeCollapse={this.handleNodeToggle}
                  onNodeExpand={this.handleNodeToggle}
                />
              ) : ''
            }
          </div>
        }
      />
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

export default InputSelectTreeWidget;
