import React, {Component} from "react";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import 'react-tabs/style/react-tabs.scss';
import {Link, withRouter} from 'react-router-dom'

import AdminTable from "./AdminTable";
import Resource from "../../../editor/src/js/classes/Resource";
import UserTopPanel from "./UserTopPanel";
import {connect} from "react-redux";
import {filterCategories} from "../js/helpers";
import {compose} from "redux";

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
    name: 'categories',
    title: 'Categories'
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

class Models extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      activeHeader: 0,
      currentPageModels: 1,
      currentPageDataSources: 1,
      models: [],
      modelsDidMount: [],
      modelsSearch: '',
      modelsPageCount: 1,
      modelsCount: 0,
      modelsSorting: {},
      dataSources: [],
      dataSourcesSearch: '',
      dataSourcesPageCount: 1,
      dataSourcesCount: 0,
      dataSourcesSorting: {},
      categoryOptions: [],
      activeCategory: 'All',
    };
    this.switchTab = this.switchTab.bind(this);
    this.changePage = this.changePage.bind(this);
    this.modelsResource = new Resource({route: '/admin/ajax/models'});
    this.dataSourcesResource = new Resource({route: '/admin/ajax/data_sources'});
    this.categoryOptions = new Resource({route: "/admin/ajax/category/options"})
    this.itemsPerPage = 10;
  }

  switchTab(activeTab) {
    this.setState(state => ({...state, activeTab}))
  }

  changePage(currentPage, pagination) {
    this.setState(state => ({...state, [pagination]: {...state[pagination], currentPage}}));
  }

  /**
   * Обновить список источников данных
   */
  getDataSources = async () => {
    let res = await this.dataSourcesResource.getQueried({

      s: this.state.dataSourcesSearch,
      ...this.state.dataSourcesSorting
    });
    this.setState(state => {
      return {
        ...state,
        dataSources: res.data_sources,
      }
    });
  };

  updateModels = async () => {
    let res = await this.modelsResource.getAll();

    if (this.props.modelsState) {
      this.setState(state => {
        return {
          ...state,
          modelsDidMount: res.models,
        }
      });
    } else {
      this.setState(state => {
        return {
          ...state,
          modelsDidMount: res.models.filter(item => item.id >= 5),
        }
      });
    }
    await this.getModels()
  }

  /**
   * Обновить список моделей
   */
  getModels = async () => {
    let url = new URL(location.href);
    let urlCategories = url.searchParams.get('categories')
    let urlS = url.searchParams.get('s')
    let res = null
    if (urlCategories) {
      res = await this.modelsResource.getQueried({
        categories: urlCategories,
        s: urlS === null ? this.state.modelsSearch : urlS,
        ...this.state.modelsSorting
      });
    } else {
        res = await this.modelsResource.getQueried({
        s: urlS === null ? this.state.modelsSearch : urlS,
        ...this.state.modelsSorting
      });
    }
    this.props.updateModels()
    if (this.props.modelsState) {
      this.setState(state => {
        return {
          ...state,
          models: res.models,
          modelsSearch: urlS === null ? this.state.modelsSearch : urlS,
          modelsPageCount: res.pageCount,
          activeCategory: urlCategories === null ? 'All' : urlCategories
        }
      });
    } else {
      this.setState(state => {
        return {
          ...state,
          models: res.models.filter(item => item.id >= 5),
          modelsSearch: urlS === null ? this.state.modelsSearch : urlS,
          modelsPageCount: res.pageCount,
          activeCategory: urlCategories === null ? 'All' : urlCategories
        }
      });
    }
  };

  getCategory = async (guid, all) => {
    let url = new URL(location.href);
    let urlS = url.searchParams.get('s')
    // if (urlS) {
    //   url.searchParams.delete('s');
    //   this.props.history.push(`${url.pathname + url.search}`)
    //   this.setState(state => ({
    //     ...state,
    //     modelsSearch: ""
    //   }))
    // }
    if (guid) {
      url.searchParams.set('categories', guid);
      this.props.history.push(`${url.pathname + url.search}`)
      let {models} = await this.modelsResource.getQueried({
        categories: guid,
        s: urlS === null ? this.state.modelsSearch : urlS
      });

      if (this.props.modelsState) {
        this.setState(state => ({
          ...state,
          models: models,
          activeCategory: guid
        }))
      } else {
        this.setState(state => ({
          ...state,
          models: models.filter(item => item.id >= 5),
          activeCategory: guid
        }))
      }
    } else {
      url.searchParams.delete('categories');
      this.props.history.push(`${url.pathname + url.search}`)
      let {models} = await this.modelsResource.getQueried({
        s: urlS === null ? this.state.modelsSearch : urlS
      });
      if (this.props.modelsState) {
        this.setState(state => ({
          ...state,
          models: models,
          activeCategory: all
        }))
      } else {
        this.setState(state => ({
          ...state,
          models: models.filter(item => item.id >= 5),
          activeCategory: all
        }))
      }
    }
  }

  // slicePage = (array, page, itemsPerPage) => {
  //   return array.slice(page * itemsPerPage - itemsPerPage, page * itemsPerPage);
  // }

  async componentDidMount() {

    this.updateModels();
    this.getDataSources();


    let {data} = await this.categoryOptions.getAll();
    this.setState(state => ({
      ...state,
      categoryOptions: data
    }))

    window.addEventListener("scroll", this.listenScrollHeader)

    return () => {
      window.removeEventListener("scroll", this.listenScrollHeader)
    }
  }

  listenScrollHeader = () => {
    if (window.scrollY > 4 && this.state.activeHeader !== 1) {
      this.setState({
        activeHeader: 1
      })
    } else if (window.scrollY < 4 && this.state.activeHeader !== 0) {
      this.setState({
        activeHeader: 0
      })
    }
  }

  modelsSortingHandler = (order_by, order) => {
    this.setState({modelsSorting: {order_by, order}}, this.getModels);
  }

  dataSourcesSortingHandler = (order_by, order) => {
    this.setState({dataSourcesSorting: {order_by, order}}, this.getDataSources);
  }

  searchModel = e => {
    e.preventDefault();

    let url = new URL(location.href);
    if (this.state.modelsSearch) {
      url.searchParams.set('s', this.state.modelsSearch);
      this.props.history.push(`${url.pathname + url.search}`)
    } else {
      url.searchParams.delete('s');
      this.props.history.push(`${url.pathname + url.search}`)
    }
    this.getModels();
  }

  searchDataSources = e => {
    e.preventDefault();
    this.getDataSources();
  }

  changeModel = (e) => {
    this.setState({modelsSearch: e.target.value})
  }

  changeDataSource = (e) => {
    this.setState({dataSourcesSearch: e.target.value})
  }

  render() {
    const {
      activeTab,
      models,
      dataSources,
      modelsCurrentPage,
      modelsSearch,
      dataSourcesSearch,
      categoryOptions,
      modelsPageCount,
      modelsCount,
      dataSourcesCount,
      modelsSorting,
      dataSourcesSorting,
      currentPageDataSources,
      currentPageModels,
      modelsDidMount
    } = this.state;


    let dataSourcesMap = dataSources.map(dataSource => ({
      ...dataSource,
      editUrl: '/admin/tables/data-sources/edit/' + dataSource.id
    }))

    let modelsMap = models.map(model => {
      let categories = model.categories.map(item => {
        return item.category.title
      })
      categories = categories.join(', ')
      return {
        ...model,
        editUrl: '/admin/tables/models/edit/' + model.id,
        categories
      }
    })

    return <div className="admin-settings admin-page">
      <div className={this.state.activeHeader ? "admin-heading admin-heading-shadow" : "admin-heading"}>
        <div className="admin-heading-left">
          <div className="admin-breadcrumbs">
            <a className="admin-breadcrumbs__link" href="#">Tables</a>
            <span className="admin-breadcrumbs__separator">/</span>
            <span className="admin-breadcrumbs__current">{activeTab === 0 ? 'All Models' : 'All Data Sources'}</span>
          </div>
          <Link className="btn" to={`/admin/tables/${activeTab === 0 ? 'models' : 'data-sources'}/add`}>Add New</Link>
          <div className="admin-filters">
            <span className="admin-filters__current">
              All ({ activeTab === 0 ? this.state.models.length : this.state.dataSources.length || "0"})
            </span>
          </div>
        </div>
        <UserTopPanel/>
      </div>
      <div className="admin-content zeroing__styleTabs">
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
              quickActions={[
                {
                  tag: 'Link',
                  props: {href: '/admin/tables/models/edit/:id'},
                  title: 'Edit'
                },
                {
                  tag: 'button',
                  route: '/admin/ajax/models/:id',
                  method: 'delete',
                  confirm: 'Are You Sure?',
                  after: () => {
                    this.updateModels()
                  },
                  className: 'quick-action-menu__item_danger',
                  title: 'Delete'
                }
              ]}
              filterPropsCategories={{
                DidMountArray: modelsDidMount,
                categoryOptions: categoryOptions,
                getCategories: this.getCategory,
                activeCategory: this.state.activeCategory
              }}
              rows={modelsMap.slice(
                currentPageModels * this.itemsPerPage - this.itemsPerPage,
                currentPageModels * this.itemsPerPage
              )}
              sortingHandler={this.modelsSortingHandler}
              sortingField={modelsSorting.order_by}

              searchTables={{
                submit: this.searchModel,
                value: modelsSearch,
                change: this.changeModel
              }}

              pageCount={Math.ceil(modelsMap.length / this.itemsPerPage) || 1}
              currentPage={currentPageModels}
              changePage={page => {
                if (currentPageModels !== page) {
                  this.setState({currentPageModels: page});
                }
              }
              }
              itemsCount={modelsMap.length}
              openPagination={true}
            />
          </TabPanel>
          <TabPanel>
            <AdminTable
              columns={columnsDataSource}
              quickActions={[
                {
                  tag: 'Link',
                  props: {href: '/admin/tables/data-sources/edit/:id'},
                  title: 'Edit'
                },
                {
                  tag: 'button',
                  route: '/admin/ajax/data_sources/:id',
                  method: 'delete',
                  confirm: 'Are You Sure?',
                  after: () => {
                    this.getDataSources()
                  },
                  className: 'quick-action-menu__item_danger',
                  title: 'Delete'
                }
              ]}
              rows={dataSourcesMap.slice(
                currentPageDataSources * this.itemsPerPage - this.itemsPerPage,
                currentPageDataSources * this.itemsPerPage
              )}
              sortingHandler={this.dataSourcesSortingHandler}
              sortingField={dataSourcesSorting.order_by}

              searchTables={{
                submit: this.searchDataSources,
                value: dataSourcesSearch,
                change: this.changeDataSource
              }}

              pageCount={Math.ceil(dataSourcesMap.length / this.itemsPerPage) || 1}
              currentPage={currentPageDataSources}
              changePage={page => {
                if (currentPageDataSources !== page) {
                  this.setState({currentPageDataSources: page});
                }
              }}
              itemsCount={dataSourcesMap.length}
              openPagination={true}
            />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  }
}

const mapStateToProps = (state) => {
  return {
    modelsState: state.modelsState.toggleModels
  }
}

Models = compose(
  connect(mapStateToProps),
  withRouter
)(Models)

export default Models;
