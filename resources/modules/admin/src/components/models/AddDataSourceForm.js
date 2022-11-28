import React, {Component, Fragment} from "react";
import {Link, withRouter} from "react-router-dom";
import Resource from "../../../../editor/src/js/classes/Resource";
import {titleToName, titleToNameTwo} from "../../js/helpers";
import HeaderComponent from "./HeaderComponent"
import {InputGroup, MenuItem, Button, Alignment} from "@blueprintjs/core";
import {Select, MultiSelect} from "@blueprintjs/select";



const DataSourceType = ['get', 'show', 'options', 'filters', 'add', 'update', 'update_column', 'delete', 'remote' ]
const requestType = ['get', 'post', 'put', 'delete']


class AddDataSourceForm extends Component {
  state = {
    modelsOptions: [],
    rolesOptions: [],
    permissionsOptions: [],
    typeIsDisabled: false,
    value: {
      title: '',
      name: '',
      description: '',
      type: 'remote',
      request_type: 'get',
      model_id: '',
      url: '',
      api_url: '',
      auth: true,
      access: {
        roles: [],
        permissions: []
      },
      headers: [],
      bodies: []
    }
  }

  async componentDidMount()  {
    const {id} = this.props.match.params;

    new Resource({route: '/admin/ajax/model_options'}).getAll()
      .then(({options}) => this.setState({modelsOptions: options}));
    const rolesOptions = await (new Resource({route: '/admin/ajax/role_options'}).getAll())
    const permissionsOptions = await(new Resource({route: '/admin/ajax/permissions_options'}).getAll())

    if (id) {
      const resource = new Resource({route: '/admin/ajax/data_sources'});
      resource.get(id).then(value => {
        value.access.roles = value?.access?.roles?.map(r=>rolesOptions.find(o=>o.value == r))
        value.access.permissions = value?.access?.permissions?.map(p=>permissionsOptions.find(o=>o.value == p))
        this.setState({
        rolesOptions,
        permissionsOptions,
        value: {...value, headers: Object.entries(value.headers || {}), bodies: Object.entries(value.bodies || {})},
        typeIsDisabled: value.type === 'remote'
      })})
    } else {
      this.setState(state => ({
        ...state,
        rolesOptions,
        permissionsOptions,
      }))
    }
  }

  ItemPredicateType = (query, value) => {
    return (
      `${value.toLowerCase()}`.indexOf(query?.toLowerCase()) >= 0
    );
  }

  ItemPredicate = (query, value) => {
    return (
      `${value.label?.toLowerCase()}`.indexOf(query?.toLowerCase()) >= 0
    );
  }

  changeValue = (value, field) => {
    this.setState(state => {
      state = {...state};
      state.value[field] = value;
      return state
    })
  }

  titleChangeHandler = e => {
    e.persist();
    this.setState(state => ({
      ...state, value: {
        ...state.value,
        title: titleToNameTwo(e.target.value),
        name: this.props.paramsId ? state.value.name : titleToName(e.target.value)
      }
    }))
  }

  /**
   * Смена ролей
   */
  changeRoles = (roles) => {
    let _roles = [];
    if (roles) roles.forEach(r => {
      _roles.push(r.value)
    });
    this.setState(state => {
      const newState = _.cloneDeep(state);
      newState.value.access.roles = _roles;
      return newState;
    });
  };
  /**
   * Смена разрешений
   */
  changePermission = (permissions) => {
    let _permissions = [];
    if (permissions) permissions.forEach(p => {
      _permissions.push(p.value)
    });
    this.setState(state => {
      const newState = _.cloneDeep(state);
      newState.value.access.permissions = _permissions;
      return newState;
    });
  };

  headerDeleteHandler = index => {
    this.setState(state => {
      const headers = [...state.value.headers];
      headers.splice(index, 1);
      return {
        ...state,
        value: {...state.value, headers}
      };
    });
  };

