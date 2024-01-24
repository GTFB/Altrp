import React, {Component} from "react";
import Resource from "../../../../editor/src/js/classes/Resource";
import styled from 'styled-components';
import {ReactSortable} from "react-sortablejs";
import {generateId} from "../../js/helpers";
import MenuItem2 from "./MenuItem";
import mutate from "dot-prop-immutable";
import {mbParseJSON} from "../../../../front-app/src/js/helpers";
import IconSelect from "../icon-select/IconSelect";
import {withRouter} from "react-router-dom";
import {MenuItem} from "@blueprintjs/core";
import {MultiSelect} from "@blueprintjs/select";


const defaultValue = {
  name: '',
  children: [],
  categoryOptions: [],
  categories: [],
  _categories: [],
  settings: {
    toggle_icon: ''
  },
};
const Wrapper = styled.div`
  & {
    border: 1px solid #dcdcde;
  }

  & .altrp-menu-item {
    line-height: 1.5;
    position: relative;
  }

  & .altrp-menu-item__handle {
    border: 1px solid #dcdcde;
    position: relative;
    padding: 10px 15px;
    height: auto;
    min-height: 20px;
    max-width: 382px;
    line-height: 1.5;
    overflow: hidden;
    word-wrap: break-word;
    cursor: move;
    background-color: #F7F8F9;
  }

  & .altrp-menu-item-content {
    border: 1px solid #dcdcde;
    border-top: none;
    max-width: 382px;
  }

  & .altrp-menu-builder-top {
    border-bottom: 1px solid #dcdcde;

    .form-control {
      width: 400px;
    }
  }

  & .altrp-menu-sortable {
    width: calc(100% - 400px);
    max-height: calc(100vh - 93px - 75px - 90px);
    overflow: auto;
    background-color: #fff;
  }

  & .altrp-menu-item-children {
    padding-bottom: 6px;
    padding-top: 6px;
    padding-left: 20px;
  }

  & .altrp-menu-item-content .form-control:not(:first-child),
  & .altrp-menu-item-content .altrp-menu-item__select:not(:first-child) {
    margin-bottom: 13px;
  }

  & .altrp-menu-builder-add {
    width: 400px;
    border-right: 1px solid #dcdcde;

    .form-label {
      width: auto;
      margin-bottom: 0;
    }
  }

  & .altrp-menu-item__delete {
    font-size: 12px;
  }

  & .altrp-menu-builder-actions {
    width: 100%;
    border-top: 1px solid #dcdcde;
    background-color: #fff;
  }
`;


class MenuBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {...defaultValue},
      new: {
        label: '',
        url: '',
        modelField: '',
        operator: '',
        value: '',
      }
    };
    this.resource = new Resource({route: '/admin/ajax/menus'})
    this.categoryOptions = new Resource({route: "/admin/ajax/category/options"})
  }

  async componentDidMount() {
    let {data} = await this.categoryOptions.getAll();
    this.setState(state => ({
      ...state,
      value: {
        ...state.value,
        categoryOptions: data
      }
    }))
    if (!this.props.menuId) {
      return;
    }
    try {
      let menu = await this.resource.get(this.props.menuId);
      menu.children = mbParseJSON(menu.children, []);
      if (!menu.name) {
        menu.name = '';
      }
      if (!menu.settings) {
        menu.settings = {toggle_icon: ''};
      } else {
        menu.settings = mbParseJSON(menu.settings, {toggle_icon: ''});
      }
      this.setState(state => ({...state, value: {...state.value, ...menu, categoryOptions: data}}));
    } catch (e) {
      // console.error(e);
      this.props.fetchError && this.props.fetchError();
    }
    this.setState(state => ({...state, show: true}))
  }

  addNew = () => {
    const newItem = {
      children: [],
      label: this.state.new.label,
      url: this.state.new.url,
      modelField: this.state.new.modelField,
      operator: this.state.new.operator,
      value: this.state.new.value,
      id: generateId(),
    }
    let value = {...this.state.value};
    value.children = [...value.children];
    value.children.push(newItem)
    this.setState(state => ({...state, new: {label: '', url: '',}, value}))
  }
  save = async () => {
    try {
      let value = {...this.state.value};
      value.children = JSON.stringify(value.children);
      value.settings = JSON.stringify(value.settings);
      let res = await this.resource.put(this.props.menuId, value)
      if (res.success) {
        alert('Success');
        this.props.afterSave && this.props.afterSave();
      }
      this.props.history.push("/admin/menus")
    } catch (e) {
      if (e.res instanceof Promise) {
        e = await e.res.then();
        e = mbParseJSON(e);
      } else if (e instanceof Promise) {
        e = await e.then();
        e = mbParseJSON(e);
      }
      console.error(e);
      alert('Error: ' + e.message);
    }
  }

  delete = async () => {
    let allow = confirm('Sure?');
    if (!allow) {
      return;
    }
    try {
      let res = await this.resource.delete(this.props.menuId)
      if (res.success) {
        alert('Success');
        this.props.afterDelete && this.props.afterDelete();
      }
    } catch (e) {
      if (e.res instanceof Promise) {
        e = await e.res.then();
        e = mbParseJSON(e);
      } else if (e instanceof Promise) {
        e = await e.then();
        e = mbParseJSON(e);
      }
      console.error(e);
      alert('Error: ' + e.message);
    }
  }

  onQueryChangeMulti = (query, value) => {
    return (
      `${value.label.toLowerCase()}`.indexOf(query.toLowerCase()) >= 0
    );
  }

  tagRenderer = (item) => {
    return item.label;
  };

  isItemSelectedCategory = (item) => {
    return this.state.value.categories.some(c=>c.value === item.value);
  }

  handleItemSelectCategory = (item) => {
    if (!this.isItemSelectedCategory(item)) {
      this.setState(state => ({
        ...state,
        value: {
          ...state.value,
          _categories: [...state.value._categories, item],
          categories: [...state.value.categories, item]
        }
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
      }
    }));
  }

  render() {
    if (!this.state.show) {
      return null;
    }
    const {value} = this.state;
    return <Wrapper className="altrp-menu-builder d-flex flex-wrap">
      <div className="altrp-menu-builder-top p-3 d-flex align-items-center w-100">
        <label htmlFor="menu-name" className="mb-0 mr-3">Menu Name</label>
        <input
          type="text"
          id="menu-name"
          value={value.name}
          onChange={(e) => {
            let inputValue = e.target.value;
            let value = mutate.set(this.state.value, 'name', inputValue);
            this.setState(state => ({...state, value}));
          }}
          className="form-control"
        />
        <div className="form-group-menu form-group__multiSelectBlueprint form-group__multiSelectBlueprint-category">
          <label htmlFor="categories-menu" className="label__RobotoFont">Categories</label>
          <MultiSelect tagRenderer={this.tagRenderer} id="categories"
                       items={this.state.value.categoryOptions}
                       itemPredicate={this.onQueryChangeMulti}
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
        <label htmlFor="toggle-icon" className="mb-0 mr-3 ml-3">Toggle Icon</label>
        <IconSelect
          id="toggle-icon"
          returnType="text"
          value={this.state.value.settings.toggle_icon}
          maxWidth="50px"
          maxHeight="50px"
          onChange={(icon) => {
            let value = mutate.set(this.state.value, 'settings.toggle_icon', icon);
            this.setState(state => ({...state, value}));
          }}
        />
        <label htmlFor="submenu-icon" className="mb-0 mr-3 ml-3">Submenu Caret</label>
        <IconSelect
          id="submenu-icon"
          returnType="text"
          value={this.state.value.settings.submenu_icon}
          maxWidth="50px"
          maxHeight="50px"
          onChange={(icon) => {
            let value = mutate.set(this.state.value, 'settings.submenu_icon', icon);
            this.setState(state => ({...state, value}));
          }}
        />
      </div>

      <div className="d-flex altrp-menu-builder-add align-items-center align-content-start p-3 flex-wrap">
        <label htmlFor={`label`} className="form-label ">Label</label>
        <input type="text"
               className="form-control "
               id={`label`}
               placeholder="label"
               onChange={(e) => {
                 let value = e.target.value;
                 this.setState(state => ({...state, new: {...state.new, label: value}}));
               }}
               value={this.state.new.label}/>
        <label htmlFor={`url`} className="form-label ">URL or Dispatch Event</label>
        <input type="text"
               className="form-control "
               id={`url`}
               placeholder={`Url or Event Name`}
               onChange={(e) => {
                 let value = e.target.value;
                 this.setState(state => ({...state, new: {...state.new, url: value}}));
               }}
               value={this.state.new.url}/>
        <button className="btn btn_success mt-3" onClick={this.addNew}>Add new</button>
      </div>
      <ReactSortable
        className="altrp-menu-sortable p-3"
        group="nested"
        handle=".altrp-menu-item__handle"
        list={value.children}
        setList={(newList) => this.setState(state => ({...state, value: {...state.value, children: newList}}))}>
        {value.children.map((item, idx) => {
          return <MenuItem2
            item={item}
            key={item.id}
            indexes={[idx]}
            deleteItem={indexes => {
              let value = this.state.value;
              let path = indexes.map(((index) => {
                return `children.${index}`;
              })).join('.');
              value = mutate.delete(value, path)
              this.setState(state => ({...state, value}));
            }}
            updateValue={(value, path) => {
              let thisValue = this.state.value;
              thisValue = mutate.set(thisValue, path, value);
              this.setState(state => ({...state, value: thisValue}));
            }}
            updateChildren={(newList, indexes) => {
              let value = this.state.value;
              let path = indexes.map(((index) => {
                return `children.${index}`;
              })).join('.') + '.children';
              value = mutate.set(value, path, newList)
              this.setState(state => ({...state, value}));
            }}/>
        })}
      </ReactSortable>
      <div className="altrp-menu-builder-actions d-flex p-3">
        <button className="btn btn_danger mr-3" onClick={this.delete}>Delete</button>
        <button className="btn btn_success" onClick={this.save}>Save</button>
      </div>
    </Wrapper>;
  }
}


export default withRouter(MenuBuilder)
