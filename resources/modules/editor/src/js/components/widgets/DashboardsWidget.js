import React, { Component, Suspense } from "react";

import axios from "axios";

const AltrpDashboards = React.lazy(() => import("../altrp-dashboards/AltrpDashboards"));
const DataSourceDashboards = React.lazy(() => import("../altrp-dashboards/DataSourceDashboards"));

class DashboardsWidget extends Component {
  constructor(props) {
    super(props);

    this.state = {
      settings: props.element.getSettings(),
      settingsData: []
    };

    props.element.component = this;

    if (window.elementDecorator) {
      window.elementDecorator(this);
    }
  }

  async componentWillMount() {
    try {
      const id = this.props.element.getId();
      const req = await axios.get(`/ajax/dashboards/datasource/${id}/data`);
      let data = req.data.settings || '{}'
      this.setState(state => ({
        ...state,
        settingsData: JSON.parse(data)
      }));
    }
    catch (e) {
      console.log('ERROR ==>', e);
    }
  }

  render() {
    const containerWidth = this.props.element.getSettings().positioning_custom_width.size;
    const dataByDataSource = this.props.element.getSettings().dataSource;
    const settings = this.props.element.getSettings();
    const global_parameter = this.state.settings.global_parameter;

    const currentUser = this.props.currentUser.data;
    console.log('currentUser', currentUser);

    const settingsData = this.state.settingsData;
    return (
      <Suspense fallback={"Loading"}>
        {
          !dataByDataSource
            ?
            (<AltrpDashboards settings={this.props.element.getSettings()}
              globalParameter={global_parameter}
              currentUser={currentUser}
              //  currentDataStorage={this.props.currentDataStorage}
              id={this.props.element.getId()} />)
            :
            (<DataSourceDashboards
              settings={this.props.element.getSettings()}
              id={this.props.element.getId()}
              containerWidth={containerWidth}
              items={settingsData.items}
              counter={settingsData.newCounter}
              rep={this.props.element.getSettings('rep', [])} />)
        }

      </Suspense>
    );

  }
}
export default DashboardsWidget;
