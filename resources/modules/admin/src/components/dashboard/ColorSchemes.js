import React from "react";

function ColorSchemes() {
  return (
    <div className="admin-templates admin-page">
      <div className="admin-heading">
        <div className="admin-breadcrumbs">
          <a className="admin-breadcrumbs__link" href="#">
            Analytics
          </a>
        </div>
        <Link className="btn" to={`/admin/dashboard`}>
          All Widgets
        </Link>
      </div>
      <div className="admin-content"></div>
    </div>
  );
}

export default ColorSchemes;
