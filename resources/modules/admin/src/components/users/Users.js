import React, {Component} from "react";
import {connect} from "react-redux";
import VectorSvg from '../../svgs/vector.svg';
import UserSvg from '../../svgs/user.svg';
import SearchUser from "./../../svgs/search.svg"
import {Link, withRouter} from "react-router-dom";
import Resource from "../../../../editor/src/js/classes/Resource";
import Pagination from "../Pagination";
import {filterUsers, sortUsers} from "../../js/helpers";
import {InputGroup, MenuItem, Button, Alignment} from "@blueprintjs/core";
import {Select} from "@blueprintjs/select";
import UserTopPanel from "../UserTopPanel";
import {compose} from "redux";
import logoutAllUsers from "../../js/functions/logoutAllUsers";


const BulkActions = ['Bulk Actions']
const ChangeRole = ['Change role on...']

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      roleFilter: null,
      search: "",
      currentPage: 1,
      pageCount: 1,
      count: 1,
      activeHeader: 0,
      roles: [],
      bulkActions: 'Bulk Actions',
      changeRole: 'Change role on...',
      sorting: {sortingField: null, order: 'ASC'}
    };

    this.resource = new Resource({route: '/admin/ajax/users'});
    this.itemsPerPage = 10;
  }

  componentDidMount() {
    this.getUsers();
    new Resource({route: '/admin/ajax/role_options'}).getAll()
      .then(roles => this.setState({roles}));

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

  getData = (e) => {
    e.preventDefault();
    let url = new URL(location.href);
    if (this.state.search) {
      url.searchParams.set('s', this.state.search);
      this.props.history.push(`${url.pathname + url.search}`)
    } else {
      url.searchParams.delete('s');
      this.props.history.push(`${url.pathname + url.search}`)
    }
    this.getUsers();
  }

  getUsers = async () => {
    let url = new URL(location.href);
    let urlS = url.searchParams.get('s')
    let users_result = await this.resource.getQueried({
      s:  urlS === null ? this.state.search : urlS,
      page: this.state.currentPage,
      pageSize: this.itemsPerPage
    });
    this.set
   // const data = _.isArray(users_result) ? users_result : users_result.users
    this.setState(state => {
      return {
        ...state,
        data: users_result.users,
        count: users_result.count,
        pageCount: users_result.pageCount,
        search: urlS === null ? this.state.search : urlS
      };
    });
  }

  getUsersEmail = async () => {
    let users_result = await this.resource.getAuthorList();
    let users_result_email = [];
    for (let i = 0; i < users_result.length; i++) {
      if (users_result[i].email.includes(this.state.search)) {
        users_result_email.push(users_result[i])
      }
    }
    this.setState(state => {
      return {...state, data: users_result_email};
    });
  }

  ItemPredicate = (query, value) => {

    if(!query) {
      return true
    }

    const index = _.findIndex(_.split(value, ""), char => {
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


  onSubmitBulkActions = (e) => {
    e.preventDefault();
  }

  onSubmitRoles = (e) => {
    e.preventDefault();
  }

  deleteUser = async (id) => {
    if (confirm('Are You Sure?')) {
      await this.resource.delete(id)
      await this.getUsers();
    }
  }

  updatePageAndLoadData = async (page) => {
  await this.setState({currentPage: page})
  await this.getUsers()
}

  render() {
    const {pageCount, count, currentPage, data, search, roles, roleFilter} = this.state;
    const {sortingField, order} = this.state.sorting;
    const users = roleFilter ? filterUsers(data, roleFilter) : data;


    return <div className="admin-users">
      <div className={this.state.activeHeader ? "admin-heading admin-heading-shadow" : "admin-heading"}>
        <div className="admin-heading-left">
          <div className="admin-breadcrumbs">
            <a className="admin-breadcrumbs__link" href="#">Users</a>
            <span className="admin-breadcrumbs__separator">/</span>
            <span className="admin-breadcrumbs__current">All Users</span>
          </div>

          <Link className="btn" to={"/admin/users/new/"}>Add New</Link>
          <button className="btn btn_danger ml-3" onClick={logoutAllUsers}>Logout All Users</button>

          <div className="admin-filters">
            <span className="admin-filters__current" onClick={() => this.setState({roleFilter: null})}>
              <a className="admin-filters__link">All ({data.length})</a>
            </span>
            {roles.map(role => {
              const itemsCount = filterUsers(data, role.value).length;

              return itemsCount ? <React.Fragment key={role.value}>
                <span className="admin-filters__separator">|</span>
                <a className="admin-filters__link" onClick={() => this.setState({roleFilter: role.value})}>
                  {role.label} ({itemsCount})
                </a>
              </React.Fragment> : null
            })}
          </div>
        </div>
        <UserTopPanel />
      </div>

      <div className="admin-content-user">
        <div className="admin-panel">
          <form className="admin-users-form form-bulk-left" onSubmit={this.onSubmitRoles}>
            {/*<select className="form-control input-sm">*/}
            {/*  <option value="1">Bulk Actions</option>*/}
            {/*</select>*/}
            <Select items={BulkActions}
                    matchTargetWidth
                    itemPredicate={this.ItemPredicate}
                    noResults={<MenuItem disabled={true} text="No results." />}
                    itemRenderer={(item, {handleClick, modifiers, query}) => {
                      return <MenuItem
                        text={item}
                        key={item}
                        active={item === this.state.bulkActions}
                        onClick={handleClick}
                      />
                    }}
                    onItemSelect={current => {
                      this.setState({ bulkActions: current})
                    }}
                    fill={true}
            >
              <Button fill alignText={Alignment.LEFT} text={this.state.bulkActions} rightIcon="caret-down"/>
            </Select>
            <button className="btn btn_bare admin-users-button">Apply</button>
          </form>

          <form className="admin-users-form form-bulk-right" onSubmit={this.onSubmitRoles}>
            {/*<select className="form-control input">*/}
            {/*  <option value="1">Change role on...</option>*/}
            {/*</select>*/}

            <Select items={ChangeRole}
                    matchTargetWidth
                    itemPredicate={this.ItemPredicate}
                    noResults={<MenuItem disabled={true} text="No results." />}
                    itemRenderer={(item, {handleClick, modifiers, query}) => {
                      return <MenuItem
                        text={item}
                        key={item}
                        active={item === this.state.changeRole}
                        onClick={handleClick}
                      />
                    }}
                    onItemSelect={current => {
                      this.setState({ changeRole: current})
                    }}
                    fill={true}
            >
              <Button fill alignText={Alignment.LEFT} text={this.state.changeRole} rightIcon="caret-down"/>
            </Select>
            <button className="btn btn_bare admin-users-button">Change</button>
          </form>
        </div>

        <div className="admin-users-table">
          <form className="admin-users-top" onSubmit={this.getData}>
            <InputGroup className="form-tables-user form-tables-user__indentRight-user" value={search}
                        onChange={e => this.setState({search: e.target.value})}/>
            <SearchUser />
            {/*<button type="button" onClick={this.getUsers} className="btn btn_bare admin-users-button btn__tables-user btn__tables-user__indentRight">Search Users*/}
            {/*</button>*/}
            <button  className="btn btn_bare admin-users-button btn__tables-user">Search</button>
          </form>
          <table className="table table-user">
            <thead className="admin-users-table-head">
            <tr className="admin-table-row">
              <td className="admin-table__td admin-table__td_check admin-table__td_check-head"
                  onClick={() => this.setState({
                    sorting: {
                      sortingField: 'name',
                      order: order === 'ASC' ? 'DESC' : 'ASC'
                    }
                  })}
              >
                <input className="input-users" type="checkbox"/>
                Username
                <VectorSvg
                  className={`vector-svg ${order === 'DESC' ? 'role-svg' : ''} ${sortingField === 'name' ? 'vector-svg--active' : ''}`}/>
              </td>
              <td className="admin-table__td "
                  onClick={() => this.setState({
                    sorting: {
                      sortingField: 'full_name',
                      order: order === 'ASC' ? 'DESC' : 'ASC'
                    }
                  })}
              >
                Name
                <VectorSvg
                  className={`vector-svg ${order === 'DESC' ? 'role-svg' : ''} ${sortingField === 'full_name' ? 'vector-svg--active' : ''}`}/>
              </td>
              <td className="admin-table__td "
                  onClick={() => this.setState({
                    sorting: {
                      sortingField: 'email',
                      order: order === 'ASC' ? 'DESC' : 'ASC'
                    }
                  })}
              >
                Email
                <VectorSvg
                  className={`vector-svg ${order === 'DESC' ? 'role-svg' : ''} ${sortingField === 'email' ? 'vector-svg--active' : ''}`}/>
              </td>
              <td className="admin-table__td ">Role</td>
              <td className="admin-table__td "
                  onClick={() => this.setState({
                    sorting: {
                      sortingField: 'last_login_at',
                      order: order === 'ASC' ? 'DESC' : 'ASC'
                    }
                  })}
              >
                Last Enter
                <VectorSvg
                  className={`vector-svg ${order === 'DESC' ? 'role-svg' : ''} ${sortingField === 'last_login_at' ? 'vector-svg--active' : ''}`}/>
              </td>
              <td className="admin-table__td ">Status</td>
            </tr>
            </thead>
            <tbody className="admin-table-body">
            {sortUsers(users, sortingField, order)
              .map((row, idx) => <tr className="admin-table-row" key={row.id}>
                <td className="admin-table__td admin-table__td_check admin-table__td_check-user">
                  <input className="input-users" type="checkbox"/>
                  <UserSvg className="users-svg"/>
                  <Link to={"/admin/users/user/" + row.id}>{row.name} {row.id === this.props.userId &&
                  <span style={{color: 'red'}}>you</span>}</Link>
                  <span className="quick-action-menu">
                      <span className="quick-action-menu__item_wrapper">
                        <button onClick={() => this.deleteUser(row.id)} className="quick-action-menu__item quick-action-menu__item_danger">Delete</button>
                      </span>
                    </span>
                </td>
                <td className="admin-table__td ">{row.full_name}</td>
                <td className="admin-table__td "><a>{row.email}</a></td>
                <td className="admin-table__td "><a>{row.roles.map((value) => {
                  return value.name
                }).join(", ")}</a></td>
                <td className="admin-table__td ">{row.last_login_at}</td>
                <td className="admin-table__td ">Enable</td>
              </tr>)}
            </tbody>
          </table>
          <Pagination
                      pageCount={pageCount}
                      currentPage={currentPage}
                      changePage={async (page) => {
                        if (currentPage !== page) {
                          await this.updatePageAndLoadData(page)
                        }
                      }}
                      itemsCount={count}
          />
        </div>
      </div>
    </div>
  }
}

const mapStateToProps = state => {
  return {
    userId: state.currentUser.id
  }
};

Users = compose(
  connect(mapStateToProps),
  withRouter
)(Users)

export default Users;
