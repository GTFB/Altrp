import React from "react";
const {
  moment
} = window.altrpHelpers;
import { DateRangeInput, TimePrecision } from "@blueprintjs/datetime";

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

    this.typeDate = props.element.getSettings("content_time_type", "date");

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
    console.log(value)
    this.setState(s => ({
      ...s,
      value
    }))
  }

  render(){

    const format = this.props.element.getSettings('content_format') || 'YYYY-MM-DD';
    const dayPickerProps = {};

    const locale = this.locale || "ru";

    switch (locale) {
      case "ru":
        dayPickerProps.months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
        dayPickerProps.weekdaysShort = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб',]
    }

    return <DateRangeInput
      formatDate={date => moment(date).locale(locale).format(format)}
      parseDate={str => moment(str, this.typeDate).locale(locale).toDate()}
      onChange={this.handleChange}
      allowSingleDayRange={false}
      closeOnSelection={false}
      contiguousCalendarMonths
      disabled={false}
      enableTimePicker={false}
      dayPickerProps={dayPickerProps}
      reverseMonthAndYearMenus={false}
      selectAllOnFocus={false}
      shortcuts
      showTimeArrowButtons={false}
      singleMonthOnly={false}
      value={this.state.value}
      popoverProps={{
        usePortal: false
      }}
    />
  }
}

export default InputDateRangeWidget
