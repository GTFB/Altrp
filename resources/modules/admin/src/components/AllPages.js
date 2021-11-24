import React, { Component } from "react";
import { Link } from "react-router-dom";
import Resource from "../../../editor/src/js/classes/Resource";
import AdminTable from "./AdminTable";
import UserTopPanel from "./UserTopPanel";

export default class AllPages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: [],
      currentPage: 1,
      activeHeader: 0,
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

  submitSearchHandler = (e) => {
    e.preventDefault();
    this.getPages();
  }

  changeSearchHandler = (e) => {
    this.setState({pagesSearch: e.target.value})
  };

  // PagesTree = (pages) => {
  //   const tree = [];
  //   const roots = pages.filter(({ parent_page_id }) => parent_page_id === null);
  //
  //   if (!roots.length) return pages;
  //
  //   roots.forEach(root => {
  //     tree.push(root);
  //     treeRecursion(root.id);
  //   });
  //
  //   function treeRecursion(parentId) {
  //     const children = pages.filter(({ parent_page_id }) => parent_page_id === parentId);
  //     const childrenMap = children.map(page => ({
  //       ...page,
  //       title: "——" + page.title
  //     }))
  //     tree.push(...childrenMap);
  //   }
  //   console.log(tree)
  //
  //   return tree;
  // }

  render() {
    const { currentPage, pages, pagesSearch } = this.state;
    return (
      <div className="admin-pages admin-page">
        <div className={this.state.activeHeader ? "admin-heading admin-heading-shadow" : "admin-heading"}>
         <div className="admin-heading-left">
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
          <UserTopPanel />
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
            rows={pages.slice(
              currentPage * this.itemsPerPage - this.itemsPerPage,
              currentPage * this.itemsPerPage
            )}
            searchTables={{
              value: pagesSearch || "",
              submit: this.submitSearchHandler,
              change: (e) => this.changeSearchHandler(e)
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