  headerChangeHandler = (e, index) => {
    const {name, value} = e.target;

    this.setState(state => {
      let headers = [...state.value.headers];
      headers[index][+name] = value;
      return {
        ...state,
        value: {...state.value, headers}
      };
    });
  };

  headerAddHandler = () => {
    this.setState(state => {
      const headers = [...state.value.headers, ["", ""]];
      return {
        ...state,
        value: {...state.value, headers}
      };
    });
  };

  bodyDeleteHandler = index => {
    this.setState(state => {
      const bodies = [...state.value.bodies];
      bodies.splice(index, 1);
      return {
        ...state,
        value: {...state.value, bodies}
      };
    });
  };

  bodyChangeHandler = (e, index) => {
    const {name, value} = e.target;

    this.setState(state => {
      let bodies = [...state.value.bodies];
      bodies[index][+name] = value;
      return {
        ...state,
        value: {...state.value, bodies}
      };
    });
  };

  bodyAddHandler = () => {
    this.setState(state => {
      const bodies = [...state.value.bodies, ["", ""]];
      return {
        ...state,
        value: {...state.value, bodies}
      };
    });
  };

  // MultiSelect

  tagRenderer = (item) => {
    return item.label;
  };

  isItemSelectedRoles = (item) => {
    return this.state.value.access.roles.some(c=>c.value === item.value);
  };

  handleItemSelectRoles = (item) => {
    if (!this.isItemSelectedRoles(item)) {
      this.setState(state => ({
        ...state,
        value: {
          ...state.value,
          access: {
            ...state.value.access,
            roles: [...state.value.access.roles, item]
          }
        },
      }));
    }
  };

  handleTagRemoveRoles = (item) => {
    this.setState(state => ({
      ...state,
      value: {
        ...state.value,
        access: {
          ...state.value.access,
          roles: [...state.value.access.roles].filter((i) => i.label !== item)
        }
      },
    }));
  };

  isItemSelectedPermissions = (item) => {
    return this.state.value.access.permissions.some(c=>c.value === item.value);
  };

  handleItemSelectPermissions = (item) => {
    if (!this.isItemSelectedPermissions(item)) {
      this.setState(state => ({
        ...state,
        value: {
          ...state.value,
          access: {
            ...state.value.access,
            permissions: [...state.value.access.permissions, item]
          }
        },
      }));
    }
  };

  handleTagRemovePermissions = (item) => {
    this.setState(state => ({
      ...state,
      value: {
        ...state.value,
        access: {
          ...state.value.access,
          permissions: [...state.value.access.permissions].filter((i) => i.label !== item)
        }
      },
    }));
  };

  submitHandler = e => {
    e.preventDefault();
    const resource = new Resource({route: '/admin/ajax/data_sources'});
    const {id} = this.props.match.params;
    const headers = Object.fromEntries(this.state.value.headers);
    const bodies = Object.fromEntries(this.state.value.bodies);
    const data = {...this.state.value, headers, bodies};

    (id ? resource.put(id, data) : resource.post(data))
      .then(() => this.props.history.goBack());
  }

