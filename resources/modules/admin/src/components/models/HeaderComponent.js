import React, { Component } from "react";

class ConditionComponent extends Component {

  render() {
    const { item: [key, value], changeHandler } = this.props;

    return <div className="form-segment row">
      <div className="form-group col-4">
        <label>Key
            <input type="text" required name={0}
            value={key}
            onChange={changeHandler}
            className="form-control"
          />
        </label>
      </div>

      <div className="form-group col-8">
        <label>Value
            <input type="text" name={1}
            value={value}
            onChange={changeHandler}
            className="form-control"
          />
        </label>
      </div>
    </div>
  }
}

export default ConditionComponent;