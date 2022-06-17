import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter,
} from "react-router-dom";
import { hot } from "react-hot-loader";
import { Scrollbars } from "react-custom-scrollbars";
import { connect } from "react-redux";

import Bars from "./svgs/bars-v2.svg";
import AssetSvg from "./svgs/assets-v2.svg";
import MainSvg from "./svgs/main-v2.svg";
import PagesSvg from "./svgs/pages-v2.svg";
import PluginSvg from "./svgs/plugins-v2.svg";
import DatabaseSvg from "./svgs/models-v2.svg";
import SettingSvg from "./svgs/settings-v2.svg";
import TablesSvg from "./svgs/tables-v2.svg";
import RobotsSvg from "./svgs/robots-v2.svg";
import LayoutSvg from "./svgs/layout-v2.svg";
import UserSvg from "./svgs/users-v2.svg";
import DropletSvg from "./svgs/droplet-new.svg";
import MarketPlace from "./svgs/marketplace.svg"
import ChevronMenu from "./svgs/chevron__menu.svg"

import AdminLogo from "./components/AdminLogo";
import AdminModal from "./components/AdminModal";
import AdminVersion from "./components/AdminVersion";
import { WithRouterAdminTablesDropList } from "./components/AdminTablesDropList";
import { WithRouterAdminTemplatesDropList } from "./components/AdminTemplatesDropList";
import { WithRouterAdminUsersDropList } from "./components/AdminUsersDropList";
import {WithRouterAdminModelsDropList} from "./components/AdminModelsDropList";

import AssetsBrowser from "../../editor/src/js/classes/modules/AssetsBrowser";
import Resource from "../../editor/src/js/classes/Resource";

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
import {modelsToggle} from "./js/store/models-state/actions";
import {WithRouterAdminRobotsDropList} from "./components/AdminRobotsDropList";
import getAPiToken from "./js/functions/get-api-token";
import {WithRouterAdminSearchPluginsDropList} from "./components/AdminSearchPluginsDropList";
import {io} from "socket.io-client";
import {addRoute, editModels, setRoutes, setMainMenu} from "./js/store/routes-state/action";
import getAltrpLang from "./js/helpers/get-altrp-lang";


