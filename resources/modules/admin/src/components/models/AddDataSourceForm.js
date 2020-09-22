import React, { Component } from "react";
import { Link } from "react-router-dom";
import AltrpSelect from "../altrp-select/AltrpSelect";
import Resource from "../../../../editor/src/js/classes/Resource";
import { titleToName } from "../../js/helpers";


// const typeOptions = ['resource', 'Get Queried', 'create', 'read', 'update', 'delete', 'options'];
const mockedOptions = [
  { value: 1, label: "Model title 1" },
  { value: 2, label: "Model title 2" },
  { value: 3, label: "Model title 3" },
];

class AddDataSourceForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // modelsOptions: [],   TODO: заменить замоканые данные
      modelsOptions: mockedOptions,
      value: {
        title: '',
        name: '',
        description: '',
        type: '',
        request_type: '',
        model_id: '',
        url: '',
        api_url: '',
        auth: true,
        access: {
          roles: [],
          permissions: []
        }
      },
    };
    this.submitHandler = this.submitHandler.bind(this);
  }

  componentDidMount() {
    const resource = new Resource({ route: '/admin/ajax/model_options' });
    resource.getAll().then(({ options }) => this.setState({ modelsOptions: options }));
  }

  changeValue(value, field) {
    this.setState(state => {
      state = { ...state };
      state.value[field] = value;
      return state
    })
  }

  titleChangeHandler = e => {
    e.persist();
    this.setState(state => ({
      ...state, value: {
        ...state.value,
        title: e.target.value,
        name: titleToName(e.target.value)
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

  submitHandler(e) {
    e.preventDefault();
    const resource = new Resource({ route: '/admin/ajax/data_sources' });
    resource.post(this.state.value);
    console.log(this.state.value);
  }

  render() {
    return <form className="admin-form" onSubmit={this.submitHandler}>
      <div className="form-group__inline-wrapper">
        <div className="form-group form-group_width47">
          <label htmlFor="data-source-title">Data Source Title</label>
          <input type="text" id="data-source-title" required
            value={this.state.value.title}
            onChange={this.titleChangeHandler}
            className="form-control" />
        </div>

        <div className="form-group form-group_width47">
          <label htmlFor="data-source-title">Data Source Name</label>
          <input type="text" id="data-source-title" required
            value={this.state.value.name}
            onChange={e => { this.changeValue(e.target.value, 'name') }}
            className="form-control" />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="data-source-description">Data Source Description</label>
        <input type="text" id="data-source-description"
          value={this.state.value.description}
          onChange={e => { this.changeValue(e.target.value, 'description') }}
          className="form-control" />
      </div>

      <div className="form-group__inline-wrapper">
        <div className="form-group form-group_width47">
          <label htmlFor="data-source-type">Data Source Type</label>
          <select id="data-source-type" required
            name="type"
            value={this.state.value.type}
            onChange={e => { this.changeValue(e.target.value, 'type') }}
            className="form-control"
          >
            <option disabled value="" />
            <option value="remote">remote</option>
          </select>
        </div>

        <div className="form-group form-group_width47">
          <label htmlFor="data-source-type">Request Type</label>
          <select id="data-source-type" required
            name="type"
            value={this.state.value.request_type}
            onChange={e => { this.changeValue(e.target.value, 'request_type') }}
            className="form-control"
          >
            <option disabled value="" />
            <option value="get">get</option>
            <option value="post">post</option>
            <option value="put">put</option>
            <option value="delete">delete</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="data-source-model_id">Model</label>
        <select id="data-source-model_id" required
          value={this.state.value.model_id}
          onChange={e => { this.changeValue(e.target.value, 'model_id') }}
          className="form-control"
        >
          <option disabled value="" />
          {this.state.modelsOptions.map(({ value, label }) =>
            <option key={value} value={value}>
              {label}
            </option>)}
        </select>
      </div>

      <div className="form-group__inline-wrapper">
        <div className="form-group form-group_width47">
          <label htmlFor="data-source-url">Route</label>
          <input type="text" id="data-source-url" required
            value={this.state.value.url}
            onChange={e => { this.changeValue(e.target.value, 'url') }}
            className="form-control" />
        </div>

        <div className="form-group form-group_width47">
          <label htmlFor="data-source-api_url">API Route</label>
          <input type="text" id="data-source-api_url" required
            value={this.state.value.api_url}
            onChange={e => { this.changeValue(e.target.value, 'api_url') }}
            className="form-control" />
        </div>
      </div>

      <h2 className="admin-form__subheader centred">Access</h2>

      <input type="checkbox" id="field-auth"
        checked={this.state.value.auth} value={this.state.value.auth}
        onChange={e => { this.changeValue(e.target.checked, 'auth') }}
      />
      <label className="checkbox-label" htmlFor="field-auth">Auth</label>

      {this.state.value.auth && <div className="form-group__inline-wrapper">
        <div className="form-group col-6">
          <label htmlFor="field-roles">Roles</label>
          <AltrpSelect id="field-roles"
            isMulti={true}
            optionsRoute="/admin/ajax/role_options"
            placeholder="All"
            defaultOptions={[
              {
                value: null,
                label: 'All',
              }
            ]}
            value={this.state.value.roles}
            onChange={this.changeRoles}
          />
        </div>
        <div className="form-group col-6">
          <label htmlFor="field-permissions">Permissions</label>
          <AltrpSelect id="field-permissions"
            isMulti={true}
            optionsRoute="/admin/ajax/permissions_options"
            placeholder="All"
            defaultOptions={[
              {
                value: null,
                label: 'All',
              }
            ]}
            value={this.state.value.permissions}
            onChange={this.changePermission}
          />
        </div>
      </div>}

      <div className="btn__wrapper">
        <button className="btn btn_success" type="submit">Add</button>
        <Link className="btn" to="/admin/tables/models">Cancel</Link>
        {/* <button className="btn btn_failure">Delete</button> */}
      </div>
    </form>;
  }
}

export default AddDataSourceForm;