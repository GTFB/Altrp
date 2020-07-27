import React, { Component } from "react";
import { Link } from "react-router-dom";
import AddModelForm from "./AddModelForm";

class AddModel extends Component {
  render() {
    return <div className="admin-pages admin-page">
      <div className="admin-heading">
        <div className="admin-breadcrumbs">
          <Link className="admin-breadcrumbs__link" to="/admin/tables/models">Tables / All Models</Link>
          <span className="admin-breadcrumbs__separator">/</span>
          <span className="admin-breadcrumbs__current">Add New Model</span>
        </div>
      </div>
      <div className="admin-content">
        <AddModelForm />
      </div>
    </div>;
  }
}

export default AddModel;