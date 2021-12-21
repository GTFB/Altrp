import React, { Component } from "react";
import AdminTable from "./AdminTable";
import Resource from "../../../editor/src/js/classes/Resource";


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
    const res = await this.categories.getAll()
    this.setState(state => ({
      ...state,
      categories: res
    }))
  }

  searchCategory = (e) => {
    e.preventDefault();

  }

  changeCategory = (e) => {
    this.setState({ categorySearch: e.target.value })
  }

  render() {
    const { categorySearch, categories, currentPage } = this.state
    console.log("категории", categories)
    return (
      <div className="category-table">
        <AdminTable
          columns={[
            {
              name: 'title',
              title: 'Title',
              button__table: true,
              editUrl: true,
              tag: "Link"
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
              name: 'guid',
              title: "guid"
            }
          ]}
          rows={categories.map(item => ({...item, editUrl: `/admin/ajax/categories/:id`}))}
          quickActions={[
            {
              tag: "button",
              route: `/admin/ajax/categories/:id`,
              method: "delete",
              confirm: `/admin/ajax/categories/:id`,
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
      </div>
    );
  }
}

export default CategoryTable;
