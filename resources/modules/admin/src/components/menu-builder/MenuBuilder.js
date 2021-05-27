import React, {Component} from "react";
import Resource from "../../../../editor/src/js/classes/Resource";
import styled from 'styled-components';
import {ReactSortable} from "react-sortablejs";
import {generateId} from "../../js/helpers";
import MenuItem from "./MenuItem";
import mutate from "dot-prop-immutable";
import {mbParseJSON} from "../../../../front-app/src/js/helpers";


const defaultValue = {
  name: '',
  children: [],
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
    background-color: #fff;
  }

  & .altrp-menu-item-children {
    padding-bottom: 6px;
    padding-top: 6px;
    padding-left: 20px;
  }

  & .altrp-menu-item-content .form-control:not(:first-child) {
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
      }
    };
    this.resource = new Resource({route: '/admin/ajax/menus'})
  }

  async componentDidMount() {
    if (!this.props.menuId) {
      return;
    }
    try {
      let menu = await this.resource.get(this.props.menuId);
      menu.children = mbParseJSON(menu.children, []);
      if(! menu.name){
        menu.name = '';
      }
      this.setState(state => ({...state, value: menu}));
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
      let res = await this.resource.put(this.props.menuId, value)
      if (res.success) {
        alert('Success');
        this.props.afterSave && this.props.afterSave();
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

  render() {
    if(! this.state.show){
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
          onChange={(e)=>{
            let inputValue = e.target.value;
            let value = mutate.set(this.state.value, 'name', inputValue);
            console.log(value);
            this.setState(state=>({...state, value}));
          }}
          className="form-control"/>
      </div>

      <div className="d-flex altrp-menu-builder-add align-items-center align-content-start p-3 flex-wrap">
        <label htmlFor={`label`} className="form-label ">Label</label>
        <input type="text"
               className="form-control "
               id={`label`}
               onChange={(e) => {
                 let value = e.target.value;
                 this.setState(state => ({...state, new: {...state.new, label: value}}));
               }}
               value={this.state.new.label}/>
        <label htmlFor={`url`} className="form-label ">URL</label>
        <input type="text"
               className="form-control "
               id={`url`}
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
          return <MenuItem
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


export default MenuBuilder
