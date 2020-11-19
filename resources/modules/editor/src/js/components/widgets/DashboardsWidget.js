import React, { Component, Suspense, useRef } from "react";
// import DataSourceDashboards from "../altrp-dashboards/DataSourceDashboards";

import axios from "axios";
import { thresholdFreedmanDiaconis } from "d3";

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

  render() {
    const containerWidth = this.props.element.getSettings()
      .positioning_custom_width.size;
    const dataByDataSource = this.props.element.getSettings().dataSource;
    const settings = this.props.element.getSettings();
    const global_parameter = this.state.settings.global_parameter;
    const showButton = this.props.element.getSettings().showButton;
    const currentUser = this.props.currentUser.data;

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
            settings={this.props.element.getSettings()}
            id={this.props.element.getId()}
            containerWidth={containerWidth}
            items={settingsData.items}
            counter={settingsData.newCounter}
            rep={this.props.element.getSettings("rep", [])}
          />
        )}
      </Suspense>
    );
  }
}
export default DashboardsWidget;
