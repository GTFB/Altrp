import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import AddDataSourceForm from "./AddDataSourceForm";

class AddDataSource extends Component {
  render() {
    const { id } = this.props.match.params;
    return <div className="admin-pages admin-page">
      <div className="admin-heading">
        <div className="admin-breadcrumbs">
          <Link className="admin-breadcrumbs__link" to="/admin/tables/models">Models / All Models</Link>
          <span className="admin-breadcrumbs__separator">/</span>
          <span className="admin-breadcrumbs__current">{id ? 'Edit Data Source' : 'Add New Data Source'}</span>
        </div>
      </div>
      <div className="admin-content">
        <AddDataSourceForm />
      </div>
    </div>;
  }
}

export default withRouter(AddDataSource);