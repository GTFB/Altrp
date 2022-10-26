import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.scss";
import Updates from "./Updates";
import StylesSettings from "./StylesSettings";
import Websockets from "./settings/integrations/Websockets";
import Telegram from "./settings/integrations/Telegram";
import Resource from "../../../editor/src/js/classes/Resource";

import UserTopPanel from "./UserTopPanel";
import React from "react";
import CategoryTable from "./CategoryTable";
import ImageSettingsTable from "./ImageSettingsTable";
import {connect} from "react-redux";
import SmallModal from "./SmallModal";
import AdvancedSettings from "./AdvancedSettings";
const MailForm = React.lazy(() => import("./settings/MailForm"));

class AdminSettings extends Component {
  constructor(props) {
    super(props);
    this.switchTab = this.switchTab.bind(this);
    this.onClickResetDatabase = this.onClickResetDatabase.bind(this)
    this.state = {
      GoogleFontsDisabled: false,
      IndexingDisabled: false,
      activeTab: parseInt(window.location.hash[1]) || 0,
      modal: false,
      imageModal: false,
      idImageSetting: null,
      idModal: null,
      modalResetHidden: false,
      emailReset: '',
      passwordReset: '',
      modalResetLoading: false
    };
  }

  toggleGoogleFontsDisabled = async e => {
    let value = e.target.checked;
    await new Resource({
      route: "/admin/ajax/settings"
    }).put("altrp_google_fonts_disabled", { value });
    this.setState(state => ({
      ...state,
      GoogleFontsDisabled: value
    }));
  };
  SPAToggle = async e => {
    let value = e.target.checked;
    await new Resource({
      route: "/admin/ajax/settings"
    }).put("spa_off", { value });
    this.setState(state => ({
      ...state,
      SPA_off: value
    }));
  }
  toggleIndexingDisabled = async e => {
    let value = e.target.checked;
    await new Resource({
      route: "/admin/ajax/settings"
    }).put("altrp_indexing_disabled", { value });
    this.setState(state => ({
      ...state,
      IndexingDisabled: value
    }));
  };

  toggleModalCategory = () => {
    if (this.state.idModal) {
      this.setState(state => ({
        ...state,
        modal: !state.modal,
        idModal: null
      }))
    } else {
      this.setState(state => ({
        ...state,
        modal: !state.modal
      }))
    }
  }

  async componentDidMount() {

    let GoogleFontsDisabled = !!(
      await new Resource({ route: "/admin/ajax/settings" }).get(
        "altrp_google_fonts_disabled"
      )
    ).altrp_google_fonts_disabled;

    let IndexingDisabled = !!(
      await new Resource({ route: "/admin/ajax/settings" }).get(
        "altrp_indexing_disabled"
      )
    ).altrp_indexing_disabled;
    let SPA_off = !!(
      await new Resource({ route: "/admin/ajax/settings" }).get(
        "spa_off"
      )
    ).spa_off;

    //console.log(GoogleFontsDisabled)

    this.setState(state => ({
      ...state,
      GoogleFontsDisabled,
      IndexingDisabled,
      SPA_off,
    }));
  }
  switchTab(activeTab) {
    window.location.hash = activeTab + "";
    this.setState(state => {
      return { ...state, activeTab };
    });
  }

  editCategory = (guid) => {
    this.setState(state => ({
      ...state,
      modal: true,
      idModal: guid
    }))
  }

  toggleModalImageSettings = () => {
    if (this.state.idImageSetting) {
      this.setState(state => ({
        ...state,
        imageModal: !state.imageModal,
        idImageSetting: null
      }))
    } else {
      this.setState(state => ({
        ...state,
        imageModal: !state.imageModal
      }))
    }
  }

  editImageSettings = (id) => {
    this.setState(state => ({
      ...state,
      imageModal: true,
      idImageSetting: id
    }))
  }

  onClickToggleModal = () => {
    this.setState(state => ({
      ...state,
      modalResetHidden: !state.modalResetHidden
    }))
  }

