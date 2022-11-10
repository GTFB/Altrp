import React, {Component} from "react";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import 'react-tabs/style/react-tabs.scss';
import {Link, withRouter} from 'react-router-dom'
import AdminTable from "./AdminTable";
import Resource from "../../../editor/src/js/classes/Resource";
import UserTopPanel from "./UserTopPanel";
import {connect} from "react-redux";
import {compose} from "redux";
import {CSSTransition} from "react-transition-group";
import ArrowSidebar from "../svgs/akar-icons_arrow-down.svg";
import SidebarEditModel from "./models/SidebarEditModel";
import Scrollbars from "react-custom-scrollbars";

const columnsModel = [
  {
    name: 'title',
    title: 'Title',
    url: true,
    editUrl: true,
    tag: 'Link',
    button__table: true
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
      isActive: false,
      idModel: null
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
      ...this.state.dataSourcesSorting,
      page: this.state.currentPageDataSources,
      pageSize: this.itemsPerPage
    });
    this.setState(state => {
      return {
        ...state,
        dataSources: res.data_sources,
        dataSourcesCount: res.count,
        dataSourcesPageCount: res.pageCount
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
          modelsDidMount: res.models.filter(item => !this.props.standardModels.some(model => model.name === item.name)),
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
        ...this.state.modelsSorting,
        page: this.state.currentPageModels,
        pageSize: this.itemsPerPage,
      });
    } else {
        res = await this.modelsResource.getQueried({
        s: urlS === null ? this.state.modelsSearch : urlS,
        ...this.state.modelsSorting,
        page: this.state.currentPageModels,
        pageSize: this.itemsPerPage,
      });
    }
    this.props.updateModels()
    if (this.props.modelsState) {
      this.setState(state => {
        return {
          ...state,
          models: res.models,
          modelsSearch: urlS === null ? this.state.modelsSearch : urlS,
          modelsCount: res.count,
          modelsPageCount: res.pageCount,
          activeCategory: urlCategories === null ? 'All' : urlCategories,
        }
      });
    } else {
      this.setState(state => {
        return {
          ...state,
          models: res.models.filter(item => !this.props.standardModels.some(model => model.name === item.name)),
          modelsCount: res.count,
          modelsPageCount: res.pageCount,
          modelsSearch: urlS === null ? this.state.modelsSearch : urlS,
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
          models: models.filter(item => !this.props.standardModels.some(model => model.name === item.name)),
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
          models: models.filter(item => !this.props.standardModels.some(model => model.name === item.name)),
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
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.listenScrollHeader)
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

  closeSidebar = () => {
    this.setState(state => ({
      ...state,
      isActive: false,
      idModel: null
    }))
  }

  render() {
    const {
      activeTab,
      models,
      dataSources,
      modelsSearch,
      dataSourcesSearch,
      categoryOptions,
      modelsPageCount,
      modelsCount,
      dataSourcesCount,
      dataSourcesPageCount,
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
              All ({ activeTab === 0 ? modelsCount : dataSourcesCount || "0"})
            </span>
          </div>
        </div>
        <UserTopPanel/>
      </div>
      <div className="admin-content zeroing__styleTabs">
       <CSSTransition unmountOnExit in={this.state.isActive} timeout={500} classNames="sidebar-settings-model">
         <div className="admin-settings_model">
           <ArrowSidebar onClick={this.closeSidebar} className="admin-settings_model-arrow"/>
           <Scrollbars
             renderTrackVertical={({style}) => <div style={{...style, right: "4px", bottom: "2px", top: "2px", borderRadius: "3px"}}  className="track-vertical"/>}
             autoHide
             autoHideTimeout={500}
             autoHideDuration={200}
           >
             <div style={{padding: '0 20px 20px'}}>
               <SidebarEditModel closeSidebar={this.closeSidebar} updateModelsState={this.updateModels} id={this.state.idModel}/>
             </div>
           </Scrollbars>
         </div>
       </CSSTransition>
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
                // {
                //   tag: 'Link',
                //   props: {href: '/admin/tables/models/edit/:id'},
                //   title: 'Edit'
                // },
                {
                  tag: 'button',
                  route: '/admin/ajax/models/:id',
                  method: 'delete',
                  confirm: 'Are You Sure?',
                  // after: () => {
                  //   this.updateModels()
                  // },
                  callBack: async ({id}) => {
                    if (window.confirm("Are You Sure?")) {
                      await (new Resource({route: '/admin/ajax/models'}).delete(id))
                      this.updateModels()
                    }
                    if (id === this.state.idModel) this.closeSidebar()
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
              rows={modelsMap.map(model =>
                ({
                  ...model,
                  button__table: () => {
                    this.setState(state => ({
                      ...state,
                      isActive: true,
                      idModel: model.id
                    }))
                  }
                })
              )}
              sortingHandler={this.modelsSortingHandler}
              sortingField={modelsSorting.order_by}

              searchTables={{
                submit: this.searchModel,
                value: modelsSearch,
                change: this.changeModel
              }}

              pageCount={modelsPageCount || 1}
              currentPage={currentPageModels}
              changePage={async (page) => {
                if (currentPageModels !== page) {
                  await this.setState({currentPageModels: page})
                  await this.getModels()
                }
              }
              }
              itemsCount={modelsCount}
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
              rows={dataSourcesMap}
              sortingHandler={this.dataSourcesSortingHandler}
              sortingField={dataSourcesSorting.order_by}

              searchTables={{
                submit: this.searchDataSources,
                value: dataSourcesSearch,
                change: this.changeDataSource
              }}

              pageCount={dataSourcesPageCount}
              currentPage={currentPageDataSources}
              changePage={async (page) => {
                if (currentPageDataSources !== page) {
                  await this.setState({currentPageDataSources: page})
                  await this.getDataSources()
                }
              }}
              itemsCount={dataSourcesCount}
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
    modelsState: state.modelsState.toggleModels,
    standardModels: state.modelsState.standardModels
  }
}

Models = compose(
  connect(mapStateToProps),
  withRouter
)(Models)

export default Models;
