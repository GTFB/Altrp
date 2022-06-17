import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import Resource from "../../../../editor/src/js/classes/Resource";
import {titleToName, titleToNameTwo} from "../../js/helpers";
import store from '../../js/store/store';

import AdminTable from "../AdminTable";
import AltrpSelect from "../altrp-select/AltrpSelect";
import AdminModal2 from "../AdminModal2";
import SQLsRemoteFieldForm from "./RemoteFieldForms/SQLsRemoteFieldForm";
import {InputGroup, MenuItem, Button, Alignment} from "@blueprintjs/core";
import {MultiSelect, Select} from "@blueprintjs/select";
import UserTopPanel from "../UserTopPanel";

const remoteFieldsColumns = [
  {
    name: 'name',
    title: 'Name'
  },
  {
    name: 'remote_find_column',
    title: 'Remote Find Column'
  },
  {
    name: 'remote_need_column',
    title: 'Remote Need Column'
  }
]

const rolesOptions = ['All']
const permissionsOptions = ['All']

class SqlEditor extends Component {
  constructor(props) {
    super(props);
    let storeState = store.getState();
    this.state = {
      modelTitle: 'Model Title',
      activeHeader: 0,
      value: {
        is_object: false,
        auth: false,
        model_id: null,
        name: '',
        title: '',
        description: '',
        sql: '',
        roles: [],
        permissions: [],
        test: '',
        id: null,
      },
      modelsOptions: [],
      AceEditor: storeState.aceEditorReducer.AceEditor,
      AceEditorResponse: storeState.aceEditorReducer.AceEditor,
      remoteFields: [],
      editingRemoteField: null,
      isFieldRemoteModalOpened: false,
      testResponse: '',
      testParams: {}
    };
    this.sqlEditorResource = new Resource({route: `/admin/ajax/sql_editors`});
    this.sqlEditorTest = new Resource({route: `/admin/ajax/sql_editors/test`});
    this.modelsResource = new Resource({ route: '/admin/ajax/model_options' });
    this.remoteFieldsResource = new Resource({ route: `/admin/ajax/remote_data/sql_editor/${this.props.match.params.id}` });
    this.onTest = this.onTest.bind(this);
    store.subscribe(this.aceEditorObserver);
  }

  /**
   * AceEditor загрузился
   */
  aceEditorObserver = () => {
    let storeState = store.getState();
    this.setState(state=>({
        ...state,
      AceEditor: storeState.aceEditorReducer.AceEditor,
      AceEditorResponse: storeState.aceEditorReducer.AceEditor,
    }))
  };

