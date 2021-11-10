import React, {Component} from "react";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import Notifications from "./Notifications/Notifications";
import EditUserPage from "./EditUserPage";
import {Link, withRouter} from 'react-router-dom';


class UserPage extends Component {
  constructor(props) {
    super(props);
    this.switchTab = this.switchTab.bind(this);
    this.state = {
      activeTab: parseInt(window.location.hash[1]) || 0,
    };
  }

  switchTab(activeTab) {
    window.location.hash = activeTab + '';
    this.setState(state => {
      return {...state, activeTab}
    })
  }

  render() {
    return <div className="admin-settings admin-page">
      <div className="admin-heading">
        <div className="admin-breadcrumbs">
          <Link className="admin-breadcrumbs__link" to={"/admin/users"}>Users</Link>
          <span className="admin-breadcrumbs__separator">/</span>
          <span className="admin-breadcrumbs__current">User</span>
        </div>
      </div>
      <div className="admin-content zeroing__styleTabsSettings custom_tabs-visible">
        <Tabs selectedIndex={this.state.activeTab} onSelect={this.switchTab}>
          <TabList className="nav nav-pills admin-pills">
            <Tab>
              Edit user
            </Tab>
            {/*<Tab>*/}
            {/*  Notifications*/}
            {/*</Tab>*/}
          </TabList>
          <TabPanel>
            <EditUserPage/>
          </TabPanel>
          {/*<TabPanel>*/}
          {/*  <Notifications/>*/}
          {/*</TabPanel>*/}
        </Tabs>
      </div>
    </div>
  }
}

export default withRouter(UserPage);
