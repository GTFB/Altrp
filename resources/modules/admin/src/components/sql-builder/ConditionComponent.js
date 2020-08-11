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
  render() {
    const { columnsOptions, changeHandler } = this.props;
    const { conditionType, column, operator, value, or, not, values, type,
      first_column, second_column, date } = this.props.item;

    return <div className="form-segment">
      <div className="form-group__inline-wrapper">
        <div className="form-group form-group_width30">
          <label>Condition Type
            <select required name="conditionType"
              value={conditionType}
              onChange={changeHandler}
              className="form-control"
            >
              <option disabled value="" />
              {conditionTypeOptions.map(type =>
                <option key={type} value={type}>
                  {type}
                </option>)}
            </select>
          </label>
        </div>

        {conditionType && conditionType !== "where_column" && <div className="form-group form-group_width30">
          <label>Field
            <select required name="column"
              value={column}
              onChange={changeHandler}
              className="form-control"
            >
              <option disabled value="" />
              {columnsOptions.map(({ value, label }) =>
                <option key={value} value={value}>
                  {label}
                </option>)}
            </select>
          </label>
        </div>}

        {['where', 'or_where', 'where_column'].includes(conditionType) &&
          <div className="form-group form-group_width30">
            <label>Operator
              <select required name="operator"
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
            </label>
          </div>}

        {['where_between', 'where_in', 'where_column'].includes(conditionType) && <>
          <div className="form-group form-group_checkbox form-group_width15">
            <label className="label_checkbox">
              <input type="checkbox" name="or"
                className="form-check-input"
                checked={or}
                onChange={changeHandler}
              /> Or
            </label>
          </div>

          {conditionType !== 'where_column' && <div className="form-group form-group_checkbox form-group_width15">
            <label className="label_checkbox">
              <input type="checkbox" name="not"
                className="form-check-input"
                checked={not}
                onChange={changeHandler}
              /> Not
            </label>
          </div>}
        </>}

        {conditionType === "where_date" && <div className="form-group form-group_width30">
          <label>Type
            <select id="type" required name="type"
              value={type}
              onChange={changeHandler}
              className="form-control"
            >
              <option disabled value="" />
              {dateTypesOptions.map(({ value, label }) =>
                <option key={value} value={value}>{label}</option>)}
            </select>
          </label>
        </div>}
      </div>

      {['where', 'or_where'].includes(conditionType) &&
        <div className="form-group">
          <label>Value
            <input type="text" required name="value"
              value={value}
            onChange={changeHandler}
              className="form-control" />
          </label>
        </div>}

      {['where_between'].includes(conditionType) &&
        <div className="form-group__inline-wrapper">
          <div className="form-group form-group_width47">
            <label>Value 1
              <input type="text" required name="value1"
                value={values[0] || ''}
              onChange={changeHandler}
                className="form-control" />
            </label>
          </div>

          <div className="form-group form-group_width47">
            <label>Value 2
              <input type="text" required name="value2"
                value={values[1] || ''}
              onChange={changeHandler}
                className="form-control" />
            </label>
          </div>
        </div>}

      {conditionType === "where_in" && <>
        <div className="form-group">
          <label>Values
            <textarea required name="values"
              value={values.join(", ")}
              onChange={changeHandler}
              className="form-control" />
          </label>
        </div>
        <p>Comma Separated</p>
      </>}

      {conditionType === "where_date" &&
        <div className={`form-group ${["day", "month"].includes(type) ? "hide-blocks" : ""}`}>
          <label>Value
            <DatePicker selected={date}
              showTimeSelect={["datetime", "time"].includes(type)}
              showYearPicker={type === "year"}
              showTimeSelectOnly={type === "time"}
              showMonthYearPicker={type === "month"}
              dateFormat={getDateFormat(type)}
              className="form-control"
            onChange={changeHandler}
            />
          </label>
        </div>}

      {conditionType === "where_column" && <div className="form-group__inline-wrapper">
        <div className="form-group form-group_width47">
          <label>First Field
            <select required name="first_column"
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
          </label>
        </div>

        <div className="form-group form-group_width47">
          <label>Second Field
            <select required name="second_column"
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
          </label>
        </div>
      </div>}
    </div>
  }
}

export default ConditionComponent;