  render() {
    const {roles, permissions} = this.state.value.access;
    const {rolesOptions, permissionsOptions} = this.state;
    const {headers, bodies} = this.state.value;
    const {id} = this.props.match.params;

    return (
      <form className="admin-form-dataSources" onSubmit={this.submitHandler}>
        <div className="admin-form-dataSources__inputs">
          <div className="form-group__inline-wrapper">
            <div className="form-group form-group_width47">
              <label htmlFor="data-source-title" className="data-source-label">Data Source Title</label>
              {/*<input type="text" id="data-source-title" required*/}
              {/*       value={this.state.value.title}*/}
              {/*       onChange={this.titleChangeHandler}*/}
              {/*       className="form-control"/>*/}

              <InputGroup type="text"
                          id="data-source-title"
                          required
                          value={this.state.value.title}
                          onChange={this.titleChangeHandler}
                          className="form-control-blueprint"
              />
            </div>

            <div className="form-group form-group_width47">
              <label htmlFor="data-source-title"  className="data-source-label">Data Source Name</label>
              {/*<input type="text" id="data-source-title" required*/}
              {/*       value={this.state.value.name}*/}
              {/*       onChange={e => {*/}
              {/*         this.changeValue(e.target.value, 'name')*/}
              {/*       }}*/}
              {/*       className="form-control"/>*/}

              <InputGroup type="text"
                          id="data-source-title"
                          required
                          value={this.state.value.name}
                          onChange={e => {
                            this.changeValue(e.target.value, 'name')
                          }}
                          className="form-control-blueprint"
                          readOnly={this.props.paramsId}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="data-source-description" className="data-source-label">Data Source Description</label>
            {/*<input type="text" id="data-source-description"*/}
            {/*       value={this.state.value.description}*/}
            {/*       onChange={e => {*/}
            {/*         this.changeValue(e.target.value, 'description')*/}
            {/*       }}*/}
            {/*       className="form-control"/>*/}

            <InputGroup type="text"
                        id="data-source-description"
                        value={this.state.value.description}
                        onChange={e => {
                          this.changeValue(e.target.value, 'description')
                        }}
                        className="form-control-blueprint"
            />
          </div>

          <div className="form-group__inline-wrapper">
            <div className="form-group flex-grow__selectBlueprint form-group_width47">
              <label htmlFor="data-source-type" className="data-source-label">Data Source Type</label>
              {/*<select id="data-source-type" required*/}
              {/*        name="type"*/}
              {/*        value={this.state.value.type}*/}
              {/*        onChange={e => {*/}
              {/*          this.changeValue(e.target.value, 'type')*/}
              {/*        }}*/}
              {/*        className="form-control"*/}
              {/*        disabled={!this.props.match.params.id || this.state.typeIsDisabled}*/}
              {/*>*/}
              {/*  /!* <option disabled value="" /> *!/*/}
              {/*  <option value="get">get</option>*/}
              {/*  <option value="show">show</option>*/}
              {/*  <option value="options">options</option>*/}
              {/*  <option value="filters">filters</option>*/}
              {/*  <option value="add">add</option>*/}
              {/*  <option value="update">update</option>*/}
              {/*  <option value="update_column">update_column</option>*/}
              {/*  <option value="delete">delete</option>*/}
              {/*  <option value="remote">remote</option>*/}
              {/*</select>*/}


              <Select items={DataSourceType}
                      matchTargetWidth
                      itemPredicate={this.ItemPredicateType}
                      disabled={!this.props.match.params.id || this.state.typeIsDisabled}
                      noResults={<MenuItem disabled={true} text="No results." />}
                      itemRenderer={(item, {handleClick, modifiers, query}) => {
                        return <MenuItem
                          text={item}
                          key={item}
                          active={item === this.state.value.type }
                          onClick={handleClick}
                        />
                      }}
                      onItemSelect={current => {
                        this.changeValue(current, 'type')
                      }}
                      fill={true}
              >
                <Button fill
                        large
                        alignText={Alignment.LEFT}
                        text={this.state.value.type}
                        rightIcon="caret-down"
                        disabled={!this.props.match.params.id || this.state.typeIsDisabled}
                />
              </Select>
            </div>

            <div className="form-group flex-grow__selectBlueprint form-group_width47">
              <label htmlFor="data-source-type" className="data-source-label">Request Type</label>
              {/*<select id="data-source-type" required*/}
              {/*        name="type"*/}
              {/*        value={this.state.value.request_type}*/}
              {/*        onChange={e => {*/}
              {/*          this.changeValue(e.target.value, 'request_type')*/}
              {/*        }}*/}
              {/*        className="form-control"*/}
              {/*>*/}
              {/*  <option disabled value=""/>*/}
              {/*  <option value="get">get</option>*/}
              {/*  <option value="post">post</option>*/}
              {/*  <option value="put">put</option>*/}
              {/*  <option value="delete">delete</option>*/}
              {/*</select>*/}


              <Select items={requestType}
                      matchTargetWidth
                      itemPredicate={this.ItemPredicateType}
                      noResults={<MenuItem disabled={true} text="No results." />}
                      itemRenderer={(item, {handleClick, modifiers, query}) => {
                        return <MenuItem
                          text={item}
                          key={item}
                          active={item === this.state.value.request_type }
                          onClick={handleClick}
                        />
                      }}
                      onItemSelect={current => {
                        this.changeValue(current, 'request_type')
                      }}
                      fill={true}
              >
                <Button fill large alignText={Alignment.LEFT} text={this.state.value.request_type} rightIcon="caret-down"/>
              </Select>
            </div>
          </div>

          <div className="form-group flex-grow__selectBlueprint overflow-select__blueprint">
            <label htmlFor="data-source-model_id" className="data-source-label">Model</label>
            {/*<select id="data-source-model_id" required*/}
            {/*        value={this.state.value.model_id}*/}
            {/*        onChange={e => {*/}
            {/*          this.changeValue(e.target.value, 'model_id')*/}
            {/*        }}*/}
            {/*        className="form-control"*/}
            {/*        disabled={this.props.match.params.id}*/}
            {/*>*/}
            {/*  <option disabled value=""/>*/}
            {/*  {this.state.modelsOptions.map(({value, label}) =>*/}
            {/*    <option key={value} value={value}>*/}
            {/*      {label}*/}
            {/*    </option>)}*/}
            {/*</select>*/}


            <Select items={this.state.modelsOptions}
                    matchTargetWidth
                    itemPredicate={this.ItemPredicate}
                    disabled={this.props.match.params.id}
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
                      this.changeValue(current.value, 'model_id')
                    }}
                    fill={true}
            >
              <Button fill large alignText={Alignment.LEFT}
                      text={this.state.modelsOptions.find(item => (item.value === this.state.value.model_id))?.label || 'none'}
                      rightIcon="caret-down"
                      disabled={this.props.match.params.id}
              />
            </Select>
          </div>

