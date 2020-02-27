import React , {Component} from 'react';
import './sass/admin-style.scss';
import {hot} from "react-hot-loader";
import AdminLogo from './svgs/admin__logo.svg';
import AllPages from './components/AllPages';
import AdminSettings from './components/AdminSettings';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class Admin extends Component{
  render(){
    return <div className="admin">
      <Router>
        <nav className="admin-nav">
          <div className="admin-nav-top">
            <AdminLogo/>
          </div>
          <ul className="admin-nav-list">
            <li>
              <Link to="/admin/pages">All Pages</Link>
            </li>
            <li>
              <Link to="/admin/settings">Settings</Link>
            </li>
          </ul>
        </nav>
        <div className="admin-content">
          <Switch>
            <Route path="/admin/pages">
              <AllPages/>
            </Route>
            <Route path="/admin/settings">
              <AdminSettings/>
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