import React, {Component} from "react";
import {Link} from "react-router-dom";
import Resource from "../../../editor/src/js/classes/Resource";
import AdminTable from "./AdminTable";


export default class AllPages extends Component{
  constructor(props){
    super(props);
    this.state = {
      pages: [],
    };
    this.resource = new Resource({route: '/admin/ajax/pages'});
  }
  async componentDidMount(){
    let res = await this.resource.getAll();
    this.setState(state=>{
      return{...state, pages:res}
    })
  }

  render(){
    return <div className="admin-pages admin-page">
      <div className="admin-heading">
        <div className="admin-breadcrumbs">
          <a className="admin-breadcrumbs__link" href="#">Pages</a>
          <span className="admin-breadcrumbs__separator">/</span>
          <span className="admin-breadcrumbs__current">All Pages</span>
        </div>
        <Link className="btn" to="/admin/pages/add">Add New</Link>
        <div className="admin-filters">
          <span className="admin-filters__current">All ({this.state.pages.length || '0'})</span>
        </div>
      </div>
      <div className="admin-content">
        <AdminTable columns={[
          {
            name: 'title',
            title: 'Title',
            editUrl: true,
          },
          {
            name: 'author',
            title: 'Author'
          },
          {
            name: 'path',
            title: 'Path',
            url: true,
            target: '_blank',
          },
        ]} rows={this.state.pages}/>
      </div>
    </div>;
  }

}