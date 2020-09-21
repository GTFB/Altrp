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
    return (
      <Suspense fallback={"Loading"}>
        <AltrpDashboards settings={this.state.settings} id={this.props.element.id} />
      </Suspense>
    );
  }
}

export default DashboardsWidget;
