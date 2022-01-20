import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import RoleForm from "./RoleForm";

class RolePage extends Component {
  render() {
    const isEditing = Boolean(this.props.match.params.id);

    return <div className="admin-pages admin-page">
      <div className="admin-heading">
        <div className="admin-breadcrumbs">
          <Link className="admin-breadcrumbs__link" to="/admin/access/roles">Access / All Roles</Link>
          <span className="admin-breadcrumbs__separator">/</span>
          <span className="admin-breadcrumbs__current">
            {isEditing ? 'Edit Role' : 'Add New Role'}
          </span>
        </div>
      </div>
      <div className="admin-content">
        <RoleForm />
      </div>
    </div>;
  }
}

export default withRouter(RolePage);
