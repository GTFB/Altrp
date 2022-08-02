import React, { Component } from "react";
import Resource from "../../../editor/src/js/classes/Resource";
import AdminTable from "./AdminTable";
import store from "../js/store/store";
import { setModalSettings } from "../js/store/modal-settings/actions";
import {redirect, titleToName, objectDeepCleaning, generateId} from "../js/helpers";
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
      count: 1,
      pageCount: 1,
      activeHeader: 0,
      customizersSearch: ""
    };

    this.resource = new Resource({
      route: "ajax/customizers"
    });

    this.itemsPerPage = 10;
    this.generateTemplateJSON = this.generateTemplateJSON.bind(this);

    this.addNew = this.addNew.bind(this);
  }

  /** @function generateTemplateJSON
   * Generating customizer file content to JSON
   * @param {object} customizer data from server
   * @return {string} JSON string
   */
  generateTemplateJSON(customizer) {
    return JSON.stringify({
      name: customizer.name,
      title: customizer.title,
      type: customizer.type,
      guid: customizer.guid,
      data: customizer.data,
    });
  }

  /** @function downloadJSONFile
   * Download file
   * @param {object} template Данные, получаемые с сервера
   */
  downloadJSONFile(customizer) {
    const element = document.createElement("a");
    const file = new Blob([this.generateTemplateJSON(customizer)], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${customizer.name}.json`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
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

  /**
   * Show/hide import form
   */
  toggleImportForm = () => {
    this.setState(state => ({...state, showImportForm: !this.state.showImportForm}))
  };
  /**
   * Import customizer from file
   */
  importCustomizer = (e) => {
    e.preventDefault();
    let files = _.get(e, 'target.files.files', []);
    let uploadedFilesCount = 0;
    if (files.length) {
      _.forEach(files, f => {
        let fr = new FileReader();
        fr.onload = async (e) => {
          let importedCustomizerData = _.get(e, 'target.result', '{}');
          importedCustomizerData = JSON.parse(importedCustomizerData);
          try {
            let res = await this.resource.post(importedCustomizerData);
            if (res.redirect_route) {
              const newLink = document.createElement('a');
              newLink.href = res.redirect_route
              newLink.setAttribute('target', '_blank');
              newLink.click()
            }
          } catch (error) {
            console.error(error);
          }
        };

        fr.readAsText(f);
      })
    }
  };

  async fetchData() {
    let url = new URL(location.href);
    let urlS = url.searchParams.get('s')
    const customizers = (await this.resource.getQueried({
      s: urlS === null ? this.state.customizersSearch : urlS,
      page: this.state.currentPage,
      pageSize: this.itemsPerPage
    }))

    if (_.isArray(customizers.data)) {
      customizers.data.map(item =>{
        item.url = `/admin/customizers-editor?customizer_id=${item.id}`;
        return item;
      });
    }

    this.setState(state => ({ ...state, customizers: customizers.data, count: customizers.count, pageCount: customizers.pageCount, customizersSearch: urlS === null ? this.state.customizersSearch : urlS  }));
  }

  goToCustomizerEditor() {
    window.location.href = "/admin/customizers-editor";
  }

  addNew() {
    const modalSettings = {
      title: "Add new Customizer",
      submitButton: "Add",
      submit: data =>{


        if(!data.is_method) {
          data.name = titleToName(data.title)
          data.name += `_${altrpRandomId()}`
        } else {
          data.name = titleToName(data.title, true);
        }
        return  this.resource.post( data )
      },
      fields: [
        {
          name: "title",
          label: "Customizer Title",
          required: true
        },
        {
          name: "is_method",
          label: "Method",
          type: "checkbox"
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
    const { currentPage, customizers, customizersSearch, count, pageCount  } = this.state;
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
            <button onClick={this.toggleImportForm} className="btn ml-3">Import</button>
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
          {this.state.showImportForm &&
          <form className={"admin-form justify-content-center" + (this.state.showImportForm ? ' d-flex' : ' d-none')}
                onSubmit={this.importCustomizer}>
            <input type="file"
                   name="files"
                   multiple={true}
                   required={true}
                   accept="application/json"
                   className="form__input"/>
            <button className="btn">Import</button>
          </form>}
          <AdminTable
            columns={[
              {
                name: "title",
                title: "Title",
                url: true,
                target: "_blank"
              },
            ]}
            rows={customizers}
            quickActions={[
              {
                tag: "a",
                props: {
                  href: "/admin/customizers-editor?customizer_id=:id",
                  target: "_blank"
                },
                title: "Edit"
              }, {
                tag: 'button',
                route: '/admin/ajax/exports/customizers',
                method: 'get',
                after: response => this.downloadJSONFile(response),
                title: 'Export'
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

            pageCount={pageCount || 1}
            currentPage={currentPage}
            changePage={async (page) => {
              if (currentPage !== page) {
                await this.setState({ currentPage: page })
                await this.fetchData()
              }
            }}
            itemsCount={count || 1}
            openPagination={true}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(Customizer)
