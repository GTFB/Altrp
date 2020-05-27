import React, {Component} from "react";
import Resource from "../../../editor/src/js/classes/Resource";
import AdminTable from "./AdminTable";
import store from "../js/store/store";
import {setModalSettings, toggleModal} from "../js/store/modal-settings/actions";
import {generateId, redirect} from "../js/helpers";


export default class Templates extends Component{
  constructor(props){
    super(props);
    this.state = {
      templates: [],
    };
    this.resource = new Resource({
      route: '/admin/ajax/templates'
    });
    this.resource.getAll().then(templates=>{
      this.setTemplates(templates);
    });
    this.onClick = this.onClick.bind(this);
  }
  onClick(){
    let modalSettings = {
      title: 'Add New Template',
      submitButton: 'Add',
      submit: function(formData){
        // let rootElement = new RootElement();
        let data = {
          name: formData.title,
          title: formData.title,
          data:{
            children: [],
            id: generateId(),
            name: "root-element",
            settings: {},
            type: "root-element",
          }
        };
        return (new Resource({route:'/admin/ajax/templates'})).post(data)
      },
      fields: [
        {
          name: 'title',
          label: 'Template Name',
          required: true,
        }
      ],
      success: function(res){
        console.log(res);
        if(res.redirect && res.url){
          redirect(res.url)
        }
      }
    };
    store.dispatch(setModalSettings(modalSettings));
    store.dispatch(toggleModal());
  }
  setTemplates(templates){
    templates = templates.map(template=>{
      console.log(template);
      return template;
    });
    this.setState(state=>{
      return{...state, templates};
    });
  }
  render(){
    return <div className="admin-templates admin-page">
      <div className="admin-heading">
        <div className="admin-breadcrumbs">
          <a className="admin-breadcrumbs__link" href="#">Templates</a>
          <span className="admin-breadcrumbs__separator">/</span>
          <span className="admin-breadcrumbs__current">All Templates</span>
        </div>
        <button onClick={this.onClick} className="btn">Add New</button>
        <div className="admin-filters">
          <span className="admin-filters__current">All ({this.state.templates.length || ''})</span>
        </div>
      </div>
      <div className="admin-content">
      <AdminTable columns={[
        {
          name: 'title',
          title: 'Title',
          url: true,
          target: '_blank',
        },
        {
          name: 'author',
          title: 'Author'
        },
      ]} rows={this.state.templates}/>
      </div>
    </div>;
  }

}
