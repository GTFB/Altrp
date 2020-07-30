import React, { Component } from "react";
import DatePicker from "react-datepicker";

const conditionTypeOptions = ['where', 'or_where', 'where_between', 'where_in', 'where_date', 'where_column'];

class ConditionComponent extends Component {
  render() {
    const { columnsOptions, changeHandler } = this.props;
    const { conditionType, column, operator, value, or, not, values, type, first_column, second_column } = this.props.item;
    return <>
      <div className="form-group__inline-wrapper">
        <div className="form-group form-group_width30">
          <label htmlFor="conditionType">Condition Type</label>
          <select id="conditionType" required name="conditionType"
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
        </div>

        {conditionType !== "where_column" && <div className="form-group form-group_width30">
          <label htmlFor="column">Field</label>
          <select id="column" required name="column"
            value={column}
            onChange={changeHandler}
            className="form-control"
          >
            <option disabled value="" />
            {columnsOptions.map(({ value, label }) =>
              <option key={value} value={label}>
                {label}
              </option>)}
          </select>
        </div>}

        {['where', 'or_where', 'where_column'].includes(conditionType) &&
          <div className="form-group form-group_width30">
            <label htmlFor="operator">Operator</label>
            <select id="operator" required name="operator"
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
            <input type="checkbox" id="or" name="or"
              className="form-check-input"
              checked={or}
              onChange={changeHandler}
            />
            <label htmlFor="or" className="label_checkbox">Or</label>
          </div>

          {conditionType !== 'where_column' && <div className="form-group form-group_checkbox form-group_width15">
            <input type="checkbox" id="not" name="not"
              className="form-check-input"
              checked={not}
              onChange={changeHandler}
            />
            <label htmlFor="not" className="label_checkbox">Not</label>
          </div>}
        </>}

        {conditionType === "where_date" && <div className="form-group form-group_width30">
          <label htmlFor="type">Type</label>
          <select id="type" required name="type"
            value={type}
            onChange={changeHandler}
            className="form-control"
          >
            <option disabled value="" />
            <option value="year">Year</option>
            <option value="date">Date</option>
            <option value="datetime">Time</option>
          </select>
        </div>}
      </div>

      {['where', 'or_where'].includes(conditionType) &&
        <div className="form-group">
          <label htmlFor="value">Value</label>
          <input type="text" id="value" required name="value"
            value={value}
            onChange={changeHandler}
            className="form-control" />
        </div>}

      {['where_between'].includes(conditionType) &&
        <div className="form-group__inline-wrapper">
          <div className="form-group form-group_width47">
            <label htmlFor="value1">Value 1</label>
            <input type="text" id="value1" required name="value1"
              value={values[0]}
              onChange={changeHandler}
              className="form-control" />
          </div>

          <div className="form-group form-group_width47">
            <label htmlFor="value2">Value 2</label>
            <input type="text" id="value2" required name="value2"
              value={values[1]}
              onChange={changeHandler}
              className="form-control" />
          </div>
        </div>}

      {conditionType === "where_in" && <>
        <div className="form-group">
          <label htmlFor="values">Values</label>
          <textarea id="values" required name="values"
            value={value[1]}
            onChange={changeHandler}
            className="form-control" />
        </div>
        <p>Comma Separated</p>
      </>}

      {conditionType === "where_date" && <div className="form-group">
        <label htmlFor="value">Value</label>
        <DatePicker selected={value}
          showTimeSelect={type === "datetime"}
          dateFormat={type === "datetime" ? "Pp" : 'MM/dd/yyyy'}
          className="form-control"
          onChange={date => changeHandler({ target: { name: 'value', value: date } })}
        />
      </div>}

      {conditionType === "where_column" && <div className="form-group__inline-wrapper">
        <div className="form-group form-group_width47">
          <label htmlFor="first_column">First Field</label>
          <select id="first_column" required name="first_column"
            value={first_column}
            onChange={changeHandler}
            className="form-control"
          >
            <option disabled value="" />
            {columnsOptions.map(({ value, label }) =>
              <option key={value} value={label}>
                {label}
              </option>)}
          </select>
        </div>

        <div className="form-group form-group_width47">
          <label htmlFor="second_column">Second Field</label>
          <select id="second_column" required name="second_column"
            value={second_column}
            onChange={changeHandler}
            className="form-control"
          >
            <option disabled value="" />
            {columnsOptions.map(({ value, label }) =>
              <option key={value} value={label}>
                {label}
              </option>)}
          </select>
        </div>
      </div>}
    </>
  }
}

export default ConditionComponent;