window.React = React;
window.ReactDOM = ReactDOM;
window.Link = Link;
window.Router = Router;
window.Component = React.Component;
getAPiToken();
class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adminState: {
        adminEnable: true
      },
      pagesMenuShow: false,
      activeButton: 0,
      menu: true,
    };
    window.altrpAdmin = this
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  filterRoutes(filterFn){
    if(_.isFunction(filterFn)){
      this.props.setRoutes(filterFn(store.getState()?.routesState?.routes || []))
    }
  }
  filterMainMenu(filterFn){
    console.log(filterFn);
    console.log(this.props.mainMenu);
    if(_.isFunction(filterFn)){
      this.props.setMainMenu(filterFn(store.getState()?.routesState?.mainMenu || []))
    }
  }

  componentDidMount() {
    store.subscribe(this.updateAdminState.bind(this));
    new Resource({ route: "/admin/ajax/model_options" })
      .getAll()
      .then(({ options }) => store.dispatch(editModels(options)));

    this.getConnect();
    this.getMetaName();
    this.getStatusCheckedModels();
    const AdminLoadedEvent = new Event('altrp-admin-loaded')
    window.dispatchEvent(AdminLoadedEvent);
    _.get(window, 'altrp.adminLoaded', true)
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

    if(currentUser.guid && !window.altrpIo) {
      window.altrpIo = io( {
        path: '/wsaltrp',
        auth: {
          key: currentUser.guid,
        },
      })
      window.altrpIo.on("message", (data) => {
        console.log(data)
      })
    }
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

  toggleAdminMenu = () => {
    this.setState({
      menu: !this.state.menu
    })
    let rootAdmin = !this.state.menu ? "true" : "false"
    const root = document.querySelector(':root')

    const components = [
      'menu-admin',
      'menu-droplet'
    ]
    components.forEach((component) => {
      root.style.setProperty(
        `--${component}-default`,
        `var(--${component}-${rootAdmin})`
      )
    })
  }

  render() {
    const { models, mainMenu } = this.props;
    const { activeButton } = this.state;
    let adminClasses = ["admin"];
    if (!this.props.adminEnable) {
      adminClasses.push("pointer-event-none");
    }
    if (this.state.pagesMenuShow) {
      adminClasses.push("admin_pages-show");
    }
    return (
      <div className={adminClasses.join(" ")}>
        <div className="admin-block">
          <Router>
            {this.state.menu ? (
              <nav className="admin-nav">
                <div className="admin-nav-top">
                  <AdminLogo menu={this.state.menu} />
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
                            className={location.pathname.includes('pages') ? "admin-nav-list__link active__panel" : "admin-nav-list__link admin-nav-list__link-top"}
                            onClick={() => this.setState({ activeButton: 8 })}
                          >
                            <PagesSvg className="icon" />
                            <DropletSvg className="icon__droplet"/>
                            <span>Pages</span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/admin/assets"
                            className={location.pathname.includes('assets') ? "admin-nav-list__link active__panel" : "admin-nav-list__link admin-nav-list__link-top"}
                            onClick={() => this.setState({ activeButton: 1 })}
                          >
                            <AssetSvg className="icon" />
                            <DropletSvg className="icon__droplet"/>
                            <span>Assets</span>
                          </Link>
                          {/*<WithRouterAdminAssetsDropList activeButton={() => this.setState({ activeButton: 1 })}/>*/}
                        </li>
                        <li>
                          <Link to="/admin/databases"
                                className={location.pathname.includes('databases') ? "admin-nav-list__link active__panel" : "admin-nav-list__link admin-nav-list__link-top"}
                                onClick={() => this.setState({ activeButton: 9 })}
                          >
                            <DatabaseSvg className="icon" />
                            <DropletSvg className="icon__droplet"/>
                            <span>Database</span>
                          </Link>
                          <WithRouterAdminModelsDropList menu={this.state.menu} models={models} activeButton={() => this.setState({ activeButton: 9 })} />
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
                            className={location.pathname.includes('dashboard') ? "admin-nav-list__link active__panel" : "admin-nav-list__link admin-nav-list__link-top"}
                            onClick={() => this.setState({ activeButton: 0 })}
                          >
                            <MainSvg className="icon" />
                            <DropletSvg className="icon__droplet"/>
                            <span>Advise</span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/admin/templates"
                            className={
                              location.pathname.includes('templates') || location.pathname.includes('areas') || location.pathname.includes('menus') ?
                                "admin-nav-list__link active__panel" :
                                "admin-nav-list__link admin-nav-list__link-top"}
                            onClick={() => this.setState({ activeButton: 2 })}
                          >
                            <LayoutSvg className="icon" />
                            <DropletSvg className="icon__droplet"/>
                            <span>Layouts</span>
                          </Link>
                          <WithRouterAdminTemplatesDropList menu={this.state.menu} activeButton={() => this.setState({ activeButton: 2 })} />
                        </li>
                        <li>
                          {/*<Link to="/admin/tables" className="admin-nav-list__link">*/}
                          {/*<TableSvg className="icon"/>*/}
                          {/*<span>Tables</span>*/}
                          {/*</Link>*/}

                          <Link
                            to="/admin/tables/models"
                            className={location.pathname.includes('tables') ? "admin-nav-list__link active__panel" : "admin-nav-list__link admin-nav-list__link-top"}
                            onClick={() => this.setState({ activeButton: 3 })}
                          >
                            <TablesSvg className="icon" />
                            <DropletSvg className="icon__droplet"/>
                            <span>Tables</span>
                          </Link>
                          <WithRouterAdminTablesDropList menu={this.state.menu}  activeButton={() => this.setState({ activeButton: 3 })}/>
                        </li>
                        {getAltrpLang() === "javascript" ? (
                          <li>
                            <Link to="/admin/customizers"
                                  className={
                                     location.pathname.includes('customizers') ?
                                      "admin-nav-list__link active__panel" :
                                      "admin-nav-list__link admin-nav-list__link-top"
                                  }
                                  onClick={() => this.setState({ activeButton: 4 })}
                            >
                              <RobotsSvg className="icon" />
                              <DropletSvg className="icon__droplet"/>
                              <span>Robotizers</span>
                            </Link>
                          </li>
                        ) : (
                        <li>
                          <Link to="/admin/robots"
                                className={
                                  location.pathname.includes('robots') || location.pathname.includes('customizers') ?
                                    "admin-nav-list__link active__panel" :
                                    "admin-nav-list__link admin-nav-list__link-top"
                                }
                                onClick={() => this.setState({ activeButton: 4 })}
                          >
                            <RobotsSvg className="icon" />
                            <DropletSvg className="icon__droplet"/>
                            <span>Robots</span>
                          </Link>
                          <WithRouterAdminRobotsDropList menu={this.state.menu} activeButton={() => this.setState({ activeButton: 4 })} />
                        </li>
                        )}
                        {/* <li>
                    <Link to="/admin/reports" className="admin-nav-list__link">
                      <ReportSvg className="icon" />
                      <span>Reports</span>
                    </Link>
                  </li> */}
                        <li>
                          <Link
                            to="/admin/plugins"
                            className={location.pathname.includes('plugins')  ? "admin-nav-list__link active__panel" : "admin-nav-list__link admin-nav-list__link-top"}
                            onClick={() => this.setState({ activeButton: 5 })}
                          >
                            <PluginSvg className="icon" />
                            <DropletSvg className="icon__droplet"/>
                            <span>Plugins</span>
                          </Link>
                          <WithRouterAdminSearchPluginsDropList menu={this.state.menu} activeButton={() => this.setState({ activeButton: 5 })} />
                        </li>
                        <li>
                          <Link
                            to="/admin/users"
                            className={
                              location.pathname.includes('users') || location.pathname.includes('access') ?
                                "admin-nav-list__link active__panel" :
                                "admin-nav-list__link admin-nav-list__link-top"}
                            onClick={() => this.setState({ activeButton: 6 })}
                          >
                            <UserSvg className="icon" />
                            <DropletSvg className="icon__droplet"/>
                            <span>Users</span>
                          </Link>
                          <WithRouterAdminUsersDropList menu={this.state.menu} activeButton={() => this.setState({ activeButton: 6 })} />
                        </li>
                        <li>
                          <Link
                            to="/admin/marketplace"
                            className={location.pathname.includes('marketplace') ? "admin-nav-list__link active__panel" : "admin-nav-list__link admin-nav-list__link-top"}
                            onClick={() => this.setState({ activeButton: 10 })}
                          >
                            <MarketPlace className="icon" />
                            <DropletSvg className="icon__droplet"/>
                            <span>Market</span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/admin/settings"
                            className={location.pathname.includes('settings') ? "admin-nav-list__link active__panel" : "admin-nav-list__link admin-nav-list__link-top"}
                            onClick={() => this.setState({ activeButton: 7 })}
                          >
                            <SettingSvg className="icon" />
                            <DropletSvg className="icon__droplet"/>
                            <span>Settings</span>
                          </Link>
                        </li>
                        {mainMenu.map( (item, idx) => {
                          return <li key={item.id || 'main-menu' + idx }>
                            <Link className={`admin-nav-list__link ${
                              activeButton === item.id ? 'active__panel' : 'admin-nav-list__link-top'}`
                            }
                                  onClick={() => this.setState({ activeButton: item.id })}
                                  to={item.to}>
                              <SettingSvg className="icon" />
                              <DropletSvg className="icon__droplet"/>
                              <span>{item.text}</span>
                            </Link>
                          </li>
                        })
                        }
                      </ul>
                    </Scrollbars>
                  )}
                  <div onClick={this.toggleAdminMenu} className="icon-menu__block">
                    <ChevronMenu className="icon__menu" />
                  </div>
                </div>
                <AdminVersion />
              </nav>
            ) : (
              <nav className="admin-nav-mini">
                <div className="admin-nav-top-mini">
                  <AdminLogo menu={this.state.menu} />
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
                            className={location.pathname.includes('pages') ? "admin-nav-list__link-mini active__panel" : "admin-nav-list__link-mini admin-nav-list__link-top"}
                            onClick={() => this.setState({ activeButton: 8 })}
                          >
                            <PagesSvg className="icon-mini" />
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/admin/assets"
                            className={location.pathname.includes('assets') ? "admin-nav-list__link-mini active__panel" : "admin-nav-list__link-mini admin-nav-list__link-top"}
                            onClick={() => this.setState({ activeButton: 1 })}
                          >
                            <AssetSvg className="icon-mini" />
                          </Link>
                          {/*<WithRouterAdminAssetsDropList activeButton={() => this.setState({ activeButton: 1 })}/>*/}
                        </li>
                        <li>
                          <Link to="/admin/databases"
                                className={location.pathname.includes('databases') ? "admin-nav-list__link-mini active__panel" : "admin-nav-list__link-mini admin-nav-list__link-top"}
                                onClick={() => this.setState({ activeButton: 9 })}
                          >
                            <DatabaseSvg className="icon-mini" />
                          </Link>
                          <WithRouterAdminModelsDropList menu={this.state.menu} models={models} activeButton={() => this.setState({ activeButton: 9 })} />
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
                            className={location.pathname.includes('dashboard') ? "admin-nav-list__link-mini active__panel" : "admin-nav-list__link-mini admin-nav-list__link-top"}
                            onClick={() => this.setState({ activeButton: 0 })}
                          >
                            <MainSvg className="icon-mini" />
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/admin/templates"
                            className={
                              location.pathname.includes('templates') || location.pathname.includes('areas') || location.pathname.includes('menus') ?
                              "admin-nav-list__link-mini active__panel" :
                              "admin-nav-list__link-mini admin-nav-list__link-top"}
                            onClick={() => this.setState({ activeButton: 2 })
                            }
                          >
                            <LayoutSvg className="icon-mini" />
                          </Link>
                          <WithRouterAdminTemplatesDropList menu={this.state.menu} activeButton={() => this.setState({ activeButton: 2 })} />
                        </li>
                        <li>
                          {/*<Link to="/admin/tables" className="admin-nav-list__link">*/}
                          {/*<TableSvg className="icon"/>*/}
                          {/*<span>Tables</span>*/}
                          {/*</Link>*/}

                          <Link
                            to="/admin/tables/models"
                            className={location.pathname.includes('tables') ? "admin-nav-list__link-mini active__panel" : "admin-nav-list__link-mini admin-nav-list__link-top"}
                            onClick={() => this.setState({ activeButton: 3 })}
                          >
                            <TablesSvg className="icon-mini" />
                          </Link>
                          <WithRouterAdminTablesDropList menu={this.state.menu} activeButton={() => this.setState({ activeButton: 3 })}/>
                        </li>
                        {getAltrpLang() === "javascript" ? (
                          <li>
                            <Link to="/admin/customizers"
                                  className={
                                     location.pathname.includes('customizers') ?
                                      "admin-nav-list__link-mini active__panel" :
                                      "admin-nav-list__link-mini admin-nav-list__link-top"}
                                  onClick={() => this.setState({ activeButton: 4 })}
                            >
                              <RobotsSvg className="icon-mini" />
                            </Link>
                          </li>
                        ) : (
                        <li>
                          <Link to="/admin/robots"
                                className={
                                  location.pathname.includes('robots') || location.pathname.includes('customizers') ?
                                    "admin-nav-list__link-mini active__panel" :
                                    "admin-nav-list__link-mini admin-nav-list__link-top"}
                                onClick={() => this.setState({ activeButton: 4 })}
                          >
                            <RobotsSvg className="icon-mini" />
                          </Link>
                          <WithRouterAdminRobotsDropList menu={this.state.menu} activeButton={() => this.setState({ activeButton: 4 })} />
                        </li>
                        )}

                        {/* <li>
                    <Link to="/admin/reports" className="admin-nav-list__link">
                      <ReportSvg className="icon" />
                      <span>Reports</span>
                    </Link>
                  </li> */}
                        <li>
                          <Link
                            to="/admin/plugins"
                            className={location.pathname.includes('plugins') ? "admin-nav-list__link-mini active__panel" : "admin-nav-list__link-mini admin-nav-list__link-top"}
                            onClick={() => this.setState({ activeButton: 5 })}
                          >
                            <PluginSvg className="icon-mini" />
                          </Link>
                          <WithRouterAdminSearchPluginsDropList menu={this.state.menu} activeButton={() => this.setState({ activeButton: 5 })} />
                        </li>
                        <li>
                          <Link
                            to="/admin/users"
                            className={
                              location.pathname.includes('users') || location.pathname.includes('access') ?
                                "admin-nav-list__link-mini active__panel" :
                                "admin-nav-list__link-mini admin-nav-list__link-top"
                            }
                            onClick={() => this.setState({ activeButton: 6 })}
                          >
                            <UserSvg className="icon-mini" />
                          </Link>
                          <WithRouterAdminUsersDropList menu={this.state.menu} activeButton={() => this.setState({ activeButton: 6 })} />
                        </li>
                        <li>
                          <Link
                            to="/admin/marketplace"
                            className={location.pathname.includes('marketplace') ? "admin-nav-list__link-mini active__panel" : "admin-nav-list__link-mini admin-nav-list__link-top"}
                            onClick={() => this.setState({ activeButton: 10 })}
                          >
                            <MarketPlace className="icon-mini" />
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/admin/settings"
                            className={location.pathname.includes('settings') ? "admin-nav-list__link-mini active__panel" : "admin-nav-list__link-mini admin-nav-list__link-top"}
                            onClick={() => this.setState({ activeButton: 7 })}
                          >
                            <SettingSvg className="icon-mini" />
                          </Link>
                        </li>
                      </ul>
                    </Scrollbars>
                  )}
                </div>
                <div className="admin-bottom__block">
                  <Bars width={29} height={24} className="admin__bars-mini" onClick={this.toggleMenu} />
                  <ChevronMenu onClick={this.toggleAdminMenu} className="icon__menu-mini" />
                </div>
              </nav>
            )}
            <Switch>
              {
                this.props.routes.map(route => {
                   return (
                     <Route key={route.path} path={route.path} exact={route.exact}>
                       {route.component}
                     </Route>
                   )
                })
              }
            </Switch>
          </Router>
        </div>
        <AdminModal />
        {/*<UserTopPanel />*/}
        <AssetsBrowser />
        <iframe src="https://altrp.org/get_api_token" style={{height:0,width:0}}/>
      </div>
    );
  }
}

let _export;

const mapStateToProps = (state) => {
  return {
    metaValue: state.customFonts.metaValue,
    routes: state.routesState.routes,
    mainMenu: state.routesState.mainMenu,
    models: state.routesState.models,
    adminEnable: state.adminState?.adminEnable,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUserData: user => dispatch(setUserData(user)),
    getCustomFonts: metaValue => dispatch(getCustomFonts(metaValue)),
    addRoute: route => dispatch(addRoute(route)),
    setRoutes: routes => dispatch(setRoutes(routes)),
    setMainMenu: routes => dispatch(setMainMenu(routes)),
  }
};

Admin = connect(mapStateToProps, mapDispatchToProps)(Admin)
if (process.env.NODE_ENV === "production") {
  _export = Admin;
} else {
  _export = hot(module)(Admin);
}

export default _export;
