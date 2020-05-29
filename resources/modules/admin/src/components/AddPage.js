import React, {Component} from "react";
import {Link} from "react-router-dom";
import Resource from "../../../editor/src/js/classes/Resource";
import {Redirect} from "react-router";

/**
 * @class
 * @property {Resource} resource
 */

class AddPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: {},
      value: {},
      redirectAfterSave: false,
      templates: [],
    };
    this.resource = new Resource({route: '/admin/ajax/pages'});
    this.templateResource = new Resource({route: '/admin/ajax/templates'});
    this.addPage = this.addPage.bind(this);
  }
  async componentDidMount(){
    let res = await this.templateResource.getOptions();
    this.setState(state=>{
      return{...state, templates: res}
    })
  }
  async addPage(e){
    e.preventDefault();
    let res = await this.resource.post(this.state.value);
    if(res.success){
      this.setState(state=>{
        return {...state, redirectAfterSave: true}
      });
    } else {
      this.setState(state=>{
        return {...state, value: {}}
      });
    }
  }
  changeValue(value, field){
    this.setState(state=>{
      state = {...state};
      state.value[field] = value;
      return state
    })
  }
  render() {
    if(this.state.redirectAfterSave){
      return<Redirect to="/admin/pages"/>
    }
    return <div className="admin-pages admin-page">
      <div className="admin-heading">
        <div className="admin-breadcrumbs">
          <Link className="admin-breadcrumbs__link" to="/admin/pages">Pages</Link>
          <span className="admin-breadcrumbs__separator">/</span>
          <span className="admin-breadcrumbs__current">Add New Page</span>
        </div>
      </div>
      <div className="admin-content">
        <form className="admin-form" onSubmit={this.addPage}>
          <div className="form-group">
            <label htmlFor="page-title">Title</label>
            <input type="text" id="page-title" required={1}
                   value={this.state.value.title || ''}
                   onChange={e => {this.changeValue(e.target.value, 'title')}}
                   className="form-control"/>
          </div>
          <div className="form-group">
            <label htmlFor="page-path">Path</label>
            <input type="text" id="page-path" required={1}
                   value={this.state.value.path || ''}
                   onChange={e => {this.changeValue(e.target.value, 'path')}}
                   className="form-control"/>
          </div>
          <div className="form-group">
            <label htmlFor="page-path">Content Template</label>
            <select id="page-path" required={1}
                   value={this.state.value.template_id || ''}
                   onChange={e => {this.changeValue(e.target.value, 'template_id')}}
                   className="form-control">
              <option value=""/>
              {
                this.state.templates.map(template=>{
                  return <option value={template.id} key={template.id}>{template.title}</option>
                })
              }
            </select>
          </div>
          <button className="btn btn_success">Add</button>
        </form>
      </div>
    </div>;
  }
}

export default AddPage