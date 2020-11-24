import React, { Component } from "react";
import { Link, withRouter } from 'react-router-dom';

import Resource from "../../../../editor/src/js/classes/Resource";
// import AltrpSelect from "./altrp-select/AltrpSelect";
import AdminTable from "../AdminTable";
import Pagination from "../Pagination";
// import AdminModal2 from "../AdminModal2";
// import PageDataSourceForm from "../pages/PageDataSourceForm";
// import { titleToPath } from "../../js/helpers";

class ModelPage extends Component {
  state = {
    //   page: {},
    //   value: {},
    //   redirectAfterSave: false,
    //   templates: [],
    //   models: [],
    //   isModalOpened: false,
    //   dataSources: [],
    //   editingDataSource: null,
    //   pagesOptions: []
    // };
    sorting: {},
    search: '',
    currentPage: 1,
    data: [],
    pageCount: 1,
    itemsPerPage: 20
  }

  componentDidMount() {
    this.getModelData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.getModelData();
    }
  }

  getModelData = () => {
    const { id } = this.props.match.params;
    const { currentPage: page, search: s, itemsPerPage: pageSize, sorting } = this.state;
    const params = { page, s, pageSize, ...sorting };

    new Resource({ route: '/admin/ajax/custom_models/' + id }).getQueried(params)
      .then(({ data, pageCount }) => this.setState({ data, pageCount }))
      .catch(error => console.log(error));
  }

  sortingHandler = (order_by, order) => {
    this.setState({ sorting: { order_by, order } }, this.getModelData);
  }

  editHandler = data => {
    console.log(data);
    // this.setState({ data, isModalOpened: true })
  }

  render() {
    const { data, search, currentPage, pageCount, sorting } = this.state;

    return <div className="admin-pages admin-page">
      <div className="admin-heading">
        <div className="admin-breadcrumbs">
          <Link className="admin-breadcrumbs__link" to="/admin/pages">Model</Link>
          <span className="admin-breadcrumbs__separator">/</span>
          <span className="admin-breadcrumbs__current">{this.props.match.params.id}</span>
        </div>
      </div>
      <div className="admin-content">
        <div className="admin-panel py-2">
          <input className="input-sm mr-2" value={search} onChange={e => this.setState({ search: e.target.value })} />
          <button type="button" onClick={this.getModelData} className="btn btn_bare admin-users-button">Search</button>
        </div>
        {Boolean(data.length) && <>
          <AdminTable
            columns={Object.keys(data[0]).map(item => ({ name: item, title: item }))}
            quickActions={[
              {
                callBack: data => this.editHandler(data),
                title: 'Edit'
              },
              // {
              //   tag: 'button',
              //   route: `/admin/ajax/page_data_sources/:id`,
              //   method: 'delete',
              //   confirm: 'Are You Sure?',
              //   after: () => this.getDataSources(),
              //   className: 'quick-action-menu__item_danger',
              //   title: 'Trash'
              // }
            ]}
            rows={data}
            sortingHandler={this.sortingHandler}
            sortingField={sorting.order_by}
          />
          <Pagination pageCount={pageCount || 1}
            currentPage={currentPage}
            changePage={currentPage => this.setState({ currentPage }, this.getModelData)}
            // itemsCount={dataSourcesCount}
          />
        </>}

        {/* {this.props.match.params.id &&
          <button onClick={() => this.setState({ isModalOpened: true })} className="btn btn_add">
            Add Data Source
          </button>} */}

        {/* {isModalOpened && <AdminModal2 closeHandler={() => this.setState({ isModalOpened: false, editingDataSource: null })}>
          <PageDataSourceForm updateHandler={this.getDataSources} dataSource={editingDataSource} />
        </AdminModal2>} */}
      </div>
    </div>
  }
}

export default withRouter(ModelPage);
