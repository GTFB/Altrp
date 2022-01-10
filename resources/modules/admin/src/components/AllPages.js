import React, { Component } from "react";
import { Link } from "react-router-dom";
import Resource from "../../../editor/src/js/classes/Resource";
import UserTopPanel from "./UserTopPanel";
import {InputGroup, Tree} from "@blueprintjs/core";
import Search from "../svgs/search.svg";
import {filterCategories} from "../js/helpers";
import Pagination from "./Pagination";

export default class AllPages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: [],
      pagesDidMount: [],
      treePages: [],
      currentPage: 1,
      activeHeader: 0,
      pagesSearch: "",
      filter: false,
      activeCategory: 'All',
      categoryOptions: [],
    };
    this.resource = new Resource({ route: "/admin/ajax/pages" });
    this.categoryOptions = new Resource({route: "/admin/ajax/category/options"} )
    this.itemsPerPage = 20;
  }

  getPages = async () => {
    let res = await this.resource.getQueried({
      s: this.state.pagesSearch,
      order: 'ASC',
      order_by: 'title'
    });
    this.setState(state => {
      return { ...state, pages: res };
    });
    let treePagesNew = res.filter(item => item.parent_page_id === null).map(page => {
      return this.treePagesMap(page)
    })
    this.setState(state => {
      return { ...state, treePages: treePagesNew };
    });
  };

  getPagesDidMount = async () => {
    let res = await this.resource.getAll();
    this.setState(state => {
      return { ...state, pagesDidMount: res };
    });
  }


  async componentDidMount() {
    await this.getPagesDidMount();
    await this.getPages();

    const { data } = await this.categoryOptions.getAll();
    this.setState(state => ({
      ...state,
      categoryOptions: data
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

  submitSearchHandler = (e) => {
    e.preventDefault();
    this.getPages();
  }

  changeSearchHandler = (e) => {
    this.setState({pagesSearch: e.target.value})
  };

  handleNodeExpand = (nodeData, nodePath) => {
    let currentTree = _.cloneDeep(this.state.treePages);
    let currentNode = Tree.nodeFromPath(nodePath, currentTree);
    currentNode.isExpanded = true;
    this.setState(s => ({ ...s, treePages: currentTree }));
  }

  handleNodeCollapse = (nodeData, nodePath) => {
    let currentTree = _.cloneDeep(this.state.treePages);
    let currentNode = Tree.nodeFromPath(nodePath, currentTree);
    currentNode.isExpanded = false;
    this.setState(s => ({ ...s, treePages: currentTree }));
  }

  toggleFilterCategories = () => {
    this.setState(state => ({
      ...state,
      filter: !state.filter
    }))
  }

  getCategory = async (guid, all) => {
    if (guid) {
      let pages = await this.resource.getQueried({
        categories: guid
      });
      let treePagesNew = pages.map(page => {
        return this.treePagesMap(page)
      })
      this.setState(state => ({
        ...state,
        pages: pages,
        treePages: treePagesNew,
        activeCategory: guid
      }))
    } else {
      let pages = await this.resource.getAll();
      let treePagesNew = pages.map(page => {
        return this.treePagesMap(page)
      })
      this.setState(state => ({
        ...state,
        pages: pages,
        treePages: treePagesNew,
        activeCategory: all
      }))
    }
  }

  treePagesMap = (page) => {
    let treePage = {}
    let childPage = []
    let hasCaret = null

    let objectPage = this.state.pagesDidMount.filter(item => item.parent_page_id === page.id)
    if (objectPage[0]) {
      hasCaret = true
      childPage = objectPage.map(item => this.treePagesMap(item))
    } else {
      hasCaret = false
      childPage = []
    }

    treePage = {
      id: page.id,
      key: page.id,
      label: (
        <Link to={page.editUrl}>{page.title}</Link>
      ),
      secondaryLabel: (
        <a href={page.path} target="_blank">{page.path}</a>
      ),
      hasCaret: hasCaret,
      childNodes: childPage
    }
    return treePage
  }

  render() {
    const {  treePages, currentPage  } = this.state;

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
              All ({treePages.length || "0"})
            </span>
           </div>
         </div>
          <UserTopPanel />
        </div>
        <div className="admin-content">
          <div className="altrp-tree">
            <div className="altrp-tree__block">
             <div className="admin-table-top__flex">
               <form className="admin-tree-top" onSubmit={this.submitSearchHandler}>
                 <InputGroup className="form-tables" value={this.state.pagesSearch} onChange={this.changeSearchHandler} />
                 <Search />
                 <button className="btn btn_bare admin-users-button btn__tables">Search</button>
               </form>
               <span onClick={this.toggleFilterCategories} className="showFilter">{this.state.filter ? "Close filter categories" : "Open filter categories"}</span>
             </div>
              {this.state.filter && (
                <div className="admin-table__filterCategories-pages">
                  <span className="heading__categories">Categories:</span>
                  <span onClick={() => this.getCategory(null, "All")} className="admin-filters__current">
                    <a className={this.state.activeCategory === "All" ? "admin-filters__link active-category" : "admin-filters__link"}>
                      All ({this.state.pagesDidMount.length || "0"})
                    </a>
                  </span>

                  {this.state.categoryOptions.map(item => {
                    const itemsCount = filterCategories(this.state.pagesDidMount, item.value).length

                    return (
                      <span className="category__block-span" key={item.value}>
                        <span className="admin-filters__separator">|</span>
                          <a
                            className={item.value === this.state.activeCategory ? "admin-filters__link active-category" : "admin-filters__link" }
                            onClick={() => this.getCategory(item.value)}
                          >
                           {item.label} ({itemsCount})
                          </a>
                      </span>)
                    })}
                </div>
              )}
              <Tree
                contents={treePages.slice(
                  currentPage * this.itemsPerPage - this.itemsPerPage,
                  currentPage * this.itemsPerPage
                )}
                className="altrp-tree__pages"
                onNodeCollapse={this.handleNodeCollapse}
                onNodeExpand={this.handleNodeExpand}
              />
              <Pagination
                pageCount={Math.ceil(treePages.length / this.itemsPerPage) || 1}
                currentPage={currentPage}
                changePage={page => {
                  if (currentPage !== page) {
                    this.setState({ currentPage: page });
                  }
                }}
                itemsCount={treePages.length}
              />
            </div>
          </div>
          {/*<AdminTable*/}
          {/*  columns={[*/}
          {/*    {*/}
          {/*      name: "title",*/}
          {/*      title: "Title",*/}
          {/*      editUrl: true,*/}
          {/*      tag: "Link"*/}
          {/*    },*/}
          {/*    {*/}
          {/*      name: "author",*/}
          {/*      title: "Author"*/}
          {/*    },*/}
          {/*    {*/}
          {/*      name: "path",*/}
          {/*      title: "Path",*/}
          {/*      url: true,*/}
          {/*      target: "_blank"*/}
          {/*    },*/}
          {/*    {*/}
          {/*      name: 'categories',*/}
          {/*      title: 'Categories'*/}
          {/*    }*/}
          {/*  ]}*/}
          {/*  quickActions={[*/}
          {/*    {*/}
          {/*      tag: "button",*/}
          {/*      route: `/admin/ajax/pages/:id`,*/}
          {/*      method: "delete",*/}
          {/*      confirm: "Are You Sure?",*/}
          {/*      after: () => { this.getPages() },*/}
          {/*      className: "quick-action-menu__item_danger",*/}
          {/*      title: "Delete"*/}
          {/*    }*/}
          {/*  ]}*/}
          {/*  rows={pages.slice(*/}
          {/*    currentPage * this.itemsPerPage - this.itemsPerPage,*/}
          {/*    currentPage * this.itemsPerPage*/}
          {/*  )}*/}
          {/*  searchTables={{*/}
          {/*    value: pagesSearch || "",*/}
          {/*    submit: this.submitSearchHandler,*/}
          {/*    change: (e) => this.changeSearchHandler(e)*/}
          {/*  }}*/}
          {/*  getPages={this.getPages}*/}


          {/*  pageCount={Math.ceil(pages.length / this.itemsPerPage) || 1}*/}
          {/*  currentPage={currentPage}*/}
          {/*  changePage={page => {*/}
          {/*    if (currentPage !== page) {*/}
          {/*      this.setState({ currentPage: page });*/}
          {/*    }*/}
          {/*  }}*/}
          {/*  itemsCount={pages.length}*/}
          {/*  openPagination={true}*/}
          {/*/>*/}
        </div>
      </div>
    );
  }
}
