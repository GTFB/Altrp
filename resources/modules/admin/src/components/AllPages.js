import React, { Component } from "react";
import { Link } from "react-router-dom";
import Resource from "../../../editor/src/js/classes/Resource";
import AdminTable from "./AdminTable";
import { buildPagesTree } from "../js/helpers";

export default class AllPages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: [],
      currentPage: 1,
      pagesSearch: ""
    };
    this.resource = new Resource({ route: "/admin/ajax/pages" });
    this.itemsPerPage = 20;
  }

  getPages = async s => {
    let res = await this.resource.getQueried({ s: this.state.pagesSearch });
    this.setState(state => {
      return { ...state, pages: res };
    });
  };

  componentDidMount() {
    this.getPages();
  }

  submitSearchHandler = (e) => {
    e.preventDefault();
    this.getPages();
  }

  changeSearchHandler = (e) => {
    this.setState({pagesSearch: e.target.value})
  };

  render() {
    const { currentPage, pages, pagesSearch } = this.state;
    console.log("pages", pages)
    return (
      <div className="admin-pages admin-page">
        <div className="admin-heading">
          <div className="admin-breadcrumbs">
            <a className="admin-breadcrumbs__link" href="#">
              Pages
            </a>
            <span className="admin-breadcrumbs__separator">/</span>
            <span className="admin-breadcrumbs__current">All Pages</span>
          </div>
          <Link className="btn" to="/admin/pages/add">
            Add New
          </Link>
          <div className="admin-filters">
            <span className="admin-filters__current">
              All ({this.state.pages.length || "0"})
            </span>
          </div>
        </div>
        <div className="admin-content">
          <AdminTable
            columns={[
              {
                name: "title",
                title: "Title",
                editUrl: true,
                tag: "Link"
              },
              {
                name: "author",
                title: "Author"
              },
              {
                name: "path",
                title: "Path",
                url: true,
                target: "_blank"
              },
              {
                name: 'categories',
                title: 'Categories'
              }
            ]}
            quickActions={[
              {
                tag: "button",
                route: `/admin/ajax/pages/:id`,
                method: "delete",
                confirm: "Are You Sure?",
                after: () => { this.getPages() },
                className: "quick-action-menu__item_danger",
                title: "Trash"
              }
            ]}
            rows={buildPagesTree(pages).slice(
              currentPage * this.itemsPerPage - this.itemsPerPage,
              currentPage * this.itemsPerPage
            )}
            search={{
              value: pagesSearch || "",
              submitHandler: this.submitSearchHandler,
              changeHandler: (e) => this.changeSearchHandler(e)
            }}
            getPages={this.getPages}


            pageCount={Math.ceil(pages.length / this.itemsPerPage) || 1}
            currentPage={currentPage}
            changePage={page => {
              if (currentPage !== page) {
                this.setState({ currentPage: page });
              }
            }}
            itemsCount={pages.length}
            openPagination={true}
          />
        </div>
      </div>
    );
  }
}
