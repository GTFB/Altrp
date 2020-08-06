import React, { Component } from "react";
import DatePicker from "react-datepicker";

const conditionTypeOptions = ['where', 'or_where', 'where_between', 'where_in', 'where_date', 'where_column'];
const dateTypesOptions = [
  { value: 'datetime', label: 'Date - Time' },
  { value: 'date', label: 'Date' },
  { value: 'time', label: 'Time' },
  { value: 'day', label: 'Day' },
  { value: 'month', label: 'Month' },
  { value: 'year', label: 'Year' }
];
/** @function getDateFormat
  * @param {string} type тип поля where_date
  * @return {string} формат отображаемых данных
 */
function getDateFormat(type) {
  switch (type) {
    case 'datetime':
      return "yyyy/MM/dd h:mm:ss";
    case 'date':
      return "yyyy/MM/dd";
    case 'time':
      return "h:mm:ss";
    case 'day':
      return "dd";
    case 'month':
      return "MM";
    case 'year':
      return "yyyy";

    default:
      break;
  }
}

class ConditionComponent extends Component {
  changeHandler = (name, value) => {
    const { conditionType, index, or } = this.props.item;
    let item = {...this.props.item};
    item[name] = value;
    this.props.changeCondition(conditionType, index, item, or);
  };
  render() {
    const { columnsOptions, changeHandler } = this.props;
    const { conditionType, column, operator, value, or, not, values, type,
      first_column, second_column, date, id } = this.props.item;

    return <>
      <div className="form-group__inline-wrapper">
        <div className="form-group form-group_width30">
          <label htmlFor={"conditionType" + id}>Condition Type</label>
          <select id={"conditionType" + id} required name="conditionType"
            value={conditionType}
            onChange={(e)=> (this.changeHandler('conditionType', e.target.value))}
            className="form-control"
          >
            <option disabled value="" />
            {conditionTypeOptions.map(type =>
              <option key={type} value={type}>
                {type}
              </option>)}
          </select>
        </div>

        {conditionType !== "where_column" && <div className="form-group form-group_width30">
          <label htmlFor={"column" + id}>Field</label>
          <select id={"column" + id} required name="column"
            value={column}
            onChange={(value)=> (this.changeHandler('column', value))}
            className="form-control"
          >
            <option disabled value="" />
            {columnsOptions.map(({ value, label }) =>
              <option key={value} value={value}>
                {label}
              </option>)}
          </select>
        </div>}

        {['where', 'or_where', 'where_column'].includes(conditionType) &&
          <div className="form-group form-group_width30">
            <label htmlFor={"operator" + id}>Operator</label>
            <select id={"operator" + id} required name="operator"
              value={operator}
              onChange={changeHandler}
              className="form-control"
            >
              <option value="" disabled />
              <option value="not-null">Not Null</option>
              <option value="null">Null</option>
              <option value="=">Equals</option>
              <option value="!=">Not Equals</option>
              <option value="between">Between</option>
              <option value=">">&gt;</option>
              <option value=">=">&gt;=</option>
              <option value="<">&lt;</option>
              <option value="<=">&lt;=</option>
            </select>
          </div>}

        {['where_between', 'where_in', 'where_column'].includes(conditionType) && <>
          <div className="form-group form-group_checkbox form-group_width15">
            <input type="checkbox" id={"or" + id} name="or"
              className="form-check-input"
              checked={or}
              onChange={changeHandler}
            />
            <label htmlFor={"or" + id} className="label_checkbox">Or</label>
          </div>

          {conditionType !== 'where_column' && <div className="form-group form-group_checkbox form-group_width15">
            <input type="checkbox" id={"not" + id} name="not"
              className="form-check-input"
              checked={not}
              onChange={changeHandler}
            />
            <label htmlFor={"not" + id} className="label_checkbox">Not</label>
          </div>}
        </>}

        {conditionType === "where_date" && <div className="form-group form-group_width30">
          <label htmlFor={"type" + id}>Type</label>
          <select id="type" required name="type"
            value={type}
            onChange={changeHandler}
            className="form-control"
          >
            <option disabled value="" />
            {dateTypesOptions.map(({ value, label }) =>
              <option key={value} value={value}>{label}</option>)}
          </select>
        </div>}
      </div>

      {['where', 'or_where'].includes(conditionType) &&
        <div className="form-group">
          <label htmlFor={"value" + id}>Value</label>
          <input type="text" id={"value" + id} required name="value"
            value={value}
            onChange={changeHandler}
            className="form-control" />
        </div>}

      {['where_between'].includes(conditionType) &&
        <div className="form-group__inline-wrapper">
          <div className="form-group form-group_width47">
            <label htmlFor={"value1" + id}>Value 1</label>
            <input type="text" id={"value1" + id} required name="value1"
              value={values[0]}
              onChange={changeHandler}
              className="form-control" />
          </div>

          <div className="form-group form-group_width47">
            <label htmlFor={"value2" + id}>Value 2</label>
            <input type="text" id={"value2" + id} required name="value2"
              value={values[1]}
              onChange={changeHandler}
              className="form-control" />
          </div>
        </div>}

      {conditionType === "where_in" && <>
        <div className="form-group">
          <label htmlFor={"values" + id}>Values</label>
          <textarea id={"values" + id} required name="values"
            value={values[1]}
            onChange={changeHandler}
            className="form-control" />
        </div>
        <p>Comma Separated</p>
      </>}

      {conditionType === "where_date" &&
        <div className={`form-group ${["day", "month"].includes(type) ? "hide-blocks" : ""}`}>
          <label>Value</label>
          <DatePicker selected={date}
            showTimeSelect={["datetime", "time"].includes(type)}
            showYearPicker={type === "year"}
            showTimeSelectOnly={type === "time"}
            showMonthYearPicker={type === "month"}
            dateFormat={getDateFormat(type)}
            className="form-control"
            onChange={date => changeHandler({ target: { name: 'date', value: date } })}
          />
        </div>}

      {conditionType === "where_column" && <div className="form-group__inline-wrapper">
        <div className="form-group form-group_width47">
          <label htmlFor={"first_column" + id}>First Field</label>
          <select id={"first_column" + id} required name="first_column"
            value={first_column}
            onChange={changeHandler}
            className="form-control"
          >
            <option disabled value="" />
            {columnsOptions.map(({ value, label }) =>
              <option key={value} value={value}>
                {label}
              </option>)}
          </select>
        </div>

        <div className="form-group form-group_width47">
          <label htmlFor={"second_column" + id}>Second Field</label>
          <select id={"first_column" + id} required name="second_column"
            value={second_column}
            onChange={changeHandler}
            className="form-control"
          >
            <option disabled value="" />
            {columnsOptions.map(({ value, label }) =>
              <option key={value} value={value}>
                {label}
              </option>)}
          </select>
        </div>
      </div>}
    </>
  }
}

export default ConditionComponent;