import React, { Component } from "react";
import ReactDOM from "react-dom";
import CloseModal from "../svgs/clear_black.svg";
import {InputGroup} from "@blueprintjs/core";
import Resource from "../../../editor/src/js/classes/Resource";
import {titleToName, titleToNameTwo} from "../js/helpers";


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

  async componentDidMount() {
    if (this.props.guid) {
      const { data } = await this.categories.get(this.props.guid)
      this.setState(state => ({
        ...state,
        value: data
      }))
    }
  }

  submitCategory = async (e) => {
    e.preventDefault();
    if (this.props.guid) {
      await this.categories.put(this.props.guid, this.state.value)
    } else {
      try {
        await this.categories.post(this.state.value)
      } catch (error) {
        alert("Заполните поля");
        console.error(error);
      }
    }
    this.props.onToggle();
    this.props.getCategories()
  }

  changeCategory = (value, name) => {
    if (this.props.guid) {
      this.setState(state => {
        state = { ...state }
        state.value[name] = value
        return state
      })
    } else {
      this.setState(state => {
        state = { ...state }
        if (name === "title") {
          state.value["title"] = titleToNameTwo(value)
          state.value["name"] = titleToName(value)
        } else {
          state.value[name] = value
        }
        return state
      })
    }
  }

  render() {
    return (
     ReactDOM.createPortal(
       <div className={this.props.activeMode ? "modal-window modal-window_active" : "modal-window"} onClick={this.props.onToggle}>
         <div className={`modal-window-content animation-scale`} onClick={(e) => e.stopPropagation()}>
           <CloseModal className="icon_modal" onClick={this.props.onToggle}/>
           <div className="category__block">
             <form className="category__form" onSubmit={this.submitCategory}>
               <div className="form-group__inline-wrapper">
                 <div className="form-group form-group_width47">
                   <label htmlFor="Category-title" className="label__RobotoFont">title category:</label>
                   <InputGroup className="form-control-blueprint"
                               type="text"
                               value={this.state.value?.title}
                               onChange={e => {
                                 this.changeCategory(e.target.value, 'title')
                               }}
                   />
                 </div>
                 <div className="form-group form-group_width47">
                   <label htmlFor="Category-name" className="label__RobotoFont">name category:</label>
                   <InputGroup className="form-control-blueprint"
                               type="text"
                               value={this.state.value?.name}
                               onChange={e => {
                                 this.changeCategory(e.target.value, "name")
                               }}
                               readOnly={this.props.guid}
                   />
                 </div>
               </div>
               <div className="form-group">
                 <label htmlFor="Category-description" className="label__RobotoFont">description category:</label>
                 <InputGroup className="form-control-blueprint"
                             type="text"
                             value={this.state.value?.description}
                             onChange={e => {
                               this.changeCategory(e.target.value, "description")
                             }}
                 />
               </div>
               <button className="btn btn_success" type="submit">{this.props.guid ? 'Save' : 'Add'}</button>
             </form>
           </div>
         </div>
       </div>,
       document.body
     )
    );
  }
}

export default CategoryModal;
