import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import {InputGroup} from "@blueprintjs/core";
import Resource from "../../../../../editor/src/js/classes/Resource";

class ValidatedFieldForm extends Component {
  state = {
    name: '',
    column_id: '',
    column_name: '',
    is_created: false,
    is_updated: false,
    source_id: '',
    ...this.props.field
  };

  changeHandler = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  };

  submitHandler = e => {
    e.preventDefault();
    const model_id = this.props.match.params.id
    this.props.field ?
      this.props.validationsResource.put(this.props.field.id, { ...this.state, model_id }) :
      this.props.validationsResource.post({ ...this.state, model_id });
    this.props.updateValidations();
  };

  render() {
    const { name, column_id, column_name, is_created, is_updated, source_id } = this.state;
    const { fieldsOptions, data_source_options } = this.props;
    return <form className="admin-form" onSubmit={this.submitHandler}>
      <div className="form-group">
        <label htmlFor="name" className="label__RobotoFont">Name</label>
        <InputGroup
          type="text"
          id="name"
          required
          name="name"
          value={name}
          onChange={this.changeHandler}
          className="form-control-blueprint"
        />
        {/*<input type="text" id="name" required*/}
        {/*  name="name"*/}
        {/*  value={name}*/}
        {/*  onChange={this.changeHandler}*/}
        {/*  className="form-control"*/}
        {/*/>*/}
      </div>

      <div className="form-group">
        <label htmlFor="column_id" className="label__RobotoFont">Column</label>
        <select id="column_id" required
          name="column_id"
          value={column_id}
          onChange={this.changeHandler}
          className="form-control"
        >
          <option value="" />
          {fieldsOptions.map(({ id, name }) => <option value={id} key={id}>{name}</option>)}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="source_id" className="label__RobotoFont">Data Source</label>
        <select id="source_id" required
          name="source_id"
          value={source_id}
          onChange={this.changeHandler}
          className="form-control"
        >
          <option value="" />
          {data_source_options.map(({ value, label }) => <option value={value} key={value}>{label}</option>)}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="column_name" className="label__RobotoFont">Column Name</label>
        {/*<input type="text" id="column_name"*/}
        {/*  name="column_name"*/}
        {/*  value={column_name}*/}
        {/*  onChange={this.changeHandler}*/}
        {/*  className="form-control"*/}
        {/*/>*/}

        <InputGroup
          type="text"
          id="column_name"
          name="column_name"
          value={column_name}
          onChange={this.changeHandler}
          className="form-control-blueprint"
        />
      </div>

      <div className="form-group">
        <input type="checkbox" id="is_created"
          checked={is_created}
          onChange={e => this.setState({ is_created: e.target.checked })}
        />
        <label className="checkbox-label label__RobotoFont" htmlFor="is_created">is Created</label>
      </div>

      <div className="form-group">
        <input type="checkbox" id="is_updated"
          checked={is_updated}
          onChange={e => this.setState({ is_updated: e.target.checked })}
        />
        <label className="checkbox-label label__RobotoFont" htmlFor="is_updated">is Updated</label>
      </div>

      <div className="btn__wrapper">
        <button className="btn btn_success" type="submit">Submit</button>
      </div>
    </form>;
  }
}

export default withRouter(ValidatedFieldForm);
