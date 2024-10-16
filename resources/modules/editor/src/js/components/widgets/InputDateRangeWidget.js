import React from "react";
import moment from 'moment';
import { DateRangeInput, TimePrecision } from "@blueprintjs/datetime";
import * as luxon from 'luxon'
import {changeFormFieldValue} from "../../../../../front-app/src/js/store/forms-data-storage/actions";
import getDataByPath from "../../../../../front-app/src/js/functions/getDataByPath";
import isEditor from "../../../../../front-app/src/js/functions/isEditor";
import '../../../sass/blueprint-datetime.scss'
import replaceContentWithData from "../../../../../front-app/src/js/functions/replaceContentWithData";
const {DateTime} = luxon

class InputDateRangeWidget extends Component {
  constructor(props){
    super(props);
    let settings = props.element.getSettings();
    this.state = {
      settings: settings,
      value: [null, null],
    };

    props.element.component = this;
    if(window.elementDecorator){
      window.elementDecorator(this);
    }
    if(props.baseRender){
      this.render = props.baseRender(this);
    }
    this.locale = this.props.element.getLockedSettings("content_locale", ) || getDataByPath('altrppage.lang');

    switch (this.typeDate) {
      case "date":
        this.typeDate = "LL";
        break;
      case "time":
        this.typeDate = "LT";
        this.timePrecision = TimePrecision.MINUTE
        break
      case "dateTime":
        this.typeDate = "llll";
        this.timePrecision = TimePrecision.MINUTE
        break
    }
    let content_start_default = props.element.getSettings('content_default_value_start')

    let content_end_default = props.element.getSettings('content_default_value_end')
    if(content_start_default && content_start_default.includes('{{')){
      content_start_default = getDataByPath(content_start_default.replace('{{', '').replace('}}', ''))
    }

    if(content_start_default){
      content_start_default = DateTime.fromSQL(content_start_default).toJSDate()
    }
    if(content_end_default && content_end_default.includes('{{')){
      content_end_default = getDataByPath(content_end_default.replace('{{', '').replace('}}', ''))
    }
    if(content_end_default){
      content_end_default = DateTime.fromSQL(content_end_default).toJSDate()
    }

    if(!isEditor()) {
      if(content_start_default){
        this.dispatchFieldValueToStore(content_start_default, 0, true)
      }
      if(content_end_default){
        this.dispatchFieldValueToStore(content_end_default, 1, true)
      }
    }
  }

  handleChange = (value)=> {

    this.setState(s => ({
      ...s,
      value
    }))
    if(!isEditor()) {

      this.dispatchFieldValueToStore(value[0], 0, true)
      this.dispatchFieldValueToStore(value[1], 1, true)
    }
  }

  /**
   * Передадим значение в хранилище формы
   * @param {*} value
   * @param index
   * @param {boolean} userInput true - имзенилось пользователем
   */
  dispatchFieldValueToStore = async (value, index, userInput = false) => {

    let formId;
    let fieldName;
    if(index === 0) {
      formId = this.props.element.getFormId("form_id_start");
      fieldName = this.props.element.getFieldId("field_id_start");
    } else if(index === 1) {
      formId = this.props.element.getFormId("form_id_end");
      fieldName = this.props.element.getFieldId("field_id_end");
    }
    if (fieldName.indexOf("{{") !== -1) {
      fieldName = replaceContentWithData(fieldName);
    }
    if (_.isObject(this.props.appStore) && fieldName && formId) {
      if(value){
        value = DateTime.fromJSDate(value).toSQL()
      }

      this.props.appStore.dispatch(
        changeFormFieldValue(fieldName, value, formId, userInput)
      );

      let query_sync = this.props.element.getLockedSettings(
        "query_sync"
      );
      if(!isEditor() && query_sync){
        const updateQueryString = (await import('../../../../../front-app/src/js/functions/updateQueryString')).default
        updateQueryString(fieldName, value)

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
    }
  };

  /**
   *
   * @returns {number}
   */
  getValue = () => {
    let value;
    let formIdStart = this.props.element.getFormId("form_id_start");
    let fieldNameStart = this.props.element.getFieldId("field_id_start");
    let formIdEnd = this.props.element.getFormId("form_id_end");
    let fieldNameEnd = this.props.element.getFieldId("field_id_end");

    if (isEditor()) {
      value = this.state.value;
    } else {
      let valueStart

      valueStart = _.get(appStore.getState().formsStore, `${formIdStart}`, '')
      valueStart = valueStart[fieldNameStart] || null
      if(valueStart){
        valueStart = DateTime.fromSQL(valueStart).toJSDate()
      }
      let valueEnd

      valueEnd = _.get(appStore.getState().formsStore, `${formIdEnd}`, '')
      valueEnd = valueEnd[fieldNameEnd] || null
      if(valueEnd){
        valueEnd = DateTime.fromSQL(valueEnd).toJSDate()
      }
      value = [
        valueStart,
        valueEnd
      ];
    }


    return value
  }

  /**
   * Получить css классы для input Date range
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

  render(){
    const {element} = this.props
    const {data} = element.getCardModel() ? element.getCardModel().getData(1) : {}
    const format = element.getLockedSettings('content_format') || 'YYYY-MM-DD';
    const shortcuts = !!element.getLockedSettings('shortcuts') ;


    const dayPickerProps = {

    };
    if(getDataByPath(this.getContent('max_date'))){
      dayPickerProps.maxDate = DateTime.fromSQL(getDataByPath(this.getContent('max_date'))).toJSDate()
    }
    if(getDataByPath(this.getContent('min_date'))){
      dayPickerProps.minDate = DateTime.fromSQL(getDataByPath(this.getContent('min_date'))).toJSDate()
    }
    let value = this.getValue();

    const locale = this.locale || "ru";

    switch (locale) {
      case "ru":
        dayPickerProps.months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
        dayPickerProps.weekdaysShort = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб',]
    }

    let frame = document.body;

    if (isEditor()) {
      frame = document.getElementById("editorContent").contentWindow.document.body
    }
    let classes =
      this.getClasses() + (element.getResponsiveLockedSetting('position_css_classes') || "")
    let startPlaceholder = element.getResponsiveLockedSetting("start_placeholder", "", "Start Date")
    startPlaceholder = replaceContentWithData(startPlaceholder, data)
    let endPlaceholder = element.getResponsiveLockedSetting("end_placeholder", "", "End Date")
    endPlaceholder = replaceContentWithData(endPlaceholder, data)
    return <DateRangeInput
      className={classes}
      formatDate={date => moment(date).locale(locale).format(format)}
      parseDate={str => moment(str, this.typeDate).locale(locale).toDate()}
      onChange={this.handleChange}
      maxDate={dayPickerProps.maxDate}
      minDate={dayPickerProps.minDate}
      allowSingleDayRange={element.getSettings("allow_single_day_range")}
      dayPickerProps={dayPickerProps}
      value={value}
      shortcuts={shortcuts}
      locale={locale}
      startInputProps={{
        placeholder: startPlaceholder
      }}
      endInputProps={{
        placeholder: endPlaceholder
      }}
      popoverProps={{
        usePortal: true,
        popoverClassName: "altrp-portal" + element.getId(),
        portalContainer: frame
      }}

    />
  }
}

export default InputDateRangeWidget
