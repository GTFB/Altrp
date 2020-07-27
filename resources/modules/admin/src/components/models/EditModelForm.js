import React, { Component } from "react";
import { Link } from "react-router-dom";

class EditModelForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {...this.props.model}
    };
    this.submitHandler = this.submitHandler.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
  }

  /**
   * Сменить значение поля модели
   * @param value
   * @param field
   */
  changeValue(value, field) {
    this.setState(state => {
      state = { ...state };
      state.value[field] = value;
      console.log(state);
      return state
    });
  }

  /**
   * Обновляем state при получении новых props (model)
   */
  componentDidUpdate(prevProps){
    if(this.props !== prevProps){
      this.setState(state => {
        state = { ...state };
        state.value = {...this.props.model};
        return state
      });
    }
  }
  /**
   * Обработка формы
   * @param e
   */
  submitHandler(e) {
    e.preventDefault();
    if(_.isFunction(this.props.onSubmit)){
      this.props.onSubmit(this.state.value);
    } else {
      console.log(this.state.value);
    }
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
          value={this.state.value.title || model.title || ''}
          onChange={e => { this.changeValue(e.target.value, 'title') }}
          className="form-control" />
      </div>
      <div className="form-group form-group_width30">
        <label htmlFor="page-name">Model Name</label>
        <input type="text" id="page-name" required
          value={this.state.value.name || model.name || ''}
          onChange={e => { this.changeValue(e.target.value, 'name') }}
          className="form-control" />
      </div>
      <div className="form-group form-group_width65">
        <label htmlFor="page-description">Model Description</label>
        <input type="text" id="page-description" required
          value={this.state.value.description || model.description || ''}
          onChange={e => { this.changeValue(e.target.value, 'description') }}
          className="form-control" />
      </div>
      <div className="row">
        <div className="form-group col-6 form-check-inline">
          <input type="checkbox" id="page-soft_delete"
            value={this.state.value.soft_delete || model.soft_delete || ''}
            onChange={e => { this.changeValue(e.target.value, 'soft_delete') }}
            className="form-check-input form-check-input" />
          <label htmlFor="page-soft_delete" className="label_checkbox">Soft Delete</label>
        </div>
        <div className="form-group col-6 form-check-inline">
          <input type="checkbox" id="page-time_stamps"
            value={this.state.value.soft_delete || model.soft_delete || ''}
            onChange={e => { this.changeValue(e.target.value, 'time_stamps') }}
            className="form-check-input form-check-input_inline" />
          <label htmlFor="page-time_stamps" className="label_checkbox">Time Stamps</label>
        </div>
      </div>
      <div className="btn__wrapper">
        <button className="btn btn_success" type="submit">{this.props.submitText}</button>
        <Link to="/admin/tables/models"><button className="btn">Cancel</button></Link>
        {this.props.edit
            ? <button className="btn btn_failure" type="button" onClick={this.deleteHandler}>Delete</button>
            : ''}
      </div>
    </form>;
  }
}

export default EditModelForm;