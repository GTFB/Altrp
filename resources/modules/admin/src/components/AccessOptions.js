
import React, { Component } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import 'react-tabs/style/react-tabs.scss';
import { Link, withRouter } from 'react-router-dom'

import AdminTable from "./AdminTable";
import Resource from "../../../editor/src/js/classes/Resource";
import Pagination from "./Pagination";
import UserTopPanel from "./UserTopPanel";

const columns = [
  {
    name: 'name',
    title: 'Name',
    url: true,
    editUrl: true,
    tag: 'Link'
  },
  {
    name: 'display_name',
    title: 'Display Name'
  },
  {
    name: 'description',
    title: 'Description'
  }
];

const rolesResource = new Resource({ route: '/admin/ajax/roles' });
const permissionsResource = new Resource({ route: '/admin/ajax/permissions' });
const itemsPerPage = 20;
const initPaginationProps = {
  pageCount: 1,
  currentPage: 1,
  count: 0
};
class AccessOptions extends Component {
  state = {
    roles: [],
    activeHeader: 0,
    rolesPagination: initPaginationProps,
    rolesFilter: '',
    rolesSorting: {},
    permissions: [],
    permissionsPagination: initPaginationProps,
    permissionsFilter: '',
    permissionsSorting: {},
  };
  /**
   * Список ролей
   */
  getRoles = async () => {
    let url = new URL(location.href);
    let urlS = url.searchParams.get('s')
    const { rolesPagination, rolesFilter, rolesSorting } = this.state;
    const { roles, count, pageCount } = await rolesResource.getQueried({
      page: rolesPagination.currentPage,
      pageSize: itemsPerPage,
      preset: false,
      s: urlS === null ? rolesFilter : urlS,
      ...rolesSorting
    });
    this.setState({ roles, rolesFilter: urlS === null ? rolesFilter : urlS,  rolesPagination: { ...rolesPagination, count, pageCount: pageCount || 1 } });
  }

  rolesSortingHandler = (order_by, order) => {
    this.setState({ rolesSorting: { order_by, order } }, this.getRoles);
  }
  /**
   * Список permissions
   */
  getPermissions = async () => {
    let url = new URL(location.href);
    let urlS = url.searchParams.get('s')
    const { permissionsPagination, permissionsFilter, permissionsSorting } = this.state;
    const { permissions, count, pageCount } = await permissionsResource.getQueried({
      page: permissionsPagination.currentPage,
      pageSize: itemsPerPage,
      preset: false,
      s: urlS === null ? permissionsFilter : urlS,
      ...permissionsSorting
    });
    this.setState({
      permissions,
      permissionsFilter: urlS === null ? permissionsFilter : urlS,
      permissionsPagination: { ...permissionsPagination, count, pageCount: pageCount || 1 }
    });
  }

  permissionsSortingHandler = (order_by, order) => {
    this.setState({ permissionsSorting: { order_by, order } }, this.getPermissions);
  }

