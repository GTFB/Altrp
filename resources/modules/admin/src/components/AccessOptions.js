
import React, { Component } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import 'react-tabs/style/react-tabs.scss';
import { Link, withRouter } from 'react-router-dom'

import AdminTable from "./AdminTable";
import Resource from "../../../editor/src/js/classes/Resource";
import Pagination from "./Pagination";

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
    permissions: [],
    rolesPagination: initPaginationProps,
    rolesFilter: '',
    rolesSorting: {},
  };
  /**
   * Список ролей
   */
  getRoles = async () => {
    const { rolesPagination, rolesFilter, rolesSorting } = this.state;
    const { roles, count, pageCount } = await rolesResource.getQueried({
      page: rolesPagination.currentPage,
      pageSize: itemsPerPage,
      preset: false,
      s: rolesFilter,
      ...rolesSorting
    });
    this.setState({ roles, rolesPagination: { ...rolesPagination, count, pageCount } });
  }

  changeFilterHandler = e => {
    this.setState({ rolesFilter: e.target.value }, this.getRoles);
  }
  /**
   * Список permissions
   */
  getPermissions = async () => {
    const permissions = await permissionsResource.getAll();
    this.setState({ permissions });
  }
  // let res = await this.modelsResource.getQueried({
  //   page: this.state.modelsCurrentPage,
  //   pageSize: this.itemsPerPage,
  //   preset: false,
  //   s: modelsSearch,
  //   ...this.state.modelsSorting
  // });

  componentDidMount() {
    this.getRoles();
    this.getPermissions();
  }

  render() {
    const { roles, permissions, rolesPagination, rolesFilter, rolesSorting } = this.state;
    const activeTab = this.props.location.pathname === "/admin/access/roles" ? 0 : 1;

    return <div className="admin-settings admin-page">
      <div className="admin-heading">
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
      <div className="admin-content">
        <Tabs selectedIndex={activeTab} onSelect={() => { }}>
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
                  title: 'Trash'
                }
              ]}
              rows={roles.map(role => ({
                ...role,
                editUrl: '/admin/access/roles/edit/' + role.id
              }))}
              search={{
                value: rolesFilter,
                changeHandler: this.changeFilterHandler
              }}
            />
            <Pagination pageCount={rolesPagination.pageCount}
              currentPage={rolesPagination.currentPage}
              changePage={currentPage => this.setState({ rolesPagination: { ...rolesPagination, currentPage } }, this.getRoles)}
              itemsCount={rolesPagination.count}
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
                  title: 'Trash'
                }
              ]}
              rows={permissions.map(permission => ({
                ...permission,
                editUrl: '/admin/access/permissions/edit/' + permission.id
              }))}
            />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  }
}

export default withRouter(AccessOptions);
