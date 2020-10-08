import React, { Component, Suspense } from "react";

const AltrpDashboards = React.lazy(() => import("../altrp-dashboards/AltrpDashboards"));

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
    console.log(this.props.currentDataStorage);
    return (
      <Suspense fallback={"Loading"}>
        <AltrpDashboards settings={this.props.element.getSettings()}
                         currentDataStorage={this.props.currentDataStorage}
                         id={this.props.element.getId()} />
      </Suspense>
    );

  }
}

export default DashboardsWidget;
