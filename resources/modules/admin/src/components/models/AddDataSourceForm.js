import React, { Component } from "react";
import { Link } from "react-router-dom";

const typeOptions = ['resource', 'Get Queried', 'create', 'read', 'update', 'delete', 'options'];
const mockedOptions = [
  { value: 1, label: "Model title 1" },
  { value: 2, label: "Model title 2" },
  { value: 3, label: "Model title 3" },
];

class AddDataSourceForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // modelsOptions: [],   TODO: заменить замоканые данные
      modelsOptions: mockedOptions,
      value: {
        title: '',
        description: '',
        type: [],
        model_id: '',
        with: [],
        route: '',
        roles: []
      },
    };
    this.submitHandler = this.submitHandler.bind(this);
    this.multipleSelectChangeHandler = this.multipleSelectChangeHandler.bind(this);
  }

  componentDidMount() {
    // get: get: /admin/ajax/model_options .then(modelsOptions => {
    //   this.setState({ modelsOptions });
    // });
  }

  changeValue(value, field) {
    console.log(value)
    this.setState(state => {
      state = { ...state };
      state.value[field] = value;
      return state
    })
  }

  multipleSelectChangeHandler({ target: { value, name } }) {
    this.setState(state => {
      const array = state.value[name];

      if (array.includes(value)) {
        const index = array.indexOf(value);
        array.splice(index, 1);
      } else {
        array.push(value);
      }
      
      return state;
    })
  }

  submitHandler(e) {
    e.preventDefault();
    // post: /admin/ajax/models (value)
    console.log(this.state.value);
  }

  render() {
    return <form className="admin-form" onSubmit={this.submitHandler}>
      <div className="form-group__inline-wrapper">
        <div className="form-group form-group_width30">
          <label htmlFor="data-source-title">Data Source Title</label>
          <input type="text" id="data-source-title" required
            value={this.state.value.title}
            onChange={e => { this.changeValue(e.target.value, 'title') }}
            className="form-control" />
        </div>

        <div className="form-group form-group_width65">
          <label htmlFor="data-source-description">Data Source Description</label>
          <input type="text" id="data-source-description" required
            value={this.state.value.description}
            onChange={e => { this.changeValue(e.target.value, 'description') }}
            className="form-control" />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="data-source-type">Data Source Type</label>
        <select id="data-source-type" required multiple
          name="type"
          value={this.state.value.type}
          onChange={this.multipleSelectChangeHandler}
          className="form-control"
        >
          <option disabled value="" />
          {typeOptions.map(item =>
            <option key={item} value={item}>
              {item}
            </option>)}
        </select>
      </div>

      <div className="form-group__inline-wrapper">
        <div className="form-group form-group_width47">
          <label htmlFor="data-source-model_id">Model</label>
          <select id="data-source-model_id" required
            value={this.state.value.model_id}
            onChange={e => { this.changeValue(e.target.value, 'model_id') }}
            className="form-control"
          >
            <option disabled value="" />
            {this.state.modelsOptions.map(({ value, label }) =>
              <option key={value} value={value}>
                {label}
              </option>)}
          </select>
        </div>

        <div className="form-group form-group_width47">
          <label htmlFor="data-source-with">With</label>
          <select id="data-source-with" required multiple
            name="with"
            value={this.state.value.with}
            onChange={this.multipleSelectChangeHandler}
            className="form-control"
          >
            <option disabled value="" />
            {this.state.modelsOptions.map(({ value, label }) =>
              <option key={value} value={value}>
                {label}
              </option>)}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="data-source-route">Route</label>
        <input type="text" id="data-source-route" required
          value={this.state.value.route}
          onChange={e => { this.changeValue(e.target.value, 'route') }}
          className="form-control" />
      </div>

      <div className="form-group">
        <label htmlFor="data-source-roles">Access</label>
        <select id="data-source-roles" required multiple
          name="roles"
          value={this.state.value.roles}
          onChange={this.multipleSelectChangeHandler}
          className="form-control"
        >
          <option disabled value="" />
          {this.state.modelsOptions.map(({ value, label }) =>
            <option key={value} value={value}>
              {label}
            </option>)}
        </select>
      </div>

      <div className="btn__wrapper">
        <button className="btn btn_success" type="submit">Add</button>
        <Link className="btn" to="/admin/models">Cancel</Link>
        {/* <button className="btn btn_failure">Delete</button> */}
      </div>
    </form>;
  }
}

export default AddDataSourceForm;