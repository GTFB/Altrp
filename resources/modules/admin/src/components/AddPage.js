import React, {Component} from "react";
import {Link} from "react-router-dom";

class AddPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: {},
    };
  }

  render() {
    return <div className="admin-pages admin-page">
      <div className="admin-heading">
        <div className="admin-breadcrumbs">
          <Link className="admin-breadcrumbs__link" to="/admin/pages">Pages</Link>
          <span className="admin-breadcrumbs__separator">/</span>
          <span className="admin-breadcrumbs__current">Add New Page</span>
        </div>
      </div>
      <div className="admin-content">
        <div className="admin-form">
          <div className="form-group">
            <label htmlFor="page-title">title</label>
          </div>

        </div>
      </div>
    </div>;
  }
}

export default AddPage