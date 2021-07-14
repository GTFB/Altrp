import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.scss";
import Updates from "./Updates";
import StylesSettings from "./StylesSettings";
import Import from "./settings/Import";
import Export from "./settings/Export";
import Websockets from "./settings/integrations/Websockets";
import Telegram from "./settings/integrations/Telegram";
import Resource from "../../../editor/src/js/classes/Resource";
const AdvancedSettings = React.lazy(() => import("./AdvancedSettings"));
const MailForm = React.lazy(() => import("./settings/MailForm"));

export default class AdminSettings extends Component {
  constructor(props) {
    super(props);
    this.switchTab = this.switchTab.bind(this);
    this.state = {
      SSREnabled: false,
      SSRPort: "",
      SSRAlias: "",
      SSRConf: false,
      activeTab: parseInt(window.location.hash[1]) || 0
    };
  }

  toggleSSREnabled = async e => {
    let value = e.target.checked;
    await new Resource({
      route: "/admin/ajax/settings"
    }).put("altrp_ssr_disabled", { value });
    this.setState(state => ({
      ...state,
      SSREnabled: value
    }));
  };
  setSSRPort = async e => {
    let value = e.target.value;
    new Resource({ route: "/admin/ajax/settings" }).put("ssr_port", { value });
    this.setState(state => ({
      ...state,
      SSRPort: value
    }));
  };

  setSSRPort = async e => {
    let value = e.target.value;
    new Resource({ route: "/admin/ajax/settings" }).put("ssr_port", { value });
    this.setState(state => ({
      ...state,
      SSRPort: value
    }));
  };

  setSSRSettingsAlias = async e => {
    let value = e.target.value;
    new Resource({ route: "/admin/ajax/settings" }).put("ssr_settings_alias", {
      value
    });
    this.setState(state => ({
      ...state,
      SSRAlias: value
    }));
  };

  generateConfig = async e => {
    new Resource({ route: "/admin/ajax/ssr/make" }).post().then(
      success => {
        alert(success.message);
      },
      error => {
        alert(error);
      }
    );
  };
  restartSSR = async e => {
    new Resource({ route: "/admin/ajax/ssr/restart" }).post().then(
      success => {
        alert(success.message);
      },
      error => {
        alert(error);
      }
    );
  };

  clearProjectCache = async e => {
    new Resource({ route: "/admin/ajax/cache/clear" }).post().then(
      success => {
        alert(success.message);
      },
      error => {
        alert(error);
      }
    );
  };

  async componentDidMount() {
    let SSREnabled = !!(
      await new Resource({ route: "/admin/ajax/settings" }).get(
        "altrp_ssr_disabled"
      )
    ).altrp_ssr_disabled;
    let SSRPort = (
      await new Resource({ route: "/admin/ajax/settings" }).get("ssr_port")
    ).ssr_port;
    let SSRAlias = (
      await new Resource({ route: "/admin/ajax/settings" }).get(
        "ssr_settings_alias"
      )
    ).ssr_settings_alias;
    let SSRConf = (
      await new Resource({ route: "/admin/ajax/ssr/check" }).get("")
    ).file;
    console.log(SSRConf);
    this.setState(state => ({
      ...state,
      SSREnabled,
      SSRPort,
      SSRAlias,
      SSRConf
    }));
  }
  switchTab(activeTab) {
    window.location.hash = activeTab + "";
    this.setState(state => {
      return { ...state, activeTab };
    });
  }

