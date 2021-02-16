import React, { Component } from "react";
import Resource from "../../../editor/src/js/classes/Resource";
import AdminTable from "./AdminTable";
import store from "../js/store/store";
import { setModalSettings } from "../js/store/modal-settings/actions";
import { redirect } from "../js/helpers";

export default class Robots extends Component {
  constructor(props) {
    super(props);

    this.state = {
      robots: []
    };

    this.resource = new Resource({
      route: "ajax/robots"
    });

    this.addNew = this.addNew.bind(this);
  }

  async componentDidMount() {
    await this.fetchData();
    console.log(this.state);
  }

  async fetchData() {
    const robots = await this.resource.getAll();

    this.setState(state => ({ ...state, robots }));
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
          name: data.name
        }),
      fields: [
        {
          name: "name",
          label: "Robot name",
          required: true
        }
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

  render() {
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
                url: true,
                target: "_blank"
              },
              {
                name: "model_id",
                title: "Model",
                url: true,
                target: "_blank"
              },
              {
                name: "start_condition",
                title: "Start Condition",
                url: true,
                target: "_blank"
              }
            ]}
            rows={this.state.robots}
            quickActions={[
              {
                tag: "a",
                props: {
                  href: "/admin/robots-editor?robot_id=:id",
                  target: "_blank"
                },
                title: "Edit"
              },
              {
                tag: "button",
                route: "/admin/ajax/robots/:id",
                method: "delete",
                confirm: "Are You Sure?",
                after: () => this.fetchData(),
                className: "quick-action-menu__item_danger",
                title: "Trash"
              }
            ]}
          />
        </div>
      </div>
    );
  }
}
