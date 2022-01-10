import React, { Component } from "react";
import 'react-tabs/style/react-tabs.scss';
import { Link, withRouter } from 'react-router-dom'

import AdminTable from "./AdminTable";
import Resource from "../../../editor/src/js/classes/Resource";
import UserTopPanel from "./UserTopPanel";

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
  },
  {
    name: 'categories',
    title: 'Categories'
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
const initPaginationProps = {
  pageCount: 1,
  currentPage: 1,
};


class SQLEditors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      sql_editors: [],
      activeHeader: 0,
      sqlEditorSearch: '',
      sorting: {}
    };
    this.changePage = this.changePage.bind(this);
    this.sql_editorsResource = new Resource({ route: '/admin/ajax/sql_editors' });
    this.itemsPerPage = 20;
  }

  changePage(currentPage, pagination) {
    this.setState(state => ({ ...state, [pagination]: { ...state[pagination], currentPage } }));
  }

  /**
   * Обновить список Sql-редакторов
   */
  updateSqlEditors() {

  }

  async componentDidMount() {
    let url = new URL(location.href);
    let urlS = url.searchParams.get('s')
    let sql_editors = await this.sql_editorsResource.getQueried({
      s: urlS === null ? this.state.sqlEditorSearch : urlS
    });
    sql_editors = sql_editors.sql_editors;
    this.setState(state => ({
      ...state,
      sqlEditorSearch: urlS === null ? this.state.sqlEditorSearch : urlS,
      sql_editors
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

  getSqlEditors = async () => {
    let sql_editors = await this.sql_editorsResource.getQueried({ s: this.state.sqlEditorSearch, ...this.state.sorting});
    sql_editors = sql_editors.sql_editors;
    this.setState(state => ({
      ...state,
      sql_editors,
    }))
  }

  sortingHandler = (order_by, order) => {
    this.setState({ sorting: { order_by, order } }, this.getSqlEditors);
  }

  searchSqlEditors = (e) => {
    e.preventDefault();
    let url = new URL(location.href);
    if (this.state.sqlEditorSearch) {
      url.searchParams.set('s', this.state.sqlEditorSearch);
      this.props.history.push(`${url.pathname + url.search}`)
    } else {
      url.searchParams.delete('s');
      this.props.history.push(`${url.pathname + url.search}`)
    }
    this.getSqlEditors();
  }

  changeSQLEditors = (e) => {
    this.setState({ sqlEditorSearch: e.target.value })
  }

  render() {
    const { sql_editors, sql_editorsPagination, sqlEditorSearch, sorting, currentPage } = this.state;

    let sql_editorsMap = sql_editors.map(sql_editor => ({
      ...sql_editor,
      editUrl: '/admin/tables/sql_editors/edit/' + sql_editor.id
    }))

    return <div className="admin-settings admin-page">
      <div className={this.state.activeHeader ? "admin-heading admin-heading-shadow" : "admin-heading"}>
       <div className="admin-heading-left">
         <div className="admin-breadcrumbs">
           <a className="admin-breadcrumbs__link" href="#">SQL Queries</a>
           <span className="admin-breadcrumbs__separator">/</span>
           <span className="admin-breadcrumbs__current">SQL Queries</span>
         </div>
         <Link className="btn" to={`/admin/tables/sql_editors/add`}>Add New</Link>
         <div className="admin-filters">
            <span className="admin-filters__current">
              All ({this.state.sql_editors.length || "0"})
            </span>
         </div>
       </div>
        <UserTopPanel />
      </div>
      <div className="admin-content">
        <AdminTable
          columns={columns}
          quickActions={[{
            tag: 'Link', props: {
              href: '/admin/tables/sql_editors/edit/:id',
            },
            title: 'Edit'
          }, {
            tag: 'button',
            route: '/admin/ajax/sql_editors/:id',
            method: 'delete',
            confirm: 'Are You Sure?',
            after: () => { this.getSqlEditors() },
            className: 'quick-action-menu__item_danger',
            title: 'Delete'
          }]}
          rows={sql_editorsMap.slice(
            currentPage * this.itemsPerPage - this.itemsPerPage,
            currentPage * this.itemsPerPage
          )}
          sortingHandler={this.sortingHandler}
          sortingField={sorting.order_by}

          searchTables={{
            submit: this.searchSqlEditors,
            value: sqlEditorSearch,
            change: (e) => this.changeSQLEditors(e),
          }}

          pageCount={Math.ceil(sql_editorsMap.length / this.itemsPerPage) || 1}
          currentPage={currentPage}
          changePage={page => {
            if (currentPage !== page) {
              this.setState({ currentPage: page });
            }
          }}
          itemsCount={sql_editorsMap.length}

          openPagination={true}
        />
      </div>
    </div>
  }
}

export default withRouter(SQLEditors)
