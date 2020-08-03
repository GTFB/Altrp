import React, { Component } from "react";

class FieldCalculationLogic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rightType: "string",
      is1stString: true,
      is2ndString: true,
      right: {
        string: '',
        fieldId: '',
        string_1: '',
        fieldId_1: '',
        string_2: '',
        fieldId_2: '',
      }
    };
    this.rightTypeHandler = this.rightTypeHandler.bind(this);
    this.rightChangeHandler = this.rightChangeHandler.bind(this);
    this.setRight = this.setRight.bind(this);
  }

  rightTypeHandler(type) {
    this.setState(_state => ({ rightType: type }), this.setRight)
  }

  rightChangeHandler({ target: { value, name } }) {
    this.setState(state => {
      state.right[name] = value;
      return state;
    }, this.setRight)
  }

  operatorChangeHandler(value) {
    switch (value) {
      case "not-null":
      case "null":
        this.rightTypeHandler("null");
        break;
      case "between":
        this.rightTypeHandler("array");
        break;
      default:
        this.rightTypeHandler("string");
        break;
    }
    this.props.changeHandler({ value, name: "operator" });
  }

  setRight() {
    const { rightType, is1stString, is2ndString, right } = this.state;
    let value;

    switch (rightType) {
      case "string":
        value = right.string;
        break;
      case "object":
        value = { id: right.fieldId }
        break;
      case "null":
        value = null
        break;
      case "array":
        value = [
          is1stString ? right.string_1 : { id: right.fieldId_1 },
          is2ndString ? right.string_2 : { id: right.fieldId_2 }
        ]
        break;
      default:
        break;
    }

    this.props.changeHandler({ name: "right", value });
  }

  render() {
    const { item, index, fieldsOptions, changeHandler, deleteItemHandler } = this.props;
    const { rightType, right, is1stString, is2ndString } = this.state;
    return <>
      <div className="flex-container">
        <p>if</p>
        <button className="btn btn_failure" type="button" onClick={deleteItemHandler}>
          Delete
        </button>
      </div>

      <div className="form-group">
        <label htmlFor={"left" + index}>Field Name</label>
        <select className="form-control" id={"left" + index} name="left"
          value={item.left}
          onChange={({ target: { value, name } }) => changeHandler({ value, name })}
        >
          <option disabled value="" />
          {fieldsOptions.map(({ value, label }) =>
            <option value={value} key={value}>{label}</option>)}
        </select>
      </div>

      <p>Comparison Operators</p>

      <div className="form-group">
        <select className="form-control" name="operator"
          value={item.operator}
          onChange={({ target: { value } }) => this.operatorChangeHandler(value)}
        >
          <option value="" disabled />
          <option value="not-null">Not Null</option>
          <option value="null">Null</option>
          <option value="=">Equals</option>
          <option value="<>">Not Equals</option>
          <option value="between">Between</option>
          <option value=">">&gt;</option>
          <option value=">=">&gt;=</option>
          <option value="<">&lt;</option>
          <option value="<=">&lt;=</option>
        </select>
      </div>

      {["string", "object"].includes(rightType) &&
        <div className="form-group__inline-wrapper">
          <div className="form-group form-group_width47">
            <label>Value
              <input type="radio" className="disabling-radio"
                checked={rightType === "string"}
                onChange={() => this.rightTypeHandler("string")}
              />
            </label>
            <input type="text" className="form-control" name="string"
              value={right.string}
              disabled={rightType !== "string"}
              onChange={this.rightChangeHandler}
            />
          </div>

          <p className="form-group__inline-wrapper__divider">or</p>

          <div className="form-group form-group_width47">
            <label htmlFor={"right" + index}>Field Name
              <input type="radio" className="disabling-radio"
                checked={rightType === "object"}
                onChange={() => this.rightTypeHandler("object")}
              />
            </label>
            <select className="form-control" id={"right" + index} name="fieldId"
              value={right.fieldId}
              disabled={rightType !== "object"}
              onChange={this.rightChangeHandler}
            >
              <option disabled value="" />
              {fieldsOptions.map(({ value, label }) =>
                <option value={value} key={value}>{label}</option>)}
            </select>
          </div>
        </div>}

      {rightType === "array" && <>
        <div className="form-group__inline-wrapper">
          <div className="form-group form-group_width47">
            <label>Value
              <input type="radio" className="disabling-radio"
                checked={is1stString}
                onChange={() => this.setState({ is1stString: true }, this.setRight)}
              />
            </label>
            <input type="text" className="form-control" name="string_1"
              value={right.string_1}
              disabled={!is1stString}
              onChange={this.rightChangeHandler}
            />
          </div>

          <p className="form-group__inline-wrapper__divider">or</p>

          <div className="form-group form-group_width47">
            <label htmlFor={"right" + index}>Field Name
              <input type="radio" className="disabling-radio"
                checked={!is1stString}
                onChange={() => this.setState({ is1stString: false }, this.setRight)}
              />
            </label>
            <select className="form-control" id={"right" + index} name="fieldId_1"
              value={right.fieldId_1}
              disabled={is1stString}
              onChange={this.rightChangeHandler}
            >
              <option disabled value="" />
              {fieldsOptions.map(({ value, label }) =>
                <option value={value} key={value}>{label}</option>)}
            </select>
          </div>
        </div>

        <p className="centred">and</p>

        <div className="form-group__inline-wrapper">
          <div className="form-group form-group_width47">
            <label>Value
              <input type="radio" className="disabling-radio"
                checked={is2ndString}
                onChange={() => this.setState({ is2ndString: true }, this.setRight)}
              />
            </label>
            <input type="text" className="form-control" name="string_2"
              value={right.string_2}
              disabled={!is2ndString}
              onChange={this.rightChangeHandler}
            />
          </div>

          <p className="form-group__inline-wrapper__divider">or</p>

          <div className="form-group form-group_width47">
            <label htmlFor={"right" + index}>Field Name
              <input type="radio" className="disabling-radio"
                checked={!is2ndString}
                onChange={() => this.setState({ is2ndString: false }, this.setRight)}
              />
            </label>
            <select className="form-control" id={"right" + index} name="fieldId_2"
              value={right.fieldId_2}
              disabled={is2ndString}
              onChange={this.rightChangeHandler}
            >
              <option disabled value="" />
              {fieldsOptions.map(({ value, label }) =>
                <option value={value} key={value}>{label}</option>)}
            </select>
          </div>
        </div>
      </>}

      <p>Then = </p>

      <div className="form-group">
        <label htmlFor={"result" + index}>Value</label>
        <input type="text" className="form-control" id={"result" + index} name="result"
          value={item.result}
          onChange={({ target: { value, name } }) => changeHandler({ value, name })}
        />
      </div>
      <p>E.g. [field_name]*[field_name] + 10</p>
    </>
  }
}

export default FieldCalculationLogic;