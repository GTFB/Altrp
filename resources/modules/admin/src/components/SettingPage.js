import React, {Component} from "react";
import Resource from "../../../editor/src/js/classes/Resource";
import {Link, withRouter} from "react-router-dom";
import AdminTable from "./AdminTable";
import AdminModal2 from "./AdminModal2";
import PageDataSourceForm from "./pages/PageDataSourceForm";
import {titleToPath} from "../js/helpers";
import IconSelect from "./icon-select/IconSelect";
import mutate from "dot-prop-immutable";
import "./../sass/components/AddPost.scss";
import {Alignment, Button, InputGroup, MenuItem, TextArea} from "@blueprintjs/core";
import {MultiSelect, Select} from "@blueprintjs/select";
import {compose} from "redux";
import {connect} from "react-redux";
import progressBar from "../js/functions/progressBar";
import delay from "../../../front-app/src/js/functions/delay";
import Pagination from "./Pagination";

const columns = [
  {
    name: "source.title",
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

/**
 * @class
 * @property {Resource} resource
 */

class SettingPage extends Component {
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
        permissions: [],
        rolesOptions: [{value: "guest", label: "Guest"}],
        title: "",
        _categories: [],
        categories: [],
        not_found: null
      },
      redirectAfterSave: false,
      templates: [],
      models: [],
      isModalOpened: false,
      dataSources: [],
      editingDataSource: null,
      pagesOptions: [],
      relationsOptions: [],
      dataSourceSearch: '',
      currentPage: 1,
      currentTab: 'content',
      categoryOptions: [],
    };
    this.resource = new Resource({route: "/admin/ajax/pages"});
    this.rolesOptionsResource = new Resource({route: "/admin/ajax/role_options"})
    this.permissionsOptionsResource = new Resource({route: "/admin/ajax/permissions_options"})
    this.categoryOptions = new Resource({route: "/admin/ajax/category/options"})
    this.pagesOptionsResource = new Resource({
      route: "/admin/ajax/pages_options"
    });
    this.model_resource = new Resource({route: "/admin/ajax/model_options"});
    this.templateResource = new Resource({route: "/admin/ajax/templates"});
    this.dataSourceResource = new Resource({
      route: "/admin/ajax/page_data_sources/pages"
    });
    this.itemsPerPage = 4;

    this.savePage = this.savePage.bind(this);
  }

  updateRelationsOptions = async()=>{
    let relationsOptions =
      await ((new Resource({route: "/admin/ajax/models/relations/options"}))
        .getQueried({
          valueColumn:'name',
          model_id: this.state.value.model_id
        }))

    relationsOptions = relationsOptions.data || []

    this.setState(state=>({...state, relationsOptions}))
  }

  getData = async () => {
    let res = await this.templateResource.getOptions();
    this.setState(state => {
      return {...state, templates: res};
    });


    // let [ getModels ] = await this.model_resource.getAll();
    const models_res = (await this.model_resource.getAll()).options
    if (this.props.modelsState) {
      this.setState(state => {
        return {
          ...state, models: [
            {
              value: '',
              label: 'None',
            },
            ...models_res]
        };
      });
    } else {
      this.setState(state => {
        return {
          ...state, models: [
            {
              value: '',
              label: 'None',
            },
            ...models_res.filter(item => !this.props.standardModels.some(model => model.label === item.label))]

        };
      });
    }

    let [
      roles,
      permissionsOptions,
      data,
    ] = await Promise.all([
      this.rolesOptionsResource.getAll(),
      this.permissionsOptionsResource.getQueried({
        value: 'name',
      }),
      this.categoryOptions.getAll(),
    ]);

    this.setState(state => ({
      ...state,
      value: {
        ...state.value,
        categoryOptions: data,
        permissionsOptions,
        rolesOptions: [...state.value.rolesOptions, ...roles]
      }
    }));

    let id = this.props.id;
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
            roles: pageData.roles || [],
            permissions: pageData.permissions || [],
            title: pageData.title,
            _categories: pageData.categories,
            categories: pageData.categories,
            model_column: pageData.model_column,
            param_name: pageData.param_name,
            not_found: pageData.not_found,
            settings: pageData.settings,
            id
          },
          id
        };
      });
    }

    if (id) {
      let pagesOptions = await this.pagesOptionsResource.getAll()
      let pageData = await this.resource.get(id);
      let pageAll = await this.resource.getAll();
      let parentPage = pageAll.find(item => item.parent_page_id === pageData.id)
      let pagesFilterSelect = pagesOptions.filter(item => item.value !== pageData.id)

      if (parentPage) {
        let pagesFilter = pagesFilterSelect.filter(item => item.value !== parentPage.id)
        this.setState({
          pagesOptions: [
            {
              value: 'root',
              label: 'None',
            }
            ,
            ...pagesFilter
          ]
        })
      } else {
        this.setState({
          pagesOptions: [
            {
              value: 'root',
              label: 'None',
            }
            ,
            ...pagesFilterSelect
          ]
        })
      }

    } else {
      let pagesOptions = await this.pagesOptionsResource.getAll()

      this.setState({
        pagesOptions: [
          {
            value: 'root',
            label: 'None',
          }
          ,
          ...pagesOptions
        ]
      })
    }
  }

  /**
   * Компонент загрузился
   * получыаем данный страницы + опции для шаблона
   * @return {Promise<void>}
   */
  componentDidMount() {
    this.getData()
    this.updateRelationsOptions()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.id !== this.props.id && this.props.id !== null) {
      this.setState(state => ({
        ...state,
        page: {},
        value: {
          ...state.value,
          roles: [],
          permissions: [],
          rolesOptions: [{value: "guest", label: "Guest"}],
        }
      }))
      this.getData()
    }
    if(this.state.value.model_id !== prevState.value.model_id) {
      this.updateRelationsOptions()
    }
  }

  getDataSources = async () => {
    let id = this.props.id;
    const dataSources = await this.dataSourceResource.get(id);
    this.setState({dataSources});
    this.setState({isModalOpened: false, editingDataSource: null});
  };

  editHandler = editingDataSource => {
    this.setState({editingDataSource, isModalOpened: true});
  };

  // ItemPredicate(query, value) {
  //
  //   if (!query) {
  //     return true
  //   }
  //   const index = _.findIndex(_.split(value.label, ""), char => {
  //     let similar = false;
  //     _.split(query, "").forEach(queryChar => {
  //       if (queryChar === char) {
  //         similar = true
  //       }
  //     });
  //     return similar
  //   });
  //
  //   if (index !== -1) {
  //     return true
  //   } else {
  //     return false
  //   }
  // }

  onQueryChange = (query, value) => {
    return `${value.label?.toLowerCase()}`.indexOf(query.toLowerCase()) >= 0
  }

  /**
   * Сохранить страницу или добавить новую
   * @param e
   * @return {Promise<void>}
   */
  async savePage(e) {
    if (this.state.value.path === undefined ||
      this.state.value.path === '' ||
      this.state.value.title === undefined ||
      this.state.value.title === '') {
      this.setState(state => {
        return {...state, currentTab: 'content'}
      });
      return;
    }

    e.preventDefault();
    let res;
    const {parent_page_id} = this.state.value;
    let path = this.state.value.path;
    path = path.split("\\").join("/");
    path = path[0] !== "/" ? `/${path}` : path;

    let redirect = this.state.value.redirect;
    redirect = (redirect || "").split("\\").join("/");
    // if (redirect) {
    //   redirect = redirect[0] !== "/" ? `/${redirect}` : redirect;
    // }
    this.state.value.redirect = redirect;
    this.state.value.path = path;
    progressBar(.01)
    if (this.state.id) {
      res = await this.resource.put(this.state.id, {
        ...this.state.value,
        parent_page_id: parent_page_id === "root" ? null : parent_page_id
      });
      progressBar(1)
      await delay(100)
      progressBar()
    } else {
      res = await this.resource.post({
        ...this.state.value,
        parent_page_id: parent_page_id === "root" ? null : parent_page_id
      });
      progressBar(1)
      await delay(100)
      progressBar()
    }
    if (res.success) {
      this.props.getPagesDidMount()
      this.props.getPages()
      // this.setState(state => {
      //   return {...state, redirectAfterSave: true};
      // }, () => {
      //   this.props.history.push('/admin/pages')
      // });
    } else {
      this.setState(state => {
        return {...state, value: {}};
      });
    }
  }

  handlePublish = async (e) => {

    if (this.state.value.path === undefined ||
      this.state.value.path === '' ||
      this.state.value.title === undefined ||
      this.state.value.title === '') {
      this.setState(state => {
        return {...state, currentTab: 'content'}
      });
      return;
    }

    e.preventDefault();
    e.stopPropagation();
    let res;
    const {parent_page_id} = this.state.value;
    let path = this.state.value.path;
    path = path.split("\\").join("/");
    path = path[0] !== "/" ? `/${path}` : path;

    let redirect = this.state.value.redirect;
    redirect = (redirect || "").split("\\").join("/");
    this.state.value.redirect = redirect;
    this.state.value.path = path;
    progressBar(.01)
    if (this.state.id) {
      res = await this.resource.publish(this.state.id, {
        ...this.state.value,
        parent_page_id: parent_page_id === "root" ? null : parent_page_id
      });
      progressBar(1)
      await delay(100)
      progressBar()
    } else {
      res = await this.resource.post({
        ...this.state.value,
        parent_page_id: parent_page_id === "root" ? null : parent_page_id
      });
      progressBar(1)
      await delay(100)
      progressBar()

      this.setState(state => {
        return {...state, redirectAfterSave: true};
      });
    }
    if (res.success) {
      this.props.getPagesDidMount()
      this.props.getPages()
    } else {
      this.setState(state => {
        return {...state, value: {}};
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
      // if (value) {
      //   value = value[0] !== "/" ? `/${value}` : value;
      // }
    }
    if (field === "param_name" && value) {
      value = value.replace(/\W/g, '');
      value = value.replace(/[0-9]/g, '');
    }
    if (field === "model_id") {
      this.setState(state=>({
        ...state,
        value: mutate.set(state.value, 'settings.modelRelations', [])
      }))
    }
    this.setState(state => {
      const newState = _.cloneDeep(state);
      newState.value[field] = value;
      if (field === "model_id" && !value) {
        newState.value.model_column = ''
        newState.value.param_name = ''
      }
      return newState;
    });
  }

  parentChangeHandler = parentId => {
    if (parentId === "root") {
      this.setState({
        value: {...this.state.value, parent_page_id: parentId, path: "/"}
      });
    } else {
      this.resource.get(parentId).then(({path}) =>
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
    return this.state.value.roles.some(c => c.value === item.value);
  };
  isItemSelectedPermissions= (item) => {
    return this.state.value.permissions.some(c => c.value === item.value);
  };
  isItemSelectedRelations = (item) => {
    const modelRelations = _.get(this, 'state.value.settings.modelRelations', [])
    return modelRelations.some(c => c.value === item.value);
  };

  handleItemSelectRelation = (item) => {
    if (!this.isItemSelectedRelations(item)) {
      const modelRelations = [..._.get(this, 'state.value.settings.modelRelations', [])]
      modelRelations.push(item)
      let value = mutate.set(this.state.value, 'settings.modelRelations', modelRelations)
      this.setState(state => ({
        ...state,
        value
      }));
    }
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
  handleItemSelectPermissions = (item) => {
    if (!this.isItemSelectedPermissions(item)) {
      this.setState(state => ({
        ...state,
        value: {
          ...state.value,
          permissions: [...state.value.permissions, item]
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
  handleTagRemovePermissions = (item) => {
    this.setState(state => ({
      ...state,
      value: {
        ...state.value,
        permissions: [...state.value.permissions].filter((i) => i.label !== item)
      },
    }));
  };
   handleTagRemoveRelations= (item) => {
    let {value} = this.state
    let modelRelations = _.get(value, 'settings.modelRelations', [])
    modelRelations = modelRelations.filter((i) => i.label !== item)
    value = mutate.set(value, 'settings.modelRelations', modelRelations)
    this.setState(state => ({
      ...state,
      value
    }));
  };

  changeCurrentTab(currentTab) {
    return () => this.setState((state) => {
      return {...state, currentTab}
    });
  }

  changeSearchHandler = (e) => {
    this.setState({dataSourceSearch: e.target.value})
  }

  submitSearchHandler = async (e) => {
    e.preventDefault();
    await this.getDataSources()
  }

  deletePages = async (id) => {
    if (confirm('Are You Sure?')) {
      await this.resource.delete(id)
      this.props.exitSidebar()
    }
  }

  onQueryChangeMulti = (query, value) => {
    return (
      `${value.label.toLowerCase()}`.indexOf(query.toLowerCase()) >= 0
    );
  }

  isItemSelectedCategory = (item) => {
    return this.state.value.categories.some(c => c.value === item.value);
  }

  handleItemSelectCategory = (item) => {
    if (!this.isItemSelectedCategory(item)) {
      this.setState(state => ({
        ...state,
        value: {
          ...state.value,
          _categories: [...state.value._categories, item],
          categories: [...state.value.categories, item]
        }
      }));
    }
  }

  handleTagRemoveCategory = (item) => {
    this.setState(state => ({
      ...state,
      value: {
        ...state.value,
        _categories: [...state.value._categories].filter((i) => i.label !== item),
        categories: [...state.value.categories].filter((i) => i.label !== item)
      }
    }));
  }

  render() {
    const {isModalOpened, editingDataSource} = this.state;
    let {dataSources} = this.state;
    let id = this.props.id
    dataSources = _.sortBy(dataSources, dataSource => dataSource.priority);
    return (
      <>
      {this.props.emptyExit ? (
        <>
          <div className={this.state.currentTab === 'Datasource' ? "tab-datasource"
            : "tab-content"}>
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
                className={this.state.currentTab === "Datasource" ?
                  "custom-tab__tab custom-tab__tab--selected" :
                  "custom-tab__tab"}
                onClick={this.changeCurrentTab('Datasource')}
              >
                Datasource
              </button>

              {(this.props.id && this.props.alt_seo) && (
                <button
                  className={this.state.currentTab === this.props.alt_seo.name ?
                    "custom-tab__tab custom-tab__tab--selected" :
                    "custom-tab__tab"}
                  onClick={this.changeCurrentTab(this.props.alt_seo.name)}
                >
                  {this.props.alt_seo.title}
                </button>
              )}
            </div>
            <div className="custom-tab__tab-panel">
              <div
                className={this.state.currentTab === 'Datasource' ? "admin-form-pages__datasource mb-2" : "admin-form-pages mb-2"}
              >
                {(() => {
                  if (this.state.currentTab === 'content') {
                    return (
                      <React.Fragment>
                        <div className="form-group__inline-wrapper">
                          <div className="form-group form-group_width47">
                            <label htmlFor="page-title" className="font__edit">Title</label>
                            <InputGroup type="text"
                                        id="page-title"
                                        required={1}
                                        value={this.state.value.title || ""}
                                        onChange={e => {
                                          this.changeValue(e.target.value, "title");
                                        }}
                                        className="form-control-blueprint"
                            />
                          </div>

                          <div
                            className="form-group overflow-select__blueprint flex-grow__selectBlueprint form-group_width47">
                            <label htmlFor="parent_page_id" className="font__edit">Parent Page</label>
                            <Select items={this.state.pagesOptions}
                                    matchTargetWidth
                                    id="parent_page_id"
                                    itemPredicate={this.onQueryChange}
                                    noResults={<MenuItem disabled={true} text="No results."/>}
                                    itemRenderer={(item, {handleClick, modifiers, query}) => {
                                      return <MenuItem
                                        text={item.label}
                                        key={item.value}
                                        active={item.value === this.state.value.parent_page_id}
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
                                      text={this.state.pagesOptions.find(item => (item.value === this.state.value.parent_page_id))?.label || 'None'}
                                      rightIcon="caret-down"
                              />
                            </Select>
                          </div>
                        </div>

                        <div className="form-group__inline-wrapper">
                          <div className="form-group form-group_width47">
                            <label htmlFor="page-path" className="font__edit">Path</label>
                            <InputGroup type="text"
                                        id="page-path"
                                        required={1}
                                        value={this.state.value.path || ""}
                                        onChange={e => {
                                          this.changeValue(e.target.value, "path");
                                        }}
                                        className="form-control-blueprint"
                            />
                          </div>
                          <div
                            className="form-group overflow-select__blueprint-pages flex-grow__selectBlueprint form-group_width47">
                            <label htmlFor="page-model" className="font__edit">Model</label>
                            <Select items={this.state.models}
                                    matchTargetWidth
                                    id="page-model"
                                    itemPredicate={this.onQueryChange}
                                    noResults={<MenuItem disabled={true} text="No results."/>}
                                    itemRenderer={(item, {handleClick, modifiers, query}) => {
                                      return <MenuItem
                                        text={item.label}
                                        key={item.value}
                                        active={item.value === this.state.value.model_id}
                                        onClick={handleClick}
                                      />
                                    }}
                                    onItemSelect={current => {
                                      this.changeValue(current.value, "model_id")
                                    }}
                                    fill={true}
                            > <Button fill
                                      large
                                      alignText={Alignment.LEFT}
                                      text={this.state.models.find(item => (item.value === this.state.value.model_id))?.label || 'None'}
                                      rightIcon="caret-down"
                            />
                            </Select>
                          </div>
                        </div>
                        {
                          this.state.value.model_id &&
                          <div className="form-group__inline-wrapper flex-wrap">
                            <h4 className="w-100">Model Settings</h4>
                            <div className="form-group form-group_width47">
                              <div className="form-group">
                                <label htmlFor="column">Column for Search</label>

                                <InputGroup type="text"
                                            id="column"
                                            value={this.state.value.model_column || ""}
                                            onChange={e => {
                                              this.changeValue(e.target.value, "model_column");
                                            }}
                                            className="form-control-blueprint"
                                />
                              </div>

                            </div>
                            <div className="form-group form-group_width47">
                              <div className="form-group">
                                <label htmlFor="param">Param for Search</label>
                                <InputGroup type="text"
                                            id="param"
                                            value={this.state.value.param_name || ""}
                                            onChange={e => {
                                              this.changeValue(e.target.value, "param_name");
                                            }}
                                            className="form-control-blueprint"
                                />
                              </div>

                            </div>
                            <div
                              className="form-group form-group__multiSelectBlueprint form-group__multiSelectBlueprint-pages form-group_width47">
                              <label htmlFor="page-roles" className="font__edit">Preload Relations</label>

                              <MultiSelect tagRenderer={this.tagRenderer}
                                           id="relations"
                                           items={this.state.relationsOptions}
                                           itemPredicate={this.onQueryChange}
                                           noResults={<MenuItem disabled={true} text="No results."/>}
                                           fill={true}
                                           placeholder="Relations..."
                                           selectedItems={this.state.relationsOptions.filter(i => this.isItemSelectedRelations(i))}
                                           onItemSelect={this.handleItemSelectRelation}
                                           itemRenderer={(item, {handleClick, modifiers, query}) => {
                                             return (
                                               <MenuItem
                                                 icon={this.isItemSelectedRelations(item) ? "tick" : "blank"}
                                                 text={item.label}
                                                 key={item.value}
                                                 onClick={handleClick}
                                               />
                                             )
                                           }}
                                           tagInputProps={{
                                             onRemove: this.handleTagRemoveRelations,
                                             large: false,
                                           }}
                                           popoverProps={{
                                             usePortal: false
                                           }}
                              />
                            </div>
                          </div>
                        }
                        <div className="form-group__inline-wrapper">
                          <div
                            className="form-group form-group__multiSelectBlueprint form-group__multiSelectBlueprint-pages form-group_width47">
                            <label htmlFor="page-roles" className="font__edit">Roles</label>

                            <MultiSelect tagRenderer={this.tagRenderer}
                                         id="roles"
                                         items={this.state.value.rolesOptions}
                                         itemPredicate={this.onQueryChange}
                                         noResults={<MenuItem disabled={true} text="No results."/>}
                                         fill={true}
                                         placeholder="All..."
                                         selectedItems={this.state.value.rolesOptions.filter(i => this.isItemSelectedRoles(i))}
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

                          <div
                            className="form-group form-group__multiSelectBlueprint form-group__multiSelectBlueprint-pages form-group_width47">
                            <label htmlFor="page-roles" className="font__edit">Permissions</label>

                            <MultiSelect tagRenderer={this.tagRenderer}
                                         id="permission"
                                         items={this.state.value.permissionsOptions}
                                         itemPredicate={this.onQueryChange}
                                         noResults={<MenuItem disabled={true} text="No results."/>}
                                         fill={true}
                                         placeholder="All..."
                                         selectedItems={this.state.value.permissionsOptions.filter(i => this.isItemSelectedPermissions(i))}
                                         onItemSelect={this.handleItemSelectPermissions}
                                         itemRenderer={(item, {handleClick, modifiers, query}) => {
                                           return (
                                             <MenuItem
                                               icon={this.isItemSelectedPermissions(item) ? "tick" : "blank"}
                                               text={item.label}
                                               key={item.value}
                                               onClick={handleClick}
                                             />
                                           )
                                         }}
                                         tagInputProps={{
                                           onRemove: this.handleTagRemovePermissions,
                                           large: false,
                                         }}
                                         popoverProps={{
                                           usePortal: false
                                         }}
                            />
                          </div>

                        </div>

                        <div className="form-group__inline-wrapper">
                          <div
                            className="form-group form-group_width47 form-group__multiSelectBlueprint form-group__multiSelectBlueprint-pages">
                            <label htmlFor="categories-pages" className="font__edit">Categories</label>
                            <MultiSelect tagRenderer={this.tagRenderer} id="categories"
                                         items={this.state.categoryOptions}
                                         itemPredicate={this.onQueryChangeMulti}
                                         noResults={<MenuItem disabled={true} text="No results."/>}
                                         fill={true}
                                         placeholder="Categories..."
                                         selectedItems={this.state.value.categories}
                                         onItemSelect={this.handleItemSelectCategory}
                                         itemRenderer={(item, {handleClick, modifiers, query}) => {
                                           return (
                                             <MenuItem
                                               icon={this.isItemSelectedCategory(item) ? "tick" : "blank"}
                                               text={item.label}
                                               key={item.value}
                                               onClick={handleClick}
                                             />
                                           )
                                         }}
                                         tagInputProps={{
                                           onRemove: this.handleTagRemoveCategory,
                                           large: false,
                                         }}
                                         popoverProps={{
                                           usePortal: false
                                         }}
                            />
                          </div>

                          <div className="form-group form-group_width47">
                            <label htmlFor="redirect" className="font__edit">Redirect</label>


                            <InputGroup type="text"
                                        id="redirect"
                                        value={this.state.value.redirect || ""}
                                        onChange={e => {
                                          this.changeValue(e.target.value, "redirect");
                                        }}
                                        className="form-control-blueprint"
                            />
                          </div>
                        </div>
                        <div className="form-group__inline-wrapper">

                          <div className="addPage__bottom">
                            <div className="addPage__bottom-block">
                              <label style={{marginBottom: 0, marginRight: '16px'}}>
                                <input
                                  className="addPage__bottom-checkbox"
                                  checked={this.state.value.not_found || ""}
                                  onChange={e => {
                                    this.changeValue(e.target.checked, "not_found");
                                  }}
                                  type="checkbox"
                                  id="not_found"
                                />
                                <div className="control-switcher control-switcher_checked">
                                  <div className="control-switcher__on-text">ON</div>
                                  <div className="control-switcher__caret"/>
                                  <div className="control-switcher__off-text">OFF</div>
                                </div>
                              </label>
                              {/*<input type="checkbox" id="404"*/}
                              {/*       checked={this.state.value.not_found || ""}*/}
                              {/*       onChange={e => {*/}
                              {/*         this.changeValue(e.target.checked, "not_found");*/}
                              {/*       }}*/}
                              {/*       className="addPage__bottom-checkbox"/>*/}
                              <div className="addPage__bottom-label font__edit">404</div>
                            </div>

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
                                  this.setState(state => ({...state, value}));
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </React.Fragment>
                    );
                  }
                })()}
      {(this.state.currentTab === "content") && (
        <button onClick={this.savePage} className="btn btn_success" style={{marginRight: '20px'}}>
          Save
        </button>
      )}
      {(this.state.currentTab === "content" && !!this.state.id) && (
        <button
          className={this.state.value.path ? "btn btn_success" : "btn btn_disable"}
          onClick={this.handlePublish}
        >
          Publish
        </button>
      )}
      </div>
    {
      this.state.currentTab === 'Datasource' && (
        <div>
          <button onClick={() => this.setState({isModalOpened: true})} style={{margin: '14px 0'}}
                  className="btn btn_add">
            Add Data Source
          </button>
          <AdminTable
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
                title: 'Delete'
              }
            ]}
            rows={dataSources.slice(
              this.state.currentPage * this.itemsPerPage - this.itemsPerPage,
              this.state.currentPage * this.itemsPerPage
            )}
          />
          <Pagination
            pageCount={Math.ceil(this.state.dataSources.length / this.itemsPerPage) || 1}
            currentPage={this.state.currentPage}
            itemsCount={this.state.dataSources.length}
            changePage={page => {
              if (this.state.currentPage !== page) {
                this.setState({currentPage: page});
              }
            }}
          />
        </div>
      )
    }
    {
      (this.props.alt_seo && this.state.currentTab === this.props.alt_seo.name) && (
        this.props.alt_seo.component
      )
    }
  </div>

    {
      isModalOpened && (
        <AdminModal2
          closeHandler={() =>
            this.setState({isModalOpened: false, editingDataSource: null})
          }
        >
          <PageDataSourceForm
            id={this.props.id}
            updateHandler={this.getDataSources}
            dataSource={editingDataSource}
          />
        </AdminModal2>
      )
    }
  </div>
    <div>
      <Link className="btn btn_add btn_mrRight" to={`/admin/pages/edit/${this.props.id}`}>Open as a separate page</Link>
      <a href={`${this.state.value.path}`} className="btn btn_add btn_mrRight" target="_blank">
        Go To Page
      </a>
      <button onClick={() => this.deletePages(id)} className="btn btn_failure btn_mrRight">
        Delete Page
      </button>
    </div>
  </>
  ) :
    (
      <div className="noEmpty-container">
        <div className="noEmpty-block">
          <h2 className="noEmpty-title">
            There's nothing here.
          </h2>
          <p className="noEmpty-description">
            Select a page to view the settings on that panel
          </p>
        </div>
      </div>
    )
  }
  </>
  )
    ;
  }
  }

  const mapStateToProps = (state) => {
    return {
      standardModels: state.modelsState.standardModels,
      modelsState: state.modelsState.toggleModels,
      alt_seo: state.pluginsState.alt_seo
    }
  }

  SettingPage = compose(
  connect(mapStateToProps),
  withRouter
  )(SettingPage)

  export default SettingPage;
