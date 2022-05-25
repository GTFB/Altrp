import React from "react";
import moment from 'moment';
import { DateRangeInput, TimePrecision } from "@blueprintjs/datetime";
import {changeFormFieldValue} from "../../../../../front-app/src/js/store/forms-data-storage/actions";
import isEditor from "../../../../../front-app/src/js/functions/isEditor";

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
    this.locale = this.props.element.getLockedSettings("content_locale", "en");

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

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(value) {
    if(isEditor()) {
      this.setState(s => ({
        ...s,
        value
      }))
    } else {
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
      this.props.appStore.dispatch(
        changeFormFieldValue(fieldName, value, formId, userInput)
      );
      // if (userInput) {
      //   const change_actions = this.props.element.getLockedSettings("change_actions");
      //
      //   if (change_actions && !isEditor()) {
      //     const actionsManager = (
      //       await import(
      //         /* webpackChunkName: 'ActionsManager' */
      //         "../../../../../front-app/src/js/classes/modules/ActionsManager.js"
      //         )
      //     ).default;
      //     await actionsManager.callAllWidgetActions(
      //       this.props.element.getIdForAction(),
      //       "change",
      //       change_actions,
      //       this.props.element
      //     );
      //   }
      // }
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
      let valueEnd

      valueEnd = _.get(appStore.getState().formsStore, `${formIdEnd}`, '')
      valueEnd = valueEnd[fieldNameEnd] || null

      value = [
        valueStart,
        valueEnd
      ];
    }


    return value
  }

  render(){

    const format = this.props.element.getLockedSettings('content_format') || 'YYYY-MM-DD';
    const dayPickerProps = {};

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

    return <DateRangeInput
      minDate={new Date(1900, 1, 1)}
      formatDate={date => moment(date).locale(locale).format(format)}
      parseDate={str => moment(str, this.typeDate).locale(locale).toDate()}
      onChange={this.handleChange}
      dayPickerProps={dayPickerProps}
      value={value}
      startInputProps={{
        placeholder: this.props.element.getResponsiveLockedSetting("start_placeholder", "", "start date")
      }}
      endInputProps={{
        placeholder: this.props.element.getResponsiveLockedSetting("end_placeholder", "", "end date")
      }}
      popoverProps={{
        usePortal: true,
        popoverClassName: "altrp-portal" + this.props.element.getId(),
        portalContainer: frame
      }}

    />
  }
}

export default InputDateRangeWidget
