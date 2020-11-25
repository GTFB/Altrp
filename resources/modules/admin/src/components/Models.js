import React, { Component } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import 'react-tabs/style/react-tabs.scss';
import { Link } from 'react-router-dom'

import AdminTable from "./AdminTable";
import Pagination from "./Pagination";
import Resource from "../../../editor/src/js/classes/Resource";

const columnsModel = [
  {
    name: 'title',
    title: 'Title',
    url: true,
    editUrl: true,
    tag: 'Link'
  },
  {
    name: 'name',
    title: 'Name'
  },
  {
    name: 'description',
    title: 'Description'
  },
  {
    name: 'updated_at',
    title: 'Updated At'
  }
];
const columnsDataSource = [
  {
    name: 'name',
    title: 'Name',
    url: true,
    editUrl: true,
    tag: 'Link'
  },
  {
    name: 'model.title',
    title: 'Model'
  },
  {
    name: 'route',
    title: 'Route'
  },
  {
    name: 'type',
    title: 'Type'
  }
];

export default class Models extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      modelsCurrentPage: 1,
      dataSourcesCurrentPage: 1,
      models: [],
      modelsSearch: '',
      modelsPageCount: 1,
      modelsCount: 0,
      modelsSorting: {},
      dataSources: [],
      dataSourcesSearch: '',
      dataSourcesPageCount: 1,
      dataSourcesCount: 0,
      dataSourcesSorting: {}
    };
    this.switchTab = this.switchTab.bind(this);
    this.changePage = this.changePage.bind(this);
    this.modelsResource = new Resource({ route: '/admin/ajax/models' });
    this.dataSourcesResource = new Resource({ route: '/admin/ajax/data_sources' });
    this.itemsPerPage = 10;
  }

  switchTab(activeTab) {
    this.setState(state => ({ ...state, activeTab }))
  }

  changePage(currentPage, pagination) {
    this.setState(state => ({ ...state, [pagination]: { ...state[pagination], currentPage } }));
  }

  /**
   * Обновить список источников данных
   */
  getDataSources = async () => {
    let res = await this.dataSourcesResource.getQueried({
      page: this.state.dataSourcesCurrentPage,
      pageSize: this.itemsPerPage,
      preset: false,
      s: this.state.dataSourcesSearch,
      ...this.state.dataSourcesSorting
    });
    this.setState(state => {
      return {
        ...state,
        dataSources: res.data_sources,
        dataSourcesPageCount: res.pageCount || 1
      }
    });
  };

  /**
   * Обновить список моделей
   */
  getModels = async () => {
    let res = await this.modelsResource.getQueried({
      page: this.state.modelsCurrentPage,
      pageSize: this.itemsPerPage,
      preset: false,
      s: this.state.modelsSearch,
      ...this.state.modelsSorting
    });
    this.setState(state => {
      return {
        ...state,
        models: res.models,
        modelsPageCount: res.pageCount
      }
    });
  };

  // slicePage = (array, page, itemsPerPage) => {
  //   return array.slice(page * itemsPerPage - itemsPerPage, page * itemsPerPage);
  // }

  async componentDidMount() {
    // get: /admin/ajax/models .then(models => {
    //   this.setState({models});
    // });
    // let models = await this.modelsResource.getAll();
    // this.setState(state => ({
    //   ...state,
    //   modelsCount: models.models.length
    // }));

    // let data_sources = await this.dataSourcesResource.getAll();
    // this.setState(state => ({
    //   ...state,
    //   dataSourcesCount: data_sources.data_sources.length
    // }));

    this.getModels();
    this.getDataSources();
  }

  modelsSortingHandler = (order_by, order) => {
    this.setState({ modelsSorting: { order_by, order } }, this.getModels);
  }

  dataSourcesSortingHandler = (order_by, order) => {
    this.setState({ dataSourcesSorting: { order_by, order } }, this.getDataSources);
  }

  searchModel = e => {
    e.preventDefault();
    this.getModels();
  }

  searchDataSources = e => {
    e.preventDefault();
    this.getDataSources();
  }

  render() {
    const { activeTab, models, dataSources, modelsCurrentPage, dataSourcesCurrentPage, modelsSearch, dataSourcesSearch,
      modelsPageCount, dataSourcesPageCount, modelsCount, dataSourcesCount, modelsSorting, dataSourcesSorting } = this.state;

    return <div className="admin-settings admin-page">
      <div className="admin-heading">
        <div className="admin-breadcrumbs">
          <a className="admin-breadcrumbs__link" href="#">Tables</a>
          <span className="admin-breadcrumbs__separator">/</span>
          <span className="admin-breadcrumbs__current">{activeTab === 0 ? 'All Models' : 'All Data Sources'}</span>
        </div>
        <Link className="btn" to={`/admin/tables/${activeTab === 0 ? 'models' : 'data-sources'}/add`}>Add New</Link>
      </div>
      <div className="admin-content">
        <Tabs selectedIndex={activeTab} onSelect={this.switchTab}>
          <TabList className="nav nav-pills admin-pills">
            <Tab>
              Models
            </Tab>
            <Tab>
              Data Sources
            </Tab>
          </TabList>
          <TabPanel>
            <form className="admin-panel py-2" onSubmit={this.searchModel}>
              <input className="input-sm mr-2" value={modelsSearch} onChange={e => this.setState({ modelsSearch: e.target.value })} />
              <button className="btn btn_bare admin-users-button">Search</button>
            </form>
            <AdminTable
              columns={columnsModel}
              quickActions={[
                {
                  tag: 'Link',
                  props: { href: '/admin/tables/models/edit/:id' },
                  title: 'Edit'
                },
                {
                  tag: 'button',
                  route: '/admin/ajax/models/:id',
                  method: 'delete',
                  confirm: 'Are You Sure?',
                  after: () => { this.getModels() },
                  className: 'quick-action-menu__item_danger',
                  title: 'Trash'
                }
              ]}
              rows={models.map(model => ({
                ...model,
                editUrl: '/admin/tables/models/edit/' + model.id
              }))}
              sortingHandler={this.modelsSortingHandler}
              sortingField={modelsSorting.order_by}
            />
            <Pagination pageCount={modelsPageCount || 1}
              currentPage={modelsCurrentPage || 1}
              changePage={modelsCurrentPage => {
                if (this.state.modelsCurrentPage !== modelsCurrentPage) {
                  this.setState({ modelsCurrentPage }, this.getModels)
                }
              }
              }
              itemsCount={modelsCount}
            />
          </TabPanel>
          <TabPanel>
            <form className="admin-panel py-2" onSubmit={this.searchDataSources}>
              <input className="input-sm mr-2" value={dataSourcesSearch} onChange={e => this.setState({ dataSourcesSearch: e.target.value })} />
              <button className="btn btn_bare admin-users-button">Search</button>
            </form>
            <AdminTable
              columns={columnsDataSource}
              quickActions={[
                {
                  tag: 'Link',
                  props: { href: '/admin/tables/data-sources/edit/:id' },
                  title: 'Edit'
                },
                {
                  tag: 'button',
                  route: '/admin/ajax/data_sources/:id',
                  method: 'delete',
                  confirm: 'Are You Sure?',
                  after: () => { this.getDataSources() },
                  className: 'quick-action-menu__item_danger',
                  title: 'Trash'
                }
              ]}
              rows={dataSources.map(dataSource => ({
                ...dataSource,
                editUrl: '/admin/tables/data-sources/edit/' + dataSource.id
              }))}
              sortingHandler={this.dataSourcesSortingHandler}
              sortingField={dataSourcesSorting.order_by}
            />
            <Pagination pageCount={dataSourcesPageCount}
              currentPage={dataSourcesCurrentPage}
              changePage={dataSourcesCurrentPage => this.setState({ dataSourcesCurrentPage }, this.getDataSources)}
              itemsCount={dataSourcesCount}
            />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  }
}
