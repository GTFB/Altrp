import React, { Component } from "react";
import Resource from "../../../editor/src/js/classes/Resource";
import { Link, Redirect, withRouter } from "react-router-dom";
import AltrpSelect from "./altrp-select/AltrpSelect";
import AdminTable from "./AdminTable";
import AdminModal2 from "./AdminModal2";
import PageDataSourceForm from "./pages/PageDataSourceForm";
import { titleToPath } from "../js/helpers";

const columns = [
  {
    name: "source.name",
    title: "Datasource",
    url: true
    // editUrl: true,
    // tag: 'Link'
  },
  {
    name: "alias",
    title: "Alias"
  },
  {
    name: "priority",
    title: "Priority"
  },
];

/**
 * @class
 * @property {Resource} resource
 */

class AddPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: {},
      value: {},
      redirectAfterSave: false,
      templates: [],
      models: [],
      isModalOpened: false,
      dataSources: [],
      editingDataSource: null,
      pagesOptions: [],
      currentTab: 'content',
    };
    this.resource = new Resource({ route: "/admin/ajax/pages" });
    this.pagesOptionsResource = new Resource({
      route: "/admin/ajax/pages_options"
    });
    this.model_resource = new Resource({ route: "/admin/ajax/models_options" });
    this.templateResource = new Resource({ route: "/admin/ajax/templates" });
    this.dataSourceResource = new Resource({
      route: "/admin/ajax/page_data_sources/pages"
    });

    this.savePage = this.savePage.bind(this);
  }

  /**
   * Компонент загрузился
   * получыаем данный страницы + опции для шаблона
   * @return {Promise<void>}
   */
  async componentDidMount() {
    this.pagesOptionsResource
      .getAll()
      .then(pagesOptions => this.setState({ pagesOptions }));

    let res = await this.templateResource.getOptions();
    this.setState(state => {
      return { ...state, templates: res };
    });

    let models_res = await this.model_resource.getAll();
    this.setState(state => {
      return { ...state, models: models_res };
    });
    let id = this.props.match.params.id;
    id = parseInt(id);
    if (id) {
      this.getDataSources();
      let pageData = await this.resource.get(id);
      this.setState(state => {
        return { ...state, value: pageData, id };
      });
    }
  }

  getDataSources = async () => {
    let id = this.props.match.params.id;
    const dataSources = await this.dataSourceResource.get(id);
    this.setState({ dataSources });
    this.setState({ isModalOpened: false, editingDataSource: null });
  };

  editHandler = editingDataSource => {
    this.setState({ editingDataSource, isModalOpened: true });
  };

  /**
   * Сохранить страницу или добавить новую
   * @param e
   * @return {Promise<void>}
   */
  async savePage(e) {
    if(this.state.value.path === undefined ||
      this.state.value.path === ''  ||
      this.state.value.title === undefined ||
      this.state.value.title === '') {
        this.setState(state => {
          return {...state, currentTab: 'content'}
        });
        return;
      }

    e.preventDefault();
    let res;
    const { parent_page_id } = this.state.value;
    let path = this.state.value.path;
    path = path.split("\\").join("/");
    path = path[0] !== "/" ? `/${path}` : path;

    let redirect = this.state.value.redirect;
    redirect = (redirect || "").split("\\").join("/");
    if (redirect) {
      redirect = redirect[0] !== "/" ? `/${redirect}` : redirect;
    }
    this.state.value.redirect = redirect;
    this.state.value.path = path;
    if (this.state.id) {
      res = await this.resource.put(this.state.id, {
        ...this.state.value,
        parent_page_id: parent_page_id === "root" ? null : parent_page_id
      });
    } else {
      res = await this.resource.post({
        ...this.state.value,
        parent_page_id: parent_page_id === "root" ? null : parent_page_id
      });
    }
    if (res.success) {
      this.setState(state => {
        return { ...state, redirectAfterSave: true };
      });
    } else {
      this.setState(state => {
        return { ...state, value: {} };
      });
    }
  }

  changeValue(value, field) {
    if (field === "path") {
      value = value.split("\\").join("/");
      value = value[0] !== "/" ? `/${value}` : value;
    }
    if (field === "redirect") {
      value = value.split("\\").join("/");
      if (value) {
        value = value[0] !== "/" ? `/${value}` : value;
      }
    }
    this.setState(state => {
      const newState = _.cloneDeep(state);
      newState.value[field] = value;
      return newState;
    });
  }

  parentChangeHandler = parentId => {
    if (parentId === "root") {
      this.setState({
        value: { ...this.state.value, parent_page_id: parentId, path: "/" }
      });
    } else {
      this.resource.get(parentId).then(({ path }) =>
        this.setState({
          value: {
            ...this.state.value,
            parent_page_id: parentId,
            path:
              path +
              (path.endsWith("/") ? "" : "/") +
              titleToPath(this.state.value.title)
          }
        })
      );
    }
  };

  changeCurrentTab(currentTab) {
    return () => this.setState((state)=> {
      return {...state, currentTab }
    });
  }

  render() {
    const { isModalOpened, editingDataSource } = this.state;
    if (this.state.redirectAfterSave) {
      return <Redirect to="/admin/pages" />;
    }
    let { dataSources } = this.state;

    dataSources = _.sortBy(dataSources, dataSource => dataSource.priority);
    return (
      <div className="admin-pages admin-page">
        <div className="admin-heading">
          <div className="admin-breadcrumbs">
            <Link className="admin-breadcrumbs__link" to="/admin/pages">
              Pages
            </Link>
            <span className="admin-breadcrumbs__separator">/</span>
            <span className="admin-breadcrumbs__current">
              {this.state.value.title || "Add New Page"}
            </span>
          </div>
        </div>
        <div className="admin-content">
          <div className="custom-tab__tabs">
            <button
              className={this.state.currentTab === "content" ?
              "custom-tab__tab custom-tab__tab--selected" :
              "custom-tab__tab"}
              onClick={this.changeCurrentTab('content')}
            >
              content
            </button>
            <button
              className={this.state.currentTab === "SEO" ?
              "custom-tab__tab custom-tab__tab--selected" :
              "custom-tab__tab"}
              onClick={this.changeCurrentTab('SEO')}
            >
              SEO
            </button>
          </div>
          <div className="custom-tab__tab-panel">
            <form
              className="admin-form mb-2"
              onSubmit={this.savePage}
            >
              {(() => {
                if(this.state.currentTab === 'content') {
                return (
                  <React.Fragment>
                    <div className="form-group">
                      <label htmlFor="page-title">Title</label>
                      <input
                        type="text"
                        id="page-title"
                        required={1}
                        value={this.state.value.title || ""}
                        onChange={e => {
                          this.changeValue(e.target.value, "title");
                        }}
                        className="form-control"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="parent_page_id">Parent Page</label>
                      <select
                        id="parent_page_id"
                        value={this.state.value.parent_page_id || ""}
                        onChange={e => {
                          // this.changeValue(e.target.value, 'parent_page_id');
                          this.parentChangeHandler(e.target.value);
                        }}
                        className="form-control"
                      >
                        <option value="" disabled />
                        <option value="root">Root</option>
                        {this.state.pagesOptions.map(page => {
                          return (
                            <option value={page.value} key={page.value}>
                              {page.label}
                            </option>
                          );
                        })}
                      </select>
                      {/* <AltrpSelect id="parent_page_id"
                      // isMulti={true}
                      optionsRoute="/admin/ajax/pages_options"
                      placeholder=""
                      defaultOptions={[
                        {
                          value: '',
                          label: '',
                        }
                      ]}
                      value={this.state.value.parent_page_id || ''}
                      onChange={({ value }) => { this.parentChangeHandler(value) }}
                    /> */}
                    </div>

                    <div className="form-group">
                      <label htmlFor="page-path">Path</label>
                      <input
                        type="text"
                        id="page-path"
                        required={1}
                        value={this.state.value.path || ""}
                        onChange={e => {
                          this.changeValue(e.target.value, "path");
                        }}
                        className="form-control"
                      />
                    </div>

                    {/*<div className="form-group">*/}
                    {/*<label htmlFor="page-template">Content Template</label>*/}
                    {/*<select id="page-template"*/}
                    {/*value={this.state.value.template_id || ''}*/}
                    {/*onChange={e => {this.changeValue(e.target.value, 'template_id')}}*/}
                    {/*className="form-control">*/}
                    {/*<option value=""/>*/}
                    {/*{*/}
                    {/*this.state.templates.map(template=>{*/}
                    {/*return <option value={template.value} key={template.value}>{template.label}</option>*/}
                    {/*})*/}
                    {/*}*/}
                    {/*</select>*/}
                    {/*</div>*/}
                    <div className="form-group">
                      <label htmlFor="page-model">Model</label>
                      <select
                        id="page-model"
                        value={this.state.value.model_id || ""}
                        onChange={e => {
                          this.changeValue(e.target.value, "model_id");
                        }}
                        className="form-control"
                      >
                        <option value="" />
                        {this.state.models.map(model => {
                          return (
                            <option value={model.value} key={model.value}>
                              {model.label}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="page-roles">Roles</label>
                      <AltrpSelect
                        id="page-roles"
                        isMulti={true}
                        optionsRoute="/admin/ajax/role_options"
                        placeholder="All"
                        defaultOptions={[
                          {
                            value: "guest",
                            label: "Guest"
                          }
                        ]}
                        value={this.state.value.roles}
                        onChange={value => {
                          this.changeValue(value, "roles");
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="redirect">Redirect</label>
                      <input
                        type="text"
                        id="redirect"
                        value={this.state.value.redirect || ""}
                        onChange={e => {
                          this.changeValue(e.target.value, "redirect");
                        }}
                        className="form-control"
                      />
                    </div>
                    <div className="row col-12">
                      <div className="form-group col-4">
                        <input type="checkbox" id="caching"
                          checked={this.state.value.is_cached || ""}
                          onChange={e => {
                            this.changeValue(e.target.checked, "is_cached");
                          }}
                          className="form-check-input form-check-input_inline" />
                        <label htmlFor="caching" className="label_checkbox">Сaching</label>
                      </div>
                      <div className="form-group col-4 ">
                        <input type="checkbox" id="404"
                          checked={this.state.value.not_found || ""}
                          onChange={e => {
                            this.changeValue(e.target.checked, "not_found");
                          }}
                          className="form-check-input form-check-input_inline" />
                        <label htmlFor="404" className="label_checkbox">404</label>
                      </div>
                      <div className="form-group col-4 ">
                        <label htmlFor="sections_count" className="label_checkbox">Sections Count:</label>
                        <input type="number" id="sections_count"
                          value={this.state.value.sections_count || ""}
                          onChange={e => {
                            this.changeValue(e.target.value, "sections_count");
                          }}
                          className="form-control" />
                      </div>
                    </div>
                  </React.Fragment>
                );
              } else if(this.state.currentTab === 'SEO') {
                return (
                  <React.Fragment>
                    <div className="form-group">
                      <label htmlFor="seo-title">Title</label>
                      <input
                        type="text"
                        id="seo-title"
                        value={this.state.value.seo_title || ""}
                        onChange={e => {
                          this.changeValue(e.target.value, "seo_title");
                        }}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="seo-keywords">Keywords</label>
                      <input
                        type="text"
                        id="seo-keywords"
                        value={this.state.value.seo_keywords || ""}
                        onChange={e => {
                          this.changeValue(e.target.value, "seo_keywords");
                        }}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="seo_description">Description</label>
                      <textarea
                        id="seo_description"
                        value={this.state.value.seo_description || ""}
                        onChange={e => {
                          this.changeValue(e.target.value, "seo_description");
                        }}
                        className="form-control"
                      >
                      </textarea>
                    </div>
                  </React.Fragment>
                );
              }})()}
              <button className= {this.state.value.path ? "btn btn_success" : "btn btn_disable"}>
                {this.state.id ? "Save" : "Add"}
              </button>
            </form>
          </div>

          {Boolean(dataSources.length) && <AdminTable
            columns={columns}
            quickActions={[
              {
                callBack: data => this.editHandler(data),
                title: 'Edit'
              },
              {
                tag: 'button',
                route: `/admin/ajax/page_data_sources/:id`,
                method: 'delete',
                confirm: 'Are You Sure?',
                after: () => this.getDataSources(),
                className: 'quick-action-menu__item_danger',
                title: 'Trash'
              }
            ]}
            rows={dataSources}
          />}

        {this.props.match.params.id &&
          <button onClick={() => this.setState({ isModalOpened: true })} className="btn btn_add">
            Add Data Source
          </button>}

          {isModalOpened && (
            <AdminModal2
              closeHandler={() =>
                this.setState({ isModalOpened: false, editingDataSource: null })
              }
            >
              <PageDataSourceForm
                updateHandler={this.getDataSources}
                dataSource={editingDataSource}
              />
            </AdminModal2>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(AddPage);
