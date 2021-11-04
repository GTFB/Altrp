import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";
import { hot } from "react-hot-loader";
import { Scrollbars } from "react-custom-scrollbars";
import { connect } from "react-redux";

import Bars from "./svgs/bars-v2.svg";
import AssetSvg from "./svgs/assets-v2.svg";
import MainSvg from "./svgs/main-v2.svg";
import PagesSvg from "./svgs/pages-v2.svg";
import PluginSvg from "./svgs/plugins-v2.svg";
import ModelsSvg from "./svgs/models-v2.svg";
import SettingSvg from "./svgs/settings-v2.svg";
import TablesSvg from "./svgs/tables-v2.svg";
import RobotsSvg from "./svgs/robots-v2.svg";
import LayoutSvg from "./svgs/layout-v2.svg";
import UserSvg from "./svgs/users-v2.svg";
import DropletSvg from "./svgs/droplet-v2.svg";

import AdminLogo from "./components/AdminLogo";
import AllPages from "./components/AllPages";
import AdminSettings from "./components/AdminSettings";
import Users from "./components/users/Users";
import Notifications from "./components/users/Notifications/Notifications";
import EditNotification from "./components/users/Notifications/EditNotification";
import AddUserPage from "./components/users/AddUserPage";
import UserPage from "./components/users/UserPage";
import UsersTools from "./components/users/UsersTools";
import Assets from "./components/Assets";
import Dashboard from "./components/Dashboard";
import Plugins from "./components/Plugins";
import Reports from "./components/Reports";
import Tables from "./components/Tables";
import Templates from "./components/Templates";
import Robots from "./components/Robots";
import AdminModal from "./components/AdminModal";
import AddPage from "./components/AddPage";
import AddReport from "./components/AddReport";
import UserTopPanel from "./components/UserTopPanel";
import Models from "./components/Models";
import EditModel from "./components/models/EditModel";
import EditField from "./components/models/EditField";
import AddRelation from "./components/models/AddRelation";
import AddAccessor from "./components/models/AddAccessor";
import AddDataSource from "./components/models/AddDataSource";
import SQLBuilder from "./components/SQLBuilder";
import SqlEditor from "./components/models/SqlEditor";
import AccessOptions from "./components/AccessOptions";
import RolePage from "./components/access/RolePage";
import PermissionPage from "./components/access/PermissionPage";
import AddTable from "./components/tables/AddTable";
import EditTable from "./components/tables/EditTable";
import SettingTable from "./components/tables/SettingTable";
import AddMigrationPage from "./components/tables/AddMigrationPage";
import AdminVersion from "./components/AdminVersion";
import SQLEditors from "./components/SQLEditors";
import ColorSchemes from "./components/dashboard/ColorSchemes";
import ModelPage from "./components/models/ModelPage";
import { WithRouterAdminAssetsDropList } from "./components/AdminAssetsDropList";
import { WithRouterAdminTablesDropList } from "./components/AdminTablesDropList";
import { WithRouterAdminTemplatesDropList } from "./components/AdminTemplatesDropList";
import { WithRouterAdminUsersDropList } from "./components/AdminUsersDropList";
import {WithRouterAdminModelsDropList} from "./components/AdminModelsDropList";
import CustomFonts from "./components/CustomFonts";
import EditFont from "./components/EditFont";
import AddNewFont from "./components/AddNewFont";

import AssetsBrowser from "../../editor/src/js/classes/modules/AssetsBrowser";
import Resource from "../../editor/src/js/classes/Resource";
import Echo from "laravel-echo"

import store from "./js/store/store";
import { setUserData, setUsersOnline } from "./js/store/current-user/actions";
import { getCustomFonts } from "./js/store/custom-fonts/actions";

import "./sass/admin-style.scss";

import { changeCurrentUser } from "../../front-app/src/js/store/current-user/actions";
import {
  setWebsocketsEnabled,
  setWebsocketsKey,
  setWebsocketsPort
} from "./js/store/websockets-storage/actions";
import AltrpMeta from '../../../modules/editor/src/js/classes/AltrpMeta';
import Areas from "./components/areas/Areas";
import AreaAdd from "./components/areas/AreaAdd";
import AreaEdit from "./components/areas/AreaEdit";
import MenuPage from "./components/menu-builder/MenuPage";
import MenusList from "./components/menu-builder/MenusList";
import ModelsPage from "./components/models/ModelsPage";
import {modelsToggle} from "./js/store/models-state/actions";
import AddModel from "./components/models/AddModel";

