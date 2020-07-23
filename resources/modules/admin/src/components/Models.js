import React, { Component } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import 'react-tabs/style/react-tabs.scss';
import { Link } from 'react-router-dom'

// import ModelsTable from "./models/ModelsTable";
import AdminTable from "./AdminTable";
import Pagination from "./Pagination";

const columns = [
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
  }, {
    name: 'updatedAt',
    title: 'Updated At'
  }
];

export default class Models extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      pageCount: 1,
      currentPage: 1,
      // models: [],   TODO: заменить замоканые данные
      models: [
        {
          id: 1,
          name: 'test1',
          title: 'Test1',
          description: 'test1'
        },
        {
          id: 2,
          name: 'test2',
          title: 'Test2',
          description: 'test2'
        },
        {
          id: 3,
          name: 'test3',
          title: 'Test3',
          description: 'test3'
        },
      ]
    };
    this.switchTab = this.switchTab.bind(this);
    this.changePage = this.changePage.bind(this);
  }

  switchTab(activeTab) {
    this.setState(state => ({ ...state, activeTab }))
  }

  changePage(currentPage) {
    this.setState(state => ({ ...state, currentPage }));
  }

  componentDidMount() {
    // get: /admin/ajax/models .then(models => {
    //   this.setState({models});
    // });
  }

  render() {
    const { activeTab, models, pageCount, currentPage } = this.state;

    return <div className="admin-settings admin-page">
      <div className="admin-heading">
        <div className="admin-breadcrumbs">
          <a className="admin-breadcrumbs__link" href="#">Tables</a>
          <span className="admin-breadcrumbs__separator">/</span>
          <span className="admin-breadcrumbs__current">{activeTab === 0 ? 'All Models' : 'All Data Sources'}</span>
        </div>
        <Link className="btn" to={`/admin/${activeTab === 0 ? 'models' : 'data-sources'}/add`}>Add New</Link>
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
            {/* <ModelsTable /> */}
            {/* TODO: что делать с колoнкой с чекбоксами? */}
            <AdminTable 
              columns={columns} 
              rows={models.map(model => ({ ...model, editUrl: '/admin/models/edit/' + model.id}))} 
            />
            <Pagination pageCount={pageCount}
              currentPage={currentPage}
              changePage={this.changePage}
              itemsCount={models.length}
            />
          </TabPanel>
          <TabPanel>
            <div>Data Sources</div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  }
}
