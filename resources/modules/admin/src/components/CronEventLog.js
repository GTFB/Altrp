import React, { Component } from 'react';
import 'react-tabs/style/react-tabs.scss';
import axios from 'axios';
import { withRouter, Link } from 'react-router-dom';
import { DateTime } from 'luxon';
import { InputGroup } from '@blueprintjs/core';

import Search from './../svgs/search.svg';
import UserTopPanel from './UserTopPanel';

class CronEventLog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cronEvent: {},
      searchResult: '',
      searchString: '',
      id: 0
    };
  }
 
  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    let res = await axios.get(`/admin/ajax/cron-events/${id}/logs`);
    this.setState({ cronEvent: res.data, id });

    window.addEventListener('scroll', this.listenScrollHeader);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.listenScrollHeader);
  }

  handleDeleteLog = async () =>  {
    const { id } = this.state;
    let res = await axios.delete(`/admin/ajax/cron-events/${id}/logs`);
    this.setState({ cronEvent: res.data });
  }

  handleSearch = event => {
    event.preventDefault();

    const { cronEvent: { log }, searchString } = this.state;

    if (!searchString) {
      this.setState({
        searchResult: ''
      });

      return;
    }

    if (log) {
      const searchResult = log
        .split(/-{3,}/g)
        .filter(logItem => logItem.indexOf(searchString) >= 0)
        .join('--------------------------------------');

      this.setState({
        searchResult
      });
    }
  }

  handleSearchStringChanged = event => {
    this.setState({
      searchString: event.target.value
    });
  }

  render() {
    const { cronEvent, searchResult, searchString } = this.state;

    return <div className="admin-settings admin-page">
      <div className="admin-heading admin-heading-shadow">
        <div className="admin-heading-left">
          <div className="admin-breadcrumbs">
            <Link to="/admin/customizers/cronEvents">Cron Events</Link>
            <span className="admin-breadcrumbs__separator">/</span>
            <span className="admin-breadcrumbs__current">Logs</span>
          </div>
        </div>
        <UserTopPanel />
      </div>
      <div className="admin-content">
        <div className="admin-table">
          <div className="admin-table-top admin-table-top__flex">
            <form className="admin-table-top__form" onSubmit={this.handleSearch}>
              <InputGroup
                className="form-tables"
                onChange={this.handleSearchStringChanged}
                value={searchString}
              />
              <Search className="admin-table__search-icon-svg" />
              <button className="btn btn_bare admin-users-button btn__tables">Search</button>
            </form>
          </div>
        </div>
        <div className="date-label pt-3">
          <h6>
            {cronEvent.last_run && new DateTime(cronEvent.last_run).toFormat('yyyy-MM-dd hh:mm:ss')}
          </h6>
          <div className="admin-table__delete-icon" onClick={this.handleDeleteLog}>
            Delete
          </div>
        </div>
        <div className="form-group">
          <textarea id="field-options"
            value={searchResult || cronEvent.log}
            readOnly
            className="form-control"
            rows={10}
          />
        </div>
      </div>
    </div>
  };
}

export default withRouter(CronEventLog);
