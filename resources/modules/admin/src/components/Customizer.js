import React, { Component } from "react";
import Resource from "../../../editor/src/js/classes/Resource";
import AdminTable from "./AdminTable";
import store from "../js/store/store";
import { setModalSettings } from "../js/store/modal-settings/actions";
import {redirect, titleToName} from "../js/helpers";
import {altrpRandomId} from "../../../front-app/src/js/helpers";
import UserTopPanel from "./UserTopPanel";
import { withRouter } from 'react-router-dom'

class Customizer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customizers: [],
      model_id: false,
      currentPage: 1,
      activeHeader: 0,
      customizersSearch: ""
    };

    this.resource = new Resource({
      route: "ajax/customizers"
    });

    this.itemsPerPage = 10;

    this.addNew = this.addNew.bind(this);
  }

  async componentDidMount() {
    await this.fetchData();

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

  async fetchData() {
    let url = new URL(location.href);
    let urlS = url.searchParams.get('s')
    const customizers = (await this.resource.getQueried({
      s: urlS === null ? this.state.customizersSearch : urlS
    })).data;

    if (_.isArray(customizers)) {
      customizers.map(item =>{
        item.url = `/admin/customizers-editor?customizer_id=${item.id}`;
        return item;
      });
    }

    this.setState(state => ({ ...state, customizers, customizersSearch: urlS === null ? this.state.customizersSearch : urlS  }));
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

  submitSearchCustomizers = async (e) => {
    e.preventDefault();
    let url = new URL(location.href);
    if (this.state.customizersSearch) {
      url.searchParams.set('s', this.state.customizersSearch);
      this.props.history.push(`${url.pathname + url.search}`)
    } else {
      url.searchParams.delete('s');
      this.props.history.push(`${url.pathname + url.search}`)
    }
    await this.fetchData();
  }

  changeValueCustomizers = (e) => {
    this.setState({customizersSearch: e.target.value})
  }

  render() {
    const { currentPage, customizers, customizersSearch  } = this.state;
    return (
      <div className="admin-templates admin-page">
        <div className={this.state.activeHeader ? "admin-heading admin-heading-shadow" : "admin-heading"}>
          <div className="admin-heading-left">
            <div className="admin-breadcrumbs">
              <a className="admin-breadcrumbs__link" href="#">
                Visual Codes
              </a>
              <span className="admin-breadcrumbs__separator">/</span>
              <span className="admin-breadcrumbs__current">All Visual Codes</span>
            </div>
            <button onClick={this.addNew} className="btn">
              Add New
            </button>
            {/* <button className="btn ml-3">Import Robot</button> */}
            <div className="admin-filters">
            <span className="admin-filters__current">
              All ({ this.state.customizers.length || "0"})
            </span>
            </div>
          </div>
          <UserTopPanel />
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
            rows={customizers.slice(
              currentPage * this.itemsPerPage - this.itemsPerPage,
              currentPage * this.itemsPerPage
            )}
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
                title: "Delete"
              }
            ]}

            searchTables={{
              value: customizersSearch,
              submit: this.submitSearchCustomizers,
              change: this.changeValueCustomizers
            }}

            pageCount={Math.ceil(customizers.length / this.itemsPerPage) || 1}
            currentPage={currentPage}
            changePage={page => {
              if (currentPage !== page) {
                this.setState({ currentPage: page });
              }
            }}
            itemsCount={customizers.length}
            openPagination={true}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(Customizer)
