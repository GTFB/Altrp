import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import 'react-tabs/style/react-tabs.scss';
import Updates from "./Updates";
import StylesSettings from "./StylesSettings";
import Import from "./settings/Import";
import Export from "./settings/Export";
const AdvancedSettings = React.lazy(()=>import('./AdvancedSettings'));
const MailForm = React.lazy(()=>import('./settings/MailForm'));


export default class AdminSettings extends Component {
  constructor(props){
    super(props);
    this.switchTab = this.switchTab.bind(this);
    this.state = {
      activeTab: parseInt(window.location.hash[1]) || 0,
    };
  }

  switchTab(activeTab){
    window.location.hash = activeTab + '';
    this.setState(state=>{return{ ...state,activeTab }})
  }

  render() {
    return <div className="admin-settings admin-page">
      <div className="admin-heading">
        <div className="admin-breadcrumbs"><a className="admin-breadcrumbs__link" href="#">Settings</a><span
            className="admin-breadcrumbs__separator">/</span><span
            className="admin-breadcrumbs__current">Builder</span></div>
      </div>
      <div className="admin-content">
        <Tabs selectedIndex={this.state.activeTab}
              onSelect={this.switchTab}
        >
          <TabList className="nav nav-pills admin-pills">
            <Tab>
              GENERAL
            </Tab>
            <Tab>
              STYLE
            </Tab>
            <Tab >
              INTEGRATIONS
            </Tab>
            <Tab >
              ADVANCED
            </Tab>
            <Tab >
              UPDATES
            </Tab>
            <Tab >
              EXPORT
            </Tab>
            <Tab >
              IMPORT
            </Tab>
            <Tab >
              MAIL
            </Tab>
          </TabList>
          <TabPanel>
            <table>
              <tbody className="admin-table-body">
              <tr className="admin-settings-table-row">
                <td className="admin-settings-table__td row-text">Post Types</td>
                <td className="admin-settings-table__td ">
                  <input className="admin-table__td_check" type="checkbox"/>Pages<br/>
                  <input className="admin-table__td_check" type="checkbox"/>News
                </td>
              </tr>
              <tr className="admin-settings-table-row">
                <td className="admin-settings-table__td row-text">Disable Default Colors</td>
                <td className="admin-settings-table__td ">
                  <input className="admin-table__td_check" type="checkbox"/>Checking this box will disable
                  Builder's Default Colors, and make Builder inherit the colors from your CSS file
                </td>
              </tr>
              <tr className="admin-settings-table-row">
                <td className="admin-settings-table__td row-text">Disable Default Fonts</td>
                <td className="admin-settings-table__td ">
                  <input className="admin-table__td_check" type="checkbox"/>Checking this box will disable
                  Builder’s Default Fonts, and make Builder inherit the fonts from your CSS file
                </td>
              </tr>
              <tr className="admin-settings-table-row">
                <td className="admin-settings-table__td header-text">Improve builder</td>
              </tr>
              <tr className="admin-settings-table-row">
                <td className="admin-settings-table__td row-text">Usage Data Sharing</td>
                <td className="admin-settings-table__td ">
                  <input className="admin-table__td_check" type="checkbox"/>Become a super contributor by
                  opting in to share non-sensitive plugin data and to get our updates. Learn more
                </td>
              </tr>
              <tr className="admin-settings-table-row">
                <td className="admin-settings-table__td">
                  <button className="admin-settings-button btn btn-sm" type="button">Save Changes</button>
                </td>
              </tr>

              </tbody>
            </table>
          </TabPanel>
          <TabPanel>
            <StylesSettings/>
          </TabPanel>
          <TabPanel>
          </TabPanel>
          <TabPanel>
            <React.Suspense fallback={'Loading'}>
              <AdvancedSettings/>
            </React.Suspense>
          </TabPanel>
          <TabPanel>
            <Updates attr={'attr'}/>
          </TabPanel>
          <TabPanel>
            <Export />
          </TabPanel>
          <TabPanel>
            <Import />
          </TabPanel>
          <TabPanel>
            <React.Suspense fallback={'Loading'}>
              <MailForm />
            </React.Suspense>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  }
}
