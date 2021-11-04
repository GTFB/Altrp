import React, { Component } from "react";
import Resource from "../../../editor/src/js/classes/Resource";
import AdminTable from "./AdminTable";
import store from "../js/store/store";
import { setModalSettings } from "../js/store/modal-settings/actions";
import {redirect, titleToName} from "../js/helpers";
import {altrpRandomId} from "../../../front-app/src/js/helpers";

export default class Customizer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customizers: [],
      model_id: false
    };

    this.resource = new Resource({
      route: "ajax/customizers"
    });

    this.addNew = this.addNew.bind(this);
  }

  async componentDidMount() {
    await this.fetchData();
  }

  async fetchData() {
    const customizers = (await this.resource.getAll()).data;

    if (_.isArray(customizers)) {
      customizers.map(item =>{
        item.url = `/admin/customizers-editor?customizer_id=${item.id}`;
        return item;
      });
    }

    this.setState(state => ({ ...state, customizers }));
  }

  goToCustomizerEditor() {
    window.location.href = "/admin/customizers-editor";
  }

  addNew() {
    const modalSettings = {
      title: "Add new Customizer",
      submitButton: "Add",
      submit: data =>{
        data.name = titleToName(data.title);
        data.name += `_${altrpRandomId()}`
        return  this.resource.post( data )
      },
      fields: [
        {
          name: "title",
          label: "Customizer Title",
          required: true
        },
      ],
      active: true,
      success: res => {
        console.log(res);
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
              Customizer
            </a>
            <span className="admin-breadcrumbs__separator">/</span>
            <span className="admin-breadcrumbs__current">All Customizer</span>
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
                name: "title",
                title: "Title",
                url: true,
                target: "_blank"
              },
            ]}
            rows={this.state.customizers}
            quickActions={[
              {
                tag: "a",
                props: {
                  href: "/admin/customizers-editor?customizer_id=:id",
                  target: "_blank"
                },
                title: "Edit"
              }, {
                // tag: "button",
                // route: "/admin/ajax/customizers",
                // method: "put",
                // data: {name: 1},
                // after: () => this.fetchData(),
                // title: "Rename"


                tag: "button",
                route: "/admin/ajax/customizers",
                method: "put",
                data: {power: 1},
                after: () => this.fetchData(),
                title: "Enable"
              }, {
                tag: "button",
                route: "/admin/ajax/customizers/:id",
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
