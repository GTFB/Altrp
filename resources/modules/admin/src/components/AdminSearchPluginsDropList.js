import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";


class AdminSearchPluginsDropList extends Component {



  render() {

    const { pathname } = this.props.location
    const pathnameHaveTables = pathname.indexOf('plugins') !== -1 || pathname.indexOf('search-plugins') !== -1


    return (
      <>
        {this.props.menu ? (
          <ul className={pathnameHaveTables ? "admin-nav-list admin-nav-list--sublist_active" : "admin-nav-list admin-nav-list--sublist"}>
            <li>
              <Link to="/admin/search-plugins"
                    className={pathname.indexOf('search-plugins') !== -1 ? "admin-nav-list__link font__weightDropList" : "admin-nav-list__link"}
                    onClick={this.props.activeButton}
              >
                <span>Search Plugins</span>
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="admin-nav-list admin-nav-list--sublist">
            <li>
              <Link to="/admin/search-plugins"
                    className={pathname.indexOf('search-plugins') !== -1 ? "admin-nav-list__link font__weightDropList" : "admin-nav-list__link"}
                    onClick={this.props.activeButton}
              >
                <span>Search Plugins</span>
              </Link>
            </li>
          </ul>
        )}
      </>
    )
  }
}

export const WithRouterAdminSearchPluginsDropList = withRouter(AdminSearchPluginsDropList);
