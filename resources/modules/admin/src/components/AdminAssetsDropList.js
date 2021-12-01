import React from 'react';
import { Link, withRouter } from "react-router-dom";

class AdminAssetsDropList extends React.Component {

    render() {
        const { pathname } = this.props.location
        const pathmanHaveAsssets = pathname.indexOf('assets')

        return (
                <ul className={pathmanHaveAsssets !== -1 ? "admin-nav-list admin-nav-list--sublist_active" : "admin-nav-list admin-nav-list--sublist"}>
                    <li>
                        <Link
                            to="/admin/assets/custom-fonts"
                            className={pathname.indexOf('custom-fonts') !== -1 ? "admin-nav-list__link font__weightDropList" : "admin-nav-list__link"}
                            onClick={this.props.activeButton}
                        >
                            <span>Custom Fonts</span>
                        </Link>
                    </li>
                </ul>
        )
    }
}

export const WithRouterAdminAssetsDropList = withRouter(AdminAssetsDropList);
