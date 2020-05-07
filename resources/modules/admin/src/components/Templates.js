import React, {Component} from "react";
import Resource from "../../../editor/src/js/classes/Resource";
import AdminTable from "./AdminTable";


export default class Templates extends Component{
  constructor(props){
    super(props);
    this.state = {
      templates: [],
    };
    this.resource = new Resource({
      route: '/admin/ajax/templates'
    });
    this.resource.getAll().then(res=>res.json()).then(templates=>{
      this.setTemplates(templates);
    });
  }
  setTemplates(templates){
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
        <a href="#" className="btn">Add New</a>
        <div className="admin-filters">
          <span className="admin-filters__current">All ({this.state.templates.length || ''})</span>
        </div>
      </div>
      <div className="admin-content">
      <AdminTable columns={[
        {
          name: 'title',
          title: 'Title'
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
