import React, {Component} from "react";
import Resource from "../../../../editor/src/js/classes/Resource";
import AdminTable from "../AdminTable";
import {Link} from "react-router-dom";
import CONSTANTS from '../../../../editor/src/js/consts'
import UserTopPanel from "../UserTopPanel";

class Areas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      areas: [],
      areasDidMount: [],
      categoryOptions: [],
      activeHeader: 0,
      currentPage: 1,
      areasSearch: ""
    }

    this.resource = new Resource({route: '/admin/ajax/areas'});
    this.categoryOptions = new Resource({route: "/admin/ajax/category/options"} )
    this.itemsPerPage = 10;
  }

  async componentDidMount() {
    this.updateAreas();
    const { data } = await this.categoryOptions.getAll();
    let areas = await this.resource.getAll();
    areas = areas.filter(area => CONSTANTS.DEFAULT_AREAS.indexOf(area.name) === -1)
    this.setState(state => ({
      ...state,
      areasDidMount: areas,
      categoryOptions: data,
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

  updateAreas = async () => {
    let areas = await this.resource.getQueried({ s: this.state.areasSearch });
    areas = areas.filter(area => CONSTANTS.DEFAULT_AREAS.indexOf(area.name) === -1)
    this.setState(state => ({...state, areas: areas}))
  }

  searchAreas = (e) => {
    e.preventDefault();
    this.updateAreas();
  }

  changeAreas = (e) => {
    this.setState( { areasSearch: e.target.value})
  }

  getCategory = async (guid) => {
    if (guid) {
      let areas = await this.resource.getQueried({
        categories: guid
      });
      areas = areas.filter(area => CONSTANTS.DEFAULT_AREAS.indexOf(area.name) === -1)
      this.setState(state => ({
        ...state,
        areas: areas
      }))
    } else {
      let areas = await this.resource.getAll();
      areas = areas.filter(area => CONSTANTS.DEFAULT_AREAS.indexOf(area.name) === -1)
      this.setState(state => ({
        ...state,
        areas: areas
      }))
    }
  }

  render() {

    const { areas, currentPage, areasDidMount, categoryOptions, areasSearch } = this.state;


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
              All ({ areasDidMount.length || "0" })
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
                this.updateAreas()
              },
              className: "quick-action-menu__item_danger",
              title: "Delete"
            }
          ]}
          filterPropsCategories={{
            DidMountArray: areasDidMount,
            categoryOptions: categoryOptions,
            getCategories: this.getCategory
          }}
          rows={areasMap.slice(
            currentPage * this.itemsPerPage - this.itemsPerPage,
            currentPage * this.itemsPerPage
          )}

          searchTables={{
            submit: this.searchAreas,
            value: areasSearch,
            change: this.changeAreas
          }}

          pageCount={Math.ceil(areas.length / this.itemsPerPage) || 1}
          currentPage={currentPage}
          changePage={page => {
            if (currentPage !== page) {
              this.setState({ currentPage: page });
            }
          }}
          itemsCount={areas.length}

          openPagination={true}
        />
      </div>
    </div>
  }
}

export default Areas
