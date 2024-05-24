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
    value: 'bigInteger',
    label: 'Big Integer'
  },
  {
    value: 'uuid',
    label: 'UUID'
  },
  {
    value: 'float',
    label: 'Float'
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
    value: 'time',
    label: 'Time'
  },
  {
    value: 'year',
    label: 'Year'
  },
  {
    value: 'dateTime',
    label: 'Datetime'
  },
  {
    value: 'geometry',
    label: 'Geometry'
  },
  {
    value: 'jsonb',
    label: 'JSONB'
  },
  {
    value: 'json',
    label: 'JSON'
  },
  {
    value: 'binary',
    label: 'Binary'
  },
];
const attributeOptions = [

  {
    value: 'unsigned',
    label: 'UNSIGNED'
  }
];
const inputTipeOptions = ['textarea', 'text', 'number', 'slider', 'WYSIWYG', 'color', 'select', 'checkbox', 'radio button'];


class AddAccessorForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      constructor: false,
      fieldsOptions: [],
      value: {
        name: '',
        title: '',
        description: '',
        calculation: '',
        calculation_logic: [
          { left: '', operator: '', result: '', right: '' }
        ],
      },
    };

    this.submitHandler = this.submitHandler.bind(this);
    this.itemChangeHandler = this.itemChangeHandler.bind(this);
    this.addItemHandler = this.addItemHandler.bind(this);
    this.deleteItemHandler = this.deleteItemHandler.bind(this);
    this.titleChangeHandler = this.titleChangeHandler.bind(this);

    this.accessorsResource = new Resource({ route: `/admin/ajax/models/${this.props.match.params.modelId}/accessors` });
    this.fieldsOptionsResource = new Resource({
      route: `/admin/ajax/models/${this.props.match.params.modelId}/field_options`
    });
  }

  /**
   * Изменение данны с валидацией
   * @param {string} value
   * @param {string} field
   */

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
        name: this.props.match.params.id ? state.value.name : titleToName(e.target.value)
      }
    }))
  }

  async submitHandler(e) {
    e.preventDefault();
    const { history, match } = this.props;
    const { name, title, description, calculation, calculation_logic } = this.state.value;

    let data = {};
    this.state.constructor ?
        data = { title, description, calculation, name, } :
        data = { title, description, calculation_logic, name, };


    if (this.props.match.params.id) {
      let res = await this.accessorsResource.put(this.props.match.params.id, data);
    } else {
      let res = await this.accessorsResource.post(data);
    }
    history.push(`/admin/tables/models/edit/${match.params.modelId}`);
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
      let value = await this.accessorsResource.get(this.props.match.params.id);

      if (typeof value.calculation_logic === 'string') {
        value.calculation_logic = JSON.parse(value.calculation_logic);
      }

      if (value.calculation_logic === null) {
        value.calculation_logic = [{ left: '', operator: '', result: '', right: '' }];
      }

      this.setState(state => ({ ...state, constructor: value.calculation ? true : false ,  value: { ...state.value, ...value } }));
    }
    this.setState(state => ({ ...state, fieldsOptions: options }));
  }

  render() {
    const { modelId } = this.props.match.params;
    return <form className="admin-form field-form" onSubmit={this.submitHandler}>
      <div className="form-group ">
        <label htmlFor="field-title">Field Title</label>
        <input type="text" id="field-title" required
          value={this.state.value.title || ''}
          onChange={this.titleChangeHandler}
          className="form-control" />
      </div>
      <div className="form-group__inline-wrapper">

        <div className="form-group form-group_width30">
          <label htmlFor="field-name">Field Name</label>
          <input type="text" id="field-name" required readOnly={this.props.match.params.id}
            value={this.state.value.name || ''}
            onChange={e => { this.changeValue(e.target.value, 'name') }}
            className="form-control" />
        </div>
        <div className="form-group form-group_width65">
          <label htmlFor="field-description">Field Description</label>
          <input type="text" id="field-description"
            value={this.state.value.description || ''}
            onChange={e => { this.changeValue(e.target.value, 'description') }}
            className="form-control" />
        </div>
      </div>
      <div className="form-group col-6 form-check-inline">
        <input type="checkbox" id="constructor"
               className="form-check-input"
               checked={this.state.constructor}
               onChange={e => this.setState({ constructor: e.target.checked })}
        />
        <label htmlFor="constructor" className="label_checkbox">Constructor</label>
      </div>

      {this.state.constructor ?
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
          {this.state.value.calculation_logic.map((item, index) =>
            <FieldCalculationLogic
              item={item}
              index={index}
              fieldsOptions={this.state.fieldsOptions}
              key={index}
              changeHandler={item => this.itemChangeHandler(item, index)}
              deleteItemHandler={() => this.deleteItemHandler(index)}
            />
          )}
          <button className="btn" type="button" onClick={this.addItemHandler}>
            + Calculated Logic
          </button>
        </>}

      <div className="btn__wrapper btn_add">
        <button className="btn btn_success" type="submit">Add</button>
        <Link className="btn" to={`/admin/tables/models/edit/${modelId}`}>Cancel</Link>
        {/* TODO: отображать кнопку если в форме редактируются данные
          повесить обработчик удаления
        <button className="btn btn_failure">Delete</button> */}
      </div>
    </form>;
  }
}

export default withRouter(AddAccessorForm);
