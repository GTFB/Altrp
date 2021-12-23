import React, { Component } from "react";
import {generateId, redirect} from "../js/helpers";
import Resource from "../../../editor/src/js/classes/Resource";
import {Alignment, Button, InputGroup, MenuItem} from "@blueprintjs/core";
import {MultiSelect, Select} from "@blueprintjs/select";

class TemplateChildrenModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      template: {
        name: "",
        title: "",
        area: '1',
        _categories: [],
        categories: [],
        data: {
          children: [],
          id: generateId(),
          name: "root-element",
          settings: {},
          type: "root-element",
        }
      },
      valid: false
    };

   this.templates = new Resource({route: '/admin/ajax/templates'})
  }

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.template.title) {
      this.templates.post(this.state.template).then(res => {
        if (res.redirect && res.url) {
          redirect(res.url)
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

  changeTitleTemplate = (value) => {
    if (this.state.valid) {
      this.setState(state => ({
        ...state,
        template: {
          ...state.template,
          name: value,
          title: value
        },
        valid: false
      }))
    } else {
      this.setState(state => ({
        ...state,
        template: {
          ...state.template,
          name: value,
          title: value
        }
      }))
    }
  }

  changeSelectArea = (id) => {
    this.setState(state => ({
      ...state,
      template: {
        ...state.template,
        area: `${id}`
      }
    }))
  }

  onQueryChange = (query, value) => {
    return (
      `${value.title.toLowerCase()}`.indexOf(query.toLowerCase()) >= 0
    );
  }

  tagRenderer = (item) => {
    return item.label;
  };

  isItemSelectedCategory = (item) => {
    let itemString = JSON.stringify(item);
    let selectedString = JSON.stringify(this.state.template.categories);
    return selectedString.includes(itemString);
  }

  handleItemSelectCategory = (item) => {
    if (!this.isItemSelectedCategory(item)) {
      this.setState(state => ({
        ...state,
        template: {
          ...state.template,
          _categories: [...state.template._categories, item],
          categories: [...state.template.categories, item]
        }
      }));
    }
  }

  handleTagRemoveCategory = (item) => {
    this.setState(state => ({
      ...state,
      template: {
        ...state.template,
        _categories: [...state.template._categories].filter((i) => i.label !== item),
        categories: [...state.template.categories].filter((i) => i.label !== item)
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
      <div className="template-children__block">
        <h2 className="title-template">Add New Template</h2>
        <form className="template-children__form" onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="template-name" className="label__RobotoFont">Template Name:</label>
            <InputGroup
              className="form-control-blueprint"
              type="text"
              value={this.state.template.title}
              onChange={e => {
                this.changeTitleTemplate(e.target.value)
              }}
            />
            {this.state.valid && (
              <span className="form-valid__error">Need complete this field</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="area-name" className="label__RobotoFont">Area Name:</label>
            <Select items={this.props.templateAreas}
                    matchTargetWidth
                    itemPredicate={this.onQueryChange}
                    noResults={<MenuItem disabled={true} text="No results." />}
                    itemRenderer={(item, {handleClick, modifiers, query}) => {
                      return <MenuItem
                        text={item.title}
                        key={item.id}
                        active={ `${item.id}` === this.state.template.area }
                        onClick={handleClick}
                      />
                    }}
                    onItemSelect={current => {
                      this.changeSelectArea(current.id)
                    }}
                    fill={true}
            >
              <Button fill
                      large
                      alignText={Alignment.LEFT}
                      text={this.props.templateAreas.find(item => ( `${item.id}` === this.state.template.area ))?.title || 'none'}
                      rightIcon="caret-down"
              />
            </Select>
          </div>
          <div className="form-group form-group__multiSelectBlueprint-bp3">
            <label htmlFor="categories-template" className="label__RobotoFont">Categories Template:</label>
            <MultiSelect tagRenderer={this.tagRenderer} id="categories"
                         items={this.props.categoryOptions}
                         itemPredicate={this.onQueryChangeMulti}
                         noResults={<MenuItem disabled={true} text="No results."/>}
                         fill={true}
                         placeholder="Categories..."
                         selectedItems={this.state.template.categories}
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
    );
  }
}

export default TemplateChildrenModal;
