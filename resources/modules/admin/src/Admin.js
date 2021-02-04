import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";
import { hot } from "react-hot-loader";
import { Scrollbars } from "react-custom-scrollbars";
import { connect } from "react-redux";

import Bars from "./svgs/bars.svg";
import AssetSvg from "./svgs/assets.svg";
import DashboardSvg from "./svgs/dashboard.svg";
import PagesSvg from "./svgs/pages.svg";
import PluginSvg from "./svgs/plugins.svg";
import ReportSvg from "./svgs/reports.svg";
import SettingSvg from "./svgs/settings.svg";
import TableSvg from "./svgs/tables.svg";
import TemplateSvg from "./svgs/templates.svg";
import UserSvg from "./svgs/users.svg";

import AdminLogo from "./components/AdminLogo";
import AllPages from "./components/AllPages";
import AdminSettings from "./components/AdminSettings";
import Users from "./components/users/Users";
import AddUserPage from "./components/users/AddUserPage";
import EditUserPage from "./components/users/EditUserPage";
import UsersTools from "./components/users/UsersTools";
import Assets from "./components/Assets";
import Dashboard from "./components/Dashboard";
import Plugins from "./components/Plugins";
import Reports from "./components/Reports";
import Tables from "./components/Tables";
import Templates from "./components/Templates";
import Robots from "./components/Robots";
import AdminModal from "./components/AdminModal";
import AddPage from "./components/AddPage";
import AddReport from "./components/AddReport";
import UserTopPanel from "./components/UserTopPanel";
import Models from "./components/Models";
import EditModel from "./components/models/EditModel";
import EditField from "./components/models/EditField";
import AddRelation from "./components/models/AddRelation";
import AddAccessor from "./components/models/AddAccessor";
import AddDataSource from "./components/models/AddDataSource";
import SQLBuilder from "./components/SQLBuilder";
import SqlEditor from "./components/models/SqlEditor";
import AccessOptions from "./components/AccessOptions";
import RolePage from "./components/access/RolePage";
import PermissionPage from "./components/access/PermissionPage";
import AddTable from "./components/tables/AddTable";
import EditTable from "./components/tables/EditTable";
import SettingTable from "./components/tables/SettingTable";
import AddMigrationPage from "./components/tables/AddMigrationPage";
import AdminVersion from "./components/AdminVersion";
import SQLEditors from "./components/SQLEditors";
import ColorSchemes from "./components/dashboard/ColorSchemes";
import ModelPage from "./components/models/ModelPage";

import AssetsBrowser from "../../editor/src/js/classes/modules/AssetsBrowser";
import Resource from "../../editor/src/js/classes/Resource";

import store from "./js/store/store";
import { setUserData } from "./js/store/current-user/actions";

import "./sass/admin-style.scss";

window.React = React;
window.ReactDOM = ReactDOM;
window.Component = React.Component;

// Websockets import
// let mix = require('laravel-mix');
// require('dotenv').config();
// let my_env_key = process.env.MIX_PUSHER_APP_KEY;

