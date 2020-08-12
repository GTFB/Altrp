import React, { Component } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import 'react-tabs/style/react-tabs.scss';
import { Link } from 'react-router-dom'

import AdminTable from "./AdminTable";
import Pagination from "./Pagination";
import Resource from "../../../editor/src/js/classes/Resource";

const columnsModel = [
  {
    name: 'name',
    //name: 'title', todo: сменить, когда будет title
    title: 'Title',
    url: true,
    editUrl: true,
    tag: 'Link'
  },
  // {
  //   name: 'name',
  //   title: 'Name'
  // },
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
      dataSources: [],
      modelsPageCount: 1,
      modelsCount: 0
    };
    this.switchTab = this.switchTab.bind(this);
    this.changePage = this.changePage.bind(this);
    this.modelsResource = new Resource({ route: '/admin/ajax/models' });
    this.itemsPerPage = 10;
  }

  switchTab(activeTab) {
    this.setState(state => ({ ...state, activeTab }))
  }

  changePage(currentPage, pagination) {
    this.setState(state => ({ ...state, [pagination]: { ...state[pagination], currentPage } }));
  }
  /**
   * Обновить список моделей
   */
  getModels = async () => {
    this.modelsResource.getQueried({
      page: this.state.modelsCurrentPage,
      pageSize: this.itemsPerPage,
      s: this.state.modelsSearch
    }).then(res => {
      this.setState(state => {
        return {
          ...state,
          models: res.models,
          modelsPageCount: res.pageCount
        }
      });
    });
  }

  // slicePage = (array, page, itemsPerPage) => {
  //   return array.slice(page * itemsPerPage - itemsPerPage, page * itemsPerPage);
  // }

  async componentDidMount() {
    // get: /admin/ajax/models .then(models => {
    //   this.setState({models});
    // });
    let models = await this.modelsResource.getAll();
    this.setState(state => ({
      ...state,
      modelsCount: models.length
    }))

    this.getModels();
  }

  render() {
    const { activeTab, models, dataSources, modelsCurrentPage, dataSourcesCurrentPage, modelsSearch, modelsPageCount, modelsCount } = this.state;

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
            <AdminTable
              columns={columnsModel}
              search={{
                value: modelsSearch,
                changeHandler: e => this.setState({ modelsSearch: e.target.value }, this.getModels)
              }}
              quickActions={[{
                tag: 'Link', props: {
                  href: '/admin/tables/models/edit/:id',
                },
                title: 'Edit'
              }, {
                tag: 'button',
                route: '/admin/ajax/models/:id',
                method: 'delete',
                confirm: 'Are You Sure?',
                after: () => this.getModels(),
                className: 'quick-action-menu__item_danger',
                title: 'Trash'
              }]}
              rows={models.map(model => ({
                ...model,
                editUrl: '/admin/tables/models/edit/' + model.id
              }))}
            />
            <Pagination pageCount={modelsPageCount}
              currentPage={modelsCurrentPage}
              changePage={modelsCurrentPage => this.setState({ modelsCurrentPage }, this.getModels)}
              itemsCount={models.length}
            />
          </TabPanel>
          <TabPanel>
            <AdminTable
              columns={columnsDataSource}
              rows={dataSources.map(dataSource => ({
                ...dataSource,
                type: dataSource.type.join(', '),
                editUrl: '/admin/data-source/edit/' + dataSource.id
              }))}
            />
            <Pagination pageCount={Math.ceil(dataSources.length / this.itemsPerPage)}
              currentPage={dataSourcesCurrentPage}
              changePage={dataSourcesCurrentPage => this.setState({ dataSourcesCurrentPage })}
              itemsCount={dataSources.length}
            />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  }
}
