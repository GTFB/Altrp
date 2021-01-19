import React, { Component } from "react";
import { withRouter } from 'react-router-dom';

class RemoteFieldForm extends Component {
  state = {
    name: '',
    column_id: '',
    remote_find_column: '',
    remote_need_column: '',
    as_object: true,
    single_source_id: '',
    list_source_id: '',
    enabled: true,

    ...this.props.field
  };

  changeHandler = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  };

  submitHandler = e => {
    e.preventDefault();
    const model_id = this.props.match.params.id
    this.props.field ?
      this.props.remoteFieldsResource.put(this.props.field.id, { ...this.state, model_id }) :
      this.props.remoteFieldsResource.post({ ...this.state, model_id });
    this.props.updateRemoteFields();
  };

  render() {
    const { name, column_id, remote_find_column, remote_need_column, as_object, single_source_id,
      list_source_id, enabled } = this.state;
    const { fieldsOptions, data_source_options } = this.props;

    return <form className="admin-form" onSubmit={this.submitHandler}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" required
          name="name"
          value={name}
          onChange={this.changeHandler}
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="column_id">Column</label>
        <select id="column_id"
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
        <label htmlFor="remote_find_column">Remote Find Column</label>
        <input type="text" id="remote_find_column" 
          required
          name="remote_find_column"
          value={remote_find_column}
          onChange={this.changeHandler}
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="remote_need_column">Remote Need Column</label>
        <input type="text" id="remote_need_column"
          required
          name="remote_need_column"
          value={remote_need_column}
          onChange={this.changeHandler}
          className="form-control"
        />
      </div>

      <div className="form-group">
        <input type="checkbox" id="as_object"
          checked={as_object}
          onChange={e => this.setState({ as_object: e.target.checked })}
        />
        <label className="checkbox-label" htmlFor="as_object">As Object</label>
      </div>

      <div className="form-group">
        <label htmlFor="single_source_id">Single Source</label>
        <select id="single_source_id" required
          name="single_source_id"
          value={single_source_id}
          onChange={this.changeHandler}
          className="form-control"
        >
          <option value="" />
          {data_source_options.map(({ value, label }) => <option value={value} key={value}>{label}</option>)}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="list_source_id">List Source</label>
        <select id="list_source_id" required
          name="list_source_id"
          value={list_source_id}
          onChange={this.changeHandler}
          className="form-control"
        >
          <option value="" />
          {data_source_options.map(({ value, label }) => <option value={value} key={value}>{label}</option>)}
        </select>
      </div>

      <div className="form-group">
        <input type="checkbox" id="enabled"
          checked={enabled}
          onChange={e => this.setState({ enabled: e.target.checked })}
        />
        <label className="checkbox-label" htmlFor="enabled">Enabled</label>
      </div>

      <div className="btn__wrapper">
        <button className="btn btn_success" type="submit">Submit</button>
      </div>
    </form>;
  }
}

export default withRouter(RemoteFieldForm);