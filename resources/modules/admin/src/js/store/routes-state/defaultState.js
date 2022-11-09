import {Link, Redirect} from "react-router-dom";
import Resource from "../../../../../editor/src/js/classes/Resource"
import store from "../store"
import {editModels} from "./action"

import AddReport from "./../../../components/AddReport"
import AdminSettings from "./../../../components/AdminSettings"
import Users from "./../../../components/users/Users"
import AddUserPage from "./../../../components/users/AddUserPage"
import UserPage from "./../../../components/users/UserPage"
import UsersTools from "./../../../components/users/UsersTools"
import CustomFonts from "./../../../components/CustomFonts"
import AddNewFont from "./../../../components/AddNewFont"
import EditFont from "./../../../components/EditFont"
import Assets from "./../../../components/Assets"
import Dashboard from "./../../../components/Dashboard"
import ColorSchemes from "./../../../components/dashboard/ColorSchemes"
import Plugins from "./../../../components/Plugins"
import SearchPlugins from "./../../../components/plugins/SearchPlugins"
import Marketplace from "./../../../components/Marketplace"
import Reports from "./../../../components/Reports"
import Tables from "./../../../components/Tables"
import EditTable from "./../../../components/tables/EditTable"
import SettingTable from "../../../components/tables/SettingTable"
import AddMigrationPage from "../../../components/tables/AddMigrationPage"
import AddTable from "../../../components/tables/AddTable"
import Templates from "../../../components/Templates"
import AreaAdd from "../../../components/areas/AreaAdd"
import AreaEdit from "../../../components/areas/AreaEdit"
import Areas from "../../../components/areas/Areas"
import MenuPage from "../../../components/menu-builder/MenuPage"
import MenusList from "../../../components/menu-builder/MenusList"
import Robots from "../../../components/Robots"
import Customizer from "../../../components/Customizer"
import AllPages from "../../../components/AllPages"
import AddPage from "../../../components/AddPage"
import Models from "../../../components/Models"
import SQLEditors from "../../../components/SQLEditors"
import SqlEditor from "../../../components/models/SqlEditor"
import AddModel from "../../../components/models/AddModel"
import EditModel from "../../../components/models/EditModel"
import EditField from "../../../components/models/EditField"
import AddAccessor from "../../../components/models/AddAccessor"
import SQLBuilder from "../../../components/SQLBuilder"
import CronEvents from "../../../components/CronEvents"
import LogPage from "../../../components/LogPage"
import AddDataSource from "../../../components/models/AddDataSource"
import RolePage from "../../../components/access/RolePage"
import PermissionPage from "../../../components/access/PermissionPage"
import AccessOptions from "../../../components/AccessOptions"
import ModelsPage from "../../../components/models/ModelsPage"
import ModelPage from "../../../components/models/ModelPage"
import MainSvg from "../../../svgs/main-v2.svg";
import DropletSvg from "../../../svgs/droplet-new.svg";
import React from "react";
import LayoutSvg from "../../../svgs/layout-v2.svg";
import getAltrpLang from "../../helpers/get-altrp-lang";

const updateModels = async () => {
  let options = await new Resource({ route: "/admin/ajax/model_options" }).getAll()
  options = options.options
  store.dispatch(editModels(options))
}

