import React, { Component } from "react";
import AdminTable from "./AdminTable";
import Resource from "../../../editor/src/js/classes/Resource";
import CategoryModal from "./CategoryModal";
import { withRouter } from 'react-router-dom'


class CategoryTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      categorySearch: '',
      currentPage: 1,
      pageCount: 1,
      count: 1
    }

    this.itemsPerPage = 20;
    this.categories = new Resource({route: "/admin/ajax/categories"} );
  }

  async componentDidMount() {
   await this.getCategories();
  }

  getCategories = async () => {
    let url = new URL(location.href);
    let urlS = url.searchParams.get('s')
    const res = await this.categories.getQueried({
      s: urlS === null ? this.state.categorySearch : urlS,
      page: this.state.currentPage,
      pageSize: this.itemsPerPage
    })

    this.setState(state => ({
      ...state,
      categories: res.categories,
      categorySearch: urlS === null ? this.state.categorySearch : urlS,
      pageCount: res.pageCount,
      count: res.count
    }))
  }

  searchCategory = (e) => {
    e.preventDefault();
    let url = new URL(location.href);
    if (this.state.categorySearch) {
      url.searchParams.set('s', this.state.categorySearch);
      this.props.history.push(`${url.pathname + url.search + url.hash}`)
    } else {
      url.searchParams.delete('s');
      this.props.history.push(`${url.pathname + url.search + url.hash}`)
    }
    this.getCategories();
  }

  changeCategory = (e) => {
    this.setState({ categorySearch: e.target.value })
  }

  render() {
    const { categorySearch, categories, currentPage, count, pageCount } = this.state
    return (
      <div className="category-table">
        <AdminTable
          columns={[
            {
              name: 'title',
              title: 'Title',
              button__table: true,
              tag: "Link"
            },
            {
              name: 'name',
              title: 'Name'
            },
            {
              name: 'description',
              title: 'Description'
            }
          ]}
          rows={categories.map(item => ({...item, editUrl: `/admin/ajax/categories/:id`, button__table: () => this.props.edit(item.id)}))}
          quickActions={[
            {
              tag: "button",
              route: `/admin/ajax/categories/:id`,
              method: "delete",
              confirm: `Are You Sure`,
              after: () => { this.getCategories() },
              className: "quick-action-menu__item_danger",
              title: "Delete"
            }
          ]}

          searchTables={{
            submit: this.searchCategory,
            value: categorySearch,
            change: (e) => this.changeCategory(e)
          }}

          pageCount={pageCount}
          currentPage={currentPage}
          changePage={async (page) => {
            if (currentPage !== page) {
              await this.setState({ currentPage: page })
              await this.getCategories()
            }
          }}
          itemsCount={count}
          openPagination={true}
        />

        {this.props.activeMode && (
          <CategoryModal getCategories={this.getCategories} guid={this.props.guid} activeMode={this.props.activeMode} onToggle={this.props.onToggle} />
        )}
      </div>
    );
  }
}

export default withRouter(CategoryTable);
