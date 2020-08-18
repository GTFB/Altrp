import React, { Component } from "react";
import DynamicBarChart from "../../../../../admin/src/components/dashboard/widgets/DynamicBarChart";
import DynamicPieChart from "../../../../../admin/src/components/dashboard/widgets/DynamicPieChart";
import DynamicAreaChart from "../../../../../admin/src/components/dashboard/widgets/DynamicAreaChart";
import DynamicLineChart from "../../../../../admin/src/components/dashboard/widgets/DynamicLineChart";
import DynamicTableWidget from "../../../../../admin/src/components/dashboard/widgets/DynamicTableWidget";
import DynamicDonutChart from "../../../../../admin/src/components/dashboard/widgets/DynamicDonutChart";

import {
  BAR,
  PIE,
  LINE,
  AREA,
  TABLE,
  DONUT,
} from "../../../../../admin/src/components/dashboard/widgetTypes";

class DiagramWidget extends Component {
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
    switch (this.state.settings.type) {
      case BAR:
        return (
          <DynamicBarChart
            dataUrl={this.state.settings.source}
            colorScheme={this.state.settings.colorScheme}
          />
        );
      case PIE:
        return (
          <DynamicPieChart
            dataUrl={this.state.settings.source}
            colorScheme={this.state.settings.colorScheme}
          />
        );
      case DONUT:
        return (
          <DynamicDonutChart
            dataUrl={this.state.settings.source}
            colorScheme={this.state.settings.colorScheme}
          />
        );
      case LINE:
        return (
          <DynamicLineChart
            dataUrl={this.state.settings.source}
            colorScheme={this.state.settings.colorScheme}
          />
        );
      case TABLE:
        return <DynamicTableWidget dataUrl={this.state.settings.source} />;
      case AREA:
        return (
          <DynamicAreaChart
            dataUrl={this.state.settings.source}
            colorScheme={this.state.settings.colorScheme}
          />
        );
      default:
        return <></>;
    }
  }
}

export default DiagramWidget;
