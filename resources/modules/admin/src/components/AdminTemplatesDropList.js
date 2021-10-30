import React from 'react';
import {Link, withRouter} from "react-router-dom";

class AdminTemplatesDropList extends React.Component {

  render() {
    const {pathname} = this.props.location

    const pathnameHaveTemplates = pathname.indexOf('templates') !== -1 || pathname.indexOf('areas') !== -1 || pathname.indexOf('menus') !== -1

    return (
      <ul
        className={pathnameHaveTemplates ? "admin-nav-list admin-nav-list--sublist_active" : "admin-nav-list admin-nav-list--sublist"}>
        <li>
          <Link
            to="/admin/areas"
            className={pathname.indexOf('areas') !== -1 ? "admin-nav-list__link font__weightDropList" : "admin-nav-list__link"}
            onClick={this.props.activeButton}
          >
            <span>Custom Areas</span>
          </Link>
        </li>

        <li>
          <Link
            to="/admin/menus"
            className={pathname.indexOf('menus') !== -1 ? "admin-nav-list__link font__weightDropList" : "admin-nav-list__link"}
            onClick={this.props.activeButton}
          >
            <span>Menus</span>
          </Link>
        </li>
      </ul>
    )
  }
}

export const WithRouterAdminTemplatesDropList = withRouter(AdminTemplatesDropList);