          <div className="form-group__inline-wrapper">
            <div className="form-group form-group_width47">
              <label htmlFor="data-source-url" className="data-source-label">Route</label>
              {/*<input type="text" id="data-source-url" required*/}
              {/*       value={this.state.value.url}*/}
              {/*       onChange={e => {*/}
              {/*         this.changeValue(e.target.value, 'url')*/}
              {/*       }}*/}
              {/*       className="form-control"/>*/}

              <InputGroup type="text"
                          id="data-source-url"
                          required
                          value={this.state.value.url}
                          onChange={e => {
                            this.changeValue(e.target.value, 'url')
                          }}
                          className="form-control-blueprint"
              />
            </div>

            <div className="form-group form-group_width47">
              <label htmlFor="data-source-api_url" className="data-source-label">API Route</label>
              {/*<input type="text" id="data-source-api_url" required*/}
              {/*       value={this.state.value.api_url}*/}
              {/*       onChange={e => {*/}
              {/*         this.changeValue(e.target.value, 'api_url')*/}
              {/*       }}*/}
              {/*       className="form-control"/>*/}

              <InputGroup type="text"
                          id="data-source-api_url"
                          required
                          value={this.state.value.api_url}
                          onChange={e => {
                            this.changeValue(e.target.value, 'api_url')
                          }}
                          className="form-control-blueprint"
              />
            </div>
          </div>

          <h2 className="admin-form__subheader centred">Access</h2>

          <div className="data_sources_checkbox">
            <input type="checkbox" id="field-auth"
                  checked={this.state.value.auth} value={this.state.value.auth}
                  onChange={e => {
                    this.changeValue(e.target.checked, 'auth')
                  }}
            />
            <label className="checkbox-label" htmlFor="field-auth" >Auth</label>
          </div>

