import React from 'react';
import {Link, withRouter} from "react-router-dom";

class AdminUsersDropList extends React.Component {

  render() {
    const {pathname} = this.props.location
    const pathnameHaveUsers = pathname.indexOf('users') !== -1 || pathname.indexOf('access') !== -1

    return (
      <ul
        className={pathnameHaveUsers ? "admin-nav-list admin-nav-list--sublist_active" : "admin-nav-list admin-nav-list--sublist"}>
        {/*Временно скрыт*/}
        {/*<li>*/}
        {/*    <Link*/}
        {/*        to="/admin/tools"*/}
        {/*        className="admin-nav-list__link"*/}
        {/*    >*/}
        {/*        <span>Tools</span>*/}
        {/*    </Link>*/}
        {/*</li>*/}
        <li>
          <Link
            to="/admin/access/roles"
            className={pathname.indexOf('access') !== -1 ? "admin-nav-list__link font__weightDropList" : "admin-nav-list__link"}
            onClick={this.props.activeButton}
          >
            <span>Access</span>
          </Link>
        </li>
      </ul>
    )
  }
}

export const WithRouterAdminUsersDropList = withRouter(AdminUsersDropList);
