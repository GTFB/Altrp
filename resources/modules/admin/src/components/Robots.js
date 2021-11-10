import React, { Component } from "react";
import Resource from "../../../editor/src/js/classes/Resource";
import AdminTable from "./AdminTable";
import store from "../js/store/store";
import { setModalSettings } from "../js/store/modal-settings/actions";
import {buildPagesTree, redirect} from "../js/helpers";

export default class Robots extends Component {
  constructor(props) {
    super(props);

    this.state = {
      robots: [],
      currentPage: 1,
      robotsSearch: "",
      model_id: false
    };

    this.resource = new Resource({
      route: "/admin/ajax/robots"
    });

    this.addNew = this.addNew.bind(this);
    this.itemsPerPage = 10;
  }

  async componentDidMount() {
    await this.fetchData();
  }

  fetchData = async () => {
    const robots = await this.resource.getQueried({ s: this.state.robotsSearch });

    if (_.isArray(robots)) {
      robots.map(item =>{
        item.url = `/admin/robots-editor?robot_id=${item.id}`;
        return item;
      });
    }
    this.setState(state => {
      return { ...state, robots: robots }
    });
  }

  searchRobots = (e) => {
    e.preventDefault();
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

  render() {
    const { currentPage, robots, robotsSearch } = this.state;

    return (
      <div className="admin-templates admin-page">
        <div className="admin-heading">
          <div className="admin-breadcrumbs">
            <a className="admin-breadcrumbs__link" href="#">
              Robots
            </a>
            <span className="admin-breadcrumbs__separator">/</span>
            <span className="admin-breadcrumbs__current">All Robots</span>
          </div>
          <button onClick={this.addNew} className="btn">
            Add New
          </button>
          {/* <button className="btn ml-3">Import Robot</button> */}
          <div className="admin-filters">
            <span className="admin-filters__current">
              {/* All ({this.state.allTemplates.length || ""}) */}
            </span>
          </div>
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
              }
            ]}
            rows={buildPagesTree(robots).slice(
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
                after: () => this.fetchData(),
                className: "quick-action-menu__item_danger",
                title: "Trash"
              }
            ]}

            searchRobots={{
              onSubmitRobots: this.searchRobots,
              valueRobots: robotsSearch,
              onChangeRobots: this.changeRobots
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
      </div>
    );
  }
}
