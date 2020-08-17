
import React, { Component } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import 'react-tabs/style/react-tabs.scss';
import { Link, withRouter } from 'react-router-dom'

import AdminTable from "./AdminTable";
import Resource from "../../../editor/src/js/classes/Resource";

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

class AccessOptions extends Component {
  state = {
    roles: [],
    permissions: [],
  };
  /**
   * Список ролей
   */
  getRoles = async () => {
    const roles = await rolesResource.getAll();
    this.setState({ roles });
  }
  /**
   * Список permissions
   */
  getPermissions = async () => {
    const permissions = await permissionsResource.getAll();
    this.setState({ permissions });
  }

  // slicePage = (array, page, itemsPerPage) => {
  //   return array.slice(page * itemsPerPage - itemsPerPage, page * itemsPerPage);
  // }

  componentDidMount() {
    this.getRoles();
    this.getPermissions();
  }

  render() {
    const { roles, permissions } = this.state;
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
        <Tabs selectedIndex={activeTab} onSelect={() => {}}>
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
