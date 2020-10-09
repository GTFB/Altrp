import React, { Component, Suspense } from "react";

const AltrpDashboards = React.lazy(() => import("../altrp-dashboards/AltrpDashboards"));
const DataSourceDashboards = React.lazy(() => import("../altrp-dashboards/DataSourceDashboards"));

class DashboardsWidget extends Component {
  constructor(props) {
    super(props);

    this.state = {
      settings: props.element.getSettings(),
    };

    props.element.component = this;

    if (window.elementDecorator) {
      window.elementDecorator(this);
    }
  }

  render() {
    //  currentDataStorage={this.props.currentDataStorage}
    const dataByDataSource = this.props.element.getSettings().dataSource;
    const settings = this.props.element.getSettings();
      return (
        <Suspense fallback={"Loading"}>
          {
          dataByDataSource ? 
          (<AltrpDashboards settings={settings}
            currentDataStorage={this.props.currentDataStorage}
            id={this.props.element.getId()} />) :
          (<DataSourceDashboards
            settings={settings}
            currentDataStorage={this.props.currentDataStorage}
            id={this.props.element.getId()}/>)
          }
        </Suspense>
      );
  }

  }


export default DashboardsWidget;
