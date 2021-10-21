import React, { Component } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import 'react-tabs/style/react-tabs.scss';
import { Link } from 'react-router-dom'

import AdminTable from "./AdminTable";
import Resource from "../../../editor/src/js/classes/Resource";

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


export default class SQLEditors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sql_editorsPagination: initPaginationProps,
      sql_editors: [],
      sqlEditorSearch: '',
      sorting: {}
    };
    this.changePage = this.changePage.bind(this);
    this.sql_editorsResource = new Resource({ route: '/admin/ajax/sql_editors' });
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
    let sql_editors = await this.sql_editorsResource.getAll();
    sql_editors = sql_editors.sql_editors;
    this.setState(state => ({
      ...state,
      sql_editors
    }))
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
    this.getSqlEditors();
  }

  changeSQLEditors = (e) => {
    this.setState({ sqlEditorSearch: e.target.value })
  }

  render() {
    const { sql_editors, sql_editorsPagination, sqlEditorSearch, sorting } = this.state;
    return <div className="admin-settings admin-page">
      <div className="admin-heading">
        <div className="admin-breadcrumbs">
          <a className="admin-breadcrumbs__link" href="#">SQL Editors</a>
          <span className="admin-breadcrumbs__separator">/</span>
          <span className="admin-breadcrumbs__current">SQL Editors</span>
        </div>
        <Link className="btn" to={`/admin/tables/sql_editors/add`}>Add New</Link>
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
            title: 'Trash'
          }]}
          rows={sql_editors.map(sql_editor => ({
            ...sql_editor,
            editUrl: '/admin/tables/sql_editors/edit/' + sql_editor.id
          }))}
          sortingHandler={this.sortingHandler}
          sortingField={sorting.order_by}

          searchSQLEditors={{
            onSubmitSearchSQL: this.searchSqlEditors,
            valueSQL: sqlEditorSearch,
            onChangeSQL: (e) => this.changeSQLEditors(e),
            onClickSQL: this.getSqlEditors
          }}

          pageCount={sql_editorsPagination.pageCount}
          currentPage={sql_editorsPagination.currentPage}
          changePage={currentPage => this.changePage(currentPage, "sql_editorsPagination")}
          itemsCount={sql_editors.length}

          openPagination={true}
        />
      </div>
    </div>
  }
}
