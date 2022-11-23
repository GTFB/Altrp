import React, { useEffect, useCallback, useMemo, useState } from 'react';
import 'react-tabs/style/react-tabs.scss';
import axios from 'axios';
import clsx from 'clsx';
import { Link, useParams } from 'react-router-dom';
import { DateTime } from 'luxon';
import { InputGroup } from '@blueprintjs/core';

import Search from './../svgs/search.svg';
import UserTopPanel from './UserTopPanel';
import useQuery from '../js/hooks/useQuery';
import useWindowScroll from '../js/hooks/useWindowScroll';

const PARAMS = {
  SEARCH: 's'
};

function CronEventLog() {
  const { id } = useParams();
  const [query, setQueryParam] = useQuery();
  const search = useMemo(() => query.get(PARAMS.SEARCH) || '', [query]);
  const [logs, setLogs] = useState([]);
  const [searchString, setSearchString] = useState('');
  const [activeHeader, setActiveHeader] = useState(false);
  const filteredLogs = useMemo(() => (
    logs
      .filter(log => log.log.indexOf(search) >= 0)
      .map(log => ({ ...log, log: log.log.split('\n') }))
  ), [logs, search]);

  const fetchLogs = useCallback(async () => {
    try {
      const { data } = await axios.get(`/admin/ajax/crons?customizer=${id}`);
      setLogs(data);
    } catch (error) {
      alert('Error: ' + error.message);
    }
  }, [id]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  useWindowScroll(() => {
    setActiveHeader(window.scrollY > 4);
  });

  const handleDeleteLog = logId => async () => {
    try {
      await axios.delete(`/admin/ajax/crons/${logId}`);
      fetchLogs();
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const handleSearch = event => {
    event.preventDefault();
    setQueryParam(PARAMS.SEARCH, searchString);
  };

  const handleChangeSearchString = event => {
    setSearchString(event.target.value);
  };

  return (
    <div className="admin-settings admin-page">
      <div className={clsx('admin-heading', { 'admin-heading-shadow': activeHeader })}>
        <div className="admin-heading-left">
          <div className="admin-breadcrumbs">
            <Link to="/admin/customizers/cron-events">Cron Events</Link>
            <span className="admin-breadcrumbs__separator">/</span>
            <span className="admin-breadcrumbs__current">Logs</span>
          </div>
        </div>
        <UserTopPanel />
      </div>
      <div className="admin-content">
        <div className="admin-table">
          <div className="admin-table-top admin-table-top__flex">
            <form className="admin-table-top__form" onSubmit={handleSearch}>
              <InputGroup
                className="form-tables"
                onChange={handleChangeSearchString}
                value={searchString}
              />
              <Search className="admin-table__search-icon-svg" />
              <button className="btn btn_bare admin-users-button btn__tables">Search</button>
            </form>
          </div>
        </div>
        <ul>
          {filteredLogs.map(log => (
            <li key={log.id}>
              <div className="date-label pt-3">
                <h6>
                  {log.created_at && DateTime.fromISO(log.created_at).toFormat('yyyy-MM-dd hh:mm:ss')}
                </h6>
                <div className="admin-table__delete-icon" onClick={handleDeleteLog(log.id)}>
                  Delete
                </div>
              </div>
              <div className="cron-log">
                {log.log.map((logParagraph, index) => (
                  <p key={index}>{logParagraph}</p>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CronEventLog;
