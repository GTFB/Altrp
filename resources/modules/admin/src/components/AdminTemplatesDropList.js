import React from 'react';
import { Link, withRouter } from "react-router-dom";

class AdminTemplatesDropList extends React.Component {

    render() {
        const { pathname } = this.props.location

        const pathnameHaveTemplates = pathname.indexOf('templates') !== -1 || pathname.indexOf('areas') !== -1

        return (
                <ul className={pathnameHaveTemplates ? "admin-nav-list admin-nav-list--sublist_active" : "admin-nav-list admin-nav-list--sublist"}>
                    <li>
                        <Link
                            to="/admin/areas"
                            className="admin-nav-list__link"
                        >
                            <span>Custom Areas</span>
                        </Link>
                    </li>
                </ul>
        )
    }
}

export const WithRouterAdminTemplatesDropList = withRouter(AdminTemplatesDropList);