  onClickResetDatabase = async () => {
    const userData = { emailReset: this.state.emailReset,  passwordReset: this.state.passwordReset}

    try {
     const condition = confirm('are you sure?')
      if (condition) {
        const response = await new Resource({
          route: "/admin/ajax/settings/reset"
        }).post(userData)
        this.setState(state => ({
          ...state,
          modalResetLoading: true,
          emailReset: '',
          passwordReset: ''
        }))

       if (response.success === true) {
           // delete adonis-session cookies
           window.Cookies.remove('adonis-session')
           // redirect to altrp-login
           window.location = '/altrp-login'
        }

      } else {
        this.onClickToggleModal()
      }

    } catch (e) {
      window.location = '/altrp-login'
    } finally {
      this.setState(state => ({
        ...state,
        modalResetLoading: false
      }))
    }
  }

  onChangeResetEmail = (e) => {
    this.setState(state => ({
      ...state,
      emailReset: e.target.value
    }))
  }

  onChangeResetPassword = (e) => {
    this.setState(state => ({
      ...state,
      passwordReset: e.target.value
    }))
  }

  render() {
    const { GoogleFontsDisabled, IndexingDisabled, SSRPort, SSRAlias, SSRConf, idModal, modalResetHidden, emailReset, passwordReset, modalResetLoading } = this.state;
    const {resetEnable} = this.props.adminState

    //console.log(this.state)

    return (
      <div className="admin-settings admin-page">
        <div className="admin-heading">
          <div className="admin-heading-left">
            <div className="admin-breadcrumbs">
              <a className="admin-breadcrumbs__link" href="#">
                Settings
              </a>
              <span className="admin-breadcrumbs__separator">/</span>
              <span className="admin-breadcrumbs__current">Builder</span>
            </div>
            {this.state.activeTab === 8 && (
              <button className="btn" onClick={this.toggleModalCategory}>Add Category</button>
            )}
            {this.state.activeTab === 9 && (
              <button className="btn" onClick={this.toggleModalImageSettings}>Add Image Settings</button>
            )}
          </div>
          <UserTopPanel />
        </div>
        <div className="admin-content zeroing__styleTabsSettings">
          <Tabs selectedIndex={this.state.activeTab} onSelect={this.switchTab}>
            <TabList className="nav nav-pills admin-pills">
              <Tab>General</Tab>
              <Tab>Style</Tab>
              <Tab>Integrations</Tab>
              <Tab>Advanced</Tab>
              <Tab>Updates</Tab>
              <Tab>Mail</Tab>
              <Tab>Categories</Tab>
              <Tab>Image settings</Tab>
            </TabList>
            <TabPanel>
              <h4>Welcome to Altrp Settings Page</h4>
              <table>
                <tbody className="admin-table-body">

                  <tr className="admin-settings-table-row">
                    <td className="admin-settings-table__td row-text">Google Fonts</td>
                    <td className="admin-settings-table__td ">
                      <input
                        className="admin-table__td_check"
                        checked={this.state.GoogleFontsDisabled}
                        onChange={this.toggleGoogleFontsDisabled}
                        type="checkbox"
                      />
                      Disable
                    </td>
                  </tr>

                  <tr className="admin-settings-table-row">
                    <td className="admin-settings-table__td row-text">Website Indexing</td>
                    <td className="admin-settings-table__td ">
                      <input
                        className="admin-table__td_check"
                        checked={this.state.IndexingDisabled}
                        onChange={this.toggleIndexingDisabled}
                        type="checkbox"
                      />
                      Disable
                    </td>
                  </tr>
                  <tr className="admin-settings-table-row">
                    <td className="admin-settings-table__td row-text">SPA Off</td>
                    <td className="admin-settings-table__td ">
                      <input
                        className="admin-table__td_check"
                        checked={this.state.SPA_off || false}
                        onChange={this.SPAToggle}
                        type="checkbox"
                      />
                      Disable
                    </td>
                  </tr>


                  {/*<tr className="admin-settings-table-row">*/}
                  {/*  <td className="admin-settings-table__td row-text">SSR</td>*/}
                  {/*  <td className="admin-settings-table__td ">*/}
                  {/*    <input*/}
                  {/*      className="admin-table__td_check"*/}
                  {/*      checked={this.state.SSREnabled}*/}
                  {/*      onChange={this.toggleSSREnabled}*/}
                  {/*      type="checkbox"*/}
                  {/*    />*/}
                  {/*    Hide Server Side Content*/}
                  {/*  </td>*/}
                  {/*</tr>*/}
                  {/*<tr className="admin-settings-table-row">*/}
                  {/*  <td className="admin-settings-table__td row-text">*/}
                  {/*    SSR Port*/}
                  {/*  </td>*/}
                  {/*  <td className="admin-settings-table__td ">*/}
                  {/*    <input*/}
                  {/*      className="admin-table__td_check"*/}
                  {/*      type="text"*/}
                  {/*      placeholder="9000"*/}
                  {/*      value={SSRPort}*/}
                  {/*      onChange={this.setSSRPort}*/}
                  {/*    />*/}
                  {/*  </td>*/}
                  {/*</tr>*/}
                  {/*<tr className="admin-settings-table-row">*/}
                  {/*  <td className="admin-settings-table__td row-text">*/}
                  {/*    SSR Settings Alias*/}
                  {/*  </td>*/}
                  {/*  <td className="admin-settings-table__td ">*/}
                  {/*    <input*/}
                  {/*      className="admin-table__td_check"*/}
                  {/*      type="text"*/}
                  {/*      placeholder="For ex. yourproject.."*/}
                  {/*      value={SSRAlias}*/}
                  {/*      onChange={this.setSSRSettingsAlias}*/}
                  {/*    />*/}
                  {/*  </td>*/}
                  {/*</tr>*/}
                  {/*{SSRAlias?.length > 0 && (*/}
                  {/*  <tr className="admin-settings-table-row">*/}
                  {/*    <td className="admin-settings-table__td row-text">*/}
                  {/*      Make SSR conf*/}
                  {/*    </td>*/}
                  {/*    <td className="admin-settings-table__td ">*/}
                  {/*      <button*/}
                  {/*        className="btn btn_success"*/}
                  {/*        onClick={this.generateConfig}*/}
                  {/*      >*/}
                  {/*        Generate*/}
                  {/*      </button>*/}
                  {/*    </td>*/}
                  {/*  </tr>*/}
                  {/*)}*/}
                  {/*{SSRConf && (*/}
                  {/*  <tr className="admin-settings-table-row">*/}
                  {/*    <td className="admin-settings-table__td row-text">*/}
                  {/*      Restart SSR*/}
                  {/*    </td>*/}
                  {/*    <td className="admin-settings-table__td ">*/}
                  {/*      <button*/}
                  {/*        className="btn btn_success"*/}
                  {/*        onClick={this.restartSSR}*/}
                  {/*      >*/}
                  {/*        Restart*/}
                  {/*      </button>*/}
                  {/*    </td>*/}
                  {/*  </tr>*/}
                  {/*)}*/}

                  {/*<tr className="admin-settings-table-row">*/}
                  {/*  <td className="admin-settings-table__td row-text">*/}
                  {/*    Clear project cache*/}
                  {/*  </td>*/}
                  {/*  <td className="admin-settings-table__td ">*/}
                  {/*    <button*/}
                  {/*      className="btn btn_success btn_general"*/}
                  {/*      onClick={this.clearProjectCache}*/}
                  {/*    >*/}
                  {/*      Clear*/}
                  {/*    </button>*/}
                  {/*  </td>*/}
                  {/*</tr>*/}
                  {/*<tr className="admin-settings-table-row">*/}
                  {/*  <td className="admin-settings-table__td row-text">*/}
                  {/*    Disable Default Fonts*/}
                  {/*  </td>*/}
                  {/*  <td className="admin-settings-table__td ">*/}
                  {/*    <input*/}
                  {/*      className="admin-table__td_check"*/}
                  {/*      type="checkbox"*/}
                  {/*    />*/}
                  {/*    Checking this box will disable Builder’s Default Fonts,*/}
                  {/*    and make Builder inherit the fonts from your CSS file*/}
                  {/*  </td>*/}
                  {/*</tr>*/}
                  {/*<tr className="admin-settings-table-row">*/}
                  {/*  <td className="admin-settings-table__td header-text">*/}
                  {/*    Improve builder*/}
                  {/*  </td>*/}
                  {/*</tr>*/}
                  {/*<tr className="admin-settings-table-row">*/}
                  {/*  <td className="admin-settings-table__td row-text">*/}
                  {/*    Usage Data Sharing*/}
                  {/*  </td>*/}
                  {/*  <td className="admin-settings-table__td ">*/}
                  {/*    <input*/}
                  {/*      className="admin-table__td_check"*/}
                  {/*      type="checkbox"*/}
                  {/*    />*/}
                  {/*    Become a super contributor by opting in to share*/}
                  {/*    non-sensitive plugin data and to get our updates. Learn*/}
                  {/*    more*/}
                  {/*  </td>*/}
                  {/*</tr>*/}
                  {/*<tr className="admin-settings-table-row">*/}
                  {/*  <td className="admin-settings-table__td row-text">*/}
                  {/*    Open standard models*/}
                  {/*  </td>*/}
                  {/*  <td className="admin-settings-table__td ">*/}
                  {/*    <AutoUpdateCheckbox*/}
                  {/*      type="checkbox"*/}
                  {/*      className="admin-table__td_check"*/}
                  {/*    />*/}
                  {/*  </td>*/}
                  {/*</tr>*/}
                  {resetEnable && <tr className="admin-settings-table-row">
                    <td className="admin-settings-table__td row-text">
                      Reset database
                    </td>
                    <td className="admin-settings-table__td ">
                      <button
                        className="btn btn_success btn_general"
                        onClick={this.onClickToggleModal}
                      >
                        Reset
                      </button>
                    </td>
                  </tr>}
                </tbody>
              </table>
            </TabPanel>
            <SmallModal activeMode={modalResetHidden} toggleModal={this.onClickToggleModal}>
              <div className="admin-reset-wrapper" >
                <div className="admin-reset-form-elements">
                  <label htmlFor="email">New admin email</label>
                  <input className="admin-reset-form-input" type="email" id={'email'} value={emailReset} onChange={this.onChangeResetEmail} />
                  <label htmlFor="email">New admin password</label>
                  <input className="admin-reset-form-input" type="password" id={'password'} value={passwordReset} onChange={this.onChangeResetPassword} />
                </div>
                <button
                  className="btn btn_success btn_general"
                  onClick={this.onClickResetDatabase}
                  disabled={modalResetLoading}
                >
                  Reset database and create new admin
                </button>
              </div>
            </SmallModal>
            <TabPanel>
              <StylesSettings />
            </TabPanel>
            <TabPanel>
              <div className="admin_settings_integrations">
                <Websockets />
                <Telegram />
              </div>
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
              <React.Suspense fallback={"Loading"}>
                <MailForm />
              </React.Suspense>
            </TabPanel>
            <TabPanel className="Category">
              <CategoryTable
                edit={this.editCategory}
                activeMode={this.state.modal}
                guid={this.state.idModal}
                onToggle={this.toggleModalCategory}
              />
            </TabPanel>
            <TabPanel className="Image-settings">
              <ImageSettingsTable
                onToggle={this.toggleModalImageSettings}
                activeMode={this.state.imageModal}
                edit={this.editImageSettings}
                id={this.state.idImageSetting}
              />
            </TabPanel>
          </Tabs>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {adminState: state.adminState}
}

export default connect(mapStateToProps)(AdminSettings);
