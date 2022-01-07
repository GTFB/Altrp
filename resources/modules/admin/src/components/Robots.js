import React, { Component } from "react";
import Resource from "../../../editor/src/js/classes/Resource";
import AdminTable from "./AdminTable";
import store from "../js/store/store";
import { setModalSettings } from "../js/store/modal-settings/actions";
import {redirect} from "../js/helpers";
import UserTopPanel from "./UserTopPanel";
import SmallModal from "./SmallModal";
import RobotChildrenModal from "./RobotChildrenModal";
import {withRouter} from 'react-router-dom'

class Robots extends Component {
  constructor(props) {
    super(props);

    this.state = {
      robots: [],
      robotsDidMount: [],
      currentPage: 1,
      activeHeader: 0,
      robotsSearch: "",
      model_id: false,
      categoryOptions: [],
      activeCategory: 'All',
      modal: false,
    };

    this.resource = new Resource({
      route: "/admin/ajax/robots"
    });
    this.categoryOptions = new Resource({route: "/admin/ajax/category/options"} )

    this.addNew = this.addNew.bind(this);
    this.itemsPerPage = 10;
  }

  async componentDidMount() {
    await this.updatePages();
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

  updatePages = async () => {
    const robots = await this.resource.getAll();
    this.setState(state => ({
      ...state,
      robotsDidMount: robots
    }))
    await this.fetchData();
  }

  fetchData = async () => {
    let url = new URL(location.href);
    let urlCategories = url.searchParams.get('categories')
    let urlS = url.searchParams.get('s')
    let robots = []
    if (urlCategories) {
      robots = await this.resource.getQueried({
        categories: urlCategories,
        s: urlS === null ? this.state.robotsSearch : urlS
      });
    } else {
      robots = await this.resource.getQueried({
        s: urlS === null ? this.state.robotsSearch : urlS
      });
    }

    if (_.isArray(robots)) {
      robots.map(item =>{
        item.url = `/admin/robots-editor?robot_id=${item.id}`;
        return item;
      });
    }
    this.setState(state => {
      return {
        ...state,
        robots: robots,
        robotsSearch: urlS === null ? this.state.robotsSearch : urlS,
        activeCategory: urlCategories === null ? 'All' : urlCategories
      }
    });
  }

  searchRobots = (e) => {
    e.preventDefault();
    let url = new URL(location.href);
    if (this.state.robotsSearch) {
      url.searchParams.set('s', this.state.robotsSearch);
      this.props.history.push(`${url.pathname + url.search}`)
    } else {
      url.searchParams.delete('s');
      this.props.history.push(`${url.pathname + url.search}`)
    }
    this.fetchData();
  }

  goToRobotsEditor() {
    window.location.href = "/admin/robots-editor";
  }

  addNew() {
    const modalSettings = {
      title: "Add new Robot",
      submitButton: "Add",
      submit: data =>
        this.resource.post({
          name: data.name,
        }),
      fields: [
        {
          name: "name",
          label: "Robot name",
          required: true
        },
      ],
      active: true,
      success: res => {
        if (res.redirect_route) {
          redirect(res.redirect_route);
        }
      }
    };

    store.dispatch(setModalSettings(modalSettings));
  }

  changeRobots = (e) => {
    this.setState( { robotsSearch: e.target.value})
  }

  toggleModal = () => {
    this.setState(state => ({
      ...state,
      modal: !state.modal
    }))
  }

  getCategory = async (guid, all) => {
    let url = new URL(location.href);
    let urlS = url.searchParams.get('s')
    if (guid) {
      url.searchParams.set('categories', guid);
      this.props.history.push(`${url.pathname + url.search}`)
      let robots = await this.resource.getQueried({
        categories: guid,
        s: urlS === null ? this.state.robotsSearch : urlS
      });
      if (_.isArray(robots)) {
        robots.map(item =>{
          item.url = `/admin/robots-editor?robot_id=${item.id}`;
          return item;
        });
      }
      this.setState(state => ({
        ...state,
        robots: robots,
        activeCategory: guid
      }))
    } else {
      url.searchParams.delete('categories');
      this.props.history.push(`${url.pathname + url.search}`)
      let robots = await this.resource.getQueried({
        s: urlS === null ? this.state.robotsSearch : urlS
      });
      if (_.isArray(robots)) {
        robots.map(item =>{
          item.url = `/admin/robots-editor?robot_id=${item.id}`;
          return item;
        });
      }
      this.setState(state => ({
        ...state,
        robots: robots,
        activeCategory: all
      }))
    }
  }

  render() {
    const { currentPage, categoryOptions, robotsDidMount, robots, robotsSearch } = this.state;

    let robotsMap = robots.map(robot => {
      let categories = robot.categories.map(item => {
        return item.category.title
      })
      categories = categories.join(', ')
      return {
        ...robot,
        categories
      }
    })

    return (
      <div className="admin-templates admin-page">
        <div className={this.state.activeHeader ? "admin-heading admin-heading-shadow" : "admin-heading"}>
          <div className="admin-heading-left">
            <div className="admin-breadcrumbs">
              <a className="admin-breadcrumbs__link" href="#">
                Robots
              </a>
              <span className="admin-breadcrumbs__separator">/</span>
              <span className="admin-breadcrumbs__current">All Robots</span>
            </div>
            <button onClick={this.toggleModal} className="btn">
              Add New
            </button>
            {/* <button className="btn ml-3">Import Robot</button> */}
            <div className="admin-filters">
            <span className="admin-filters__current">
              All ({ this.state.robots.length || "0"})
            </span>
            </div>
          </div>
          <UserTopPanel />
        </div>
        <div className="admin-content">
          <AdminTable
            columns={[
              {
                name: "name",
                title: "Name",
                url: true,
                target: "_blank"
              },
              {
                name: "author",
                title: "Author",
              },
              {
                name: "model_id",
                title: "Model",
              },
              {
                name: "start_condition",
                title: "Start Condition",
              },
              {
                name: "enabled",
                title: "Enabled",
              },
              {
                name: 'categories',
                title: 'Categories'
              }
            ]}

            filterPropsCategories={{
              DidMountArray: robotsDidMount,
              categoryOptions: categoryOptions,
              getCategories: this.getCategory,
              activeCategory: this.state.activeCategory
            }}
            rows={robotsMap.slice(
              currentPage * this.itemsPerPage - this.itemsPerPage,
              currentPage * this.itemsPerPage
            )}
            quickActions={[
              {
                tag: "a",
                props: {
                  href: "/admin/robots-editor?robot_id=:id",
                  target: "_blank"
                },
                title: "Edit"
              }, {
                // tag: "button",
                // route: "/admin/ajax/robots",
                // method: "put",
                // data: {name: 1},
                // after: () => this.fetchData(),
                // title: "Rename"


                tag: "button",
                route: "/admin/ajax/robots",
                method: "put",
                data: {power: 1},
                after: () => this.fetchData(),
                title: "Enable"
              }, {
                tag: "button",
                route: "/admin/ajax/robots/:id",
                method: "delete",
                confirm: "Are You Sure?",
                after: () => this.updatePages(),
                className: "quick-action-menu__item_danger",
                title: "Delete"
              }
            ]}

            searchTables={{
              submit: this.searchRobots,
              value: robotsSearch,
              change: this.changeRobots
            }}

            pageCount={Math.ceil(robots.length / this.itemsPerPage) || 1}
            currentPage={currentPage}
            changePage={page => {
              if (currentPage !== page) {
                this.setState({ currentPage: page });
              }
            }}
            itemsCount={robots.length}

            openPagination={true}
          />
        </div>
        {this.state.modal && (
          <SmallModal toggleModal={this.toggleModal} activeMode={this.state.modal}>
            <RobotChildrenModal categoryOptions={this.state.categoryOptions} toggleModal={this.toggleModal}/>
          </SmallModal>
        )}
      </div>
    );
  }
}

export default withRouter(Robots)
