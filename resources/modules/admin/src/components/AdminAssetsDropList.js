import React from 'react';
import { Link, withRouter } from "react-router-dom";

class AdminAssetsDropList extends React.Component {

    render() {
        const { pathname } = this.props.location
        const pathmanHaveAsssets = pathname.indexOf('assets')

        return (
                <ul className={pathmanHaveAsssets !== -1 ? "admin-nav-list admin-nav-list--sublist_active" : "admin-nav-list admin-nav-list--sublist"}>
                    <li><Link to="/admin/assets" className="admin-nav-list__link"><span>Library</span></Link></li>
                    <li>
                        <Link
                            to="/admin/assets/custom-fonts"
                            className="admin-nav-list__link"
                        >
                            <span>Custom Fonts</span>
                        </Link>
                    </li>
                </ul>
        )
    }
}

export const WithRouterAdminAssetsDropList = withRouter(AdminAssetsDropList);
