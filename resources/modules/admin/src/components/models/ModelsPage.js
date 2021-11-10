import React, { Component } from "react";
import {Link, withRouter} from "react-router-dom";

class ModelsPage extends Component {


  render() {
    return (
      <div className="admin-pages admin-page">
        <div className="admin-heading">
          <div className="admin-breadcrumbs">
            <Link className="admin-breadcrumbs__link" to="/admin/pages">Models</Link>
          </div>
        </div>
        <div className="admin-content">

        </div>
      </div>
    )
  }
}

export default withRouter(ModelsPage);
