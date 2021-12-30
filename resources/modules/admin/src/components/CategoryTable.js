import React, { Component } from "react";
import AdminTable from "./AdminTable";
import Resource from "../../../editor/src/js/classes/Resource";
import CategoryModal from "./CategoryModal";


class CategoryTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      categorySearch: '',
      currentPage: 1,
    }

    this.itemsPerPage = 10;
    this.categories = new Resource({route: "/admin/ajax/categories"} );
  }

  async componentDidMount() {
   await this.getCategories();
  }

  getCategories = async () => {
    const res = await this.categories.getQueried({ s: this.state.categorySearch } )

    this.setState(state => ({
      ...state,
      categories: res,
    }))
  }

  searchCategory = (e) => {
    e.preventDefault();
    this.getCategories();
  }

  changeCategory = (e) => {
    this.setState({ categorySearch: e.target.value })
  }

  render() {
    const { categorySearch, categories, currentPage } = this.state
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

          pageCount={Math.ceil(categories.length / this.itemsPerPage) || 1}
          currentPage={currentPage}
          changePage={page => {
            if (currentPage !== page) {
              this.setState({ currentPage: page });
            }
          }}
          itemsCount={categories.length}
          openPagination={true}
        />

        {this.props.activeMode && (
          <CategoryModal getCategories={this.getCategories} guid={this.props.guid} activeMode={this.props.activeMode} onToggle={this.props.onToggle} />
        )}
      </div>
    );
  }
}

export default CategoryTable;