          {this.state.value.auth ? <div className="form-group__inline-wrapper">
            <div className="form-group form-group__multiSelectBlueprint form-group_width47 ">
              <label htmlFor="roles" className="data-source-label">Roles</label>
              {/*<AltrpSelect id="roles"*/}
              {/*             closeMenuOnSelect={false}*/}
              {/*             value={_.filter(rolesOptions, r => roles.indexOf(r.value) >= 0)}*/}
              {/*             isMulti={true}*/}
              {/*             onChange={this.changeRoles}*/}
              {/*             options={rolesOptions}/>*/}
              <MultiSelect tagRenderer={this.tagRenderer} id="roles"
                           items={rolesOptions}
                           itemPredicate={this.ItemPredicate}
                           noResults={<MenuItem disabled={true} text="No results." />}
                           fill={true}
                           placeholder="Select..."
                           selectedItems={roles}
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

            <div className="form-group form-group__multiSelectBlueprint overflow-blueprint__multiSelect form-group_width47">
              <label htmlFor="permissions" className="data-source-label">Permissions</label>
              {/*<AltrpSelect id="roles"*/}
              {/*             value={_.filter(permissionsOptions, p => permissions.indexOf(p.value) >= 0)}*/}
              {/*             closeMenuOnSelect={false}*/}
              {/*             isMulti={true}*/}
              {/*             onChange={this.changePermission}*/}
              {/*             options={permissionsOptions}/>*/}
              <MultiSelect tagRenderer={this.tagRenderer} id="roles"
                           items={permissionsOptions}
                           itemPredicate={this.ItemPredicate}
                           noResults={<MenuItem disabled={true} text="No results." />}
                           fill={true}
                           placeholder="Select..."
                           selectedItems={permissions}
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
          </div> : null}

          {this.state.value.auth && roles.length > 1 ? <div className="form-group__inline-wrapper">
            <div className="form-group form-group_width47 data_sources_checkbox">
             <input type="checkbox" id="field-all-roles"
                    checked={this.state.value.need_all_roles} value={this.state.value.need_all_roles}
                    onChange={e => {
                      this.changeValue(e.target.checked, 'need_all_roles')
                    }}
             />
             <label className="checkbox-label" htmlFor="field-all-roles" >Need all roles</label>
            </div>
          </div> : null}

          <div className="btn__wrapper data-source__btn-wrapper">
            <button className="btn btn_success" type="submit">{id ? 'Edit' : 'Add'}</button>
            <Link className="btn" to="/admin/tables/models">Cancel</Link>
            {/* <button className="btn btn_failure">Delete</button> */}
          </div>
        </div>

        <div className="admin-form-dataSources__create">
          <div className="admin-form-dataSources__block">
            <div className="admin-form-dataSources__top">
              <h2 className="admin-form__subheader">Headers</h2>
              <button className="btn btn_success" type="button" onClick={this.headerAddHandler}>
                + New Header
              </button>
            </div>


            {headers && headers.map((item, index) => <Fragment key={index}>
             <div className={index !== 0 ? "HeaderComponent__block dataSources__border" : "HeaderComponent__block"}>
               <HeaderComponent item={item} changeHandler={e => this.headerChangeHandler(e, index)}/>
               <button className="btn btn_failure" type="button" onClick={() => this.headerDeleteHandler(index)}>
                 ✖
               </button>
             </div>
            </Fragment>)}
          </div>

          <div className="admin-form-dataSources__block">
            <div className="admin-form-dataSources__top">
              <h2 className="admin-form__subheader">Bodies</h2>
              <button className="btn btn_success" type="button" onClick={this.bodyAddHandler}>
                + New Body
              </button>
            </div>


            {bodies && bodies.map((item, index) => <Fragment key={index}>
              <div className={index !== 0 ? "HeaderComponent__block dataSources__border" : "HeaderComponent__block"}>
                <HeaderComponent item={item} changeHandler={e => this.bodyChangeHandler(e, index)}/>
                <button className="btn btn_failure" type="button" onClick={() => this.bodyDeleteHandler(index)}>
                  ✖
                </button>
              </div>
            </Fragment>)}
          </div>
        </div>
      </form>
    )
  }
}

export default withRouter(AddDataSourceForm);
