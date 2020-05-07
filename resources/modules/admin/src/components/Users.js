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
            <div className="admin-filters">
                <span className="admin-filters__current">All (4)</span>
                <span className="admin-filters__separator">|</span>
                <a className="admin-filters__link" href="#">Administrator (1)</a>
                <span className="admin-filters__separator">|</span>
                <a className="admin-filters__link" href="#">Editor (3)</a>
            </div>
        </div>
    </div>;
  }

}
