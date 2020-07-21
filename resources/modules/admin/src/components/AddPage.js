import React, {Component} from "react";
import {Link} from "react-router-dom";
import Resource from "../../../editor/src/js/classes/Resource";
import {Redirect, withRouter} from "react-router";

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
      models: [],
    };
    this.resource = new Resource({route: '/admin/ajax/pages'});
    this.model_resource = new Resource({route: '/admin/ajax/models'});
    this.templateResource = new Resource({route: '/admin/ajax/templates'});
    this.savePage = this.savePage.bind(this);
  }
  async componentDidMount(){
    let res = await this.templateResource.getOptions();
    this.setState(state=>{
      return{...state, templates: res}
    });

    let models_res = await this.model_resource.getAll();
    this.setState(state=>{
      return{...state, models: models_res}
    });

    let id = this.props.location.pathname.split('/');
    id = id[id.length - 1];
    id = parseInt(id);
    if(id){
      let pageData = await this.resource.get(id);
      this.setState(state=>{
        return{...state, value:pageData, id}
      });
    }
  }
  async savePage(e){
    e.preventDefault();
    let res;
    let path = this.state.value.path;

    path = path.split('\\').join('/');
    path = (path[0] !== '/') ? `/${path}` : path;
    this.state.value.path = path;
    if(this.state.id){
      res = await this.resource.put(this.state.id, this.state.value);
    } else {
      res = await this.resource.post(this.state.value);
    }
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
    if(field === 'path'){
      value = value.split('\\').join('/');
      value = (value[0] !== '/') ? `/${value}` : value;
    }
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
          <span className="admin-breadcrumbs__current">{this.state.value.title || 'Add New Page'}</span>
        </div>
      </div>
      <div className="admin-content">
        <form className="admin-form" onSubmit={this.savePage}>
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
                  return <option value={template.value} key={template.value}>{template.label}</option>
                })
              }
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="page-path">Model</label>
            <select id="page-path"
                   value={this.state.value.model_id || ''}
                   onChange={e => {this.changeValue(e.target.value, 'model_id')}}
                   className="form-control">
              <option value=""/>
              {
                this.state.models.map(model=>{
                  return <option value={model.id} key={model.id}>{model.name}</option>
                })
              }
            </select>
          </div>
          <button className="btn btn_success">{this.state.id ? 'Save' : 'Add'}</button>
        </form>
      </div>
    </div>;
  }
}

export default withRouter(AddPage);
