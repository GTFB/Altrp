import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PermissionForm from "./PermissionForm";

class PermissionPage extends Component {
  render() {
    const isEditing = Boolean(this.props.match.params.id);

    return <div className="admin-pages admin-page">
      <div className="admin-heading">
        <div className="admin-breadcrumbs">
          <Link className="admin-breadcrumbs__link" to="/admin/access">Access / All Permissions</Link>
          <span className="admin-breadcrumbs__separator">/</span>
          <span className="admin-breadcrumbs__current">
            {isEditing ? 'Edit Permission' : 'Add New Permission'}
          </span>
        </div>
      </div>
      <div className="admin-content">
        <PermissionForm />
      </div>
    </div>;
  }
}

export default withRouter(PermissionPage);