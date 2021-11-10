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
    fields: []
  }

  componentDidMount() {
    this.getModelData();
    new Resource({ route: `/admin/ajax/models/${this.props.match.params.id}/fields` }).getAll()
      .then(fields => this.setState({ fields }))
      .catch(error => console.log(error));
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
          <span className="admin-breadcrumbs__current">{this.props.location.propsSearch}</span>
        </div>
      </div>
      <div className="admin-content">
        <form className="admin-panel py-2" onSubmit={this.searchModelData}>
          <input className="input-sm mr-2" value={search} onChange={e => this.setState({ search: e.target.value })} />
          <button className="btn btn_bare admin-users-button">Search</button>
        </form>
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
                title: 'Trash'
              }
            ]}
            rows={data}
            sortingHandler={this.sortingHandler}
            sortingField={sorting.order_by}

            searchModalPage={{
              onSubmitModelPage: this.searchModelData,
              valueModelPage: search,
              onChangeModalPage: this.changeModalPage
            }}

            pageCount={pageCount || 1}
            currentPage={currentPage}
            changePage={currentPage => this.setState({ currentPage }, this.getModelData)}
            itemsCount={data.length}

            openPagination={true}
          />
        </>}

        <button onClick={() => this.setState({ isModalOpened: true })} className="btn btn_add">
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