  render() {
    const { SSRPort, SSRAlias, SSRConf } = this.state;
    return (
      <div className="admin-settings admin-page">
        <div className="admin-heading">
          <div className="admin-breadcrumbs">
            <a className="admin-breadcrumbs__link" href="#">
              Settings
            </a>
            <span className="admin-breadcrumbs__separator">/</span>
            <span className="admin-breadcrumbs__current">Builder</span>
          </div>
        </div>
        <div className="admin-content">
          <Tabs selectedIndex={this.state.activeTab} onSelect={this.switchTab}>
            <TabList className="nav nav-pills admin-pills">
              <Tab>GENERAL</Tab>
              <Tab>STYLE</Tab>
              <Tab>INTEGRATIONS</Tab>
              <Tab>ADVANCED</Tab>
              <Tab>UPDATES</Tab>
              <Tab>EXPORT</Tab>
              <Tab>IMPORT</Tab>
              <Tab>MAIL</Tab>
            </TabList>
            <TabPanel>
              <table>
                <tbody className="admin-table-body">
                  <tr className="admin-settings-table-row">
                    <td className="admin-settings-table__td row-text">SSR</td>
                    <td className="admin-settings-table__td ">
                      <input
                        className="admin-table__td_check"
                        checked={this.state.SSREnabled}
                        onChange={this.toggleSSREnabled}
                        type="checkbox"
                      />
                      Hide Server Side Content
                    </td>
                  </tr>
                  <tr className="admin-settings-table-row">
                    <td className="admin-settings-table__td row-text">
                      SSR Port
                    </td>
                    <td className="admin-settings-table__td ">
                      <input
                        className="admin-table__td_check"
                        type="text"
                        placeholder="9000"
                        value={SSRPort}
                        onChange={this.setSSRPort}
                      />
                    </td>
                  </tr>
                  <tr className="admin-settings-table-row">
                    <td className="admin-settings-table__td row-text">
                      SSR Settings Alias
                    </td>
                    <td className="admin-settings-table__td ">
                      <input
                        className="admin-table__td_check"
                        type="text"
                        placeholder="For ex. yourproject.."
                        value={SSRAlias}
                        onChange={this.setSSRSettingsAlias}
                      />
                    </td>
                  </tr>
                  {SSRAlias?.length > 0 && (
                    <tr className="admin-settings-table-row">
                      <td className="admin-settings-table__td row-text">
                        Make SSR conf
                      </td>
                      <td className="admin-settings-table__td ">
                        <button
                          className="btn btn_success"
                          onClick={this.generateConfig}
                        >
                          Generate
                        </button>
                      </td>
                    </tr>
                  )}
                  {SSRConf && (
                    <tr className="admin-settings-table-row">
                      <td className="admin-settings-table__td row-text">
                        Restart SSR
                      </td>
                      <td className="admin-settings-table__td ">
                        <button
                          className="btn btn_success"
                          onClick={this.restartSSR}
                        >
                          Restart
                        </button>
                      </td>
                    </tr>
                  )}

                  <tr className="admin-settings-table-row">
                    <td className="admin-settings-table__td row-text">
                      Clear project cache
                    </td>
                    <td className="admin-settings-table__td ">
                      <button
                        className="btn btn_success"
                        onClick={this.clearProjectCache}
                      >
                        Clear
                      </button>
                    </td>
                  </tr>
                  <tr className="admin-settings-table-row">
                    <td className="admin-settings-table__td row-text">
                      Disable Default Fonts
                    </td>
                    <td className="admin-settings-table__td ">
                      <input
                        className="admin-table__td_check"
                        type="checkbox"
                      />
                      Checking this box will disable Builder’s Default Fonts,
                      and make Builder inherit the fonts from your CSS file
                    </td>
                  </tr>
                  <tr className="admin-settings-table-row">
                    <td className="admin-settings-table__td header-text">
                      Improve builder
                    </td>
                  </tr>
                  <tr className="admin-settings-table-row">
                    <td className="admin-settings-table__td row-text">
                      Usage Data Sharing
                    </td>
                    <td className="admin-settings-table__td ">
                      <input
                        className="admin-table__td_check"
                        type="checkbox"
                      />
                      Become a super contributor by opting in to share
                      non-sensitive plugin data and to get our updates. Learn
                      more
                    </td>
                  </tr>
                </tbody>
              </table>
            </TabPanel>
            <TabPanel>
              <StylesSettings />
            </TabPanel>
            <TabPanel>
              <Websockets />
              <Telegram />
            </TabPanel>
            <TabPanel>
              <React.Suspense fallback={"Loading"}>
                <AdvancedSettings />
              </React.Suspense>
            </TabPanel>
            <TabPanel>
              <Updates attr={"attr"} />
            </TabPanel>
            <TabPanel>
              <Export />
            </TabPanel>
            <TabPanel>
              <Import />
            </TabPanel>
            <TabPanel>
              <React.Suspense fallback={"Loading"}>
                <MailForm />
              </React.Suspense>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    );
  }
}
