import React, { Component } from 'react';
import 'react-tabs/style/react-tabs.scss';
import axios from 'axios';
import { withRouter, Link } from 'react-router-dom';
import { DateTime } from 'luxon';

import Search from './../svgs/search.svg';
import {InputGroup} from '@blueprintjs/core';
import UserTopPanel from './UserTopPanel';

class LogPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cron_event:{},
      id: 0
    };
  }
 
  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    let res = await axios.get(`/admin/ajax/cron_events/${id}/logs`);
    this.setState({cron_event: res.data, id});

    window.addEventListener('scroll', this.listenScrollHeader);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.listenScrollHeader);
  }

  handleDeleteLog = async () =>  {
    const { id } = this.state;
    let res = await axios.delete(`/admin/ajax/cron_events/${id}/logs`);
    this.setState({cron_event: res.data });
  }

  render() {
    const {cron_event} = this.state;

    return <div className="admin-settings admin-page">
      <div className="admin-heading admin-heading-shadow">
       <div className="admin-heading-left">
         <div className="admin-breadcrumbs">
           <Link to="/admin/customizers/cron_events">Cron Events</Link>
           <span className="admin-breadcrumbs__separator">/</span>
           <span className="admin-breadcrumbs__current">Logs</span>
         </div>
       </div>
        <UserTopPanel />
      </div>
      <div className="admin-content">
        <div className="admin-table">
          <div className="admin-table-top admin-table-top__flex">
            <form className="admin-table-top__form">
              <InputGroup className="form-tables" />
              <Search className="admin-table__search-icon-svg" />
              <button className="btn btn_bare admin-users-button btn__tables">Search</button>
            </form>
          </div>
        </div>
        <div className="date-label pt-3">
          <h6>
            {cron_event.last_run && new DateTime(cron_event.last_run).toFormat('yyyy-MM-dd hh:mm:ss')}
          </h6>
          <div className="admin-table__delete-icon" onClick={this.handleDeleteLog}>
            Delete
          </div>
        </div>
          <div className="form-group">
            <textarea id="field-options"
              value={cron_event.log}
              readOnly
              className="form-control"
            />
          </div>
      </div>
    </div>
  };
}

export default withRouter(LogPage);
