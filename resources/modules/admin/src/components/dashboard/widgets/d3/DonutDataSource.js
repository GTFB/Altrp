import React, { Component } from "react";
import {
  PieChart,
  PieArcSeries,
  PieArcLabel,
  DiscreteLegend,
  DiscreteLegendEntry
} from "reaviz";
import { customStyle } from "../../widgetTypes";
import { Spinner } from "react-bootstrap";
import DataAdapter from "../../../../../../editor/src/js/components/altrp-dashboards/helpers/DataAdapter";

import { connect } from "react-redux";
import { editElement } from "../../../../../../editor/src/js/store/altrp-dashboard/actions";

const mapStateToProps = state => {
  return { formsStore: state.formsStore };
};
class DonutDataSource extends Component {
  constructor(props) {
    super(props);
    this.state = {
      source: props.source,
      legend: props.element.settings.legend,
      color: props.element.settings.color,
      params: props.element.settings.params,
      data: []
    };
  }

  async componentDidUpdate(prevProps, prevState) {
    if (!_.isEqual(prevProps.source, this.props.source)) {
      this.setState(state => ({ ...state, source: this.props.source }));
    }
    if (!_.isEqual(prevProps.element, this.props.element)) {
      this.setState(state => ({
        ...state,
        legend: this.props.element.settings.legend,
        color: this.props.element.settings.color,
        params: this.props.element.settings.params
      }));

      await this.getData();
    }
    if (
      JSON.stringify(prevState.params) !==
      JSON.stringify(this.props.element.settings.params)
    ) {
      console.log("CHANGE IN BAR");
      this.setState(state => ({
        ...state,
        params: this.props.element.settings.params
      }));
      await this.getData();
    }
    if (
      !_.isEqual(
        prevProps.formsStore.form_data,
        this.props.formsStore.form_data
      )
    ) {
      await this.getData();
    }
  }

  async componentWillMount() {
    await this.getData();
  }

  async getData() {
    let globalParams = _.cloneDeep(this.props.formsStore.form_data, []);
    let globalParamsArray = _.keys(globalParams).map(param => {
      return { [param]: globalParams[param] };
    });
    let localParams = _.cloneDeep(this.state.params, []);
    let paramsResult = localParams.concat(globalParamsArray);
    console.log(paramsResult);
    if (typeof this.props.element.settings.source.path !== "undefined") {
      let data = {};
      if (_.keys(this.state.params).length > 0) {
        data = await new DataAdapter().adaptDataByPath(
          this.state.source.path,
          this.state.source.key,
          this.state.source.data,
          paramsResult
        );
      } else {
        data = await new DataAdapter().adaptDataByPath(
          this.state.source.path,
          this.state.source.key,
          this.state.source.data
        );
      }
      if (_.keys(data).length === 0) {
        setTimeout(() => {
          this.getData();
        }, 2500);
      }
      this.setState(s => ({ ...s, data: data }));
    }
  }

  renderLegend(data) {
    let customColors = _.keys(this.state.color).length > 0;
    let legend = data.map((item, key) => {
      return (
        <DiscreteLegendEntry
          key={key}
          className="discrete__legend-item"
          label={`${item.key} (${item.data})`}
          color={customStyle[item.key % customStyle.length] || "#606060"}
        />
      );
    });
    if (customColors) {
      legend = data.map((item, key) => {
        return (
          <DiscreteLegendEntry
            key={key}
            className="discrete__legend-item"
            label={`${item.key} (${item.data})`}
            color={this.state.color[item.key] || "#606060"}
          />
        );
      });
    }

    return legend;
  }

  render() {
    if (Object.keys(this.state.source).length === 0) {
      return <div>Нет данных </div>;
    }

    if (
      typeof this.state.data !== "undefined" &&
      this.state.data.length === 0
    ) {
      return <div>Нет данных</div>;
    }
    let customColors = _.keys(this.state.color).length > 0;
    return (
      <>
        <PieChart
          data={this.state.data}
          series={
            <PieArcSeries
              doughnut={true}
              colorScheme={
                customColors
                  ? (_data, index) => {
                      return (
                        this.state.color[_data.key] ||
                        customStyle[index % customStyle.length]
                      );
                    }
                  : customStyle
              }
              label={<PieArcLabel fontSize={12} fontFill="#000000" />}
            />
          }
        />
        {this.state.legend.enabled && (
          <DiscreteLegend
            className={`discrete__legend  ${this.props.element.settings.legend
              .side || ""}`}
            orientation={this.state.legend.side}
            entries={this.renderLegend(this.state.data)}
          />
        )}
      </>
    );
  }
}

export default connect(mapStateToProps)(DonutDataSource);
