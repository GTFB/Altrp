import React, { Component } from "react";
import { Link } from "react-router-dom";

const fieldTypeOptions = ['varchar', 'int', 'bigint', 'boolean', 'text', 'long text', 'calculated'];
const attributeOptions = ['BINARY', 'UNSIGNED', 'UNSIGNED ZEROFILL', 'on update'];
const inputTipeOptions = ['textarea', 'text', 'number', 'slider', 'WYSIWYG', 'color', 'select', 'checkbox', 'radio button']

class AddModelForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {
        name: '',
        title: '',
        description: '',
        is_label: false,
        is_title: false,
        type: '',
        length_value: '',
        default: '',
        attribute: '',
        input_type: '',
        options: '',
        nullable: false,
        indexed: false,
        editable: false,
        calculation: '',
        calculation_logic: '',
      },
    };
    this.submitHandler = this.submitHandler.bind(this);
  }

  changeValue(value, field) {
    this.setState(state => {
      state = { ...state };
      state.value[field] = value;
      return state
    })
  }

  submitHandler(e) {
    e.preventDefault();
    // post: /admin/ajax/models (value)
    console.log(this.state.value);
  }

  render() {
    return <form className="admin-form field-form" onSubmit={this.submitHandler}>
      <div className="form-group">
        <label htmlFor="field-title">Field Title</label>
        <input type="text" id="field-title" required
          value={this.state.value.title}
          onChange={e => { this.changeValue(e.target.value, 'title') }}
          className="form-control" />
      </div>

      <div className="form-group__inline-wrapper">
        <div className="form-group form-group_width30 form-group-with-margin">
          <label htmlFor="field-name">Field Name</label>
          <input type="text" id="field-name" required
            value={this.state.value.name}
            onChange={e => { this.changeValue(e.target.value, 'name') }}
            className="form-control" />
        </div>

        <div className="form-group form-group_width65">
          <label htmlFor="field-description">Field Description</label>
          <input type="text" id="field-description" required
            value={this.state.value.description}
            onChange={e => { this.changeValue(e.target.value, 'description') }}
            className="form-control" />
        </div>
      </div>

      <div className="checkbox-group">
        <div className="form-group">
          <input type="checkbox" id="field-is_label" required
            checked={this.state.value.is_label}
            onChange={e => { this.changeValue(e.target.checked, 'is_label') }}
          />
          <label htmlFor="field-is_label">As Label</label>
        </div>
        <div className="form-group">
          <input type="checkbox" id="field-is_title" required
            checked={this.state.value.is_title}
            onChange={e => { this.changeValue(e.target.checked, 'is_title') }}
          />
          <label htmlFor="field-is_title">As Title</label>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="field-is_label">Field Type</label>
        <select id="field-is_label" required
          value={this.state.value.type}
          onChange={e => { this.changeValue(e.target.value, 'type') }}
          className="form-control"
        >
          <option disabled value="" />
          {fieldTypeOptions.map(item =>
            <option key={item} value={item}>
              {item}
            </option>)}
        </select>
      </div>

      <div className="form-group__inline-wrapper">
        <div className="form-group form-group_width47">
          <label htmlFor="field-length_value">Length/Value</label>
          <input type="text" id="field-length_value" required
            value={this.state.value.length_value}
            onChange={e => { this.changeValue(e.target.value, 'length_value') }}
            className="form-control" />
        </div>

        <div className="form-group form-group_width47">
          <label htmlFor="field-default">Default</label>
          <input type="text" id="field-default" required
            value={this.state.value.default}
            onChange={e => { this.changeValue(e.target.value, 'default') }}
            className="form-control" />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="field-attribute">Attribute</label>
        <select id="field-attribute" required
          value={this.state.value.attribute}
          onChange={e => { this.changeValue(e.target.value, 'attribute') }}
          className="form-control"
        >
          <option disabled value="" />
          {attributeOptions.map(item =>
            <option key={item} value={item}>
              {item}
            </option>)}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="field-input_type">Input Type</label>
        <select id="field-input_type" required
          value={this.state.value.input_type}
          onChange={e => { this.changeValue(e.target.value, 'input_type') }}
          className="form-control"
        >
          <option disabled value="" />
          {inputTipeOptions.map(item =>
            <option key={item} value={item}>
              {item}
            </option>)}
        </select>
      </div>

      {['select', 'checkbox', 'radio button'].includes(this.state.value.input_type) && <>
        <div className="form-group">
          <label htmlFor="field-options">Options</label>
          <textarea id="field-options" required
            value={this.state.value.options}
            onChange={e => { this.changeValue(e.target.value, 'options') }}
            className="form-control"
          />
        </div>
        <p>Enter each choice on a new line.</p>
        <p>Fro more control, you may specify both a value and label like this:</p>
        <p>red | Red</p>
      </>}

      <div className="checkbox-group">
        <div className="form-group">
          <input type="checkbox" id="field-nullable" required
            checked={this.state.value.nullable}
            onChange={e => { this.changeValue(e.target.checked, 'nullable') }}
          />
          <label htmlFor="field-nullable">Nullable</label>
        </div>
        <div className="form-group">
          <input type="checkbox" id="field-indexed" required
            checked={this.state.value.indexed}
            onChange={e => { this.changeValue(e.target.checked, 'indexed') }}
          />
          <label htmlFor="field-indexed">Indexed</label>
        </div>
        <div className="form-group">
          <input type="checkbox" id="field-editable" required
            checked={this.state.value.editable}
            onChange={e => { this.changeValue(e.target.checked, 'editable') }}
          />
          <label htmlFor="field-editable">Editable</label>
        </div>
      </div>

      <div className="btn__wrapper">
        <button className="btn btn_success" type="submit">Add</button>
        <Link className="btn" to="/admin/models">Cancel</Link>
        {/* <button className="btn btn_failure">Delete</button> */}
      </div>
    </form>;
  }
}

export default AddModelForm;