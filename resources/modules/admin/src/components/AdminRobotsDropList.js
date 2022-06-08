import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";


class AdminRobotsDropList extends Component {



  render() {

    const { pathname } = this.props.location
    const pathnameHaveTables = pathname.indexOf('robots') !== -1 || pathname.indexOf('customizers') !== -1

    return (
     <>
       {this.props.menu ? (
         <ul className={pathnameHaveTables ? "admin-nav-list admin-nav-list--sublist_active" : "admin-nav-list admin-nav-list--sublist"}>
           <li>
             <Link to="/admin/customizers"
                   className={pathname.indexOf('customizers') !== -1 ? "admin-nav-list__link font__weightDropList" : "admin-nav-list__link"}
                   onClick={this.props.activeButton}
             >
               <span>Robotizers</span>
             </Link>
           </li>
         </ul>
       ) : (
         <ul className="admin-nav-list admin-nav-list--sublist">
           <li>
             <Link to="/admin/customizers"
                   className={pathname.indexOf('customizers') !== -1 ? "admin-nav-list__link font__weightDropList" : "admin-nav-list__link"}
                   onClick={this.props.activeButton}
             >
               <span>Robotizers</span>
             </Link>
           </li>
         </ul>
       )}
     </>
    )
  }
}

export const WithRouterAdminRobotsDropList = withRouter(AdminRobotsDropList);
