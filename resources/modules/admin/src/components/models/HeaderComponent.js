import React, { Component } from "react";
import {InputGroup} from "@blueprintjs/core";

class ConditionComponent extends Component {

  render() {
    const { item: [key, value], changeHandler } = this.props;

    return <div className="form-group__inline-wrapper headerComponent__container">
      <div className="form-group form-group_width47">
        <label className="data-source-label">Key</label>
        {/*<input type="text" required name={0}*/}
        {/*       value={key}*/}
        {/*       onChange={changeHandler}*/}
        {/*       className="form-control"*/}
        {/*/>*/}
        <InputGroup type="text"
                    name={0}
                    value={key}
                    onChange={changeHandler}
                    className="form-control-blueprint"
                    required
        />
      </div>

      <div className="form-group form-group_width47">
        <label className="data-source-label">Value</label>
        {/*<input type="text" name={1}*/}
        {/*       value={value}*/}
        {/*       onChange={changeHandler}*/}
        {/*       className="form-control"*/}
        {/*/>*/}

        <InputGroup type="text"
                    name={1}
                    value={value}
                    onChange={changeHandler}
                    className="form-control-blueprint"
        />
      </div>
    </div>
  }
}

export default ConditionComponent;
