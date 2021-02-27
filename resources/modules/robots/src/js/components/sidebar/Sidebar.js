import * as React from "react";

import SelectedPanel from "./SelectedPanel";
import WidgetsPanel from "./WidgetsPanel";
import Resource from "../../../../../editor/src/js/classes/Resource";

import store from "../../store/store";
import {setChartInCurrentRobot} from "../../store/current-robot/actions";

import Logo from "../../../../../editor/src/svgs/logo.svg";
import Dots from "../../../../../editor/src/svgs/dots.svg";
import Hamburger from "../../../../../editor/src/svgs/hamburger.svg";

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.resource = new Resource({ route: "/admin/ajax/robots" });
    this.update = this.update.bind(this);
  }

  async update() {
    const robotId = new URL(window.location).searchParams.get("robot_id");

    const robotData = store.getState()?.currentRobot;
    const robotChart = store.getState()?.robotSettingsData;

    robotData.chart = robotChart;

    this.resource.put(robotId, {
      data: robotData
    });
  }

  render() {
    let activePanel = this.props.activePanel;

    return (
      <div className="left-panel">
        <div className="editor-top-panel">
          <button
            onClick={() => this.props.changeTab("settings")}
            className="btn btn_hamburger"
          >
            <Hamburger className="icon" />
          </button>
          <a href="/admin/templates" target="_blank" className="logo">
            {window.admin_logo ? (
              renderAsset(window.admin_logo, { className: "editor__logo" })
            ) : (
              <Logo viewBox="0 0 97 35" className="editor__logo" />
            )}
          </a>
          <button className="btn btn_dots" onClick={() => this.props.changeTab('widgets')}>
            <Dots className="icon" />
          </button>
        </div>
        <div className="left-panel-main">
          {activePanel === "settings" && <SelectedPanel robot={ this.props.robot } selected={this.props.selected} selectEdge={ this.props.selectEdge } onLoad={this.props.onLoad}></SelectedPanel>}
          {activePanel === "widgets" && <WidgetsPanel ></WidgetsPanel>}
        </div>
        <div className="editor-bottom-panel d-flex align-content-center justify-start">
          <div className="control-group d-flex">
            <button
              onClick={this.update}
              className="btn font_montserrat font_500 btn_grey btn_active"
            >
              UPDATE
            </button>
          </div>
        </div>
      </div>
    );
  }
}
