import React, {Component} from "react";
import Resource from "../../../../editor/src/js/classes/Resource";
import AdminTable from "../AdminTable";
import {Link, withRouter} from "react-router-dom";
import CONSTANTS from '../../../../editor/src/js/consts'
import UserTopPanel from "../UserTopPanel";

class Areas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      areas: [],
      areasDidMount: [],
      categoryOptions: [],
      activeCategory: 'All',
      activeHeader: 0,
      currentPage: 1,
      areasSearch: "",
      pageCount: 1,
      count: 1
    }

    this.resource = new Resource({route: '/admin/ajax/areas'});
    this.categoryOptions = new Resource({route: "/admin/ajax/category/options"} )
    this.itemsPerPage = 10;
  }

  async componentDidMount() {
    this.updateAreas();
    const { data } = await this.categoryOptions.getAll();
   // let areas = await this.resource.getAll();
   // areas = areas.filter(area => CONSTANTS.DEFAULT_AREAS.indexOf(area.name) === -1)
    this.setState(state => ({
      ...state,
      // areasDidMount: areas,
      categoryOptions: data,
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

  deleteAreas = async () => {
    let areas = await this.resource.getAll();
    areas = areas.filter(area => CONSTANTS.DEFAULT_AREAS.indexOf(area.name) === -1)
    this.setState(state => ({
      ...state,
      areasDidMount: areas,
    }))
    await this.updateAreas();
  }

  updateAreas = async () => {
    let url = new URL(location.href);
    let urlCategories = url.searchParams.get('categories')
    let urlS = url.searchParams.get('s')
    let areas = []
    if (urlCategories) {
      areas = await this.resource.getQueried({
        custom: true,
        categories: urlCategories,
        s: urlS === null ?  this.state.areasSearch : urlS,
      });
    } else {
      areas = await this.resource.getQueried({
        custom: true,
        s: urlS === null ?  this.state.areasSearch : urlS,
      });
    }
    //areas.filter(area => CONSTANTS.DEFAULT_AREAS.indexOf(area.name) === -1)
    let areasFiltered = areas
    this.setState(state => ({
      ...state,
      areas: areasFiltered,
      areasSearch: urlS === null ?  this.state.areasSearch : urlS,
      activeCategory: urlCategories === null ? 'All' : urlCategories,
    }))
  }

  searchAreas = (e) => {
    e.preventDefault();

    let url = new URL(location.href);
    if (this.state.areasSearch) {
      url.searchParams.set('s', this.state.areasSearch);
      this.props.history.push(`${url.pathname + url.search}`)
    } else {
      url.searchParams.delete('s');
      this.props.history.push(`${url.pathname + url.search}`)
    }
    this.updateAreas();
  }

  changeAreas = (e) => {
    this.setState( { areasSearch: e.target.value})
  }

  getCategory = async (guid, all) => {
    let url = new URL(location.href);
    let urlS = url.searchParams.get('s')
    if (guid) {
      url.searchParams.set('categories', guid);
      this.props.history.push(`${url.pathname + url.search}`)
      let areas = await this.resource.getQueried({
        categories: guid,
        s: urlS === null ? this.state.areasSearch : urlS
      });
      areas = areas.filter(area => CONSTANTS.DEFAULT_AREAS.indexOf(area.name) === -1)
      this.setState(state => ({
        ...state,
        areas: areas,
        activeCategory: guid
      }))
    } else {
      url.searchParams.delete('categories');
      this.props.history.push(`${url.pathname + url.search}`)
      let areas = await this.resource.getQueried({
        s: urlS === null ? this.state.areasSearch : urlS
      });
      areas = areas.filter(area => CONSTANTS.DEFAULT_AREAS.indexOf(area.name) === -1)
      this.setState(state => ({
        ...state,
        areas: areas,
        activeCategory: all
      }))
    }
  }

  render() {

    const { areas, currentPage, areasDidMount, categoryOptions, areasSearch, count, pageCount } = this.state;


    let areasMap = areas.map(area => {
      let categories = area.categories.map(item => {
        return item.category.title
      })
      categories = categories.join(', ')
      return {
        ...area,
        editUrl: '/admin/areas/' + area.id,
        categories
      }
    })

    return <div className="admin-pages admin-page">
      <div className={this.state.activeHeader ? "admin-heading admin-heading-shadow" : "admin-heading"}>
       <div className="admin-heading-left">
         <div className="admin-breadcrumbs">
           <div className="admin-breadcrumbs__current">Custom Areas</div>
         </div>
         <Link className="btn" to={`/admin/areas/add`}>Add New</Link>
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
              name: 'title',
              title: 'Title',
              url: true,
              editUrl: true,
              tag: 'Link'
            },
            {
              name: 'categories',
              title: 'Categories'
            }
          ]}
          quickActions={[
            {
              tag: "button",
              route: `/admin/ajax/areas/:id`,
              method: "delete",
              confirm: "Are You Sure?",
              after: () => {
                this.deleteAreas()
              },
              className: "quick-action-menu__item_danger",
              title: "Delete"
            }
          ]}
          filterPropsCategories={{
            DidMountArray: areasDidMount,
            categoryOptions: categoryOptions,
            getCategories: this.getCategory,
            activeCategory: this.state.activeCategory
          }}
          rows={areasMap}

          searchTables={{
            submit: this.searchAreas,
            value: areasSearch,
            change: this.changeAreas
          }}

          pageCount={pageCount}
          currentPage={currentPage}
          changePage={async (page) => {
            if (currentPage !== page) {
              await this.setState({currentPage: page})
              await this.updateAreas()
            }
          }}
          itemsCount={count}

          openPagination={false}
        />
      </div>
    </div>
  }
}

export default withRouter(Areas)
