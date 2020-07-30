import React, { Component } from "react";

const typeOptions = ['sum', 'min', 'max'];

class AggregateComponent extends Component {
  render() {
    const { type, column, alias } = this.props.item;
    const { columnsOptions, changeHandler } = this.props;
    return <div className="form-group__inline-wrapper">
      <div className="form-group form-group_width30">
        <label htmlFor="alias">Alias</label>
        <input type="text" id="alias" required name="alias"
          value={alias}
          onChange={changeHandler}
          className="form-control" />
      </div>

      <div className="form-group form-group_width30">
        <label htmlFor="type">Type</label>
        <select id="type" required name="type"
          value={type}
          onChange={changeHandler}
          className="form-control"
        >
          <option disabled value="" />
          {typeOptions.map(type =>
            <option key={type} value={type}>
              {type}
            </option>)}
        </select>
      </div>

      <div className="form-group form-group_width30">
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
      </div>
    </div>
  }
}

export default AggregateComponent;