import React, { Component } from "react";
import {InputGroup, MenuItem} from "@blueprintjs/core";
import Resource from "../../../editor/src/js/classes/Resource";
import {redirect} from "../js/helpers";
import {MultiSelect} from "@blueprintjs/select";


class RobotChildrenModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      robot: {
        name: '',
        _categories: [],
        categories: [],
      },
      valid: false
    }

    this.resource = new Resource({
      route: "/admin/ajax/robots"
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.robot.name) {
      this.resource.post(this.state.robot).then(res => {
        if (res.redirect_route) {
          redirect(res.redirect_route);
        }
      })
      this.props.toggleModal();
    } else {
      this.setState(state => ({
        ...state,
        valid: true
      }))
    }
  }

  changeNameRobots = (value) => {
    if (this.state.valid) {
      this.setState((state) => ({
        ...state,
        robot: {
          ...state.robot,
          name: value
        },
        valid: false
      }))
    } else {
      this.setState((state) => ({
        ...state,
        robot: {
          ...state.robot,
          name: value
        }
      }))
    }
  }

  tagRenderer = (item) => {
    return item.label;
  };

  isItemSelectedCategory = (item) => {
    let itemString = JSON.stringify(item);
    let selectedString = JSON.stringify(this.state.robot._categories);
    return selectedString.includes(itemString);
  }

  handleItemSelectCategory = (item) => {
    if (!this.isItemSelectedCategory(item)) {
      this.setState(state => ({
        ...state,
        robot: {
          ...state.robot,
          _categories: [...state.robot._categories, item],
          categories: [...state.robot.categories, item]
        }
      }));
    }
  }

  handleTagRemoveCategory = (item) => {
    this.setState(state => ({
      ...state,
      robot: {
        ...state.robot,
        _categories: [...state.robot._categories].filter((i) => i.label !== item),
        categories: [...state.robot.categories].filter((i) => i.label !== item)
      }
    }));
  }

  onQueryChangeMulti = (query, value) => {
    return (
      `${value.label.toLowerCase()}`.indexOf(query.toLowerCase()) >= 0
    );
  }

  render() {
    return (
      <div className="robot-children__block">
        <h2 className="title-robot">Add new Robot</h2>
        <form className="robot-children__form" onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="robots-name" className="label__RobotoFont">Robot name:</label>
            <InputGroup
              className="form-control-blueprint"
              type="text"
              value={this.state.robot.name}
              onChange={e => {
                this.changeNameRobots(e.target.value)
              }}
            />
            {this.state.valid && (
              <span className="form-valid__error">Need complete this field</span>
            )}
          </div>
          <div className="form-group form-group__multiSelectBlueprint-bp3">
            <label htmlFor="categories-robot" className="label__RobotoFont">Categories Robot:</label>
            <MultiSelect tagRenderer={this.tagRenderer} id="categories"
                         items={this.props.categoryOptions}
                         itemPredicate={this.onQueryChangeMulti}
                         noResults={<MenuItem disabled={true} text="No results."/>}
                         fill={true}
                         placeholder="Categories..."
                         selectedItems={this.state.robot.categories}
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
          <button className="btn btn_success" type="submit">Add</button>
        </form>
      </div>
    )
  }
}

export default RobotChildrenModal;
