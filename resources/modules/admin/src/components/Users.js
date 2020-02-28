import React, {Component} from "react";


export default class Users extends Component{
  render(){
    return <div className="users">
        <div className="admin-heading">
            <div className="admin-breadcrumbs">
                <a className="admin-breadcrumbs__link" href="#">Users</a>
                <span className="admin-breadcrumbs__separator">/</span>
                <span className="admin-breadcrumbs__current">All Users</span>
            </div>
            <a href="#" className="btn">Add New</a>
        </div>
    </div>;
  }

}
