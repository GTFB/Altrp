import React, { Component } from 'react';
import 'react-tabs/style/react-tabs.scss';
import { withRouter } from 'react-router-dom';
import { DateTime } from 'luxon';

import AdminTable from './AdminTable';
import Resource from '../../../editor/src/js/classes/Resource';
import UserTopPanel from './UserTopPanel';

const columns = [
  {
    name: 'robotizer',
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

class CronEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      cronEvents: [],
      activeHeader: 0,
      cronEventsSearch: '',
      sorting: {},
      count: 1,
      pageCount: 1,
    };
    this.changePage = this.changePage.bind(this);
    this.cronEventsResource = new Resource({ route: '/admin/ajax/cron-events' });
    this.itemsPerPage = 20;
  }

  changePage(currentPage, pagination) {
    this.setState(state => ({ ...state, [pagination]: { ...state[pagination], currentPage } }));
  }

  async componentDidMount() {
    let url = new URL(location.href);
    let urlS = url.searchParams.get('s');
    let cronEvents = await this.cronEventsResource.getQueried({
      s: urlS === null ? this.state.cronEventsSearch : urlS,
      page: this.state.currentPage,
      pageSize: this.itemsPerPage,
    });

    this.setState(state => ({
      ...state,
      cronEventsSearch: urlS === null ? this.state.cronEventsSearch : urlS,
      cronEvents: cronEvents.cronEvents,
      count: cronEvents.count,
      pageCount: cronEvents.pageCount,
    }));

    window.addEventListener('scroll', this.listenScrollHeader);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.listenScrollHeader);
  }

  listenScrollHeader = () => {
    if (window.scrollY > 4 && this.state.activeHeader !== 1) {
      this.setState({
        activeHeader: 1
      });
    } else if (window.scrollY < 4 && this.state.activeHeader !== 0) {
      this.setState({
        activeHeader: 0
      });
    }
  }

  getCronEvents = async () => {
    let cronEvents = await this.cronEventsResource.getQueried({
      s: this.state.cronEventsSearch,
      ...this.state.sorting,
      page: this.state.currentPage,
      pageSize: this.itemsPerPage,
    });

    this.setState(state => ({
      ...state,
      cronEvents: cronEvents.cronEvents,
      count: cronEvents.count,
      pageCount: cronEvents.pageCount,
    }));
  }

  sortingHandler = (order_by, order) => {
    this.setState({ sorting: { order_by, order } }, this.getCronEvents);
  }

  searchCronEvents = (e) => {
    e.preventDefault();
    let url = new URL(location.href);
    if (this.state.cronEventsSearch) {
      url.searchParams.set('s', this.state.cronEventsSearch);
      this.props.history.push(`${url.pathname + url.search}`);
    } else {
      url.searchParams.delete('s');
      this.props.history.push(`${url.pathname + url.search}`);
    }
    this.getCronEvents();
  }

  changeCronEvents = (e) => {
    this.setState({ cronEventsSearch: e.target.value });
  }

  render() {
    const { cronEvents, cronEventsSearch, sorting, currentPage, count, pageCount } = this.state;

    let cronEventsMap = cronEvents.map(cronEvent => {
      const lastRun = DateTime.fromISO(cronEvent.last_run);
      const nextRun = DateTime.fromISO(cronEvent.next_run);
      const nextRunHumanText = nextRun
        .diff(DateTime.now())
        .toFormat("y 'years' M 'months' d 'days' h 'hours' m 'minutes' s 'seconds'")
        .replace(/((^1 year)s|( 1 month)s|( 1 day)s|( 1 hour)s|( 1 minute)s|( 1 second)s)/g, '$4')
        .replace(/(0 years |0 months |0 days |0 hours |0 minutes | 0 seconds)/g, '');

      const hasLastRun = lastRun.isValid;
      const hasNextRun = nextRun > DateTime.now();

      return {
        id: cronEvent.id,
        recurrence: cronEvent.recurrence,
        last_run: hasLastRun && lastRun.toFormat('yyyy-MM-dd hh:mm:ss'),
        next_run: hasNextRun && (
          <>
            <div>{nextRun.toFormat('yyyy-MM-dd hh:mm:ss')}</div>
            <div>{nextRunHumanText}</div>
          </>
        ),
        remain_count: cronEvent.remain_count,
        robotizer: cronEvent.customizer.title,
        editUrl: '/admin/customizers-editor?customizer_id=' + cronEvent.id,
      }
    });

    return (
      <div className="admin-settings admin-page">
        <div className={this.state.activeHeader ? 'admin-heading admin-heading-shadow' : 'admin-heading'}>
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
        <div className="admin-content">
          <AdminTable
            columns={columns}
            quickActions={[{
              tag: 'button',
              method: 'post',
              route: '/admin/ajax/cron-events/:id/run',
              title: 'Run Now',
            }, {
              tag: 'Link',
              props: {
                href: '/admin/cron-events/:id/logs'
              },
              title: 'Show Logs',
            }]}
            rows={cronEventsMap}
            sortingHandler={this.sortingHandler}
            sortingField={sorting.order_by}
            searchTables={{
              submit: this.searchCronEvents,
              value: cronEventsSearch,
              change: (e) => this.changeCronEvents(e),
            }}
            pageCount={pageCount}
            currentPage={currentPage}
            changePage={async (page) => {
              if (currentPage !== page) {
                await this.setState({ currentPage: page });
                await this.getSqlEditors();
              }
            }}
            itemsCount={count}
            openPagination={true}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(CronEvents);
