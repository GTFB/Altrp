import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import AltrpSelect from "../altrp-select/AltrpSelect";
import Resource from "../../../../editor/src/js/classes/Resource";
import { titleToName } from "../../js/helpers";
import HeaderComponent from "./HeaderComponent"

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
      request_type: '',
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

  componentDidMount() {
    const { id } = this.props.match.params;

    new Resource({ route: '/admin/ajax/model_options' }).getAll()
      .then(({ options }) => this.setState({ modelsOptions: options }));
    new Resource({ route: '/admin/ajax/role_options' }).getAll()
      .then(rolesOptions => this.setState({ rolesOptions }));
    new Resource({ route: '/admin/ajax/permissions_options' }).getAll()
      .then(permissionsOptions => this.setState({ permissionsOptions }));

    if (id) {
      const resource = new Resource({ route: '/admin/ajax/data_sources' });
      resource.get(id).then(value => this.setState({
        value: { ...value, headers: Object.entries(value.headers || {}), bodies: Object.entries(value.bodies || {})},
        typeIsDisabled: value.type === 'remote'
      }));
    }
  }

  changeValue = (value, field) => {
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

  headerDeleteHandler = index => {
    this.setState(state => {
      const headers = [...state.value.headers];
      headers.splice(index, 1);
      return {
        ...state,
        value: { ...state.value, headers }
      };
    });
  };

  headerChangeHandler = (e, index) => {
    const { name, value } = e.target;

    this.setState(state => {
      let headers = [...state.value.headers];
      headers[index][+name] = value;
      return {
        ...state,
        value: { ...state.value, headers }
      };
    });
  };

  headerAddHandler = () => {
    this.setState(state => {
      const headers = [...state.value.headers, ["", ""]];
      return {
        ...state,
        value: { ...state.value, headers }
      };
    });
  };

  bodyDeleteHandler = index => {
    this.setState(state => {
      const bodies = [...state.value.bodies];
      bodies.splice(index, 1);
      return {
        ...state,
        value: { ...state.value, bodies }
      };
    });
  };

  bodyChangeHandler = (e, index) => {
    const { name, value } = e.target;

    this.setState(state => {
      let bodies = [...state.value.bodies];
      bodies[index][+name] = value;
      return {
        ...state,
        value: { ...state.value, bodies }
      };
    });
  };

  bodyAddHandler = () => {
    this.setState(state => {
      const bodies = [...state.value.bodies, ["", ""]];
      return {
        ...state,
        value: { ...state.value, bodies }
      };
    });
  };

  submitHandler = e => {
    e.preventDefault();
    const resource = new Resource({ route: '/admin/ajax/data_sources' });
    const { id } = this.props.match.params;
    const headers = Object.fromEntries(this.state.value.headers);
    const data = { ...this.state.value, headers };

    (id ? resource.put(id, data) : resource.post(data))
      .then(() => this.props.history.goBack());
  }

  render() {
    const { roles, permissions } = this.state.value.access;
    const { rolesOptions, permissionsOptions } = this.state;
    const { headers, bodies } = this.state.value;
    const { id } = this.props.match.params;

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
            disabled={!this.props.match.params.id || this.state.typeIsDisabled}
          >
            {/* <option disabled value="" /> */}
            <option value="get">get</option>
            <option value="show">show</option>
            <option value="options">options</option>
            <option value="filters">filters</option>
            <option value="add">add</option>
            <option value="update">update</option>
            <option value="update_column">update_column</option>
            <option value="delete">delete</option>
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
          disabled={this.props.match.params.id}
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

      <h2 className="admin-form__subheader centred">Headers</h2>

      {headers && headers.map((item, index) => <Fragment key={index}>
        {index !== 0 && <hr />}
        <div className="text-right">
          <button className="btn btn_failure" type="button" onClick={() => this.headerDeleteHandler(index)}>
            ✖
          </button>
        </div>
        <HeaderComponent item={item} changeHandler={e => this.headerChangeHandler(e, index)} />
      </Fragment>)}
      <div className="centred">
        <button className="btn btn_success" type="button" onClick={this.headerAddHandler}>
          + New Header
        </button>
      </div>

      <h2 className="admin-form__subheader centred">Bodies</h2>

      {bodies && bodies.map((item, index) => <Fragment key={index}>
        {index !== 0 && <hr />}
        <div className="text-right">
          <button className="btn btn_failure" type="button" onClick={() => this.bodyDeleteHandler(index)}>
            ✖
          </button>
        </div>
        <HeaderComponent item={item} changeHandler={e => this.bodyChangeHandler(e, index)} />
      </Fragment>)}
      <div className="centred">
        <button className="btn btn_success" type="button" onClick={this.bodyAddHandler}>
          + New Body
        </button>
      </div>

      <h2 className="admin-form__subheader centred">Access</h2>

      <input type="checkbox" id="field-auth"
        checked={this.state.value.auth} value={this.state.value.auth}
        onChange={e => { this.changeValue(e.target.checked, 'auth') }}
      />
      <label className="checkbox-label" htmlFor="field-auth">Auth</label>

      {this.state.value.auth ? <div className="form-group__inline-wrapper">
        <div className="form-group form-group_width47">
          <label htmlFor="roles">Roles</label>

          <AltrpSelect id="roles"
            closeMenuOnSelect={false}
            value={_.filter(rolesOptions, r => roles.indexOf(r.value) >= 0)}
            isMulti={true}
            onChange={this.changeRoles}
            options={rolesOptions} />
        </div>

        <div className="form-group form-group_width47">
          <label htmlFor="permissions">Permissions</label>
          <AltrpSelect id="roles"
            value={_.filter(permissionsOptions, p => permissions.indexOf(p.value) >= 0)}
            closeMenuOnSelect={false}
            isMulti={true}
            onChange={this.changePermission}
            options={permissionsOptions} />
        </div>
      </div> : null}

      <div className="btn__wrapper">
        <button className="btn btn_success" type="submit">{id ? 'Edit' : 'Add'}</button>
        <Link className="btn" to="/admin/tables/models">Cancel</Link>
        {/* <button className="btn btn_failure">Delete</button> */}
      </div>
    </form>;
  }
}

export default withRouter(AddDataSourceForm);
