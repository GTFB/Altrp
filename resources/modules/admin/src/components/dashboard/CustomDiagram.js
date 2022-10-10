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
      child: {},
      dataSource,
    };

    this.refChild = React.createRef();
    this.fireAction = this.fireAction.bind(this);
    this.calculateDrawerWidth = this.calculateDrawerWidth.bind(this);

    props.element.component = this;

    if (window.elementDecorator) {
      window.elementDecorator(this);
    }
  }

  async componentWillMount() {
    try {
      const id = this.props.element.getId();
      const req = await axios.get(`/ajax/dashboards/datasource/${id}/data`, {
        headers: {
          "X-CSRF-TOKEN": document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content")
        }
      });
      let data = JSON.parse(req.data.settings) || JSON.parse("{}");
      this.setState(state => ({
        ...state,
        settingsData: data
      }));
    } catch (e) {
      console.error("ERROR ==>", e);
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
    const allKeys = _.keys(this.props.element.getSettings());
    const currentBreakpoint = getCurrentBreakpoint();
    let result = false;
    let keyData = "";
    let keys = allKeys.filter(item => item.includes("drawerWidth"));
    let drawer = this.props.element.getSettings().drawerWidth;
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
      drawer = this.props.element.getSettings(keyData);
    }
    return drawer?.size + drawer?.unit || "30%";
  }

  render() {
    const containerWidth = this.props.element.getSettings()
      .positioning_custom_width.size;
    const dataByDataSource = this.props.element.getSettings().dataSource;
    const settings = this.props.element.getSettings();
    const global_parameter = this.state.settings.global_parameter;
    const showButton = this.props.element.getSettings().showButton;
    const showExportButton = this.props.element.getSettings().showExportButton;
    const currentUser = this.props.currentUser.data;
    const drawerWidth = this.calculateDrawerWidth();
    const settingsData = this.state.settingsData;
    return (
      <Suspense fallback={"Loading"}>
        {!dataByDataSource ? (
          <AltrpDashboards
            settings={this.props.element.getSettings()}
            globalParameter={global_parameter}
            currentUser={currentUser}
            //  currentDataStorage={this.props.currentDataStorage}
            id={this.props.element.getId()}
          />
        ) : (
          <DataSourceDashboards
            ref={this.refChild}
            showButton={showButton}
            showExportButton={showExportButton}
            settings={this.props.element.getSettings()}
            id={this.props.element.getId()}
            containerWidth={containerWidth}
            items={settingsData.items}
            counter={settingsData.newCounter}
            drawerWidth={drawerWidth}
            delimer={this.props.element.getSettings("delimer")}
            rep={this.props.element.getSettings("rep", [])}
          />
        )}
      </Suspense>
    );
  }
}
export default DashboardsWidget;
