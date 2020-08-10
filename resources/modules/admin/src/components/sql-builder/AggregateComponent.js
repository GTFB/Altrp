import React, { Component } from "react";

const typeOptions = ['sum', 'min', 'max'];

class AggregateComponent extends Component {
  render() {
    const { type, column, alias } = this.props.item;
    const { columnsOptions, changeHandler } = this.props;
    return <div className="from-segment form-group__inline-wrapper">
      <div className="form-group form-group_width30">
        <label>Alias
          <input type="text" required name="alias"
            value={alias}
            onChange={changeHandler}
            className="form-control" />
        </label>
      </div>

      <div className="form-group form-group_width30">
        <label>Type
          <select required name="type"
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
        </label>
      </div>

      <div className="form-group form-group_width30">
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
      </div>
    </div>
  }
}

export default AggregateComponent;