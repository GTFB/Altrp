import React, { Component } from "react";
import {
  BarChart,
  BarSeries,
  Bar,
  Gradient,
  GradientStop,
  DiscreteLegend,
  DiscreteLegendEntry,
  LinearXAxis,
  LinearYAxis,
  LinearYAxisTickSeries
} from "reaviz";
import { customStyle } from "../../widgetTypes";
import { connect } from "react-redux";
import { Spinner } from "react-bootstrap";
import DataAdapter from "../../../../../../editor/src/js/components/altrp-dashboards/helpers/DataAdapter";

const mapStateToProps = state => {
  return { formsStore: state.formsStore };
};
class BarDataSource extends Component {
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
    let globalParamsArray = _.keys(globalParams)
      .map(param => {
        return { [param]: globalParams[param] };
      })
      .filter(param => {
        let key = _.keys(param)[0];
        return param[key] !== "";
      });
    let localParams = _.cloneDeep(this.state.params, []);
    let paramsResult = localParams.concat(globalParamsArray);
    if (typeof this.props.element.settings.source.path !== "undefined") {
      let data = await new DataAdapter().adaptDataByPath(
        this.state.source.path,
        this.state.source.key,
        this.state.source.data
      );
      if (_.keys(this.state.params).length > 0) {
        data = await new DataAdapter().adaptDataByPath(
          this.state.source.path,
          this.state.source.key,
          this.state.source.data,
          paramsResult
        );
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
      return <div>Нет данных</div>;
    }
    if (typeof this.state.data !== "undefined" && this.state.data.length > 0) {
      let customColors = _.keys(this.state.color).length > 0;
      return (
        <>
          <div className="chart-content-container">
            <BarChart
              data={this.state.data}
              series={
                <BarSeries
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
                  bar={
                    <Bar
                      gradient={
                        <Gradient stops={[<GradientStop stopOpacity={1} />]} />
                      }
                    />
                  }
                />
              }
            />
          </div>
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
    return <div>Нет данных</div>;
  }
}

export default connect(mapStateToProps)(BarDataSource);
