import React, { Component } from "react";
import Resource from "../../../editor/src/js/classes/Resource";
import { Link, Redirect, withRouter } from "react-router-dom";
import AltrpSelect from "./altrp-select/AltrpSelect";
import AdminTable from "./AdminTable";
import AdminModal2 from "./AdminModal2";
import PageDataSourceForm from "./pages/PageDataSourceForm";
import { titleToPath } from "../js/helpers";
import IconSelect from "./icon-select/IconSelect";
import mutate from "dot-prop-immutable";
import "./../sass/components/AddPost.scss";
import {Alignment, Button, InputGroup, MenuItem, TextArea} from "@blueprintjs/core";
import {MultiSelect, Select} from "@blueprintjs/select";

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
  {
    name: "server_side",
    title: "Server Side",
  },
];

const rolesOptions = [
  {
    value: "guest",
    label: "Guest"
  }
]

/**
 * @class
 * @property {Resource} resource
 */

class AddPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: {},
      value: {
        model_id: null,
        parent_page_id: null,
        path: "",
        redirect: "",
        roles: [],
        title: "",
      },
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
        return {
          ...state,
          value: {
            ...state.value,
            model_id: pageData.model_id,
            parent_page_id: pageData.parent_page_id,
            path: pageData.path,
            redirect: pageData.redirect,
            roles: pageData.roles,
            title: pageData.title,
            id
          }
        };
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

  ItemPredicate(query, value) {

    if(!query) {
      return true
    }
    const index = _.findIndex(_.split(value.label, ""), char => {
      let similar = false;
      _.split(query, "").forEach(queryChar => {
        if(queryChar === char) {
          similar = true
        }
      });
      return similar
    });

    if(index !== -1) {
      return true
    } else {
      return false
    }
  }

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
      }, ()=>{this.props.history.push('/admin/pages')});
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

  tagRenderer = (item) => {
    return item.label;
  };

  isItemSelectedRoles = (item) => {
    let itemString = JSON.stringify(item);
    let selectedString = JSON.stringify(this.state.value.roles);
    return selectedString.includes(itemString);
  };

  handleItemSelectRoles = (item) => {
    if (!this.isItemSelectedRoles(item)) {
      this.setState(state => ({
        ...state,
        value: {
          ...state.value,
          roles: [...state.value.roles, item]
        },
      }));
    }
  };

  handleTagRemoveRoles = (item) => {
    this.setState(state => ({
      ...state,
      value: {
        ...state.value,
        roles: [...state.value.roles].filter((i) => i.label !== item)
      },
    }));
  };

  changeCurrentTab(currentTab) {
    return () => this.setState((state)=> {
      return {...state, currentTab }
    });
  }

  render() {
    const { isModalOpened, editingDataSource } = this.state;

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
        <div className="admin-content zeroing__styleTabs styleTabs-marginBottom">
          <div className="custom-tab__tabs">
            <button
              className={this.state.currentTab === "content" ?
              "custom-tab__tab custom-tab__tab--selected" :
              "custom-tab__tab"}
              onClick={this.changeCurrentTab('content')}
            >
              Content
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
              className="admin-form-pages mb-2"
              onSubmit={this.savePage}
            >
              {(() => {
                if(this.state.currentTab === 'content') {
                return (
                  <React.Fragment>
                   <div className="form-group__inline-wrapper">
                     <div className="form-group form-group_width47">
                       <label htmlFor="page-title" className="font__edit">Title</label>
                       {/*<input*/}
                       {/*  type="text"*/}
                       {/*  id="page-title"*/}
                       {/*  required={1}*/}
                       {/*  value={this.state.value.title || ""}*/}
                       {/*  onChange={e => {*/}
                       {/*    this.changeValue(e.target.value, "title");*/}
                       {/*  }}*/}
                       {/*  className="form-control"*/}
                       {/*/>*/}

                       <InputGroup  type="text"
                                    id="page-title"
                                    required={1}
                                    value={this.state.value.title || ""}
                                    onChange={e => {
                                      this.changeValue(e.target.value, "title");
                                    }}
                                    className="form-control-blueprint"
                       />
                     </div>

                     <div className="form-group overflow-select__blueprint flex-grow__selectBlueprint form-group_width47">
                       <label htmlFor="parent_page_id" className="font__edit">Parent Page</label>
                       {/*<select*/}
                       {/*  id="parent_page_id"*/}
                       {/*  value={this.state.value.parent_page_id || ""}*/}
                       {/*  onChange={e => {*/}
                       {/*    // this.changeValue(e.target.value, 'parent_page_id');*/}
                       {/*    this.parentChangeHandler(e.target.value);*/}
                       {/*  }}*/}
                       {/*  className="form-control"*/}
                       {/*>*/}
                       {/*  /!*<option value=""  />*!/*/}
                       {/*  <option value="">None</option>*/}
                       {/*  {this.state.pagesOptions.map(page => {*/}
                       {/*    return (*/}
                       {/*      <option value={page.value} key={page.value}>*/}
                       {/*        {page.label}*/}
                       {/*      </option>*/}
                       {/*    );*/}
                       {/*  })}*/}
                       {/*</select>*/}


                       <Select items={this.state.pagesOptions}
                               matchTargetWidth
                               id="parent_page_id"
                               itemPredicate={this.ItemPredicate}
                               noResults={<MenuItem disabled={true} text="No results." />}
                               itemRenderer={(item, {handleClick, modifiers, query}) => {
                                 return <MenuItem
                                   text={item.label}
                                   key={item.value}
                                   active={item.value === this.state.value.parent_page_id }
                                   onClick={handleClick}
                                 />
                               }}
                               onItemSelect={current => {
                                 this.parentChangeHandler(current.value);
                               }}
                               fill={true}
                       >
                         <Button fill
                                 large
                                 alignText={Alignment.LEFT}
                                 text={this.state.pagesOptions.find(item => ( item.value === this.state.value.parent_page_id))?.label || 'None'}
                                 rightIcon="caret-down"
                         />
                       </Select>
                     </div>
                   </div>

                   <div className="form-group__inline-wrapper">
                     <div className="form-group form-group_width47">
                       <label htmlFor="page-path" className="font__edit">Path</label>
                       {/*<input*/}
                       {/*  type="text"*/}
                       {/*  id="page-path"*/}
                       {/*  required={1}*/}
                       {/*  value={this.state.value.path || ""}*/}
                       {/*  onChange={e => {*/}
                       {/*    this.changeValue(e.target.value, "path");*/}
                       {/*  }}*/}
                       {/*  className="form-control"*/}
                       {/*/>*/}

                       <InputGroup  type="text"
                                    id="page-path"
                                    required={1}
                                    value={this.state.value.path || ""}
                                    onChange={e => {
                                      this.changeValue(e.target.value, "path");
                                    }}
                                    className="form-control-blueprint"
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
                     <div className="form-group overflow-select__blueprint-pages flex-grow__selectBlueprint form-group_width47">
                       <label htmlFor="page-model" className="font__edit">Model</label>
                       {/*<select*/}
                       {/*  id="page-model"*/}
                       {/*  value={this.state.value.model_id || ""}*/}
                       {/*  onChange={e => {*/}
                       {/*    this.changeValue(e.target.value, "model_id");*/}
                       {/*  }}*/}
                       {/*  className="form-control"*/}
                       {/*>*/}
                       {/*  <option value="" />*/}
                       {/*  {this.state.models.map(model => {*/}
                       {/*    return (*/}
                       {/*      <option value={model.value} key={model.value}>*/}
                       {/*        {model.label}*/}
                       {/*      </option>*/}
                       {/*    );*/}
                       {/*  })}*/}
                       {/*</select>*/}


                       <Select items={this.state.models}
                               matchTargetWidth
                               id="page-model"
                               itemPredicate={this.ItemPredicate}
                               noResults={<MenuItem disabled={true} text="No results." />}
                               itemRenderer={(item, {handleClick, modifiers, query}) => {
                                 return <MenuItem
                                   text={item.label}
                                   key={item.value}
                                   active={item.value === this.state.value.model_id }
                                   onClick={handleClick}
                                 />
                               }}
                               onItemSelect={current => {
                                 this.changeValue(current.value, "model_id")
                               }}
                               fill={true}
                       >
                         <Button fill
                                 large
                                 alignText={Alignment.LEFT}
                                 text={this.state.models.find(item => ( item.value === this.state.value.model_id))?.label || 'None'}
                                 rightIcon="caret-down"
                         />
                       </Select>
                     </div>
                   </div>


                    <div className="form-group__inline-wrapper">
                      <div className="form-group form-group__multiSelectBlueprint form-group__multiSelectBlueprint-pages form-group_width47">
                        <label htmlFor="page-roles" className="font__edit">Roles</label>
                        {/*<AltrpSelect*/}
                        {/*  id="page-roles"*/}
                        {/*  isMulti={true}*/}
                        {/*  optionsRoute="/admin/ajax/role_options"*/}
                        {/*  placeholder="All"*/}
                        {/*  defaultOptions={[*/}
                        {/*    {*/}
                        {/*      value: "guest",*/}
                        {/*      label: "Guest"*/}
                        {/*    }*/}
                        {/*  ]}*/}
                        {/*  value={this.state.value.roles}*/}
                        {/*  onChange={value => {*/}
                        {/*    this.changeValue(value, "roles");*/}
                        {/*  }}*/}
                        {/*/>*/}


                        <MultiSelect tagRenderer={this.tagRenderer} id="roles"
                                     items={rolesOptions}
                                     itemPredicate={this.ItemPredicate}
                                     noResults={<MenuItem disabled={true} text="No results." />}
                                     fill={true}
                                     placeholder="All..."
                                     selectedItems={this.state.value.roles}
                                     onItemSelect={this.handleItemSelectRoles}
                                     itemRenderer={(item, {handleClick, modifiers, query}) => {
                                       return (
                                         <MenuItem
                                           icon={this.isItemSelectedRoles(item) ? "tick" : "blank"}
                                           text={item.label}
                                           key={item.value}
                                           onClick={handleClick}
                                         />
                                       )
                                     }}
                                     tagInputProps={{
                                       onRemove: this.handleTagRemoveRoles,
                                       large: false,
                                     }}
                                     popoverProps={{
                                       usePortal: false
                                     }}
                        />
                      </div>
                      <div className="form-group form-group_width47">
                        <label htmlFor="redirect" className="font__edit">Redirect</label>
                        {/*<input*/}
                        {/*  type="text"*/}
                        {/*  id="redirect"*/}
                        {/*  value={this.state.value.redirect || ""}*/}
                        {/*  onChange={e => {*/}
                        {/*    this.changeValue(e.target.value, "redirect");*/}
                        {/*  }}*/}
                        {/*  className="form-control"*/}
                        {/*/>*/}

                        <InputGroup  type="text"
                                     id="redirect"
                                     value={this.state.value.redirect || ""}
                                     onChange={e => {
                                       this.changeValue(e.target.value, "redirect");
                                     }}
                                     className="form-control-blueprint"
                        />
                      </div>
                    </div>

                    <div className="addPage__bottom">
                      <div className="addPage__bottom-block">
                        <input type="checkbox" id="caching"
                          checked={this.state.value.is_cached || ""}
                          onChange={e => {
                            this.changeValue(e.target.checked, "is_cached");
                          }}
                          className="addPage__bottom-checkbox" />
                        <label htmlFor="caching" className="addPage__bottom-label font__edit">Сaching (Only for Static Pages)</label>
                      </div>
                      <div className="addPage__bottom-block">
                        <input type="checkbox" id="404"
                          checked={this.state.value.not_found || ""}
                          onChange={e => {
                            this.changeValue(e.target.checked, "not_found");
                          }}
                          className="addPage__bottom-checkbox" />
                        <label htmlFor="404" className="addPage__bottom-label font__edit">404</label>
                      </div>
                      {/*<div className="form-group col-3 position-static ml-0 align-self-start">*/}
                      {/*  <label htmlFor="sections_count" className="label_checkbox">Sections Count:</label>*/}
                      {/*  <input type="number" id="sections_count"*/}
                      {/*    value={this.state.value.sections_count || ""}*/}
                      {/*    onChange={e => {*/}
                      {/*      this.changeValue(e.target.value, "sections_count");*/}
                      {/*    }}*/}
                      {/*    className="form-control" />*/}
                      {/*</div>*/}
                      <div className="addPage__bottom-page_icon">
                        <label htmlFor="icon" className="addPage__bottom-label font__edit">Page Icon</label>
                        <IconSelect
                          id="icon"
                          returnType="text"
                          value={this.state.value.icon}
                          maxWidth="50px"
                          maxHeight="50px"
                          className="addPage__bottom-icon"
                          onChange={(icon) => {
                            let value = mutate.set(this.state.value, 'icon', icon);
                            this.setState(state=>({...state, value}));
                          }}
                        />
                      </div>
                    </div>
                  </React.Fragment>
                );
              } else if(this.state.currentTab === 'SEO') {
                return (
                  <React.Fragment>

                    <div className="form-group__inline-wrapper">
                      <div className="form-group form-group_width47">
                        <label htmlFor="seo-title" className="font__edit">Title</label>
                        {/*<input*/}
                        {/*  type="text"*/}
                        {/*  id="seo-title"*/}
                        {/*  value={this.state.value.seo_title || ""}*/}
                        {/*  onChange={e => {*/}
                        {/*    this.changeValue(e.target.value, "seo_title");*/}
                        {/*  }}*/}
                        {/*  className="form-control"*/}
                        {/*/>*/}

                        <InputGroup  type="text"
                                     id="seo-title"
                                     value={this.state.value.seo_title || ""}
                                     onChange={e => {
                                       this.changeValue(e.target.value, "seo_title");
                                     }}
                                     className="form-control-blueprint"
                        />
                      </div>
                      <div className="form-group form-group_width47">
                        <label htmlFor="seo-keywords" className="font__edit">Keywords</label>
                        {/*<input*/}
                        {/*  type="text"*/}
                        {/*  id="seo-keywords"*/}
                        {/*  value={this.state.value.seo_keywords || ""}*/}
                        {/*  onChange={e => {*/}
                        {/*    this.changeValue(e.target.value, "seo_keywords");*/}
                        {/*  }}*/}
                        {/*  className="form-control"*/}
                        {/*/>*/}

                        <InputGroup  type="text"
                                     id="seo-keywords"
                                     value={this.state.value.seo_keywords || ""}
                                     onChange={e => {
                                       this.changeValue(e.target.value, "seo_keywords");
                                     }}
                                     className="form-control-blueprint"
                        />
                      </div>
                    </div>

                    <div className="form-group form-control-blueprint">
                      <label htmlFor="seo_description" className="font__edit">Description</label>
                      {/*<textarea*/}
                      {/*  id="seo_description"*/}
                      {/*  value={this.state.value.seo_description || ""}*/}
                      {/*  onChange={e => {*/}
                      {/*    this.changeValue(e.target.value, "seo_description");*/}
                      {/*  }}*/}
                      {/*  className="form-control"*/}
                      {/*>*/}
                      {/*</textarea>*/}

                      <TextArea  id="seo_description"
                                 className="textarea-blueprint"
                                 value={this.state.value.seo_description || ""}
                                 onChange={e => {
                                   this.changeValue(e.target.value, "seo_description");
                                 }}
                                 fill
                                 large
                      />
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
            radiusTable={true}
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
