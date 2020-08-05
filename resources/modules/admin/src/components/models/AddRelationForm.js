import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

const relationTypeOptions = ['hasOne', 'belongsTo', 'hasMany'];
const mockedOptions = [
  { value: 1, label: "Model title 1" },
  { value: 2, label: "Model title 2" },
  { value: 3, label: "Model title 3" },
];

class AddRelationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // modelsOptions: [],   TODO: заменить замоканые данные
      modelsOptions: mockedOptions,
      value: {
        title: '',
        description: '',
        type: '',
        model_id: '',
        add_belong_to: false,
        local_key: '',
        foreign_key: '',
      },
    };
    this.submitHandler = this.submitHandler.bind(this);
  }

  componentDidMount() {
    // get: get: /admin/ajax/model_options .then(modelsOptions => {
    //   this.setState({ modelsOptions });
    // });
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
    const data = this.state.value;
    // post: /admin/ajax/models (data)
    console.log(data);
  }

  render() {
    return <form className="admin-form" onSubmit={this.submitHandler}>
      <div className="form-group__inline-wrapper">
        <div className="form-group form-group_width30">
          <label htmlFor="relation-title">Relation Title</label>
          <input type="text" id="relation-title" required
            value={this.state.value.title}
            onChange={e => { this.changeValue(e.target.value, 'title') }}
            className="form-control" />
        </div>

        <div className="form-group form-group_width65">
          <label htmlFor="relation-description">Relation Description</label>
          <input type="text" id="relation-description" required
            value={this.state.value.description}
            onChange={e => { this.changeValue(e.target.value, 'description') }}
            className="form-control" />
        </div>
      </div>

      <div className="form-group__inline-wrapper">
        <div className="form-group form-group_width47">
          <label htmlFor="relation-type">Relation Type</label>
          <select id="relation-type" required
            value={this.state.value.type}
            onChange={e => { this.changeValue(e.target.value, 'type') }}
            className="form-control"
          >
            <option disabled value="" />
            {relationTypeOptions.map(item =>
              <option key={item} value={item}>
                {item}
              </option>)}
          </select>
        </div>

        <div className="form-group form-group_width47">
          <label htmlFor="relation-model_id">Model to Bound</label>
          <select id="relation-model_id" required
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
      </div>

      <div className="form-group">
        <input type="checkbox" id="relation-add_belong_to"
          checked={this.state.value.add_belong_to}
          onChange={e => { this.changeValue(e.target.checked, 'add_belong_to') }}
        />
        <label className="checkbox-label" htmlFor="relation-add_belong_to">Add Reverse Relation</label>
      </div>

      <div className="form-group__inline-wrapper">
        <div className="form-group form-group_width47">
          <label htmlFor="relation-local_key">Local Key</label>
          <input type="text" id="relation-local_key" required
            value={this.state.value.local_key}
            onChange={e => { this.changeValue(e.target.value, 'local_key') }}
            className="form-control"
          />
        </div>


        <div className="form-group form-group_width47">
          <label htmlFor="relation-foreign_key">Foreign Key</label>
          <select id="relation-foreign_key" required
            value={this.state.value.foreign_key}
            onChange={e => { this.changeValue(e.target.value, 'foreign_key') }}
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

      <div className="btn__wrapper">
        <button className="btn btn_success" type="submit">Add</button>
        <Link className="btn" to="/admin/tables/models">Cancel</Link>
        {/* <button className="btn btn_failure">Delete</button> */}
      </div>
    </form>;
  }
}

export default withRouter(AddRelationForm);