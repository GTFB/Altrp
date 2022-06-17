import React, {Component} from "react";
import { connect } from "react-redux";

import BellIcon from './../svgs/bell.svg';
import UserIcon from './../svgs/user.svg';
import LogoutIcon from './../svgs/logout.svg';
import {logout} from "../js/helpers";
import {io} from "socket.io-client";
import getCookie from "../../../editor/src/js/helpers/getCookie";
import  Cookies from 'js-cookie';
import TopMemoryUsage from "./TopMemoryUsage";

class UserTopPanel extends Component {

  render(){
    return<div className="admin-user-top-panel top-panel d-flex align-items-center">
      <TopMemoryUsage/>
      {this.props.userName&&<a href="#" className="top-panel-notification notification">
        <BellIcon className="notification__icon"/>
      </a>}
      {/*<UserIcon className="top-panel__portrait"/>*/}
      {this.props.userName&&<div className="top-panel__greeting">Hello, {this.props.userName}</div>}
      <button className="top-panel-logout logout" onClick={logout}>
        <LogoutIcon className="logout__icon"/>
      </button>
    </div>
  }
}

const mapStateToProps = state => {
  return {
    userName: state.currentUser?.data?.name || '',
    userGuid: state.currentUser?.data?.guid || '',
    currentUser: state.currentUser
  }
};

export default connect(mapStateToProps)(UserTopPanel);
