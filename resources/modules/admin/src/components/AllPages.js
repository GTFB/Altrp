import React, { Component } from "react";
import { Link } from "react-router-dom";
import Resource from "../../../editor/src/js/classes/Resource";
import AdminTable from "./AdminTable";
import UserTopPanel from "./UserTopPanel";
import {Icon, InputGroup, Tree} from "@blueprintjs/core";
import PagesSvg from "../svgs/pages-v2.svg";
import Search from "../svgs/search.svg";

export default class AllPages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: [],
      pagesDidMount: [],
      treePages: [],
      currentPage: 1,
      activeHeader: 0,
      pagesSearch: ""
    };
    this.resource = new Resource({ route: "/admin/ajax/pages" });
    this.itemsPerPage = 10;
  }

  getPages = async () => {
    let res = await this.resource.getQueried({ s: this.state.pagesSearch });
    this.setState(state => {
      return { ...state, pages: res };
    });
    let treePagesNew = res.map(page => {
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
    const {  treePages  } = this.state;
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
          <div className="altrp-tree">
            <div className="altrp-tree__block">
              <form className="admin-tree-top" onSubmit={this.submitSearchHandler}>
                <InputGroup className="form-tables" value={this.state.pagesSearch} onChange={this.changeSearchHandler} />
                <Search />
                <button className="btn btn_bare admin-users-button btn__tables">Search</button>
              </form>
              <Tree
                contents={treePages}
                className="altrp-tree__pages"
                onNodeCollapse={this.handleNodeCollapse}
                onNodeExpand={this.handleNodeExpand}
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
