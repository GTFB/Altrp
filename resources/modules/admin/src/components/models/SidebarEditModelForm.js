import React, { Component } from "react";
import {titleToName, titleToNameTwo} from "../../js/helpers";
import Resource from "../../../../editor/src/js/classes/Resource";
import {InputGroup, MenuItem, TextArea} from "@blueprintjs/core";
import {MultiSelect} from "@blueprintjs/select";
import {altrpRandomId} from "../../../../front-app/src/js/helpers";

class SidebarEditModelForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {
        name: '',
        title: '',
        description: '',
        bounded_model: '',
        categories: [],
        _categories: [],
        categoryOptions: [],
        soft_deletes: false,
        time_stamps: false
      }
    };
    this.submitHandler = this.submitHandler.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
    this.titleChangeHandler = this.titleChangeHandler.bind(this);
    this.nameChangeHandler = this.nameChangeHandler.bind(this);
    this.categoriesChangeHandler = this.categoriesChangeHandler.bind(this);
    this.modelsResource = new Resource({ route: '/admin/ajax/models' });
    this.categoryOptions = new Resource({route: "/admin/ajax/category/options"} )
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

  getModel = async () => {
    let res = await this.modelsResource.get(this.props.paramsId)
    let {data} = await  this.categoryOptions.getAll();
    this.setState(state =>({
      ...state,
      value: {
        ...state.value,
        ...res,
        _categories: res.categories,
        categoryOptions: data
      }
    }))
  }

  componentDidMount() {
    this.getModel()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.paramsId !== this.props.paramsId && this.props.paramsId !== null) {
      this.getModel()
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
    await (new Resource({route: '/admin/ajax/models'}).delete(this.props.paramsId));
    this.props.closeSidebar()
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
    return <form className="admin-form" onSubmit={this.submitHandler}>
      <div className="form-group__inline-wrapper">
        <div className="form-group form-group_width48">
          <label htmlFor="page-title" className="font__edit">Model Title</label>
          <InputGroup className="form-control-blueprint"
                      onChange={this.titleChangeHandler}
                      value={model.title || ''}
                      type="text"
                      id="page-title"
                      pattern="(?=\D).+"
                      required
          />
        </div>
        <div className="form-group form-group_width48">
          <label htmlFor="page-name" className="font__edit">Model Name</label>
          <InputGroup className="form-control-blueprint"
                      onChange={this.nameChangeHandler}
                      value={model.name || ''}
                      type="text"
                      id="page-name"
                      required
          />
        </div>
      </div>
      <div className="form-group_column form-control-blueprint">
        <label htmlFor="page-description" className="font__edit">Model Description</label>
        <TextArea
                  large={false}
                  onChange={e => { this.changeValue(e.target.value, 'description') }}
                  value={model.description || ''}
                  id="page-description"
        />
      </div>
      <div className="flex-model">
        <div className="form-group form-group__multiSelectBlueprint form-group__multiSelectBlueprint-category flex-grow-1 form-group__multiSelect-model">
          <label htmlFor="page-categories" className="font__edit">Categories</label>
          <MultiSelect tagRenderer={this.tagRenderer} id="categories"
                       items={this.state.value.categoryOptions}
                       itemPredicate={this.onQueryChange}
                       noResults={<MenuItem disabled={true} text="No results."/>}
                       fill
                       matchTargetWidth
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
                         usePortal: false,
                         matchTargetWidth: true
                       }}
          />
        </div>
      </div>
      <div className="checkbox-container-editModel justify-content-between mb-2">
        <div className="form-group__flexModel">
          <div  className="font__edit">Soft Deletes</div>
          <label style={{marginLeft: "10px", marginBottom: '0'}}>
            <input
              className="addPage__bottom-checkbox"
              checked={model.soft_deletes}
              onChange={e => { this.changeValue(e.target.checked, 'soft_deletes') }}
              type="checkbox"
              id="page-soft_deletes"
            />
            <div className="control-switcher control-switcher_checked">
              <div className="control-switcher__on-text">ON</div>
              <div className="control-switcher__caret"/>
              <div className="control-switcher__off-text">OFF</div>
            </div>
          </label>
        </div>
        <div className="form-group__flexModel">
          <div className="font__edit">Time Stamps</div>
          <label style={{marginLeft: "10px", marginBottom: '0'}}>
            <input
              className="addPage__bottom-checkbox"
              checked={model.time_stamps}
              onChange={e => { this.changeValue(e.target.checked, 'time_stamps') }}
              type="checkbox"
              id="page-time_stamps"
            />
            <div className="control-switcher control-switcher_checked">
              <div className="control-switcher__on-text">ON</div>
              <div className="control-switcher__caret"/>
              <div className="control-switcher__off-text">OFF</div>
            </div>
          </label>
        </div>

        <div className="form-group__flexModel">
          <div className="font__edit">Only for Current User</div>
          <label style={{marginLeft: "10px", marginBottom: '0'}}>
            <input
              className="addPage__bottom-checkbox"
              checked={this.state.value.user_id}
              onChange={e => { this.changeValue(e.target.checked, 'user_id') }}
              type="checkbox"
              id="page-only_user"
            />
            <div className="control-switcher control-switcher_checked">
              <div className="control-switcher__on-text">ON</div>
              <div className="control-switcher__caret"/>
              <div className="control-switcher__off-text">OFF</div>
            </div>
          </label>
        </div>
      </div>
      <div className="btn__wrapper">
        <button className="btn btn_success" type="submit">{this.props.submitText}</button>
        <button className="btn btn_failure" type="button" onClick={this.deleteHandler}>Delete</button>
      </div>
    </form>;
  }
}

export default SidebarEditModelForm;
