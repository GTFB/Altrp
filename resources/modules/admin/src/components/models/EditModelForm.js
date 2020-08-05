import React, { Component } from "react";
import {Link, Redirect} from "react-router-dom";
import { titleToName }from "../../js/helpers";
import Resource from "../../../../editor/src/js/classes/Resource";
import AltrpSelect from "../altrp/AltrpSelect";

class EditModelForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {...this.props.model}
    };
    this.submitHandler = this.submitHandler.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
    this.titleChangeHandler = this.titleChangeHandler.bind(this);    
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
      return state
    });
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

  async deleteHandler() {
    // delete: /admin/ajax/models/{model_id}
    let res = await (new Resource({route: '/admin/ajax/models'}).delete(this.props.model.id));
    this.setState(state=>({...state, redirect: '/admin/tables/models/'}))
  }

  render() {
    const model = this.state.value;
    if(this.state.redirect){
      return <Redirect to={this.state.redirect} push={true}/>
    }
    return <form className="admin-form row" onSubmit={this.submitHandler}>
      <div className="form-group col-12">
        <label htmlFor="page-title">Model Title</label>
        <input type="text" id="page-title" required
          value={model.title}
          onChange={this.titleChangeHandler}
          className="form-control" />
      </div>
      <div className="form-group col-4">
        <label htmlFor="page-name">Model Name</label>
        <input type="text" id="page-name" required
          value={model.name}
          onChange={e => { this.changeValue(e.target.value, 'name') }}
          className="form-control" />
      </div>
      <div className="form-group col-8">
        <label htmlFor="page-description">Model Description</label>
        <input type="text" id="page-description"
          value={model.description}
          onChange={e => { this.changeValue(e.target.value, 'description') }}
          className="form-control" />
      </div>
      {(model.id) ? '' : <div className="form-group col-12 ">
        <label htmlFor="model-table_id" className="label_checkbox">Table</label>
        <AltrpSelect
            id="model-table_id"
            defaultOptions={[
              {
                value: '',
                label: ' ',
              }
            ]}
            value={this.state.value.table_id || ''}
            isDisabled={model.id}
            onChange={value => {this.changeValue(value, 'table_id')}}
            optionsRoute="/admin/ajax/tables/options"/>
      </div>}
      <div className="row col-12">
        <div className="form-group col-6 form-check-inline">
          <input type="checkbox" id="page-soft_deletes"
            checked={model.soft_deletes}
            onChange={e => { this.changeValue(e.target.checked, 'soft_deletes') }}
            className="form-check-input form-check-input" />
          <label htmlFor="page-soft_deletes" className="label_checkbox">Soft Deletes</label>
        </div>
        <div className="form-group col-6 form-check-inline">
          <input type="checkbox" id="page-time_stamps"
            checked={model.time_stamps}
            onChange={e => { this.changeValue(e.target.checked, 'time_stamps') }}
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