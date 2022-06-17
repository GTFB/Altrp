import * as React from "react";
import WidgetsPanel from "./modules/WidgetsPanel";
import { CustomizerSettingsPanelCompose } from "./modules/CustomizerSettingsPanel";
import SelectedPanel from "./modules/SelectedPanel";
import store from "../../store/store";
import Resource from "../../../../../editor/src/js/classes/Resource";
import LogoIcon from "../../../../../editor/src/svgs/logotext.svg";
import DotsIcon from "../../../../../editor/src/svgs/dots.svg";
import HamburgerIcon from "../../../../../editor/src/svgs/hamburger.svg";
import SettingsIcon from "../../../../../editor/src/svgs/settings.svg";
import {renderAsset} from "../../../../../front-app/src/js/helpers";
import {connect} from "react-redux";
import {BrowserRouter as Router} from "react-router-dom";
import {setCurrentCustomizer} from "../../store/current-customizer/actions";
import progressBar from "../../../../../admin/src/js/functions/progressBar";
import upgradeBackend from "../../../../../admin/src/js/functions/upgradeBackend";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.resource = new Resource({ route: "/admin/ajax/customizers" });
    this.update = this.update.bind(this);
  }

  async update() {
    const customizerId = new URL(window.location).searchParams.get("customizer_id");
    const customizerData = store.getState()?.currentCustomizer;
    const {customizerSettingsData} = this.props
    progressBar(0.001)
    let {data} = await this.resource.put(customizerId, {
      ...customizerData,
      data: customizerSettingsData
    });
    // let customizer = mutate.set(customizerData, 'source', data.source)
    await upgradeBackend(['models', 'listeners'])
    store.dispatch(setCurrentCustomizer(data));
    this.props.btnChange("");
    progressBar()
  }

  render() {
    let btnActive = this.props.btnActive ?? '';
    let activePanel = this.props.activePanel;
    let settingsActive = (activePanel === "settings") ? " active" : "";

    return (
      <div className="left-panel">
        <div className="editor-top-panel">
          <button className="btn btn_hamburger" onClick={() => this.props.changeTab("selected")} >
            <HamburgerIcon className="icon" />
          </button>

          <a href="/admin/customizers" target="_blank" className="logo">
            {window.admin_logo ? (
              renderAsset(window.admin_logo, { className: "editor__logo" })
            ) : (
              <LogoIcon className="editor__logo" />
            )}
          </a>

          <button className="btn btn_dots" onClick={() => this.props.changeTab('widgets')}>
            <DotsIcon className="icon" />
          </button>
        </div>

        <Router>
          <div className="left-panel-main">
            {activePanel === "widgets" && <WidgetsPanel />}
            {activePanel === "settings" && <CustomizerSettingsPanelCompose
              sources={ this.props.sources }
              setSources={ this.props.setSources }
              onLayout={ this.props.onLayout }
              updateCustomizer={ this.props.updateCustomizer }
            />}
            {activePanel === "selected" && <SelectedPanel
              customizer={ this.props.customizer }
              selectNode={this.props.selectNode}
              selectEdge={ this.props.selectEdge }
              onLoad={this.props.onLoad}
            />}
          </div>
        </Router>

        <div className="editor-bottom-panel d-flex align-content-center justify-between">
          <button className={"btn btn_settings" + settingsActive} onClick={() => this.props.changeTab("settings")} >
            <SettingsIcon className="icon" />
          </button>

          <button className={"btn font_montserrat font_500 btn_grey " + btnActive}
                  onClick={this.update} >
            UPDATE
          </button>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state){
  return {
    customizerSettingsData: state.customizerSettingsData,
  };
}
export default connect(mapStateToProps)(Sidebar)