  componentDidMount() {
    const activeTab = this.props.location.pathname === "/admin/access/roles";
    if (activeTab) {
      this.getRoles();
    } else {
      this.getPermissions();
    }


    window.addEventListener("scroll", this.listenScrollHeader)

    return () => {
      window.removeEventListener("scroll", this.listenScrollHeader)
    }
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

  searchRoles = e => {
    e.preventDefault();
    let url = new URL(location.href);
    if (this.state.rolesFilter) {
      url.searchParams.set('s', this.state.rolesFilter);
      this.props.history.push(`${url.pathname + url.search}`)
    } else {
      url.searchParams.delete('s');
      this.props.history.push(`${url.pathname + url.search}`)
    }
    this.getRoles();
  }

  searchPermissions = e => {
    e.preventDefault();
    let url = new URL(location.href);
    if (this.state.permissionsFilter) {
      url.searchParams.set('s', this.state.permissionsFilter);
      this.props.history.push(`${url.pathname + url.search}`)
    } else {
      url.searchParams.delete('s');
      this.props.history.push(`${url.pathname + url.search}`)
    }
    this.getPermissions();
  }

  changeRoles = (e) => {
    this.setState({ rolesFilter: e.target.value })
  }

  changePermissions = (e) => {
    this.setState({ permissionsFilter: e.target.value })
  }

  tabsFun = () => {
    this.setState(state => ({
      ...state,
      rolesFilter: '',
      permissionsFilter: ''
    }))
    const activeTab = this.props.location.pathname === "/admin/access/roles";
    if (activeTab) {
      this.getPermissions()
    } else {
      this.getRoles()
    }
  }

  render() {
    const { roles, rolesPagination, rolesFilter, rolesSorting, permissions, permissionsPagination, permissionsFilter, permissionsSorting} = this.state;
    const activeTab = this.props.location.pathname === "/admin/access/roles" ? 0 : 1;

    return <div className="admin-settings admin-page">
      <div className={this.state.activeHeader ? "admin-heading admin-heading-shadow" : "admin-heading"}>
        <div className="admin-heading-left">
          <div className="admin-breadcrumbs">
            <a className="admin-breadcrumbs__link" href="#">Access</a>
            <span className="admin-breadcrumbs__separator">/</span>
            <span className="admin-breadcrumbs__current">
            {activeTab === 0 ? 'All Roles' : 'All Permissions'}
          </span>
          </div>
          <Link className="btn" to={`/admin/access/${activeTab === 0 ? 'roles' : 'permissions'}/add`}>
            Add New
          </Link>
        </div>
        <UserTopPanel />
      </div>
      <div className="admin-content zeroing__styleTabs">
        <Tabs selectedIndex={activeTab} onSelect={() => this.tabsFun()}>
          <TabList className="nav nav-pills admin-pills">
            <Link to="/admin/access/roles"><Tab>Roles</Tab></Link>
            <Link to="/admin/access/permissions"><Tab>Permissions</Tab></Link>
          </TabList>
          <TabPanel>
            <AdminTable
              columns={columns}
              quickActions={[
                {
                  tag: 'Link',
                  props: { href: '/admin/access/roles/edit/:id' },
                  title: 'Edit'
                },
                {
                  tag: 'button',
                  route: '/admin/ajax/roles/:id',
                  method: 'delete',
                  confirm: 'Are You Sure?',
                  after: () => this.getRoles(),
                  className: 'quick-action-menu__item_danger',
                  title: 'Delete'
                }
              ]}
              rows={roles.map(role => ({
                ...role,
                editUrl: '/admin/access/roles/edit/' + role.id
              }))}
              sortingHandler={this.rolesSortingHandler}
              sortingField={rolesSorting.order_by}

              searchTables={{
                submit: this.searchRoles,
                value: rolesFilter,
                change: this.changeRoles
              }}

              pageCount={rolesPagination.pageCount}
              currentPage={rolesPagination.currentPage}
              changePage={currentPage => this.setState({ rolesPagination: { ...rolesPagination, currentPage } }, this.getRoles)}
              itemsCount={rolesPagination.count}

              openPagination={true}
            />
          </TabPanel>
          <TabPanel>
            <AdminTable
              columns={columns}
              quickActions={[
                {
                  tag: 'Link',
                  props: { href: '/admin/access/permissions/edit/:id' },
                  title: 'Edit'
                },
                {
                  tag: 'button',
                  route: '/admin/ajax/permissions/:id',
                  method: 'delete',
                  confirm: 'Are You Sure?',
                  after: () => this.getPermissions(),
                  className: 'quick-action-menu__item_danger',
                  title: 'Delete'
                }
              ]}
              rows={permissions.map(permission => ({
                ...permission,
                editUrl: '/admin/access/permissions/edit/' + permission.id
              }))}
              sortingHandler={this.permissionsSortingHandler}
              sortingField={permissionsSorting.order_by}

              searchTables={{
                submit: this.searchPermissions,
                value: permissionsFilter,
                change: this.changePermissions
              }}

              pageCount={permissionsPagination.pageCount}
              currentPage={permissionsPagination.currentPage}
              changePage={currentPage => this.setState({ permissionsPagination: { ...permissionsPagination, currentPage } }, this.getPermissions)}
              itemsCount={permissionsPagination.count}

              openPagination={true}
            />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  }
}

export default withRouter(AccessOptions);