window.React = React;
window.ReactDOM = ReactDOM;
window.Component = React.Component;

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adminState: {
        adminEnable: true
      },
      pagesMenuShow: false,
      models: [],
      activeButton: 0,
    };
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  componentDidMount() {
    store.subscribe(this.updateAdminState.bind(this));
    new Resource({ route: "/admin/ajax/model_options" })
      .getAll()
      .then(({ options }) => this.setState({ models: options }));

    this.getConnect();
    this.getMetaName();
    this.getStatusCheckedModels();
  }

  async getStatusCheckedModels() {
    let valueChecked = !!(
      await new Resource({ route: "/admin/ajax/settings" }).get(
        "altrp_models_disabled"
      )
    ).altrp_models_disabled;

    store.dispatch(modelsToggle(valueChecked))
  }

  updateModels = async () => {
    let options = await new Resource({ route: "/admin/ajax/model_options" }).getAll()
    options = options.options
    this.setState({models: options})
  }

  // Подключение вебсокетов
  async getConnect() {
    // get current user
    let currentUser = await new Resource({ route: "/ajax/current-user" }).getAll();
    currentUser = currentUser.data;
    store.dispatch(changeCurrentUser(currentUser));


    let pusherKey = await new Resource({ route: "/admin/ajax/settings" }).get("pusher_app_key");
    let websocketsPort = await new Resource({ route: "/admin/ajax/settings" }).get("websockets_port");
    let websocketsHost = await new Resource({ route: "/admin/ajax/settings" }).get("pusher_host");

    pusherKey = pusherKey?.pusher_app_key;
    websocketsPort = websocketsPort?.websockets_port;
    websocketsHost = websocketsHost?.pusher_host;

    // Проверка наличия ключа и порта
    if (pusherKey && websocketsPort) {
      try {
        window.Pusher = require("pusher-js");
        window.Echo = new Echo({
          broadcaster: "pusher",
          key: pusherKey,
          wsHost: websocketsHost,
          wsPort: websocketsPort,
          forceTLS: false,
          disableStats: true,
        });
        console.log("Вебсокеты включены");

      } catch (error) {
        console.log(error);
      }

      // Запись ключа и порта в store
      store.dispatch(setWebsocketsKey(pusherKey));
      store.dispatch(setWebsocketsPort(websocketsPort));

      // Подключение слушателя канала
      window.Echo.private("App.User." + currentUser.id)
        .notification((notification) => {
          console.log(notification);
        });

      // Подключение слушателя для получения users online
      let presenceChannel = window.Echo.join("online");
      let activeUsers = [];
      presenceChannel.here((users) => {
        activeUsers = users;
        store.dispatch(setUsersOnline(activeUsers));
      })
        .joining((user) => {
          activeUsers.push(user);
          store.dispatch(setUsersOnline(activeUsers));
        })
        .leaving((user) => {
          activeUsers.splice(activeUsers.indexOf(user), 1);
          store.dispatch(setUsersOnline(activeUsers));
        });

    } else {
      console.log("Вебсокеты выключены");
    }

    this.getPusherConnect();
  }

  // Запись в store в случае успешного соединения
  getPusherConnect() {
    window?.Echo?.connector?.pusher.connection.bind('connected', function () {
      store.dispatch(setWebsocketsEnabled(true));
    });
  }

  /**
   * Срабатвыает, когда меняется adminState в store
   */
  updateAdminState() {
    let adminState = store.getState().adminState;
    this.setState(state => {
      return { ...state, adminState: { ...adminState } };
    });
  }

  toggleMenu() {
    this.setState(state => {
      return { ...state, pagesMenuShow: !state.pagesMenuShow };
    });
  }

  assetsActive = () => {
    this.setState({
      isAssetsActive: true,
    })
  }

  getMetaName = async () => {
    let meta = await AltrpMeta.getMetaByName("custom_fonts")

    const metaValue = await meta.getMetaValue()

    store.dispatch(getCustomFonts(metaValue))
  }

  render() {
    const { models } = this.state;
    let adminClasses = ["admin"];
    if (!this.state.adminState.adminEnable) {
      adminClasses.push("pointer-event-none");
    }
    if (this.state.pagesMenuShow) {
      adminClasses.push("admin_pages-show");
    }
    return (
      <div className={adminClasses.join(" ")}>
        <Router>
          <nav className="admin-nav">
            <div className="admin-nav-top">
              <AdminLogo />
              <Bars width={29} height={24} className="admin__bars" onClick={this.toggleMenu} />
            </div>
            <div className="admin-nav-main">
              {this.state.pagesMenuShow ? (
                <Scrollbars
                  autoHide
                  autoHideTimeout={500}
                  autoHideDuration={200}
                >
                  <ul className="admin-nav-list">
                    <li>
                      <Link
                        to="/admin/pages"
                        className={this.state.activeButton === 8 ? "admin-nav-list__link active__panel" : "admin-nav-list__link admin-nav-list__link-top"}
                        onClick={() => this.setState({ activeButton: 8 })}
                      >
                        <PagesSvg className="icon" />
                        <DropletSvg className="icon__droplet"/>
                        <span>Pages</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/admin/models"
                            className={this.state.activeButton === 9 ? "admin-nav-list__link active__panel" : "admin-nav-list__link admin-nav-list__link-top"}
                            onClick={() => this.setState({ activeButton: 9 })}
                      >
                        <ModelsSvg className="icon" />
                        <DropletSvg className="icon__droplet"/>
                        <span>Models</span>
                      </Link>
                      <WithRouterAdminModelsDropList models={models} activeButton={() => this.setState({ activeButton: 9 })} />
                    </li>
                  </ul>
                </Scrollbars>
              ) : (
                <Scrollbars
                  autoHide
                  autoHideTimeout={500}
                  autoHideDuration={200}
                >
                  <ul className="admin-nav-list">
                    <li>
                      <Link
                        to="/admin/dashboard"
                        className={this.state.activeButton ? "admin-nav-list__link admin-nav-list__link-top" : "admin-nav-list__link active__panel"}
                        onClick={() => this.setState({ activeButton: 0 })}
                      >
                        <MainSvg className="icon" />
                        <DropletSvg className="icon__droplet"/>
                        <span>Main</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/assets"
                        className={this.state.activeButton === 1 ? "admin-nav-list__link active__panel" : "admin-nav-list__link admin-nav-list__link-top"}
                        onClick={() => this.setState({ activeButton: 1 })}
                      >
                        <AssetSvg className="icon" />
                        <DropletSvg className="icon__droplet"/>
                        <span>Assets</span>
                      </Link>
                      {/*<WithRouterAdminAssetsDropList activeButton={() => this.setState({ activeButton: 1 })}/>*/}
                    </li>
                    <li>
                      <Link
                        to="/admin/templates"
                        className={this.state.activeButton === 2 ? "admin-nav-list__link active__panel" : "admin-nav-list__link admin-nav-list__link-top"}
                        onClick={() => this.setState({ activeButton: 2 })}
                      >
                        <LayoutSvg className="icon" />
                        <DropletSvg className="icon__droplet"/>
                        <span>Layouts</span>
                      </Link>
                      <WithRouterAdminTemplatesDropList activeButton={() => this.setState({ activeButton: 2 })} />
                    </li>
                    <li>
                      {/*<Link to="/admin/tables" className="admin-nav-list__link">*/}
                      {/*<TableSvg className="icon"/>*/}
                      {/*<span>Tables</span>*/}
                      {/*</Link>*/}

                      <Link
                        to="/admin/tables/models"
                        className={this.state.activeButton === 3 ? "admin-nav-list__link active__panel" : "admin-nav-list__link admin-nav-list__link-top"}
                        onClick={() => this.setState({ activeButton: 3 })}
                      >
                        <TablesSvg className="icon" />
                        <DropletSvg className="icon__droplet"/>
                        <span>Tables</span>
                      </Link>
                      <WithRouterAdminTablesDropList activeButton={() => this.setState({ activeButton: 3 })}/>
                    </li>
                    <li>
                      <Link to="/admin/robots"
                            className={this.state.activeButton === 4 ? "admin-nav-list__link active__panel" : "admin-nav-list__link admin-nav-list__link-top"}
                            onClick={() => this.setState({ activeButton: 4 })}
                      >
                        <RobotsSvg className="icon" />
                        <DropletSvg className="icon__droplet"/>
                        <span>Robots</span>
                      </Link>
                    </li>
                    {/* <li>
                    <Link to="/admin/reports" className="admin-nav-list__link">
                      <ReportSvg className="icon" />
                      <span>Reports</span>
                    </Link>
                  </li> */}
                    <li>
                      <Link
                        to="/admin/plugins"
                        className={this.state.activeButton === 5 ? "admin-nav-list__link active__panel" : "admin-nav-list__link admin-nav-list__link-top"}
                        onClick={() => this.setState({ activeButton: 5 })}
                      >
                        <PluginSvg className="icon" />
                        <DropletSvg className="icon__droplet"/>
                        <span>Plugins</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/users"
                        className={this.state.activeButton === 6 ? "admin-nav-list__link active__panel" : "admin-nav-list__link admin-nav-list__link-top"}
                        onClick={() => this.setState({ activeButton: 6 })}
                      >
                        <UserSvg className="icon" />
                        <DropletSvg className="icon__droplet"/>
                        <span>Users</span>
                      </Link>
                      <WithRouterAdminUsersDropList activeButton={() => this.setState({ activeButton: 6 })} />
                    </li>
                    <li>
                      <Link
                        to="/admin/settings"
                        className={this.state.activeButton === 7 ? "admin-nav-list__link active__panel" : "admin-nav-list__link admin-nav-list__link-top"}
                        onClick={() => this.setState({ activeButton: 7 })}
                      >
                        <SettingSvg className="icon" />
                        <DropletSvg className="icon__droplet"/>
                        <span>Settings</span>
                      </Link>
                    </li>
                  </ul>
                </Scrollbars>
              )}

            </div>
            <AdminVersion />
          </nav>
          <Switch>
            <Route path="/admin/reports/add">
              <AddReport />
            </Route>
            <Route path="/admin/" exact>
              <Redirect to="/admin/dashboard" />
            </Route>
            <Route path="/admin/settings">
              <AdminSettings />
            </Route>
            <Route path="/admin/users" exact>
              <Users />
            </Route>
            <Route path="/admin/users/new" exact>
              <AddUserPage />
            </Route>
            {/*<Route path="/admin/users/user/:id" exact>*/}
            {/*  <UserPage />*/}
            {/*</Route>*/}
            {/*<Route path="/admin/users/user/:id" exact>*/}
            {/*  <Notifications />*/}
            {/*</Route>*/}
            {/*<Route path="/admin/users/user/:id/notification/:name" exact>*/}
            {/*  <EditNotification />*/}
            {/*</Route>*/}
            {/*<Route path="/admin/users/user/:id/notification/new" exact>*/}
            {/*  <EditNotification />*/}
            {/*</Route>*/}
            <Route path="/admin/tools">
              <UsersTools />
            </Route>
            <Route path="/admin/assets/custom-fonts">
              <CustomFonts metaValue={(this.props.metaValue != '') ? this.props.metaValue : null} />
            </Route>
            <Route path="/admin/assets/add-new-font">
              <AddNewFont metaValue={(this.props.metaValue != '') ? this.props.metaValue : null} />
            </Route>
            <Route path="/admin/assets/edit-font/:id?">
              <EditFont metaValue={(this.props.metaValue != '') ? this.props.metaValue : null} />
            </Route>
            <Route path="/admin/assets">
              <Assets />
            </Route>
            <Route path="/admin/dashboard">
              <Dashboard />
            </Route>
            <Route path="/admin/dashboard/colors">
              <ColorSchemes />
            </Route>
            <Route path="/admin/plugins">
              <Plugins />
            </Route>
            <Route path="/admin/reports">
              <Reports />
            </Route>
            <Route path="/admin/tables" exact>
              <Tables />
            </Route>
            <Route path="/admin/tables/edit/:id" component={EditTable} exact>
              <EditTable />
            </Route>
            <Route
              path="/admin/tables/edit/:id/setting"
              component={SettingTable}
              exact
            />
            <Route
              path="/admin/tables/edit/:id/setting/migrations/add"
              component={AddMigrationPage}
            />
            <Route path="/admin/tables/add">
              <AddTable />
            </Route>
            <Route path="/admin/templates">
              <Templates />
            </Route>
            <Route path="/admin/areas/add">
              <AreaAdd />
            </Route>
            <Route path="/admin/areas/:id">
              <AreaEdit />
            </Route>
            <Route path="/admin/areas">
              <Areas />
            </Route>
            <Route path="/admin/menus/:id">
              <MenuPage />
            </Route>
            <Route path="/admin/menus">
              <MenusList />
            </Route>
            <Route path="/admin/robots">
              <Robots />
            </Route>
            <Route path="/admin/pages" exact>
              <AllPages />
            </Route>
            <Route path="/admin/pages/edit/:id">
              <AddPage />
            </Route>
            <Route path="/admin/pages/add">
              <AddPage />
            </Route>
            <Route path="/admin/tables/models" exact>
              <Models updateModels={this.updateModels} />
            </Route>
            <Route path="/admin/tables/sql_editors" exact>
              <SQLEditors />
            </Route>
            <Route path="/admin/tables/sql_editors/add">
              <SqlEditor />
            </Route>
            <Route path="/admin/tables/sql_editors/edit/:id">
              <SqlEditor />
            </Route>
            <Route path="/admin/tables/models/add">
              <AddModel updateModels={this.updateModels} />
            </Route>
            <Route path="/admin/tables/models/edit/:id" exact>
              <EditModel updateModels={this.updateModels}/>
            </Route>
            <Route path="/admin/tables/models/:modelId/fields/add">
              <EditField />
            </Route>
            <Route path="/admin/tables/models/:modelId/fields/edit/:id">
              <EditField />
            </Route>
            <Route path="/admin/tables/models/:modelId/remote-fields/add">
              <EditField />
            </Route>
            <Route path="/admin/tables/models/:modelId/remote-fields/edit/:id">
              <EditField />
            </Route>
            <Route path="/admin/tables/models/:modelId/relations/add">
              <AddRelation />
            </Route>
            <Route path="/admin/tables/models/:modelId/relations/edit/:id">
              <AddRelation />
            </Route>
            <Route path="/admin/tables/models/:modelId/accessors/add">
              <AddAccessor />
            </Route>
            <Route path="/admin/tables/models/:modelId/accessors/edit/:id">
              <AddAccessor />
            </Route>
            <Route path="/admin/tables/models/:modelId/queries/add">
              <SQLBuilder />
            </Route>
            <Route path="/admin/tables/models/:modelId/queries/edit/:id">
              <SQLBuilder />
            </Route>
            <Route path="/admin/tables/data-sources/add">
              <AddDataSource />
            </Route>
            <Route path="/admin/tables/data-sources/edit/:id">
              <AddDataSource />
            </Route>
            <Route path="/admin/access/roles/add">
              <RolePage />
            </Route>
            <Route path="/admin/access/roles/edit/:id">
              <RolePage />
            </Route>
            <Route path="/admin/access/permissions/add">
              <PermissionPage />
            </Route>
            <Route path="/admin/access/permissions/edit/:id">
              <PermissionPage />
            </Route>
            <Route path="/admin/access">
              <AccessOptions />
            </Route>
            <Route path="/admin/models">
              <ModelsPage />
            </Route>
            <Route path="/admin/model/:id">
              <ModelPage />
            </Route>
          </Switch>
        </Router>
        <AdminModal />
        <UserTopPanel />
        <AssetsBrowser />
      </div>
    );
  }
}

let _export;

const mapStateToProps = (state) => {
  return {
    metaValue: state.customFonts.metaValue,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUserData: user => dispatch(setUserData(user)),
    getCustomFonts: metaValue => dispatch(getCustomFonts(metaValue))
  }
};

Admin = connect(mapStateToProps, mapDispatchToProps)(Admin)
if (process.env.NODE_ENV === "production") {
  _export = Admin;
} else {
  _export = hot(module)(Admin);
}

export default _export;
