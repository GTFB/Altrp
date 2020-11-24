import React, { Component } from "react";
import {
  AreaChart,
  AreaSeries,
  ChartZoomPan,
  MarkLine,
  Line,
  LinearXAxis,
  LinearXAxisTickSeries,
  LinearXAxisTickLabel,
  LinearYAxis,
  LinearYAxisTickLabel,
  LinearYAxisTickSeries,
  Area,
  Gradient,
  GradientStop,
  DiscreteLegend,
  DiscreteLegendEntry,
  TooltipArea
} from "reaviz";
import { customStyle } from "../../widgetTypes";
import format from "date-fns/format";
import formatDistanceStrict from "date-fns/formatDistanceStrict";
import ru from "date-fns/locale/ru";
import { Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import ErrorBoundary from "./ErrorBoundary";
import DataAdapter from "./DataAdapter";

const mapStateToProps = state => {
  return { formsStore: state.formsStore };
};
class AreaDataSource extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sources: _.cloneDeep(props.sources),
      legend: _.cloneDeep(props.element.settings.legend),
      color: _.cloneDeep(props.element.settings.color),
      params: _.cloneDeep(props.element.settings.params),
      isMultiple: false,
      isDate: true,
      countRequest: 0,
      data: []
    };
    this.renderLegend = this.renderLegend.bind(this);
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
      !_.isEqual(
        prevProps.formsStore.form_data,
        this.props.formsStore.form_data
      )
    ) {
      this.setState(state => ({
        ...state,
        countRequest: 0
      }));
      await this.getData();
    }
  }

  async componentWillMount() {
    await this.getData();
  }

  async getData() {
    const {
      data,
      isMultiple,
      isDate,
      needCallAgain
    } = await new DataAdapter().parseData(
      this.props.element.settings.sources,
      this.props.formsStore.form_data,
      this.state.params,
      this.state.countRequest
    );
    if (needCallAgain) {
      setTimeout(() => {
        this.getData();
        let count = this.state.countRequest;
        count += 1;
        this.setState(s => ({ ...s, countRequest: count }));
      }, 3500);
    }
    this.setState(s => ({
      ...s,
      data: data,
      isMultiple: isMultiple,
      isDate: isDate
    }));
  }

  formattingDate(data) {
    return new Date(data).toLocaleString("ru", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  }

  renderLegend(data) {
    let customColors = _.keys(this.state.color).length > 0;
    let legend = data.map((item, key) => {
      return (
        <DiscreteLegendEntry
          key={key}
          className="discrete__legend-item"
          label={`${
            item.key instanceof Date ? this.formattingDate(item.key) : item.key
          } (${item.data})`}
          color={customStyle[item.key % customStyle.length] || "#606060"}
        />
      );
    });
    if (customColors) {
      if (this.state.isMultiple) {
        legend = data.map((item, key) => {
          return (
            <DiscreteLegendEntry
              key={key}
              className="discrete__legend-item"
              label={`${
                item.key instanceof Date
                  ? this.formattingDate(item.key)
                  : item.key
              }`}
              color={this.state.color[item.key] || "#606060"}
            />
          );
        });
      } else {
        legend = data.map((item, key) => {
          return (
            <DiscreteLegendEntry
              key={key}
              className="discrete__legend-item"
              label={`${
                item.key instanceof Date
                  ? this.formattingDate(item.key)
                  : item.key
              } (${item.data})`}
              color={this.state.color[item.key] || "#606060"}
            />
          );
        });
      }
    }

    return legend;
  }

  render() {
    if (Object.keys(this.state.sources).length === 0) {
      return <div>Нет данных </div>;
    }

    if (
      typeof this.state.data !== "undefined" &&
      this.state.data.length === 0
    ) {
      if (this.state.countRequest < 5) {
        return <div>Загрузка...</div>;
      }
      return <div>Нет данных</div>;
    }
    if (this.props.element.settings.sources.length > 1) {
      let matches = this.state.data.map(obj => {
        if (_.keys(obj).length > 0) {
          return obj.data.length > 0;
        }
        return _.keys(obj).length > 0;
      });
      if (!this.state.isDate) {
        return <div>Все ключи должны быть в формате даты</div>;
      }
      let check = _.includes(matches, false);
      if (check) {
        if (this.state.countRequest < 5) {
          return <div>Загрузка...</div>;
        }
        return <div>Нет данных</div>;
      }
    }

    const customColors = _.keys(this.state.color).length > 0;
    const custromColorsArray = _.values(this.state.color).map(item => item);
    return (
      <>
        <AreaChart
          zoomPan={<ChartZoomPan />}
          series={
            <AreaSeries
              type={this.state.isMultiple ? "grouped" : "standard"}
              colorScheme={customColors ? custromColorsArray : customStyle}
            />
          }
          xAxis={
            <LinearXAxis
              type={this.state.isDate ? "time" : "category"}
              tickSeries={
                <LinearXAxisTickSeries
                  label={
                    this.state.isDate && (
                      <LinearXAxisTickLabel
                        rotation="60"
                        padding={{
                          fromAxis: 90
                        }}
                        format={this.formattingDate}
                      />
                    )
                  }
                />
              }
            />
          }
          data={this.state.data}
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

export default connect(mapStateToProps)(AreaDataSource);
