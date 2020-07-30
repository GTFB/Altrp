import React, { Component } from "react";

// column
// operator
// value
// or
// not
// values
// type

class ConditionComponent extends Component {
  render() {
    const { conditionType, item, conditionTypeOptions, columnsOptions, 
      changeHandler, typeChangeHandler } = this.props;
    return <>
      <div className="form-group__inline-wrapper">
        <div className="form-group form-group_width30">
          <label htmlFor="conditionType">Type</label>
          <select id="conditionType" required name="conditionType"
            value={conditionType}
            onChange={typeChangeHandler}
            className="form-control"
          >
            <option disabled value="" />
            {conditionTypeOptions.map(type =>
              <option key={type} value={type}>
                {type}
              </option>)}
          </select>
        </div>

        <div className="form-group form-group_width30">
          <label htmlFor="column">Field</label>
          <select id="column" required name="column"
            value={item.column}
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

        {['where', 'or_where', 'where_column'].includes(conditionType) &&
          <div className="form-group form-group_width30">
            <label htmlFor="operator">Operator</label>
            <select id="operator" required name="operator"
              value={item.operator}
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
          <div className="form-group form-group_width15">
            <input type="checkbox" id="or"
              className="form-check-input"
              checked={item.or}
              onChange={changeHandler}
            />
            <label htmlFor="or" className="label_checkbox">Or</label>
          </div>

          <div className="form-group form-group_width15">
            <input type="checkbox" id="not"
              className="form-check-input"
              checked={item.not}
              onChange={changeHandler}
            />
            <label htmlFor="not" className="label_checkbox">Not</label>
          </div>
        </>}
      </div>

      {['where', 'or_where', 'where_date'].includes(conditionType) &&
        <div className="form-group">
          <label htmlFor="value">Value</label>
          <input type="text" id="value" required name="value"
            value={item.value}
            onChange={changeHandler}
            className="form-control" />
        </div>}

      {['where_between', 'where_date'].includes(conditionType) &&
        <div className="form-group__inline-wrapper">
          <div className="form-group">
            <label htmlFor="value1">Value 1</label>
            <input type="text" id="value1" required name="value1"
              value={item.values[0]}
              onChange={changeHandler}
              className="form-control" />
          </div>

          <div className="form-group">
            <label htmlFor="value2">Value 2</label>
            <input type="text" id="value2" required name="value2"
              value={item.values[1]}
              onChange={changeHandler}
              className="form-control" />
          </div>
        </div>}

      {conditionType === "where_in" && <div className="form-group">
        <label htmlFor="values">Values</label>
        <textarea id="values" required name="values"
          value={item.value[1]}
          onChange={changeHandler}
          className="form-control" />
      </div>}
    </>
  }
}

export default ConditionComponent;