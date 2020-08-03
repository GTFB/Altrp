import React, { Component } from "react";
import SQLBuilderForm from "./sql-builder/SQLBuilderForm";

export default class SQLBuilder extends Component {
  render() {
    return <div className="admin-settings admin-page">
      <div className="admin-heading">
        <div className="admin-breadcrumbs">
          <a className="admin-breadcrumbs__link" href="#">SQL</a>
        </div>
      </div>
      <div className="admin-content">
        <SQLBuilderForm />
      </div>
    </div>
  }
}