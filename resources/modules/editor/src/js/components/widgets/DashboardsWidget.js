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
    const containerWidth = this.props.element.getSettings().positioning_custom_width.size;
    const dataByDataSource = this.props.element.getSettings().dataSource;
    const settings = this.props.element.getSettings();
    
    const global_parameter = this.state.settings.global_parameter;
    return (
      <Suspense fallback={"Loading"}>
        {!dataByDataSource
        ?
          (<AltrpDashboards settings={this.props.element.getSettings()}
            globalParameter={global_parameter}
            //  currentDataStorage={this.props.currentDataStorage}
            id={this.props.element.getId()} />)
        :
          (<DataSourceDashboards
            id={this.props.element.getId()}
            containerWidth={containerWidth}
            rep={_.cloneDeep(this.props.element.getSettings('rep',[]))} />)
        }
       
      </Suspense>
    );

  }
}
export default DashboardsWidget;
