import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class AdminCustomizersDropList extends React.Component {
  render() {
    const { pathname } = this.props.location;
    const pathnameHaveTables = pathname.indexOf('customizers');

    return (
      <>
        {this.props.menu ? (
          <ul className={pathnameHaveTables !== -1 ? 'admin-nav-list admin-nav-list--sublist_active' : 'admin-nav-list admin-nav-list--sublist'}>
            <li>
              <Link
                to="/admin/customizers/cron-events"
                className={pathname.indexOf('cron-events') !== -1 ? 'admin-nav-list__link font__weightDropList' : 'admin-nav-list__link'}
                onClick={this.props.activeButton}
              >
                <span>Cron Events</span>
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="admin-nav-list admin-nav-list--sublist">
            <li>
              <Link
                to="/admin/customizers/cron-events"
                className={pathname.indexOf('cron-events') !== -1 ? 'admin-nav-list__link font__weightDropList' : 'admin-nav-list__link'}
                onClick={this.props.activeButton}
              >
                <span>Cron Events</span>
              </Link>
            </li>
          </ul>
        )}
      </>
    );
  }
}

export const WithRouterAdminCustomizersDropList = withRouter(AdminCustomizersDropList);
