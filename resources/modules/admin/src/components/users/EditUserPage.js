import React, {Component} from "react";
import {Link} from "react-router-dom";

import Resource from "../../../../editor/src/js/classes/Resource";
import {Redirect, withRouter} from 'react-router-dom';
import UserForm from "./UserForm";
/**
 * @class
 * @property {Resource} resource
 */

class EditUserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        user_id: this.props.match.params.id,
        redirectAfterSave: false,
    };
    this.resource = new Resource({route: '/admin/ajax/users/user'});

    //this.savePage = this.savePage.bind(this);
  }
  /*async componentDidMount(){
    let res = await this.templateResource.getOptions();
    this.setState(state=>{
      return{...state, templates: res}
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
  }*/
  /*async savePage(e){
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
  }*/
  render() {
    if(this.state.redirectAfterSave){
      return<Redirect to="/admin/users"/>
    }
    return <div className="admin-users">
        <div className="wrapper">
            <div className="admin-users-form">
                <UserForm redirect_url="/admin/users" id={this.state.user_id} />
            </div>
        </div>
    </div>;
  }
}

export default withRouter(EditUserPage);
