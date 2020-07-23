import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect, withRouter } from "react-router";

class EditModelForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {}
    };
    this.submitHandler = this.submitHandler.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
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
    // put: /admin/ajax/models/{model_id} ({...this.props.model, ...value})
    console.log(this.state.value);
  }

  deleteHandler() {
    // delete: /admin/ajax/models/{model_id} 
    console.log("deleting model id-" + this.props.model.id);
  }

  render() {
    const { model } = this.props;
    return <form className="admin-form" onSubmit={this.submitHandler}>
      <div className="form-group">
        <label htmlFor="page-title">Model Title</label>
        <input type="text" id="page-title" required
          value={this.state.value.title || model.title}
          onChange={e => { this.changeValue(e.target.value, 'title') }}
          className="form-control" />
      </div>
      <div className="form-group form-group_width30">
        <label htmlFor="page-name">Model Name</label>
        <input type="text" id="page-name" required
          value={this.state.value.name || model.name}
          onChange={e => { this.changeValue(e.target.value, 'name') }}
          className="form-control" />
      </div>
      <div className="form-group form-group_width65">
        <label htmlFor="page-description">Model Description</label>
        <input type="text" id="page-description" required
          value={this.state.value.description || model.description}
          onChange={e => { this.changeValue(e.target.value, 'description') }}
          className="form-control" />
      </div>
      <div></div>
      <div className="btn__wrapper">
        <button className="btn btn_success" type="submit">Add</button>
        <Link to="/admin/models"><button className="btn">Cancel</button></Link>
        <button className="btn btn_failure" type="button" onClick={this.deleteHandler}>Delete</button>
      </div>
    </form>;
  }
}

export default EditModelForm;