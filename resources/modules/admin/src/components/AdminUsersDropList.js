import React from 'react';
import { Link, withRouter } from "react-router-dom";

class AdminUsersDropList extends React.Component {

    render() {
        const { pathname } = this.props.location
        const pathnameHaveUsers = pathname.indexOf('users') !== -1 || pathname.indexOf('tools') !== -1

        return (
                <ul className={pathnameHaveUsers ? "admin-nav-list admin-nav-list--sublist_active" : "admin-nav-list admin-nav-list--sublist"}>
                    <li>
                        <Link
                            to="/admin/tools"
                            className="admin-nav-list__link"
                        >
                            <span>Tools</span>
                        </Link>
                    </li>
                </ul>
        )
    }
}

export const WithRouterAdminUsersDropList = withRouter(AdminUsersDropList);