import React, { Component } from "react";
import { Link } from "react-router-dom";
import AddDataSourceForm from "./AddDataSourceForm";

class AddDataSource extends Component {
  render() {
    return <div className="admin-pages admin-page">
      <div className="admin-heading">
        <div className="admin-breadcrumbs">
          <Link className="admin-breadcrumbs__link" to="/admin/models">Models / All Models</Link>          
          <span className="admin-breadcrumbs__separator">/</span>
          <span className="admin-breadcrumbs__current">Add New Data Source</span>
        </div>
      </div>
      <div className="admin-content">
        <AddDataSourceForm />
      </div>
    </div>;
  }
}

export default AddDataSource;