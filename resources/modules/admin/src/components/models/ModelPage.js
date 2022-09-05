import React, { Component } from "react";
import { Link, withRouter } from 'react-router-dom';
import Resource from "../../../../editor/src/js/classes/Resource";
import AdminTable from "../AdminTable";
import AdminModal2 from "../AdminModal2";
import ModelItemForm from "./ModelItemForm";

class ModelPage extends Component {
  state = {
    sorting: {},
    search: '',
    currentPage: 1,
    data: [],
    pageCount: 1,
    itemsPerPage: 20,
    isModalOpened: false,
    editingItem: null,
    fields: [],
    title: ''
  }

  componentDidMount() {
    this.getModelData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.getModelData();
    }
  }

  getModelData = async () => {
    const { id } = this.props.match.params;
    const { currentPage: page, search: s, itemsPerPage: pageSize, sorting } = this.state;
    const params = { page, s, pageSize, ...sorting };
    try {
      const {data, pageCount} = await new Resource({ route: '/admin/ajax/custom_models/' + id }).getQueried(params)
      const fields = await new Resource({ route: `/admin/ajax/models/${id}/fields` }).getAll()
      const {title} = await new Resource({ route: "/admin/ajax/models"}).get(id)
      this.setState(state => ({
        ...state,
        data,
        pageCount,
        fields,
        title
      }))
    } catch (error) {
      console.error(error)
    }
  }

  sortingHandler = (order_by, order) => {
    this.setState({ sorting: { order_by, order } }, this.getModelData);
  }

  editHandler = editingItem => {
    this.setState({ editingItem, isModalOpened: true })
  }

  searchModelData = e => {
    e.preventDefault();
    this.getModelData();
  }

  changeModalPage = (e) => {
    this.setState({ search: e.target.value })
  }

  render() {
    const { data, search, currentPage, pageCount, sorting, isModalOpened, editingItem, fields } = this.state;
    const { id } = this.props.match.params;

    return <div className="admin-pages admin-page">
      <div className="admin-heading">
        <div className="admin-breadcrumbs">
          <Link className="admin-breadcrumbs__link" to="/admin/pages">Model</Link>
          <span className="admin-breadcrumbs__separator">/</span>
          <span className="admin-breadcrumbs__current">{this.state.title}</span>
        </div>
      </div>
      <div className="admin-content">
        {Boolean(data.length) && <>
          <AdminTable
            columns={fields}
            quickActions={[
              {
                callBack: data => this.editHandler(data),
                title: 'Edit'
              },
              {
                tag: 'button',
                route: `/admin/ajax/custom_models/${id}/delete/:id`,
                method: 'delete',
                confirm: 'Are You Sure?',
                after: () => this.getModelData(),
                className: 'quick-action-menu__item_danger',
                title: 'Delete'
              }
            ]}
            rows={data}
            sortingHandler={this.sortingHandler}
            sortingField={sorting.order_by}

            searchTables={{
              submit: this.searchModelData,
              value: search,
              change: this.changeModalPage
            }}

            pageCount={pageCount || 1}
            currentPage={currentPage}
            changePage={currentPage => this.setState({ currentPage }, this.getModelData)}
            itemsCount={data.length}

            openPagination={true}
          />
        </>}

        <button style={{marginTop: 20}} onClick={() => this.setState({ isModalOpened: true })} className="btn btn_add">
          Add New
        </button>

        {isModalOpened && <AdminModal2 closeHandler={() => this.setState({ isModalOpened: false, editingItem: null })}>
          <ModelItemForm item={editingItem}
            submitHandler={() => this.setState({ isModalOpened: false, editingItem: null }, this.getModelData)}
            fields={fields.map(({ name }) => name).filter(item => item !== 'id')}
          />
        </AdminModal2>}
      </div>
    </div>
  }
}

export default withRouter(ModelPage);