// import Echo from "laravel-echo";
// window.Pusher = require("pusher-js");
// try {
//   window.Echo = new Echo({
//     broadcaster: "pusher",
//     key: 324345,
//     wsHost: window.location.hostname,
//     wsPort: 6001,
//     forceTLS: false,
//     disableStats: true
//   });
// } catch (error) {
//   console.error(error);
// }

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adminState: {
        adminEnable: true
      },
      pagesMenuShow: false,
      models: []
    };
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  componentDidMount() {
    store.subscribe(this.updateAdminState.bind(this));
    new Resource({ route: "/admin/ajax/model_options" })
      .getAll()
      .then(({ options }) => this.setState({ models: options }));

    new Resource({ route: "/ajax/current-user" })
      .getAll()
      .then(({ data }) => {
        this.props.setUserData(data)
      });
  }

  /**
   * Срабатвыает, когда меняется adminState в store
   */
  updateAdminState() {
    let adminState = store.getState().adminState;
    this.setState(state => {
      return { ...state, adminState: { ...adminState } };
    });
  }
  toggleMenu() {
    this.setState(state => {
      return { ...state, pagesMenuShow: !state.pagesMenuShow };
    });
  }
  render() {
    const { models } = this.state;
    let adminClasses = ["admin"];
    if (!this.state.adminState.adminEnable) {
      adminClasses.push("pointer-event-none");
    }
    if (this.state.pagesMenuShow) {
      adminClasses.push("admin_pages-show");
    }
    return (
      <div className={adminClasses.join(" ")}>
        <Router>
          <nav className="admin-nav">
            <div className="admin-nav-top">
              <AdminLogo />
              <Bars className="admin__bars" onClick={this.toggleMenu} />
            </div>
            <div className="admin-nav-main">
              {this.state.pagesMenuShow ? (
                <Scrollbars
                  autoHide
                  autoHideTimeout={500}
                  autoHideDuration={200}
                >
                  <ul className="admin-nav-list">
                    <li>
                      <Link
                        to="/admin/pages"
                        className="admin-nav-list__link"
                      >
                        <PagesSvg className="icon" />
                        <span>Pages</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/reports"
                        className="admin-nav-list__link"
                      >
                        <ReportSvg className="icon" />
                        <span>Reports</span>
                      </Link>
                    </li>
                      Models
                      {models
                      .sort((a, b) => {
                        if (a.label.toUpperCase() < b.label.toUpperCase())
                          return -1;
                        if (a.label.toUpperCase() > b.label.toUpperCase())
                          return 1;
                        return 0;
                      })
                      .map(({ value: id, label }) => (
                        <li key={id}>
                          <Link
                            to={`/admin/model/${id}`}
                            className="admin-nav-list__link admin-nav-list__link--models"
                          >
                            {label}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </Scrollbars>
              ) : (
                  <Scrollbars
                    autoHide
                    autoHideTimeout={500}
                    autoHideDuration={200}
                  >
                    <ul className="admin-nav-list">
                      <li>
                        <Link
                          to="/admin/dashboard"
                          className="admin-nav-list__link"
                        >
                          <DashboardSvg className="icon" />
                          <span>Dashboard</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/admin/assets"
                          className="admin-nav-list__link"
                        >
                          <AssetSvg className="icon" />
                          <span>Assets</span>
                        </Link>
                      </li>
                      <li>
                        {/*<Link to="/admin/tables" className="admin-nav-list__link">*/}
                        {/*<TableSvg className="icon"/>*/}
                        {/*<span>Tables</span>*/}
                        {/*</Link>*/}

                        <Link
                          to="/admin/tables/models"
                          className="admin-nav-list__link"
                        >
                          <TableSvg className="icon" />
                          <span>Tables</span>
                        </Link>
                        <ul className="admin-nav-sublist">
                          <li>
                            <Link
                              to="/admin/tables/sql_editors"
                              className="admin-nav-list__link"
                            >
                              <TableSvg className="icon" />
                              <span>SQL Editors</span>
                            </Link>
                          </li>
                        </ul>
                      </li>
                  <li>
                    <Link
                      to="/admin/templates"
                      className="admin-nav-list__link"
                    >
                      <TemplateSvg className="icon" />
                      <span>Templates</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/robots" className="admin-nav-list__link">
                      <TemplateSvg className="icon" />
                      <span>Robots</span>
                    </Link>
                  </li>
                  {/* <li>
                    <Link to="/admin/reports" className="admin-nav-list__link">
                      <ReportSvg className="icon" />
                      <span>Reports</span>
                    </Link>
                  </li> */}
                      <li>
                        <Link
                          to="/admin/users"
                          className="admin-nav-list__link"
                        >
                          <UserSvg className="icon" />
                          <span>Users</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/admin/tools"
                          className="admin-nav-list__link"
                        >
                          <span>Tools</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/admin/access/roles"
                          className="admin-nav-list__link"
                        >
                          <UserSvg className="icon" />
                          <span>Access</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/admin/plugins"
                          className="admin-nav-list__link"
                        >
                          <PluginSvg className="icon" />
                          <span>Plugins</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/admin/settings"
                          className="admin-nav-list__link"
                        >
                          <SettingSvg className="icon" />
                          <span>Settings</span>
                        </Link>
                      </li>
                    </ul>
                  </Scrollbars>
                )}

              </div>
              <AdminVersion />
          </nav>
          <Switch>
            <Route path="/admin/reports/add">
              <AddReport />
            </Route>
            <Route path="/admin/" exact>
              <Redirect to="/admin/dashboard" />
            </Route>
            <Route path="/admin/settings">
              <AdminSettings />
            </Route>
            <Route path="/admin/users" exact>
              <Users />
            </Route>
            <Route path="/admin/users/new" exact>
              <AddUserPage />
            </Route>
            <Route path="/admin/users/user/:id">
              <EditUserPage />
            </Route>
            <Route path="/admin/tools">
              <UsersTools />
            </Route>
            <Route path="/admin/assets">
              <Assets />
            </Route>
            <Route path="/admin/dashboard">
              <Dashboard />
            </Route>
            <Route path="/admin/dashboard/colors">
              <ColorSchemes />
            </Route>
            <Route path="/admin/plugins">
              <Plugins />
            </Route>
            <Route path="/admin/reports">
              <Reports />
            </Route>
            <Route path="/admin/tables" exact>
              <Tables />
            </Route>
            <Route path="/admin/tables/edit/:id" component={EditTable} exact>
              <EditTable />
            </Route>
            <Route
              path="/admin/tables/edit/:id/setting"
              component={SettingTable}
              exact
            />
            <Route
              path="/admin/tables/edit/:id/setting/migrations/add"
              component={AddMigrationPage}
            />
            <Route path="/admin/tables/add">
              <AddTable />
            </Route>
            <Route path="/admin/templates">
              <Templates />
            </Route>
            <Route path="/admin/robots">
                <Robots />
            </Route>
            <Route path="/admin/pages" exact>
              <AllPages />
            </Route>
            <Route path="/admin/pages/edit/:id">
              <AddPage />
            </Route>
            <Route path="/admin/pages/add">
              <AddPage />
            </Route>
            <Route path="/admin/tables/models" exact>
              <Models />
            </Route>
            <Route path="/admin/tables/sql_editors" exact>
              <SQLEditors />
            </Route>
            <Route path="/admin/tables/sql_editors/add">
              <SqlEditor />
            </Route>
            <Route path="/admin/tables/sql_editors/edit/:id">
              <SqlEditor />
            </Route>
            <Route path="/admin/tables/models/add">
              <EditModel />
            </Route>
            <Route path="/admin/tables/models/edit/:id" exact>
              <EditModel />
            </Route>
            <Route path="/admin/tables/models/:modelId/fields/add">
              <EditField />
            </Route>
            <Route path="/admin/tables/models/:modelId/fields/edit/:id">
              <EditField />
            </Route>
            <Route path="/admin/tables/models/:modelId/remote-fields/add">
              <EditField />
            </Route>
            <Route path="/admin/tables/models/:modelId/remote-fields/edit/:id">
              <EditField />
            </Route>
            <Route path="/admin/tables/models/:modelId/relations/add">
              <AddRelation />
            </Route>
            <Route path="/admin/tables/models/:modelId/relations/edit/:id">
              <AddRelation />
            </Route>
            <Route path="/admin/tables/models/:modelId/accessors/add">
              <AddAccessor />
            </Route>
            <Route path="/admin/tables/models/:modelId/accessors/edit/:id">
              <AddAccessor />
            </Route>
            <Route path="/admin/tables/models/:modelId/queries/add">
              <SQLBuilder />
            </Route>
            <Route path="/admin/tables/models/:modelId/queries/edit/:id">
              <SQLBuilder />
            </Route>
            <Route path="/admin/tables/data-sources/add">
              <AddDataSource />
            </Route>
            <Route path="/admin/tables/data-sources/edit/:id">
              <AddDataSource />
            </Route>
            <Route path="/admin/access/roles/add">
              <RolePage />
            </Route>
            <Route path="/admin/access/roles/edit/:id">
              <RolePage />
            </Route>
            <Route path="/admin/access/permissions/add">
              <PermissionPage />
            </Route>
            <Route path="/admin/access/permissions/edit/:id">
              <PermissionPage />
            </Route>
            <Route path="/admin/access">
              <AccessOptions />
            </Route>
            <Route path="/admin/model/:id">
              <ModelPage />
            </Route>
          </Switch>
        </Router>
        <AdminModal />
        <UserTopPanel />
        <AssetsBrowser />
      </div>
    );
  }
}

let _export;

const mapDispatchToProps = dispatch => {
  return {
    setUserData: user => dispatch(setUserData(user))
  }
};

Admin = connect(null, mapDispatchToProps)(Admin)
if (process.env.NODE_ENV === "production") {
  _export = Admin;
} else {
  _export = hot(module)(Admin);
}

export default _export;
