import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import Resource from "../../../editor/src/js/classes/Resource";
import UserTopPanel from "./UserTopPanel";
import {InputGroup, Tree} from "@blueprintjs/core";
import Search from "../svgs/search.svg";
import {filterCategories} from "../js/helpers";
import SettingPage from "./SettingPage";
import {CSSTransition} from "react-transition-group";
import ArrowSidebar from "../svgs/akar-icons_arrow-down.svg";

class AllPages extends Component {
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
      isActive: true,
      page: null,
      emptyExit: false
    };
    this.resource = new Resource({route: "/admin/ajax/pages"});
    this.categoryOptions = new Resource({route: "/admin/ajax/category/options"})
    this.itemsPerPage = 20;
  }

  getPages = async () => {
    let url = new URL(location.href);
    let urlCategories = url.searchParams.get('categories')
    let urlS = url.searchParams.get('s')
    let res = []
    if (urlCategories) {
      res = await this.resource.getQueried({
        categories: urlCategories,
        s: urlS === null ? this.state.pagesSearch : urlS,
        order: 'ASC',
        order_by: 'title',
      });
    } else {
      res = await this.resource.getQueried({
        s: urlS === null ? this.state.pagesSearch : urlS,
        order: 'ASC',
        order_by: 'title',
      });
    }
    let treePagesNew = res.filter(item => item.parent_page_id === null).map(page => {
      return this.treePagesMap(page)
    })
    let treePagesSlice = treePagesNew
    this.setState(state => {
      return {
        ...state,
        pages: res,
        activeCategory: urlCategories === null ? 'All' : urlCategories,
        pagesSearch: urlS === null ? this.state.pagesSearch : urlS,
        treePages: treePagesNew,
        treePagesSlice,
      };
    });
  };

  getPagesDidMount = async () => {
    let res = await this.resource.getAll();
    this.setState(state => {
      return {...state, pagesDidMount: res};
    });
  }

  async componentDidMount() {
    await this.getPagesDidMount();
    await this.getPages();

    const {data} = await this.categoryOptions.getAll();
    this.setState(state => ({
      ...state,
      categoryOptions: data
    }))
    window.addEventListener("scroll", this.listenScrollHeader)
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.listenScrollHeader)
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

    let url = new URL(location.href);
    if (this.state.pagesSearch) {
      url.searchParams.set('s', this.state.pagesSearch);
      this.props.history.push(`${url.pathname + url.search}`)
    } else {
      url.searchParams.delete('s');
      this.props.history.push(`${url.pathname + url.search}`)
    }
    this.getPages();
  }

  changeSearchHandler = (e) => {
    this.setState({pagesSearch: e.target.value})
  };

  handleNodeExpand = (nodeData, nodePath) => {
    let currentTree = _.cloneDeep(this.state.treePagesSlice);
    let currentNode = Tree.nodeFromPath(nodePath, currentTree);
    currentNode.isExpanded = true;
    this.setState(s => ({...s, treePagesSlice: currentTree}));
  }

  handleNodeCollapse = (nodeData, nodePath) => {
    let currentTree = _.cloneDeep(this.state.treePagesSlice);
    let currentNode = Tree.nodeFromPath(nodePath, currentTree);
    currentNode.isExpanded = false;
    this.setState(s => ({...s, treePagesSlice: currentTree}));
  }

  toggleFilterCategories = () => {
    this.setState(state => ({
      ...state,
      filter: !state.filter
    }))
  }

  getCategory = async (guid, all) => {
    let url = new URL(location.href);
    let urlS = url.searchParams.get('s')
    if (guid) {
      url.searchParams.set('categories', guid);
      this.props.history.push(`${url.pathname + url.search}`)
      let pages = await this.resource.getQueried({
        categories: guid,
        s: urlS === null ? this.state.pagesSearch : urlS,
        order: 'ASC',
        order_by: 'title'
      });
      let treePagesNew = pages.filter(item => item.parent_page_id === null).map(page => {
        return this.treePagesMap(page)
      })
      let treePagesSlice = treePagesNew.slice(
        this.state.currentPage * this.itemsPerPage - this.itemsPerPage,
        this.state.currentPage * this.itemsPerPage
      )
      this.setState(state => ({
        ...state,
        pages: pages,
        treePages: treePagesNew,
        treePagesSlice,
        activeCategory: guid
      }))
    } else {
      url.searchParams.delete('categories');
      this.props.history.push(`${url.pathname + url.search}`)
      let pages = await this.resource.getQueried({
        s: urlS === null ? this.state.pagesSearch : urlS,
        order: 'ASC',
        order_by: 'title'
      });
      let treePagesNew = pages.filter(item => item.parent_page_id === null).map(page => {
        return this.treePagesMap(page)
      })
      let treePagesSlice = treePagesNew.slice(
        this.state.currentPage * this.itemsPerPage - this.itemsPerPage,
        this.state.currentPage * this.itemsPerPage
      )
      this.setState(state => ({
        ...state,
        pages: pages,
        treePages: treePagesNew,
        treePagesSlice,
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
      isExpanded: true,
      label: (
        // <Link to={page.editUrl}>{page.title}</Link>
        <div
          className={this.state.page === page.id ? "bl-text-w" : "bl-text-b"}
          onClick={() => this.openSidebar(page.id)}
          style={{cursor: 'pointer', display: "inline-block"}}>
          {page.title}
        </div>
      ),
      secondaryLabel: (
        <a
          className={this.state.page === page.id ? "bl-text-w" : "bl-text-b"}
          href={page.path}
          target="_blank">
          {page.path}
        </a>
      ),
      hasCaret: hasCaret,
      childNodes: childPage,
      isSelected: this.state.page === page.id
    }
    return treePage
  }

  openSidebar = (id) => {
    this.setState(state => ({
      ...state,
      isActive: true,
      page: id
    }))

    if (!this.state.emptyExit) {
      this.setState(state => ({
        ...state,
        emptyExit: true
      }))
    }
  }

  exitSidebar = () => {
    this.setState(state => ({
      ...state,
      isActive: false,
      page: null
    }))

    this.getPagesDidMount();
    this.getPages();
  }

  onExited = () => {
    if (!this.state.emptyExit) {
      this.setState(state => ({
        ...state,
        emptyExit: true
      }))
    }
  }


  render() {
    const {treePages, treePagesSlice, } = this.state;
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
            <div className="admin-filters admin-filters-flex">
              <span className="admin-filters__current">
                All ({treePages.length || "0"})
              </span>
            </div>
          </div>
          <UserTopPanel/>
        </div>
        <div className="admin-content">
          <div className={this.state.isActive ? "altrp-tree active" : "altrp-tree"}>
            <CSSTransition  in={this.state.isActive} timeout={500} onExited={this.onExited} classNames={"altrp-setting-status"}>
              <div className="altrp-tree__page-setting">
                <ArrowSidebar onClick={this.exitSidebar} className="altrp-tree__page-setting-exit"/>
                <SettingPage emptyExit={this.state.emptyExit} id={this.state.page} exitSidebar={this.exitSidebar} getPages={this.getPages} getPagesDidMount={this.getPagesDidMount}/>
              </div>
            </CSSTransition>
            <div className="altrp-tree__block">
              <div className="admin-table-top__flex">
                <form className="admin-tree-top" onSubmit={this.submitSearchHandler}>
                  <InputGroup className="form-tables" value={this.state.pagesSearch}
                              onChange={this.changeSearchHandler}/>
                  <Search/>
                  <button className="btn btn_bare admin-users-button btn__tables">Search</button>
                </form>
                <span onClick={this.toggleFilterCategories}
                      className="showFilter">{this.state.filter ? "Close filter categories" : "Open filter categories"}</span>
              </div>
              {this.state.filter && (
                <div className="admin-table__filterCategories-pages">
                  <span className="heading__categories">Categories:</span>
                  <span onClick={() => this.getCategory(null, "All")} className="admin-filters__current">
                    <a
                      className={this.state.activeCategory === "All" ? "admin-filters__link active-category" : "admin-filters__link"}>
                      All ({this.state.pagesDidMount.length || "0"})
                    </a>
                  </span>

                  {this.state.categoryOptions.map(item => {
                    const itemsCount = filterCategories(this.state.pagesDidMount, item.value).length

                    return (
                      <span className="category__block-span" key={item.value}>
                        <span className="admin-filters__separator">|</span>
                          <a
                            className={item.value === this.state.activeCategory ? "admin-filters__link active-category" : "admin-filters__link"}
                            onClick={() => this.getCategory(item.value)}
                          >
                           {item.label} ({itemsCount})
                          </a>
                      </span>)
                  })}
                </div>
              )}
              <Tree
                contents={treePagesSlice}
                className="altrp-tree__pages"
                onNodeCollapse={this.handleNodeCollapse}
                onNodeExpand={this.handleNodeExpand}
                onNodeClick={this.getPages}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(AllPages)
