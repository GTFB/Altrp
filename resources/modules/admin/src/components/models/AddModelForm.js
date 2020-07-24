import React, { Component } from "react";
import { Link } from "react-router-dom";

class AddModelForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: { name: '', title: '', description: '' },
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
    return <form className="admin-form" onSubmit={this.submitHandler}>
      <div className="form-group">
        <label htmlFor="page-title">Model Title</label>
        <input type="text" id="page-title" required
          value={this.state.value.title}
          onChange={e => { this.changeValue(e.target.value, 'title') }}
          className="form-control" />
      </div>
      <div className="form-group form-group_width30">
        <label htmlFor="page-name">Model Name</label>
        <input type="text" id="page-name" required
          value={this.state.value.name}
          onChange={e => { this.changeValue(e.target.value, 'name') }}
          className="form-control" />
      </div>
      <div className="form-group form-group_width65">
        <label htmlFor="page-description">Model Description</label>
        <input type="text" id="page-description" required
          value={this.state.value.description}
          onChange={e => { this.changeValue(e.target.value, 'description') }}
          className="form-control" />
      </div>
      <div></div>
      <div className="btn__wrapper">
        <button className="btn btn_success" type="submit">Add</button>
        <Link className="btn" to="/admin/models">Cancel</Link>
        {/* <button className="btn btn_failure">Delete</button> */}
      </div>
    </form>;
  }
}

export default AddModelForm;