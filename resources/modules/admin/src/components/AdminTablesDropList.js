import React from 'react';
import TableSvg from '../svgs/tables.svg';
import { Link, withRouter } from "react-router-dom";

class AdminTablesDropList extends React.Component {

    render() {
        const { pathname } = this.props.location
        const pathnameHaveTables = pathname.indexOf('tables')

        return (
                <ul className={pathnameHaveTables !== -1 ? "admin-nav-list admin-nav-list--sublist_active" : "admin-nav-list admin-nav-list--sublist"}>
                    <li>
                        <Link
                            to="/admin/tables/sql_editors"
                            className="admin-nav-list__link"
                        >
                            <span>SQL Editors</span>
                        </Link>
                    </li>
                </ul>
        )
    }
}

export const WithRouterAdminTablesDropList = withRouter(AdminTablesDropList);