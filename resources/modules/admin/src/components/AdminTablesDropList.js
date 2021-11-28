import React from 'react';
import { Link, withRouter } from "react-router-dom";

class AdminTablesDropList extends React.Component {

    render() {
        const { pathname } = this.props.location
        const pathnameHaveTables = pathname.indexOf('tables')

        return (
          <>
            {this.props.menu ? (
              <ul className={pathnameHaveTables !== -1 ? "admin-nav-list admin-nav-list--sublist_active" : "admin-nav-list admin-nav-list--sublist"}>
                <li>
                  <Link
                    to="/admin/tables/sql_editors"
                    className={pathname.indexOf('sql_editors') !== -1 ? "admin-nav-list__link font__weightDropList" : "admin-nav-list__link"}
                    onClick={this.props.activeButton}
                  >
                    <span>SQL Queries</span>
                  </Link>
                </li>
              </ul>
            ) : (
              <ul className="admin-nav-list admin-nav-list--sublist">
                <li>
                  <Link
                    to="/admin/tables/sql_editors"
                    className={pathname.indexOf('sql_editors') !== -1 ? "admin-nav-list__link font__weightDropList" : "admin-nav-list__link"}
                    onClick={this.props.activeButton}
                  >
                    <span>SQL Queries</span>
                  </Link>
                </li>
              </ul>
            )}
          </>
        )
    }
}

export const WithRouterAdminTablesDropList = withRouter(AdminTablesDropList);
