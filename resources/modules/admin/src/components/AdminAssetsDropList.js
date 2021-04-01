import React from 'react';
import { Link, withRouter } from "react-router-dom";

class AdminAssetsDropList extends React.Component {

    render() {
        const { pathname } = this.props.location

        if (pathname === '/admin/assets/images') {
            return (
                <ul className="admin-nav-list admin-nav-list--sublist_active">
                    <li><Link className="admin-nav-list__link"><span>Library</span></Link></li>
                    <li>
                        <Link
                            to="/admin/assets/custom-fonts"
                            className="admin-nav-list__link"
                        >
                            <span>Custom fonts</span>
                        </Link>
                    </li>
                </ul>
            )
        } else {
            return (
                <ul className="admin-nav-list admin-nav-list--sublist">
                    <li><Link className="admin-nav-list__link"><span>Library</span></Link></li>
                    <li>
                        <Link
                            to="/admin/assets/custom-fonts"
                            className="admin-nav-list__link"
                        >
                            <span>Custom fonts</span>
                        </Link>
                    </li>
                </ul>
            )
        }
    }
}

export const WithRouterAdminAssetsDropList = withRouter(AdminAssetsDropList);