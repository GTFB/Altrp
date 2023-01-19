import React, {Component} from "react";
import {ReactSortable} from "react-sortablejs";
import IconSelect from "../icon-select/IconSelect";
import CONDITIONS_OPTIONS  from "../../../../front-app/src/js/constants/CONDITIONS_OPTIONS"
import AltrpSelect from "../altrp-select/AltrpSelect";


class MenuItem extends Component {
  state = {
    showContent: false,
  };

  render() {
    const {showContent} = this.state;
    return (
      <div className="altrp-menu-item">
        <div
          className="altrp-menu-item__handle"
          onDoubleClick={() => this.setState(state => ({...state, showContent: !this.state.showContent}))}>
          <span className="altrp-menu-item__title">{this.props.item.label || '(no Label)'}</span>
        </div>
        {showContent && <div className="altrp-menu-item-content p-3 ">
          <label htmlFor={`${this.props.indexes.join('.')}.label`} className="form-label">Label</label>
          <input type="text"
                 className="form-control"
                 id={`${this.props.indexes.join('.')}.label`}
                 onChange={(e) => {
                   let value = e.target.value;
                   let path = this.props.indexes.map(((index) => {
                     return `children.${index}`;
                   })).join('.') + '.label'
                   this.props.updateValue(value, path)
                 }}
                 value={this.props.item.label}/>
          <label htmlFor={`${this.props.indexes.join('.')}.url`} className="form-label">URL</label>
          <input type="text"
                 className="form-control"
                 id={`${this.props.indexes.join('.')}.url`}
                 onChange={(e) => {
                   let value = e.target.value;
                   let path = this.props.indexes.map(((index) => {
                     return `children.${index}`;
                   })).join('.') + '.url'
                   this.props.updateValue(value, path)
                 }}
                 value={this.props.item.url}/>
          <label className="form-label">Active Condition:</label>
          <input type="text"
                 className="form-control"
                 placeholder="path"
                 id={`${this.props.indexes.join('.')}.modelField`}
                 onChange={(e) => {
                   let value = e.target.value;
                   let path = this.props.indexes.map(((index) => {
                     return `children.${index}`;
                   })).join('.') + '.modelField'
                   this.props.updateValue(value, path)
                 }}
                 value={this.props.item.modelField}/>
          <AltrpSelect id={`${this.props.indexes.join('.')}.operator`}
                 className="altrp-menu-item__select"
                 onChange={(e) => {
                   let value = e?.value || '';
                   let path = this.props.indexes.map(((index) => {
                     return `children.${index}`;
                   })).join('.') + '.operator'
                   this.props.updateValue(value, path)
                 }}
                 isClearable={true}
                 options={CONDITIONS_OPTIONS}
                 value={this.props.item.operator}/>
          <input type="text"
                 className="form-control"
                 placeholder="value"
                 id={`${this.props.indexes.join('.')}.value`}
                 onChange={(e) => {
                   let value = e.target.value;
                   let path = this.props.indexes.map(((index) => {
                     return `children.${index}`;
                   })).join('.') + '.value'
                   this.props.updateValue(value, path)
                 }}
                 value={this.props.item.value}/>
          <label htmlFor={`${this.props.indexes.join('.')}.icon`} className="form-label">Icon</label>
          <button
            onClick={() => {
              let value = '';
              let path = this.props.indexes.map(((index) => {
                return `children.${index}`;
              })).join('.') + '.icon'
              this.props.updateValue(value, path)
            }}
            className="btn btn_link text-danger fs-2 altrp-menu-item__delete">delete Icon
          </button>
          <IconSelect
            value={this.props.item.icon}
            returnType="text"
            onChange={(icon) => {
              let value = icon;
              let path = this.props.indexes.map(((index) => {
                return `children.${index}`;
              })).join('.') + '.icon'
              this.props.updateValue(value, path)
            }}/>
          <button
            onClick={() => {
              this.props.deleteItem(this.props.indexes)
            }}
            className="btn btn_link text-danger fs-2 altrp-menu-item__delete">delete menu item
          </button>
        </div>}
        <ReactSortable
          className="altrp-menu-item-children"
          group="nested"
          setList={(newList) => this.props.updateChildren(newList, this.props.indexes)}
          list={this.props.item.children}>
          {this.props.item.children.map((item, idx) => {
            return <MenuItem
              item={item}
              key={item.id}
              indexes={[...this.props.indexes, idx]}
              deleteItem={this.props.deleteItem}
              updateChildren={this.props.updateChildren}
              updateValue={this.props.updateValue}/>
          })}
        </ReactSortable>
      </div>
    );
  }
}

export default MenuItem
