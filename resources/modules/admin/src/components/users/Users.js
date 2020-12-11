import React, { Component } from "react";
import PluginSvg from "../../svgs/plugins.svg";
import VectorSvg from '../../svgs/vector.svg';
import UserSvg from '../../svgs/user.svg';
import { Link } from "react-router-dom";
import Resource from "../../../../editor/src/js/classes/Resource";
import Pagination from "../Pagination";
import { filterUsers } from "../../js/helpers";
export default class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      roleFilter: null,
      search: "",
      currentPage: 1,
      roles: []
    };

    this.resource = new Resource({ route: '/admin/ajax/users' });
    this.itemsPerPage = 10;
  }

  componentDidMount() {
    this.getUsers();
    new Resource({ route: '/admin/ajax/role_options' }).getAll()
      .then(roles => this.setState({ roles }));
  }

  getUsers = async () => {
    let users_result = await this.resource.getQueried({ s: this.state.search });
    this.setState(state => {
      return { ...state, data: users_result };
    });
  }

  render() {
    const { currentPage, data, search, roles, roleFilter } = this.state;
    const users = roleFilter ? filterUsers(data, roleFilter) : data;

    return <div className="admin-users">
      <div className="wrapper">
        <div className="admin-heading-users">
          <div className="admin-breadcrumbs">
            <a className="admin-breadcrumbs__link" href="#">Users</a>
            <span className="admin-breadcrumbs__separator">/</span>
            <span className="admin-breadcrumbs__current">All Users</span>
          </div>

          <Link className="btn" to={"/admin/users/new/"}>Add New</Link>

          <div className="admin-filters">
            <span className="admin-filters__current" onClick={() => this.setState({ roleFilter: null })}>
              <a className="admin-filters__link" href="#">All ({data.length})</a>
            </span>
            {roles.map(role => {
              const itemsCount = filterUsers(data, role.value).length;

              return itemsCount ? <React.Fragment key={role.value}>
                <span className="admin-filters__separator">|</span>
                <a className="admin-filters__link" href="#" onClick={() => this.setState({ roleFilter: role.value })}>
                  {role.label} ({itemsCount})
                </a>
              </React.Fragment> : null
            })}
          </div>
        </div>

        <div className="admin-panel">
          <form className="admin-users-form form-bulk-left">
            <select className="form-control input-sm">
              <option value="1">Bulk Actions</option>
            </select>
            <button className="btn btn_bare admin-users-button">Apply</button>
          </form>

          <form className="admin-users-form form-bulk-right" >
            <select className="form-control input">
              <option value="1">Change role on...</option>
            </select>
            <button className="btn btn_bare admin-users-button">Change</button>
          </form>

          <form className="admin-users-form form-bulk-search" >
            <input className="form-control input-sm" value={search} onChange={e => this.setState({ search: e.target.value })} />
            <button type="button" onClick={this.getUsers} className="btn btn_bare admin-users-button">Search Users</button>
          </form>
        </div>

        <div className="admin-users-table">
          <table className="table">
            <thead className="admin-users-table-head">
              <tr className="admin-table-row">
                <td className="admin-table__td admin-table__td_check">
                  <input className="input-users" type="checkbox" />
                  Username
                  <VectorSvg className="vector-svg" />
                </td>
                <td className="admin-table__td ">Name</td>
                <td className="admin-table__td ">Email</td>
                <td className="admin-table__td ">Role<VectorSvg className="vector-svg role-svg" /></td>
                <td className="admin-table__td ">Post</td>
                <td className="admin-table__td ">Last Enter</td>
                <td className="admin-table__td ">Status</td>
              </tr>
            </thead>
            <tbody className="admin-table-body">
              {users.slice(currentPage * this.itemsPerPage - this.itemsPerPage, currentPage * this.itemsPerPage)
                .map((row, idx) => <tr className="admin-table-row" key={row.id}>
                  <td className="admin-table__td admin-table__td_check ">
                    <input className="input-users" type="checkbox" />
                    <UserSvg className="users-svg" />
                    <Link to={"/admin/users/user/" + row.id}>{row.name}</Link>
                  </td>
                  <td className="admin-table__td ">{row.full_name}</td>
                  <td className="admin-table__td "><a>{row.email}</a></td>
                  <td className="admin-table__td "><a>{row.roles.map((value) => { return value.name }).join(", ")}</a></td>
                  <td className="admin-table__td ">2</td>
                  <td className="admin-table__td ">{row.last_login_at}</td>
                  <td className="admin-table__td ">Enable</td>
                </tr>)}
            </tbody>
          </table>
          <Pagination pageCount={Math.ceil(users.length / this.itemsPerPage) || 1}
            currentPage={currentPage}
            changePage={page => {
              if (currentPage !== page) {
                this.setState({ currentPage: page })
              }
            }}
            itemsCount={users.length}
          />
        </div>
      </div>
    </div>
  }

}
