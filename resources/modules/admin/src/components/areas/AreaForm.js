import React, {Component} from "react";
import AltrpCodeEditor from "../altrp-editor/AltrpCodeEditor";
import {titleToName} from "../../js/helpers";
import {InputGroup} from "@blueprintjs/core";

class AreaForm extends Component {
  constructor(props) {
    super(props);
    let defaultValue = {
      title: '',
      name: '',
      settings: {
        area_type: 'sidebar',
        sidebar_type: '',
        sidebar_location: '',
        sidebar_width: '',
        custom_css: '',
        sidebar_checked: false,
      },
    };
    this.state = {
      value: props.value ? props.value : defaultValue,
    };
  }

  /**
   * передадим значение
   */
  submitForm = (e) => {
    e.preventDefault();
    if (this.props.onSubmit) {
      this.props.onSubmit(this.state.value);
    }
  }

  /**
   * Обновим значение
   * @param {*} inputValue
   * @param {string} valueName
   */
  changeValue = (inputValue, valueName) => {
    const value = {...this.state.value};
    if (valueName === 'title') {
      value.name = titleToName(inputValue);
    }
    _.set(value, valueName, inputValue);
    this.setState(state => ({...state, value}))
  }

  render() {
    const {title, settings, name} = this.state.value;
    return <form method="post" action="/ajax/areas/add" className="form-areas__container" onSubmit={this.submitForm}>
      <div className="form-group__inline-wrapper">
        <div className="form-group form-group_width47">
          <label htmlFor="title" className="label__RobotoFont">Title</label>
          {/*<input type="text" id="title" required*/}
          {/*       name="title"*/}
          {/*       value={title}*/}
          {/*       onChange={e => {*/}
          {/*         this.changeValue(e.target.value, 'title')*/}
          {/*       }}*/}
          {/*       className="form-control"*/}
          {/*/>*/}

          <InputGroup type="text"
                      id="title"
                      required
                      name="title"
                      value={title}
                      onChange={e => {
                        this.changeValue(e.target.value, 'title')
                      }}
                      className="form-control-blueprint"
          />
        </div>
        <div className="form-group form-group_width47">
          <label htmlFor="title" className="label__RobotoFont">Name</label>
          {/*<input type="text" id="title" required*/}
          {/*       name="title"*/}
          {/*       disabled={true}*/}
          {/*       value={name}*/}
          {/*       className="form-control"*/}
          {/*/>*/}

          <InputGroup type="text"
                      id="title"
                      required
                      disabled={true}
                      name="title"
                      value={name}
                      onChange={e => {
                        this.changeValue(e.target.value, 'title')
                      }}
                      className="form-control-blueprint"
          />
        </div>
      </div>
     <div className="form-group__inline-wrapper">

       <div className="form-group">
         <label htmlFor="settings.area_type" className="label__RobotoFont">Area Type</label>
         <select
           id="settings.area_type"
           required={true}
           value={settings.area_type}
           onChange={e => {
             this.changeValue(e.target.value, 'settings.area_type');
           }}
           className="form-control"
         >
           <option value="sidebar">Sidebar</option>
         </select>
       </div>
       {settings.area_type === 'sidebar' &&
       <div className="form-group">
         <label htmlFor="settings.sidebar_type" className="label__RobotoFont">Sidebar Type</label>
         <select
           id="settings.sidebar_type"
           required={true}
           value={settings.sidebar_type}
           onChange={e => {
             this.changeValue(e.target.value, 'settings.sidebar_type');
           }}
           className="form-control"
         >
           <option value="">Choose...</option>
           <option value="content_sidebar">Content Sidebar</option>
           <option value="app_sidebar">App Sidebar</option>
         </select>
       </div>}
       {settings.area_type === 'sidebar' &&
       <div className="form-group">
         <label htmlFor="settings.sidebar_location" className="label__RobotoFont">Sidebar Location</label>
         <select
           id="settings.sidebar_location"
           required={true}
           value={settings.sidebar_location}
           onChange={e => {
             this.changeValue(e.target.value, 'settings.sidebar_location');
           }}
           className="form-control"
         >
           <option value="">Choose...</option>
           <option value="left">Left</option>
           <option value="right">Right</option>
         </select>
       </div>}

     </div>
      {settings.area_type === 'sidebar' &&
      <div className="row">
        <div className="form-group col-6">
          <label htmlFor="settings.sidebar_width" className="label__RobotoFont">Sidebar Width</label>
          {/*<input type="text" id="settings.sidebar_width" required*/}
          {/*       name="settings.sidebar_width"*/}
          {/*       value={settings.sidebar_width}*/}
          {/*       onChange={e => {*/}
          {/*         this.changeValue(e.target.value, 'settings.sidebar_width')*/}
          {/*       }}*/}
          {/*       className="form-control"*/}
          {/*/>*/}

          <InputGroup type="text"
                      id="settings.sidebar_width"
                      required
                      name="settings.sidebar_width"
                      value={settings.sidebar_width}
                      onChange={e => {
                        this.changeValue(e.target.value, 'settings.sidebar_width')
                      }}
                      className="form-control-blueprint"
          />
        </div>
        <div className="form-group col-6">
          <label htmlFor="settings.sidebar_fixed" className="label__RobotoFont">Sidebar Fixed</label>
          <br/>
          <input type="checkbox" id="settings.sidebar_fixed"
                 name="settings.sidebar_fixed"
                 checked={settings.sidebar_fixed}
                 onChange={e => {
                   console.log(e.target.checked);
                   this.changeValue(e.target.checked, 'settings.sidebar_fixed')
                 }}
          />
        </div>
      </div>
      }
      <div className="form-group">
        <label htmlFor="settings.custom_css">Custom CSS</label>
        <AltrpCodeEditor value={settings.custom_css}
                         id="settings.custom_css"
                         mode="css"
                         style={{
                           width: '100%'
                         }}
                         onChange={value => {
                           this.changeValue(value, 'settings.custom_css')
                         }}
        />
      </div>
      <button className="btn btn_success">{this.props.submitText || 'Add'}</button>
    </form>
  }
}

export default AreaForm
