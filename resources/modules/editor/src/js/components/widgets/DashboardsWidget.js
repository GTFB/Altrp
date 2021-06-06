import React, { Component, Suspense } from "react";

import axios from "axios";
import { getCurrentBreakpoint } from "../../../../../front-app/src/js/helpers";

const AltrpDashboards = React.lazy(() =>
  import("../altrp-dashboards/AltrpDashboards")
);
const DataSourceDashboards = React.lazy(() =>
  import("../altrp-dashboards/DataSourceDashboards")
);

class DashboardsWidget extends Component {
  constructor(props) {
    super(props);

    this.state = {
      settings: props.element.getSettings(),
      settingsData: [],
      child: {}
    };

    this.refChild = React.createRef();
    this.fireAction = this.fireAction.bind(this);
    this.calculateDrawerWidth = this.calculateDrawerWidth.bind(this);

    props.element.component = this;

    if (window.elementDecorator) {
      window.elementDecorator(this);
    }
    if(props.baseRender){
      this.render = props.baseRender(this);
    }
  }

  async componentWillMount() {
    try {
      const id = this.element.getId();
      const req = await axios.get(`/ajax/dashboards/datasource/${id}/data`, {
        headers: {
          "X-CSRF-TOKEN": document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content")
        }
      });
      console.log(req.data.settings);
      let data = JSON.parse(req.data.settings) || JSON.parse("{}");
      this.setState(state => ({
        ...state,
        settingsData: data
      }));
    } catch (e) {
      console.log("ERROR ==>", e);
    }
  }

  fireAction(action) {
    if (typeof this.refChild.current[action] !== "undefined") {
      this.refChild.current[action]();
    } else {
      alert("ERROR, NOT FOUND ACTION");
    }
  }

  calculateDrawerWidth() {
    const allKeys = _.keys(this.element.getSettings());
    const currentBreakpoint = getCurrentBreakpoint();
    let result = false;
    let keyData = "";
    let keys = allKeys.filter(item => item.includes("drawerWidth"));
    let drawer = this.element.getSettings().drawerWidth;
    for (let key of keys) {
      let names = key.split("_");
      const name = names[names.length - 1];
      if (name == currentBreakpoint) {
        result = true;
        keyData = key;
        break;
      }
    }
    if (result) {
      drawer = this.element.getSettings(keyData);
    }
    return drawer?.size + drawer?.unit || "30%";
  }

  render() {
    const containerWidth = this.element.getSettings()
      .positioning_custom_width.size;
    const dataByDataSource = this.element.getSettings().dataSource;
    const settings = this.element.getSettings();
    const global_parameter = this.state.settings.global_parameter;
    const showButton = this.element.getSettings().showButton;
    const showExportButton = this.element.getSettings().showExportButton;
    const currentUser = this.props.currentUser.data;
    const drawerWidth = this.calculateDrawerWidth();
    const settingsData = this.state.settingsData;
    return (
      <Suspense fallback={"Loading"}>
        {!dataByDataSource ? (
          <AltrpDashboards
            settings={this.element.getSettings()}
            globalParameter={global_parameter}
            currentUser={currentUser}
            //  currentDataStorage={this.props.currentDataStorage}
            id={this.element.getId()}
          />
        ) : (
          <DataSourceDashboards
            ref={this.refChild}
            showButton={showButton}
            showExportButton={showExportButton}
            settings={this.element.getSettings()}
            id={this.element.getId()}
            containerWidth={containerWidth}
            items={settingsData.items}
            counter={settingsData.newCounter}
            drawerWidth={drawerWidth}
            delimer={this.element.getSettings("delimer")}
            rep={this.element.getSettings("rep", [])}
          />
        )}
      </Suspense>
    );
  }
}
export default DashboardsWidget;