  /**
   * Компонент загрузился
   * @return {Promise<void>}
   */
  async componentDidMount() {
    const {id} = this.props.match.params;
    if(id){
      this.remoteFieldsResource.getAll()
        .then(remoteFields => this.setState({ remoteFields }));

      let value = await this.sqlEditorResource.get(id);
      this.editor = null;
      this.setState(state=>({
          ...state,
        value: {
          ...state.value,
          model_id: value.model_id,
          title: value.title,
          name: value.name,
          description: value.description,
          sql: value.sql,
          id: value.id,
          is_object: value.is_object
        }
      }))
    }
    let { options } = await this.modelsResource.getAll();
    options = options.filter(option => (option.label !== 'User'));
    this.setState({ modelsOptions: options });

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

  updateRemoteFields = async () => {
    let remoteFields = await this.remoteFieldsResource.getAll();
    this.setState(state => ({ ...state, remoteFields, isFieldRemoteModalOpened: false, editingRemoteField: null }));
  }

  ItemPredicate = (query, value) => {

    if (!query) {
      return true
    }
    if (value.label) {
      const index = _.findIndex(_.split(value.label, ""), char => {
        let similar = false;
        _.split(query, "").forEach(queryChar => {
          if (queryChar === char) {
            similar = true
          }
        });
        return similar
      });

      if (index !== -1) {
        return true
      } else {
        return false
      }
    } else {
      const index = _.findIndex(_.split(value, ""), char => {
        let similar = false;
        _.split(query, "").forEach(queryChar => {
          if (queryChar === char) {
            similar = true
          }
        });
        return similar
      });

      if (index !== -1) {
        return true
      } else {
        return false
      }
    }
  }

  tagRenderer = (item) => {
    return item;
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
        roles: [...state.value.roles].filter((i) => i !== item)
      },
    }));
  };





  isItemSelectedPermissions = (item) => {
    let itemString = JSON.stringify(item);
    let selectedString = JSON.stringify(this.state.value.permissions);
    return selectedString.includes(itemString);
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

  handleTagRemovePermissions = (item) => {
    this.setState(state => ({
      ...state,
      value: {
        ...state.value,
        permissions: [...state.value.permissions].filter((i) => i !== item)
      },
    }));
  };

  titleChangeHandler = (e) => {
    e.persist();
    const {id} = this.props.match.params;
    this.setState(state => ({
      ...state, value: {
        ...state.value,
        title: titleToNameTwo(e.target.value),
        name: id ? state.value.name : titleToName(e.target.value)
      }
    }))
  }

  /**
   * Имзенить поле
   * @param {*} value
   * @param {string} field
   */
  changeValue(value, field) {
    this.setState(state => {
      state = { ...state };
      if(field === 'name'){
        state.value[field] = titleToName(value);
      }else{
        state.value[field] = value;
      }
      if(field === 'title') {
        state.value.name = titleToName(value);
      }
      if(field === 'test') {
        state.value.test = value;
        let res = {};
        const arr = value.split('&');
        if (arr.length > 0) {
          for(let item of arr) {
            const a = item.split('=');
            if (a[0]) {
              res[a[0]] = a[1];
            }
          }
        }
        state.testParams = res;
        state.testParams.sql = state.value.sql;
      }
      return state
    })
  }

  /**
   * отправка данных
   * @return {*}
   */
  onSubmit = async e => {
    try {
      const {id} = this.props.match.params;
      e.preventDefault();
      let res;
      if(! this.state.value.sql){
        return alert('Заполните SQL Query');
      }
      if(id){
        res = await this.sqlEditorResource.put(id, this.state.value);
      } else {
        res = await this.sqlEditorResource.post(this.state.value);
      }
      if(res.success){
        this.props.history.push('/admin/tables/sql_editors');
      } else {
        alert(res.message);
      }
    } catch (error) {
      alert("Ошибка, проверьте еще раз внимательно введенные данные");
      console.error(error);
    }
  };

  onTest = async () => {
    this.state.testParams.sql = this.state.value.sql;
    let testResponse = await this.sqlEditorTest.post(this.state.testParams);
    if (testResponse.success)
      testResponse = JSON.stringify(testResponse.success);
    if (testResponse.error)
      testResponse = JSON.stringify(testResponse.error);
    this.setState(state => ({
      ...state,
      testResponse
    }))
  }

  render() {
    if(! this.state.AceEditor){
      return ''
    }
    const {id} = this.props.match.params;
    const { isFieldRemoteModalOpened, remoteFields, editingRemoteField } = this.state;
    return (
      <div className="admin-pages admin-page">
      <div className={this.state.activeHeader ? "admin-heading admin-heading-shadow" : "admin-heading"}>
        <div className="admin-heading-left">
          <div className="admin-breadcrumbs">
            <Link className="admin-breadcrumbs__link" to="/admin/tables/sql_editors">All  SQL Queries</Link>
            <span className="admin-breadcrumbs__separator">/</span>

            <span className="admin-breadcrumbs__current">Add SQL Query</span>
          </div>
        </div>
        <UserTopPanel />
      </div>
      <div className="admin-content">
        <form className="admin-form field-form" onSubmit={this.onSubmit}>
            <div className="form-group-sql">
              <div className="form-sql_width">

                <div className="form-group__inline-wrapper">
                  <div className="form-group form-group_width47">
                    <label htmlFor="field-title" className="sql-editor-label">Title</label>
                    {/*<input type="text" id="field-title" required*/}
                    {/*       value={this.state.value.title || ''}*/}
                    {/*       onChange={e => {*/}
                    {/*         this.changeValue(e.target.value, 'title')*/}
                    {/*       }}*/}
                    {/*       className="form-control"/>*/}

                    <InputGroup type="text"
                                id="field-title"
                                required
                     value={this.state.value.title || ''}
                     onChange={this.titleChangeHandler}
                                className="form-control-blueprint"
                    />
            </div>
                  <div className="form-group form-group_width47">
                    <label htmlFor="field-name" className="sql-editor-label">Name</label>
                    {/*<input type="text" id="field-name" required readOnly={id}*/}
                    {/*       value={this.state.value.name || ''}*/}
                    {/*       onChange={e => {*/}
                    {/*         this.changeValue(e.target.value, 'name')*/}
                    {/*       }}*/}
                    {/*       className="form-control"/>*/}

                    <InputGroup type="text"
                                id="field-name"
                                required
                                readOnly={id}
                     value={this.state.value.name || ''}
                     onChange={e => {
                       this.changeValue(e.target.value, 'name')
                     }}
                                className="form-control-blueprint"
                    />
                  </div>
            </div>
                <div className="form-group__inline-wrapper">
                  <div className="form-group form-group_width47">
                    <label htmlFor="field-name" className="sql-editor-label">Description</label>
                    {/*<input type="text" id="field-description"*/}
                    {/*       value={this.state.value.description || ''}*/}
                    {/*       onChange={e => {*/}
                    {/*         this.changeValue(e.target.value, 'description')*/}
                    {/*       }}*/}
                    {/*       className="form-control"/>*/}

                    <InputGroup type="text"
                                id="field-description"
                                required
                     value={this.state.value.description || ''}
                     onChange={e => {
                       this.changeValue(e.target.value, 'description')
                     }}
                                className="form-control-blueprint"
                    />
            </div>
            {/*<div className="form-group col-12">*/}
              {/*<input type="checkbox" id="relation-paged"*/}
                     {/*checked={this.state.value.paged}*/}
                     {/*onChange={e => { this.changeValue(e.target.checked, 'paged') }}*/}
              {/*/>*/}
              {/*<label className="checkbox-label" htmlFor="relation-paged">Paged</label>*/}
            {/*</div>*/}
                  <div
                    className="form-group form-group_width47 flex-grow__selectBlueprint overflow-select__blueprint-sql">
                    <label htmlFor="relation-model_id" className="sql-editor-label">Model</label>
                    {/*<select id="relation-model_id" required disabled={id}*/}
                    {/*        value={this.state.value.model_id || ''}*/}
                    {/*        onChange={e => { this.changeValue(e.target.value, 'model_id') }}*/}
                    {/*        className="form-control"*/}
                    {/*>*/}
                    {/*  <option disabled value="" />*/}
                    {/*  {this.state.modelsOptions.map(({ value, label }) =>*/}
                    {/*    <option key={value} value={value}>*/}
                    {/*      {label}*/}
                    {/*    </option>)}*/}
                    {/*</select>*/}


                    <Select items={this.state.modelsOptions}
                            disabled={id}
                            matchTargetWidth
                            itemPredicate={this.ItemPredicate}
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
                              this.changeValue(current.value, 'model_id')
                            }}
                            fill={true}
              >
                      <Button disabled={id}
                              fill
                              large
                              alignText={Alignment.LEFT}
                              text={this.state.modelsOptions.find(item => (item.value === this.state.value.model_id))?.label || 'none'}
                              rightIcon="caret-down"
                      />
                    </Select>
            </div>
                </div>

                <div className="sql-checkbox__block">
                  <div className="form-group sql__checkbox">
              <input type="checkbox" id="field-auth"
                     checked={this.state.value.auth} value={this.state.value.auth}
                           onChange={e => {
                             this.changeValue(e.target.checked, 'auth')
                           }}
              />
                    <label className="checkbox-label sql-editor-label" htmlFor="field-auth">Auth</label>
            </div>
                  <div className="form-group sql__checkbox">
              <input type="checkbox" id="field-is_object"
                     checked={this.state.value.is_object}
                     value={this.state.value.is_object}
                     onChange={e => { this.changeValue(e.target.checked, 'is_object') }}

              />
                    <label className="checkbox-label sql-editor-label" htmlFor="field-is_object">As Object</label>
            </div>
                </div>

                <div className="form-group__inline-wrapper">
                  {!this.state.value.auth ? '' : <>
                    <div className="form-group form-group__multiSelectBlueprint form-group__multiSelectBlueprint-sql form-group_width47">
                      <label htmlFor="field-roles" className="sql-editor-label">Roles</label>
                      {/*<AltrpSelect id="field-roles"*/}
                      {/*             isMulti={true}*/}
                      {/*             optionsRoute="/admin/ajax/role_options"*/}
                      {/*             placeholder="All"*/}
                      {/*             defaultOptions={[*/}
                      {/*               {*/}
                      {/*                 value: null,*/}
                      {/*                 label: 'All',*/}
                      {/*               }*/}
                      {/*             ]}*/}
                      {/*             value={this.state.value.roles || ''}*/}
                      {/*             onChange={value => {this.changeValue(value, 'roles')}}*/}
                      {/*/>*/}

                      <MultiSelect tagRenderer={this.tagRenderer} id="field-roles"
                                   items={rolesOptions}
                                   itemPredicate={this.ItemPredicate}
                                   noResults={<MenuItem disabled={true} text="No results."/>}
                                   fill={true}
                           placeholder="All"
                                   selectedItems={this.state.value.roles}
                                   onItemSelect={this.handleItemSelectRoles}
                                   itemRenderer={(item, {handleClick, modifiers, query}) => {
                                     return (
                                       <MenuItem
                                         icon={this.isItemSelectedRoles(item) ? "tick" : "blank"}
                                         text={item}
                                         key={item}
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
                    <div className="form-group form-group__multiSelectBlueprint form-group__multiSelectBlueprint-sql form-group_width47">
                      <label htmlFor="field-permissions" className="sql-editor-label">Permissions</label>
                      {/*<AltrpSelect id="field-permissions"*/}
                      {/*             isMulti={true}*/}
                      {/*             optionsRoute="/admin/ajax/permissions_options"*/}
                      {/*             placeholder="All"*/}
                      {/*             defaultOptions={[*/}
                      {/*               {*/}
                      {/*                 value: null,*/}
                      {/*                 label: 'All',*/}
                      {/*               }*/}
                      {/*             ]}*/}
                      {/*             value={this.state.value.permissions}*/}
                      {/*             onChange={value => {*/}
                      {/*               this.changeValue(value, 'permissions')*/}
                      {/*             }}*/}
                      {/*/>*/}

                      <MultiSelect tagRenderer={this.tagRenderer} id="field-permissions"
                                   items={permissionsOptions}
                                   itemPredicate={this.ItemPredicate}
                                   noResults={<MenuItem disabled={true} text="No results."/>}
                                   fill={true}
                           placeholder="All"
                                   selectedItems={this.state.value.permissions}
                                   onItemSelect={this.handleItemSelectPermissions}
                                   itemRenderer={(item, {handleClick, modifiers, query}) => {
                                     return (
                                       <MenuItem
                                         icon={this.isItemSelectedPermissions(item) ? "tick" : "blank"}
                                         text={item}
                                         key={item}
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
                  </>}
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="field-name" className="sql-editor-label">SQL Query</label>
              {this.state.AceEditor && (this.editor = (this.editor || <this.state.AceEditor
                  mode="sql"
                  theme="textmate"
                  onChange={value => {
                    this.changeValue(value, 'sql')
                  }}
                  className="field-ace"
                  name="aceEditor"
                  height="38em"
                  setOptions={{
                    value: this.state.value.sql || ''
                  }}
                  showPrintMargin={false}
                  style={{
                    width: '100%'
                  }}
                  enableLiveAutocompletion={true} />))}
            </div>
              <div className="form-group__inline-wrapper field-input__center">
                <div className="form-group field-input__width">
                  {/*<input type="text" id="field-test"*/}
                  {/*       value={this.state.value.test  || ''}*/}
                  {/*       placeholder='Parametr for test (task_id=3&id=1)'*/}
                  {/*       onChange={e => {*/}
                  {/*         this.changeValue(e.target.value, 'test')*/}
                  {/*       }}*/}
                  {/*       className="form-control"*/}
                  {/*/>*/}

                  <InputGroup type="text"
                              id="field-test"
                       placeholder='Parametr for test (task_id=3&id=1)'
                              value={this.state.value.test || ''}
                       onChange={e => {
                         this.changeValue(e.target.value, 'test')
                       }}
                              className="form-control-blueprint"
                />
              </div>
                <div className="form-group">
                <button className="btn btn_success" type="button" onClick={this.onTest}>Test</button>
              </div>
            </div>
              <div className="form-group">
                <label htmlFor="field-name" className="sql-editor-label">Test Result</label>
              <this.state.AceEditorResponse
                mode="javascript"
                theme="textmate"
                onChange={value => {
                  this.changeValue(value, 'test')
                }}
                className="field-ace"
                name="aceEditorResponse"
                height="15em"
                wrapEnabled={true}
                value={this.state.testResponse || ''}
                showPrintMargin={false}
                setOptions={{
                  value: this.state.testResponse || ''
                }}
                style={{
                  width: '100%'
                }}
                enableLiveAutocompletion={false} />
            </div>
          </div>

          <div className="btn__wrapper btn_add">
            <button className="btn btn_success" type="submit">Add</button>
            <Link className="btn" to={`/admin/tables/sql_editors`}>Cancel</Link>


            {/* TODO: отображать кнопку если в форме редактируются данные
          повесить обработчик удаления
        <button className="btn btn_failure">Delete</button> */}
          </div>
        </form>
        {id && <>
          <h2 className="sub-header">Remote Fields</h2>
          <AdminTable
            columns={remoteFieldsColumns}
            quickActions={[{
              callBack: field => this.setState({ isFieldRemoteModalOpened: true, editingRemoteField: field }),
              title: 'Edit'
            }, {
              tag: 'button',
              route: `/admin/ajax/remote_data/:id`,
              method: 'delete',
              confirm: 'Are You Sure?',
              after: () => this.updateRemoteFields(),
              className: 'quick-action-menu__item_danger',
              title: 'Trash'
            }]}
            rows={remoteFields}
              radiusTable={true}
          />
            <button onClick={() => this.setState({isFieldRemoteModalOpened: true, editingRemoteField: null})}
                    className="btn btn_add">
            Add Remote Field
          </button>
        </>}
      </div>
        {isFieldRemoteModalOpened &&
        <AdminModal2 closeHandler={() => this.setState({isFieldRemoteModalOpened: false, editingRemoteField: null})}>
        <SQLsRemoteFieldForm
          remoteFieldsResource={this.remoteFieldsResource}
          updateRemoteFields={this.updateRemoteFields}
          field={editingRemoteField}
        />
      </AdminModal2>}
      </div>
    )
  }
}

export default withRouter(SqlEditor);
