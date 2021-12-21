import React, { Component } from "react";
import CloseModal from "../svgs/clear_black.svg";
import {InputGroup} from "@blueprintjs/core";
import Resource from "../../../editor/src/js/classes/Resource";


class CategoryModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: {
        title: '',
        name: '',
        description: '',
      }
    }

    this.categories = new Resource({route: "/admin/ajax/categories"} );
  }

  submitCategory = async (e) => {
    e.preventDefault();
    await this.categories.post(this.state.value)
    this.props.onToggle();
  }

  changeCategory = (value, name) => {
    this.setState(state => {
      state = { ...state }
      state.value[name] = value
      return state
    })
  }

  render() {
    console.log(this.state)
    return (
      <div className={this.props.activeMode ? "modal-window modal-window_active" : "modal-window"} onClick={this.props.onToggle}>
        <div className={`modal-window-content category-animation`} onClick={(e) => e.stopPropagation()}>
          <CloseModal className="icon_modal" onClick={this.props.onToggle}/>
          <div className="category__block">
            <form className="category__form" onSubmit={this.submitCategory}>
              <div className="form-group__inline-wrapper">
                <div className="form-group form-group_width47">
                  <label htmlFor="Category-title" className="label__RobotoFont">title category:</label>
                  <InputGroup className="form-control-blueprint"
                              type="text"
                              value={this.state.value.title}
                              onChange={e => {
                                this.changeCategory(e.target.value, 'title')
                              }}
                  />
                </div>
                <div className="form-group form-group_width47">
                  <label htmlFor="Category-name" className="label__RobotoFont">name category:</label>
                  <InputGroup className="form-control-blueprint"
                              type="text"
                              value={this.state.value.name}
                              onChange={e => {
                                this.changeCategory(e.target.value, "name")
                              }}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="Category-description" className="label__RobotoFont">description category:</label>
                <InputGroup className="form-control-blueprint"
                            type="text"
                            value={this.state.value.description}
                            onChange={e => {
                              this.changeCategory(e.target.value, "description")
                            }}
                />
              </div>
              <button className="btn btn_success" type="submit">Add</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CategoryModal;
