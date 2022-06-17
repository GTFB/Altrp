import React, {Component} from "react";
import Resource from "../../../../editor/src/js/classes/Resource";
import AdminTable from "../AdminTable";
import {mbParseJSON} from "../../../../front-app/src/js/helpers";
import {withRouter} from "react-router";
import UserTopPanel from "../UserTopPanel";

class MenusList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menus: [],
      menusDidMount: [],
      categoryOptions: [],
      activeCategory: 'All',
      activeHeader: 0,
      currentPage: 1,
      menusSearch: "",
      pageCount: 1,
      count: 1
    }
    this.resource = new Resource({route: '/admin/ajax/menus'})
    this.categoryOptions = new Resource({route: "/admin/ajax/category/options"})
    this.itemsPerPage = 10;
  }

  async componentDidMount() {
    try {
      this.updateMenus()
      let {data} = await this.categoryOptions.getAll();
      // let menus = await this.resource.getAll();
      this.setState(state => ({...state,
         // menusDidMount: menus,
            categoryOptions: data
      }));
    } catch (e) {
      console.error(e);
    }

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

  searchMenus = (e) => {
    e.preventDefault();

    let url = new URL(location.href);
    if (this.state.menusSearch) {
      url.searchParams.set('s', this.state.menusSearch);
      this.props.history.push(`${url.pathname + url.search}`)
    } else {
      url.searchParams.delete('s');
      this.props.history.push(`${url.pathname + url.search}`)
    }
    this.updateMenus();
  }

  changeMenus = (e) => {
    this.setState( { menusSearch: e.target.value})
  }

  addNew = async()=>{
    try{
      let res = await this.resource.post({name: '', children: '[]'});
      res = res.data;
      this.props.history.push(`/admin/menus/${res.id}`)
    } catch (e) {
      if(e.res instanceof Promise){
        e = await e.res.then();
        e = mbParseJSON(e);
      } else if (e instanceof Promise){
        e = await e.then();
        e = mbParseJSON(e);
      }
      console.error(e);
      alert('Error: ' + e.message);
    }
  }

  deleteMenus = async () => {
    let menus = await this.resource.getAll();
    this.setState(state => ({...state, menusDidMount: menus }));
    await this.updateMenus();
  }

  updateMenus = async () => {
    let url = new URL(location.href);
    let urlCategories = url.searchParams.get('categories')
    let urlS = url.searchParams.get('s')
    let menus = []
    if (urlCategories) {
      menus = await this.resource.getQueried({
        categories: urlCategories,
        s: urlS === null ? this.state.menusSearch : urlS,
        page: this.state.currentPage,
        pageSize: this.itemsPerPage
      });
    } else {
      menus = await this.resource.getQueried({
        s: urlS === null ? this.state.menusSearch : urlS,
        page: this.state.currentPage,
        pageSize: this.itemsPerPage
      });
    }

    this.setState(state => ({
      ...state,
      menus: menus.menus,
      menusSearch: urlS === null ? this.state.menusSearch : urlS,
      activeCategory: urlCategories === null ? 'All' : urlCategories,
      pageCount: menus.pageCount,
      count: menus.count
    }))
  }

  getCategory = async (guid, all) => {
    let url = new URL(location.href);
    let urlS = url.searchParams.get('s')
    if (guid) {
      url.searchParams.set('categories', guid);
      this.props.history.push(`${url.pathname + url.search}`)
      let menus = await this.resource.getQueried({
        categories: guid,
        s: urlS === null ? this.state.menusSearch : urlS
      });
      this.setState(state => ({
        ...state,
        menus,
        activeCategory: guid
      }))
    } else {
      url.searchParams.delete('categories');
      this.props.history.push(`${url.pathname + url.search}`)
      let menus = await this.resource.getQueried({
        s: urlS === null ? this.state.menusSearch : urlS
      });
      this.setState(state => ({
        ...state,
        menus,
        activeCategory: all
      }))
    }
  }

  render() {

    const { menus, currentPage, menusSearch, categoryOptions, menusDidMount, pageCount, count } = this.state;
    let menusMap = menus.map(menu => {
      let categories = menu.categories.map(item => {
        return item.category.title
      })
      categories = categories.join(', ')
      return {
        ...menu,
        categories
      }
    })

    return <div className="admin-pages admin-page">
      <div className={this.state.activeHeader ? "admin-heading admin-heading-shadow" : "admin-heading"}>
        <div className="admin-heading-left">
          <div className="admin-breadcrumbs">
            <div className="admin-breadcrumbs__current">Menus</div>
          </div>
          <button className="btn" onClick={this.addNew} >Add New</button>
          <div className="admin-filters">
            <span className="admin-filters__current">
              All ({ count || "0" })
            </span>
          </div>
        </div>
        <UserTopPanel />
      </div>
      <div className="admin-content">
        <AdminTable
          columns={[
            {
              name: 'name',
              title: 'Name',
              url: true,
              editUrl: true,
              default: '(no Name)',
              tag: 'Link'
            },
            {
              name: 'categories',
              title: 'Categories'
            }
          ]}
          quickActions={[
            {
              tag: 'Link',
              props: { href: '/admin/menus/:id' },
              title: 'Edit'
            },
            {
              tag: "button",
              route: `/admin/ajax/menus/:id`,
              method: "delete",
              confirm: "Are You Sure?",
              after: () => {
                this.deleteMenus()
              },
              className: "quick-action-menu__item_danger",
              title: "Delete"
            }
          ]}
          filterPropsCategories={{
            DidMountArray: menusDidMount,
            categoryOptions: categoryOptions,
            getCategories: this.getCategory,
            activeCategory: this.state.activeCategory
          }}
          rows={menusMap}

          searchTables={{
            submit: this.searchMenus,
            value: menusSearch,
            change: this.changeMenus
          }}

          pageCount={pageCount}
          currentPage={currentPage}
          changePage={async (page) => {
            if (currentPage !== page) {
               await this.setState({ currentPage: page });
               await this.updateMenus()
            }
          }}
          itemsCount={count}

          openPagination={true}
        />
      </div>
    </div>
  }
}

export default withRouter(MenusList)
