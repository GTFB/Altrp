import React, {Component} from 'react';
import './sass/admin-style.scss';
import {hot} from "react-hot-loader";
import AdminLogo from './svgs/admin__logo.svg';
import AllPages from './components/AllPages';
import AdminSettings from './components/AdminSettings';
import AssetSvg from './svgs/assets.svg';
import BurgerSvg from './svgs/burger.svg';
import CloseBurgerSvg from './svgs/closeburger.svg';
import DashboardSvg from './svgs/dashboard.svg';
import PageSvg from './svgs/pages.svg';
import PluginSvg from './svgs/plugins.svg';
import ReportSvg from './svgs/reports.svg';
import SettingSvg from './svgs/settings.svg';
import TableSvg from './svgs/tables.svg';
import TemplateSvg from './svgs/templates.svg';
import UserSvg from './svgs/users.svg';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Users from "./components/Users";
import Assets from "./components/Assets";
import Dashboard from "./components/Dashboard";
import Plugins from "./components/Plugins";
import Reports from "./components/Reports";
import Tables from "./components/Tables";
import Templates from "./components/Templates";

class Admin extends Component {
  render() {
    return <div className="admin">
      <Router>
        <nav className="admin-nav">
          <div className="admin-nav-top">
            <AdminLogo/>
            <ul className="admin-nav-list">
            <Link to="/admin/dashboard">
              <li>
                <svg className="icon"><DashboardSvg/></svg>
                <p>Dashboard</p>
              </li>
            </Link>
            <Link to="/admin/assets">
              <li>
                <svg className="icon"><AssetSvg/></svg>
                <p>Assets</p>
              </li>
            </Link>
            <Link to="/admin/tables">
              <li>
                <svg className="icon"><TableSvg/></svg>
                <p>Tables</p>
              </li>
            </Link>
            <Link to="/admin/templates">
              <li>
                <svg className="icon"><TemplateSvg/></svg>
                <p>Templates</p>
              </li>
            </Link>
            <Link to="/admin/reports">
              <li>
                <svg className="icon"><ReportSvg/></svg>
                 <p>Reports</p>
              </li>
            </Link>
            <Link to="/admin/users">
              <li>
                <svg className="icon"><UserSvg/></svg>
                <p>Users</p>
              </li>
            </Link>
            <Link to="/admin/plugins">
              <li>
                <svg className="icon"><PluginSvg/></svg>
                <p>Plugins</p>
              </li>
            </Link>
            <Link to="/admin/settings">
              <li>
                <svg className="icon"><SettingSvg/></svg>
                <p>Settings</p>
              </li>
            </Link>
            </ul>
          </div>
        </nav>
        <div className="admin-content">
          <Switch>
            <Route path="/admin/pages">
              <AllPages/>
            </Route>
            <Route path="/admin/settings">
              <AdminSettings/>
            </Route>
            <Route path="/admin/users">
              <Users/>
            </Route>
            <Route path="/admin/assets">
              <Assets/>
            </Route>
            <Route path="/admin/dashboard">
              <Dashboard/>
            </Route>
            <Route path="/admin/plugins">
              <Plugins/>
            </Route>
            <Route path="/admin/reports">
              <Reports/>
            </Route>
            <Route path="/admin/tables">
              <Tables/>
            </Route>
            <Route path="/admin/templates">
              <Templates/>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>;
  }
}

let _export;
if (process.env.NODE_ENV === 'production') {
  _export = Admin;
} else {
  _export = hot(module)(Admin);
}

export default _export;
