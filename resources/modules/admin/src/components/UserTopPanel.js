import React, {Component} from "react";
import BellIcon from './../svgs/bell.svg';
import UserIcon from './../svgs/user.svg';
import LogoutIcon from './../svgs/logout.svg';
import {logout} from "../js/helpers";

class UserTopPanel extends Component {
  render(){
    return<div className="admin-user-top-panel top-panel d-flex align-items-center">
      <a href="#" className="top-panel-notification notification">
        <BellIcon className="notification__icon"/>
      </a>
      <UserIcon className="top-panel__portrait"/>
      <div className="top-panel__greeting">Hello, administrator 0.1.3</div>
      <button className="top-panel-logout logout" onClick={logout}>
        <LogoutIcon className="logout__icon"/>
      </button>
    </div>
  }
}

export default UserTopPanel