const defaultState = [
  { path: "/admin/reports/add", component: <AddReport/>, exact: false },
  { path: "/admin/", component: <Redirect to="/admin/dashboard" />, exact: true },
  { path: "/admin/settings", component: <AdminSettings />, exact: false},
  { path: "/admin/users", component: <Users />, exact: true},
  { path: "/admin/users/new", component: <AddUserPage />, exact: true},
  { path: "/admin/users/user/:id", component: <UserPage />, exact: true},
  { path: "/admin/tools", component: <UsersTools />, exact: false},
  { path: "/admin/assets/custom-fonts", component: <CustomFonts />, exact: false},
  { path: "/admin/assets/add-new-font", component: <AddNewFont />, exact: false},
  { path: "/admin/assets/edit-font/:id?", component: <EditFont />, exact: false},
  { path: "/admin/assets", component: <Assets />, exact: false},
  { path: "/admin/dashboard", component: <Dashboard />, exact: false},
  { path: "/admin/dashboard/colors", component: <ColorSchemes />, exact: false},
  { path: "/admin/plugins", component: <Plugins />, exact: false},
  { path: "/admin/search-plugins", component: <SearchPlugins />, exact: false},
  { path: "/admin/marketplace", component: <Marketplace />, exact: false},
  { path: "/admin/reports", component: <Reports />, exact: false},
  { path: "/admin/tables", component: <Tables />, exact: true},
  { path: "/admin/tables/edit/:id", component: <EditTable />, exact: true},
  { path: "/admin/tables/edit/:id/setting", component: <SettingTable />, exact: true},
  { path: "/admin/tables/edit/:id/setting/migrations/add", component: <AddMigrationPage />, exact: false},
  { path: "/admin/tables/add", component: <AddTable />, exact: false},
  { path: "/admin/templates", component: <Templates />, exact: false},
  { path: "/admin/areas/add", component: <AreaAdd />, exact: false},
  { path: "/admin/areas/:id", component: <AreaEdit />, exact: false},
  { path: "/admin/areas", component: <Areas />, exact: false},
  { path: "/admin/menus/:id", component: <MenuPage />, exact: false},
  { path: "/admin/menus", component: <MenusList />, exact: false},
  { path: "/admin/robots", component: getAltrpLang() === "javascript" ? null : <Robots />, exact: false},
  { path: "/admin/customizers", component: <Customizer />, exact: true},
  { path: "/admin/cron_events/:id/logs", component: <LogPage />, exact: true},
  { path: "/admin/customizers/cron_events", component: <CronEvents />, exact: true},
  { path: "/admin/pages", component: <AllPages />, exact: true},
  { path: "/admin/pages/edit/:id", component: <AddPage />, exact: false},
  { path: "/admin/pages/add", component: <AddPage />, exact: false},
  { path: "/admin/tables/models", component: <Models updateModels={updateModels} />, exact: true},
  { path: "/admin/tables/sql_editors", component: <SQLEditors />, exact: true},
  { path: "/admin/tables/sql_editors/add", component: <SqlEditor />, exact: false},
  { path: "/admin/tables/sql_editors/edit/:id", component: <SqlEditor />, exact: false},
  { path: "/admin/tables/models/add", component: <AddModel updateModels={updateModels} />, exact: false},
  { path: "/admin/tables/models/edit/:id", component: <EditModel updateModels={updateModels} />, exact: true},
  { path: "/admin/tables/models/:modelId/fields/add", component: <EditField />, exact: false},
  { path: "/admin/tables/models/:modelId/fields/edit/:id", component: <EditField />, exact: false},
  { path: "/admin/tables/models/:modelId/remote-fields/add", component: <EditField />, exact: false},
  { path: "/admin/tables/models/:modelId/remote-fields/edit/:id", component: <EditField />, exact: false},
  { path: "/admin/tables/models/:modelId/accessors/add", component: <AddAccessor />, exact: false},
  { path: "/admin/tables/models/:modelId/accessors/edit/:id", component: <AddAccessor />, exact: false},
  { path: "/admin/tables/models/:modelId/queries/add", component: <SQLBuilder />, exact: false},
  { path: "/admin/tables/models/:modelId/queries/edit/:id", component: <SQLBuilder />, exact: false},
  { path: "/admin/tables/data-sources/add", component: <AddDataSource />, exact: false},
  { path: "/admin/tables/data-sources/edit/:id", component: <AddDataSource />, exact: false},
  { path: "/admin/access/roles/add", component: <RolePage />, exact: false},
  { path: "/admin/access/roles/edit/:id", component: <RolePage />, exact: false},
  { path: "/admin/access/permissions/add", component: <PermissionPage />, exact: false},
  { path: "/admin/access/permissions/edit/:id", component: <PermissionPage />, exact: false},
  { path: "/admin/access", component: <AccessOptions />, exact: false},
  { path: "/admin/databases", component: <ModelsPage />, exact: false},
  { path: "/admin/database/:id", component: <ModelPage />, exact: false},
]
export const initialState = {
  routes: defaultState,
  mainMenu:[],
  models: []
}
