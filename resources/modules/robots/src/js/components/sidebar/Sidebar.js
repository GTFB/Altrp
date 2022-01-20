import * as React from "react";
import WidgetsPanel from "./modules/WidgetsPanel";
import RobotSettingsPanel from "./modules/RobotSettingsPanel";
import SelectedPanel from "./modules/SelectedPanel";
import store from "../../store/store";
import Resource from "../../../../../editor/src/js/classes/Resource";
import LogoIcon from "../../../../../editor/src/svgs/logo.svg";
import DotsIcon from "../../../../../editor/src/svgs/dots.svg";
import HamburgerIcon from "../../../../../editor/src/svgs/hamburger.svg";
import SettingsIcon from "../../../../../editor/src/svgs/settings.svg";
import {renderAsset} from "../../../../../front-app/src/js/helpers";
import {connect} from "react-redux";
import AutoUpdateCheckbox from "../../../../../admin/src/components/AutoUpdateCheckbox";

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      robot: {}
    };

    this.resource = new Resource({ route: "/admin/ajax/robots" });
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    const robotTimeOut = setTimeout(() => {
      this.setState(state => ({
        ...state,
        robot: {
          ...this.props.robot
        }
      }))
    }, 2000)

    return () => {
      clearTimeout(robotTimeOut)
    }
  }

  async update() {
    const robotId = new URL(window.location).searchParams.get("robot_id");
    const robot = store.getState()?.currentRobot;
    const { categories, _categories } = this.state.robot
    const robotData = {
      ...robot,
      categories,
      _categories
    }
    const robotChart = store.getState()?.robotSettingsData;
    robotData.chart = JSON.stringify(robotChart);
    console.log(this.props.sources);
    this.resource.put(robotId, {
      data: robotData,
      sources: this.props.sources,
    });
    this.props.btnChange("");
  }

  onQueryChangeMulti = (query, value) => {
    return (
      `${value.label.toLowerCase()}`.indexOf(query.toLowerCase()) >= 0
    );
  }

  tagRenderer = (item) => {
    return item.label;
  };

  isItemSelectedCategory = (item) => {
    return this.state.robot.categories.some(c=>c.value === item.value);
  };

  handleItemSelectCategory = (item) => {
    if (!this.isItemSelectedCategory(item)) {
      this.setState(state => ({
        ...state,
        robot: {
          ...state.robot,
          _categories: [...state.robot._categories, item],
          categories: [...state.robot.categories, item]
        }
      }));
      this.props.btnChange("btn_active")
    }
  }

  handleTagRemoveCategory = (item) => {
    this.setState(state => ({
      ...state,
      robot: {
        ...state.robot,
        _categories: [...state.robot._categories].filter((i) => i.label !== item),
        categories: [...state.robot.categories].filter((i) => i.label !== item)
      }
    }));
    this.props.btnChange("btn_active")
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

          <a href="/admin/templates" target="_blank" className="logo">
            {window.admin_logo ? (
              renderAsset(window.admin_logo, { className: "editor__logo" })
            ) : (
              <LogoIcon viewBox="0 0 97 35" className="editor__logo" />
            )}
          </a>

          <button className="btn btn_dots" onClick={() => this.props.changeTab('widgets')}>
            <DotsIcon className="icon" />
          </button>
        </div>

        <div className="left-panel-main">
          {activePanel === "widgets" && <WidgetsPanel />}
          {activePanel === "settings" && <RobotSettingsPanel
                                            robot={ this.props.robot }
                                            sources={ this.props.sources }
                                            setSources={ this.props.setSources }
                                            onLayout={ this.props.onLayout }
                                            onQueryChangeMulti={this.onQueryChangeMulti}
                                            tagRenderer={this.tagRenderer}
                                            isItemSelectedCategory={this.isItemSelectedCategory}
                                            handleItemSelectCategory={this.handleItemSelectCategory}
                                            handleTagRemoveCategory={this.handleTagRemoveCategory}
                                            selectItems={this.state.robot.categories}
                                          />}
          {activePanel === "selected" && <SelectedPanel
                                            robot={ this.props.robot }
                                            selectNode={this.props.selectNode}
                                            selectEdge={ this.props.selectEdge }
                                            onLoad={this.props.onLoad}
                                          />}
        </div>

        <div className="editor-bottom-panel d-flex align-content-center justify-between">
          <button className={"btn btn_settings" + settingsActive} onClick={() => this.props.changeTab("settings")} >
            <SettingsIcon className="icon" />
          </button>

          <button className={"btn font_montserrat font_500 btn_grey " + btnActive} onClick={this.update} >
            UPDATE
          </button>
        </div>
      </div>
    );
  }
}
