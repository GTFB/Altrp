import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import FieldCalculationLogic from "./FieldCalculationLogic";
import Resource from "../../../../editor/src/js/classes/Resource";
import { titleToName } from "../../js/helpers";

const fieldTypeOptions = [
  {
    value: 'string',
    label: 'String'
  },
  {
    value: 'integer',
    label: 'integer'
  },
  {
    value: 'bigint',
    label: 'Bigint'
  },
  {
    value: 'boolean',
    label: 'Boolean'
  },
  {
    value: 'text',
    label: 'Text'
  },
  {
    value: 'longText',
    label: 'Long Text'
  },
  {
    value: 'calculated',
    label: 'Calculated'
  },
  {
    value: 'date',
    label: 'Date'
  },
  {
    value: 'dateTime',
    label: 'Datetime'
  },
];
const attributeOptions = ['BINARY', 'UNSIGNED', 'UNSIGNED ZEROFILL', 'on update'];
const inputTipeOptions = ['textarea', 'text', 'number', 'slider', 'WYSIWYG', 'color', 'select', 'checkbox', 'radio button'];


class AddFieldForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAlways: false,
      fieldsOptions: [],
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
        calculation_logic: [
          { left: '', operator: '', result: '', right: '' }
        ],
      },
      // value: this.props.field || {},
    };
    this.submitHandler = this.submitHandler.bind(this);
    this.itemChangeHandler = this.itemChangeHandler.bind(this);
    this.addItemHandler = this.addItemHandler.bind(this);
    this.deleteItemHandler = this.deleteItemHandler.bind(this);
    this.titleChangeHandler = this.titleChangeHandler.bind(this);

    this.filedsResource = new Resource({ route: `/admin/ajax/models/${this.props.match.params.modelId}/fields` });
    this.fieldsOptionsResource = new Resource({
      route: `/admin/ajax/models/${this.props.match.params.modelId}/field_options`
    });
  }
  /**
   * новый field в props
   * */
  // componentDidUpdate(prevProps){
  //   if(this.props !== prevProps){
  //     this.setState(state => {
  //       state = { ...state };
  //       state.value = {...this.props.field};
  //       return state
  //     });
  //   }
  // }

  changeValue(value, field) {
    this.setState(state => {
      state = { ...state };
      state.value[field] = value;
      return state
    })
  }

  titleChangeHandler(e) {
    e.persist();
    this.setState(state => ({
      ...state, value: {
        ...state.value,
        title: e.target.value,
        name: titleToName(e.target.value)
      }
    }))
  }

  submitHandler(e) {
    e.preventDefault();
    const { history, match } = this.props;
    const { name, title, description, is_label, is_title, type, length_value, default: default_, attribute, input_type,
      options, nullable, indexed, editable, calculation, calculation_logic } = this.state.value;

    let data = {};
    
    if (type === "calculated") {
      this.state.isAlways ?
        data = { title, description, type, calculation } :
        data = { title, description, type, calculation_logic };
    } else {
      data = { name, title, description, is_label, is_title, type, length_value, default: default_, attribute, input_type, nullable, indexed, editable };
      if (['select', 'checkbox', 'radio button'].includes(input_type)) {
        data = { ...data, options };
      }
    }
    console.log(data);
    if (_.isFunction(this.props.onSubmit)) {
      this.props.onSubmit(data);
    }
  }

  addItemHandler() {
    this.setState(state => {
      state.value.calculation_logic
        .push({ left: '', operator: '', result: '', right: '' });
      return state;
    })
  }

  deleteItemHandler(index) {
    this.setState(state => {
      state.value.calculation_logic.splice(index, 1);
      return state;
    })
  }

  itemChangeHandler({ name, value }, index) {
    this.setState(state => {
      state.value.calculation_logic[index][name] = value;
      return state
    })
  }

  async componentDidMount() {
    let { options } = await this.fieldsOptionsResource.getAll();

    if (this.props.match.params.id) {
      let value = await this.filedsResource.get(this.props.match.params.id);
      this.setState(state => ({ ...state, value: { ...state.value, ...value } }));
    }
    this.setState(state => ({ ...state, fieldsOptions: options }));
  }

  render() {
    return <form className="admin-form field-form" onSubmit={this.submitHandler}>
      <div className="form-group ">
        <label htmlFor="field-title">Field Title</label>
        <input type="text" id="field-title" required
          value={this.state.value.title}
          onChange={this.titleChangeHandler}
          className="form-control" />
      </div>
      <div className="form-group__inline-wrapper">

        <div className="form-group form-group_width30">
          <label htmlFor="field-name">Field Name</label>
          <input type="text" id="field-name" required
            value={this.state.value.name}
            onChange={e => { this.changeValue(e.target.value, 'name') }}
            className="form-control" />
        </div>
        <div className="form-group form-group_width65">
          <label htmlFor="field-description">Field Description</label>
          <input type="text" id="field-description"
            value={this.state.value.description}
            onChange={e => { this.changeValue(e.target.value, 'description') }}
            className="form-control" />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="field-type">Field Type</label>
        <select id="field-type" required
          value={this.state.value.type}
          onChange={e => { this.changeValue(e.target.value, 'type') }}
          className="form-control"
        >
          <option value="" />
          {fieldTypeOptions.map(item =>
            <option key={item.value} value={item.value}>
              {item.label}
            </option>)}
        </select>
      </div>

      {this.state.value.type === 'calculated' ?
        <>
          <div className="form-group col-6 form-check-inline">
            <input type="checkbox" id="always"
              className="form-check-input"
              checked={this.state.isAlways}
              onChange={e => this.setState({ isAlways: e.target.checked })}
            />
            <label htmlFor="always" className="label_checkbox">Always</label>
          </div>

          {this.state.isAlways ?
            <>
              <div className="form-group">
                <label htmlFor="calculation">Calculation</label>
                <input type="text" className="form-control" id="calculation"
                  value={this.state.value.calculation}
                  onChange={e => { this.changeValue(e.target.value, 'calculation') }}
                />
              </div>
              <p>E.g. [field_name]*[field_name] + 10</p>
            </> :
            <>
              {this.state.value.calculation_logic.map((item, index) => <>
                {index !== 0 && <hr />}
                <FieldCalculationLogic
                  item={item}
                  index={index}
                  fieldsOptions={this.state.fieldsOptions}
                  key={index}
                  changeHandler={item => this.itemChangeHandler(item, index)}
                  deleteItemHandler={() => this.deleteItemHandler(index)}
                />
              </>)}
              <button className="btn" type="button" onClick={this.addItemHandler}>
                + Calculated Logic
              </button>
            </>}
        </> :
        <>
          <div className="checkbox-group">
            <div className="form-group">
              <input type="checkbox" id="field-is_label"
                checked={this.state.value.is_label}
                onChange={e => { this.changeValue(e.target.checked, 'is_label') }}
              />
              <label className="checkbox-label" htmlFor="field-is_label">As Label</label>
            </div>
            <div className="form-group">
              <input type="checkbox" id="field-is_title"
                checked={this.state.value.is_title}
                onChange={e => { this.changeValue(e.target.checked, 'is_title') }}
              />
              <label className="checkbox-label" htmlFor="field-is_title">As Title</label>
            </div>
          </div>

          <div className="form-group__inline-wrapper">
            <div className="form-group form-group_width47">
              <label htmlFor="field-length_value">Length/Value</label>
              <input type="text" id="field-length_value"
                value={this.state.value.length_value}
                onChange={e => { this.changeValue(e.target.value, 'length_value') }}
                className="form-control" />
            </div>

            <div className="form-group form-group_width47">
              <label htmlFor="field-default">Default</label>
              <input type="text" id="field-default"
                value={this.state.value.default}
                onChange={e => { this.changeValue(e.target.value, 'default') }}
                className="form-control" />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="field-attribute">Attribute</label>
            <select id="field-attribute"
              value={this.state.value.attribute}
              onChange={e => { this.changeValue(e.target.value, 'attribute') }}
              className="form-control"
            >
              <option value="" />
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
              <input type="checkbox" id="field-nullable"
                checked={this.state.value.nullable}
                onChange={e => { this.changeValue(e.target.checked, 'nullable') }}
              />
              <label className="checkbox-label" htmlFor="field-nullable">Nullable</label>
            </div>
            <div className="form-group">
              <input type="checkbox" id="field-indexed"
                checked={this.state.value.indexed}
                onChange={e => { this.changeValue(e.target.checked, 'indexed') }}
              />
              <label className="checkbox-label" htmlFor="field-indexed">Indexed</label>
            </div>
            <div className="form-group">
              <input type="checkbox" id="field-editable"
                checked={this.state.value.editable}
                onChange={e => { this.changeValue(e.target.checked, 'editable') }}
              />
              <label className="checkbox-label" htmlFor="field-editable">Editable</label>
            </div>
          </div>
        </>
      }
      <div className="btn__wrapper btn_add">
        <button className="btn btn_success" type="submit">Add</button>
        <Link className="btn" to="/admin/tables/models">Cancel</Link>
        {/* TODO: отображать кнопку если в форме редактируются данные
          повесить обработчик удаления
        <button className="btn btn_failure">Delete</button> */}
      </div>
    </form>;
  }
}

export default withRouter(AddFieldForm);