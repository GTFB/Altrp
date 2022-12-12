import React, { useCallback, useEffect, useMemo, useState } from 'react';
import 'react-tabs/style/react-tabs.scss';
import { DateTime } from 'luxon';
import clsx from 'clsx';

import AdminTable from './AdminTable';
import Resource from '../../../editor/src/js/classes/Resource';
import UserTopPanel from './UserTopPanel';
import useQuery from '../js/hooks/useQuery';
import useWindowScroll from '../js/hooks/useWindowScroll';

const columns = [
  {
    name: 'title',
    title: 'Robotizer',
    url: true,
    editUrl: true,
    target: '_blank'
  },
  {
    name: 'last_run',
    title: 'Last runtime'
  },
  {
    name: 'next_run',
    title: 'Next runtime'
  },
  {
    name: 'remain_count',
    title: 'Number of Remaining'
  },
  {
    name: 'recurrence',
    title: 'Recurrence'
  }
];

const PARAMS = {
  PAGE: 'p',
  HEIGHT: 'h',
  ORDER_BY: 'ob',
  ORDER: 'o',
  SEARCH: 's'
};

const cronEventsResource = new Resource({ route: '/admin/ajax/cron-events' });

function CronEvents() {
  const [query, setQueryParam] = useQuery();
  const currentPage = useMemo(() => parseInt(query.get(PARAMS.PAGE) || '1'), [query]);
  const itemsPerPage = useMemo(() => parseInt(query.get(PARAMS.HEIGHT) || '20'), [query]);
  const orderBy = useMemo(() => query.get(PARAMS.ORDER_BY) || 'title', [query]);
  const order = useMemo(() => query.get(PARAMS.ORDER) || 'asc', [query]);
  const search = useMemo(() => query.get(PARAMS.SEARCH) || '', [query]);
  const [cronEvents, setCronEvents] = useState([]);
  const [activeHeader, setActiveHeader] = useState(false);
  const [count, setCount] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  const fetchResource = useCallback(async () => {
    const { data, count, pageCount } = await cronEventsResource.getQueried({
      s: search,
      page: currentPage,
      pageSize: itemsPerPage,
      order_by: orderBy,
      order
    });

    setCronEvents(data);
    setCount(count);
    setPageCount(pageCount);
  }, [search, currentPage, itemsPerPage, orderBy, order]);

  useWindowScroll(() => {
    setActiveHeader(window.scrollY > 4);
  });

  useEffect(() => {
    fetchResource();
  }, [orderBy, order]);

  const handleChangePage = currentPage => {
    setQueryParam(PARAMS.PAGE, currentPage);
  };

  const handleChangeSearch = event => {
    setQueryParam(PARAMS.SEARCH, event.target.value);
  };

  const handleSort = (orderBy, order) => {
    setQueryParam({ [PARAMS.ORDER_BY]: orderBy, [PARAMS.ORDER]: order });
  };

  const handleSearch = event => {
    event.preventDefault();
    fetchResource();
  };

  const cronEventsRows = useMemo(() => (
    cronEvents.map(cronEvent => {
      const settings = cronEvent && cronEvent.settings || {};
      const lastRun = DateTime.fromISO(settings.last_run);
      const nextRun = DateTime.fromISO(settings.next_run);
      const nextRunHumanText = nextRun
        .diff(DateTime.now())
        .toFormat("y 'years' M 'months' d 'days' h 'hours' m 'minutes' s 'seconds'")
        .replace(/((^1 year)s|( 1 month)s|( 1 day)s|( 1 hour)s|( 1 minute)s|( 1 second)s)/g, '$4')
        .replace(/(0 years |0 months |0 days |0 hours |0 minutes | 0 seconds)/g, '');
      const hasLastRun = lastRun.isValid;
      const hasNextRun = nextRun > DateTime.now();
      let recurrence = `Every ${settings.period} ${settings.period_unit}s`

      if (settings.period === 1) {
        recurrence = `Every ${settings.period_unit}`
      }

      return {
        id: cronEvent.id,
        recurrence: recurrence,
        last_run: hasLastRun && lastRun.toFormat('yyyy-MM-dd hh:mm:ss'),
        next_run: hasNextRun && (
          <>
            <div>{nextRun.toFormat('yyyy-MM-dd hh:mm:ss')}</div>
            <div>{nextRunHumanText}</div>
          </>
        ),
        remain_count: settings.repeat_count,
        title: cronEvent.title,
        editUrl: '/admin/customizers-editor?customizer_id=' + cronEvent.id,
      };
    })
  ), [cronEvents]);

  return (
    <div className="admin-settings admin-page">
      <div className={clsx('admin-heading', { 'admin-heading-shadow': activeHeader })}>
        <div className="admin-heading-left">
          <div className="admin-breadcrumbs">
            <span className="admin-breadcrumbs__current">Cron Events</span>
          </div>
          <div className="admin-filters">
            <span className="admin-filters__current">
              All ({count || '0'})
            </span>
          </div>
        </div>
        <UserTopPanel />
      </div>
      <div className='admin-content'>
        <AdminTable
          columns={columns}
          quickActions={[{
            tag: 'button',
            method: 'post',
            route: '/admin/ajax/cron-events/:id/run',
            title: 'Run Now',
            after: () => {
              alert('Success');
            },
            onError: error => {
              alert('Error: ' + (error.message || error.status));
            }
          }, {
            tag: 'Link',
            props: {
              href: '/admin/cron-events/:id/logs',
            },
            title: 'Show Logs',
          }, {
            tag: 'button',
            method: 'delete',
            route: '/admin/ajax/cron-delete-by-customizer-id/:id',
            className: 'quick-action-menu__item_danger',
            title: 'Delete All Logs',
          },]}
          rows={cronEventsRows}
          sortingHandler={handleSort}
          sortingField={orderBy}
          searchTables={{
            submit: handleSearch,
            value: search,
            change: handleChangeSearch,
          }}
          pageCount={pageCount}
          currentPage={currentPage}
          changePage={handleChangePage}
          itemsCount={count}
        />
      </div>
    </div>
  )
}

export default CronEvents;
