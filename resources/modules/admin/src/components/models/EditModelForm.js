import React, { Component } from "react";
import {Link, Redirect} from "react-router-dom";
import {titleToName, titleToNameTwo} from "../../js/helpers";
import Resource from "../../../../editor/src/js/classes/Resource";
import AltrpSelect from "../altrp-select/AltrpSelect";
import {InputGroup, MenuItem, TextArea} from "@blueprintjs/core";
import {MultiSelect} from "@blueprintjs/select";
import {altrpRandomId} from "../../../../front-app/src/js/helpers";

class EditModelForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {...this.props.model}
    };
    this.submitHandler = this.submitHandler.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
    this.titleChangeHandler = this.titleChangeHandler.bind(this);
    this.nameChangeHandler = this.nameChangeHandler.bind(this);
    this.categoriesChangeHandler = this.categoriesChangeHandler.bind(this);
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

  categoriesChangeHandler(e) {
    this.setState(state => ({
      ...state,
      value: {
        ...state.value,
        categories: titleToNameTwo(e.target.value)
      }
    }))
  }

  nameChangeHandler(e) {
    this.setState(state => ({
      ...state,
      value: {
        ...state.value,
        name: titleToName(e.target.value)
      }
    }))
  }

  titleChangeHandler(e) {
    e.persist();
    this.setState(state => ({
      ...state, value: {
        ...state.value,
        title: titleToNameTwo(e.target.value),
        name: this.props.paramsId ? state.value.name : titleToName(e.target.value)
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
      delete this.state.value.created_at;
      delete this.state.value.updated_at;
      this.state.value.customizerName = this.state.value.name + `_${altrpRandomId()}`
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

  tagRenderer = (item) => {
    return item.label;
  };

  onQueryChange = (query, value) => {
    return (
      `${value.label.toLowerCase()}`.indexOf(query.toLowerCase()) >= 0
    );
  }

  isItemSelectedCategory = (item) => {
    if(item?.value){
      return  false;
    }
    return this.state.value._categories.some(c=>c.value === item.value);
  }

  handleItemSelectCategory = (item) => {
    if (!this.isItemSelectedCategory(item)) {
      this.setState(state => ({
        ...state,
        value: {
          ...state.value,
          _categories: [...state.value._categories, item],
          categories: [...state.value.categories, item]
        },
      }));
    }
  }

  handleTagRemoveCategory = (item) => {
    this.setState(state => ({
      ...state,
      value: {
        ...state.value,
        _categories: [...state.value._categories].filter((i) => i.label !== item),
        categories: [...state.value.categories].filter((i) => i.label !== item)
      },
    }));
  }


  render() {
    const model = this.state.value;
    if(this.state.redirect){
      return <Redirect to={this.state.redirect} push={true}/>
    }
    return <form className="admin-form" onSubmit={this.submitHandler}>
      <div className="form-group__inline-wrapper">
        <div className="form-group form-group_width23">
          <label htmlFor="page-title" className="font__edit">Model Title</label>
          {/*<input type="text" id="page-title" required*/}
          {/*       value={model.title || ''}*/}
          {/*       onChange={this.titleChangeHandler}*/}
          {/*       className="form-control" />*/}
          <InputGroup className="form-control-blueprint"
                      onChange={this.titleChangeHandler}
                      value={model.title || ''}
                      type="text"
                      id="page-title"
                      pattern="(?=\D).+"
                      required
          />
        </div>
        <div className="form-group form-group_width23">
          <label htmlFor="page-name" className="font__edit">Model Name</label>
          {/*<input type="text" id="page-name" required*/}
          {/*       value={model.name || ''}*/}
          {/*       onChange={e => { this.changeValue(e.target.value, 'name') }}*/}
          {/*       className="form-control" />*/}
          <InputGroup className="form-control-blueprint"
                      onChange={this.nameChangeHandler}
                      value={model.name || ''}
                      type="text"
                      id="page-name"
                      required
                     // readOnly={this.props.paramsId}
          />
        </div>

        <div className="form-group form-group_width23">
          <label htmlFor="page-description" className="font__edit">Parent Model</label>
          {/*<input type="text" id="page-description"*/}
          {/*       value={model.parent_model_id || ''}*/}
          {/*       onChange={e => { this.changeValue(e.target.value, 'parent_model_id') }}*/}
          {/*       className="form-control" />*/}
          <InputGroup className="form-control-blueprint"
                      onChange={e => { this.changeValue(e.target.value, 'parent_model_id') }}
                      value={model.parent_model_id || ''}
                      type="text"
                      id="page-description"
          />
        </div>
        <div className="form-group form-group_width23 form-group_column">
          <label htmlFor="page-description" className="font__edit">Model Description</label>
          {/*<input type="text" id="page-description"*/}
          {/*       value={model.description || ''}*/}
          {/*       onChange={e => { this.changeValue(e.target.value, 'description') }}*/}
          {/*       className="form-control" />*/}
          <TextArea className="form-control-blueprint"
                      large={false}
                      onChange={e => { this.changeValue(e.target.value, 'description') }}
                      value={model.description || ''}
                      id="page-description"
          />
        </div>
      </div>
      <div className="flex-model">
        <div className="form-group form-group__multiSelectBlueprint form-group__multiSelectBlueprint-category form-group_width34">
          <label htmlFor="page-categories" className="font__edit">Categories</label>
          <MultiSelect tagRenderer={this.tagRenderer} id="categories"
                       items={this.state.value.categoryOptions}
                       itemPredicate={this.onQueryChange}
                       noResults={<MenuItem disabled={true} text="No results."/>}
                       fill={true}
                       placeholder="Categories..."
                       selectedItems={this.state.value.categories}
                       onItemSelect={this.handleItemSelectCategory}
                       itemRenderer={(item, {handleClick, modifiers, query}) => {
                         return (
                           <MenuItem
                             icon={this.isItemSelectedCategory(item) ? "tick" : "blank"}
                             text={item.label}
                             key={item.value}
                             onClick={handleClick}
                           />
                         )
                       }}
                       tagInputProps={{
                         onRemove: this.handleTagRemoveCategory,
                         large: false,
                       }}
                       popoverProps={{
                         usePortal: false
                       }}
          />
        </div>
      </div>
      <div className="checkbox-container-editModel">
        <div className="form-group__flexModel">
          <input type="checkbox" id="page-soft_deletes"
            checked={model.soft_deletes}
            onChange={e => { this.changeValue(e.target.checked, 'soft_deletes') }}
            />
          <label htmlFor="page-soft_deletes" className="label_model font__edit">Soft Deletes</label>
        </div>
        <div className="form-group__flexModel">
          <input type="checkbox" id="page-time_stamps"
            checked={model.time_stamps}
            onChange={e => { this.changeValue(e.target.checked, 'time_stamps') }}
            />
          <label htmlFor="page-time_stamps" className="label_model font__edit">Time Stamps</label>
        </div>

        <div className="form-group__flexModel">
          <input type="checkbox" id="page-only_user"


            checked={this.state.value.user_id}

            onChange={e => { this.changeValue(e.target.checked, 'user_id') }}
            />
          <label htmlFor="page-only_user" className="label_model font__edit">Only for Current User</label>
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
