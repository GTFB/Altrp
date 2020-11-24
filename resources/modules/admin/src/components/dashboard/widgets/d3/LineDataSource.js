import React, { Component } from "react";
import {
  LineChart,
  LineSeries,
  ChartZoomPan,
  Line,
  LinearXAxis,
  LinearXAxisTickSeries,
  LinearXAxisTickLabel,
  DiscreteLegend,
  DiscreteLegendEntry,
  TooltipArea,
  LinearYAxis
} from "reaviz";
import { customStyle } from "../../widgetTypes";
import { connect } from "react-redux";
import DataAdapter from "./DataAdapter";
import ErrorBoundary from "./ErrorBoundary";

const mapStateToProps = state => {
  return { formsStore: state.formsStore };
};
class LineDataSource extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sources: props.sources,
      legend: props.element.settings.legend,
      color: props.element.settings.color,
      params: props.element.settings.params,
      countRequest: 0,
      isMultiple: false,
      isDate: true,
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

  formattingDate(data) {
    try {
      return new Date(data).toLocaleString("ru", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    } catch (error) {
      return false;
    }
    y;
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

  renderLegend(data) {
    let customColors = _.keys(this.state.color).length > 0;
    let legend = data.map((item, key) => {
      return (
        <DiscreteLegendEntry
          key={key}
          className="discrete__legend-item"
          label={`${item.key}`}
          color={customStyle[key % customStyle.length] || "#606060"}
        />
      );
    });
    if (customColors) {
      legend = data.map((item, key) => {
        return (
          <DiscreteLegendEntry
            key={key}
            className="discrete__legend-item"
            label={`${item.key}`}
            color={this.state.color[key] || "#606060"}
          />
        );
      });
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
    // else {
    // if (!this.state.isDate) {
    // return <div>Ключ должен быть в формате даты</div>;
    // }
    // }
    const customColors = _.keys(this.state.color).length > 0;
    const custromColorsArray = _.values(this.state.color).map(item => item);
    return (
      <>
        <ErrorBoundary>
          <LineChart
            zoomPan={<ChartZoomPan />}
            data={this.state.data}
            series={
              <LineSeries
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
                        <LinearXAxisTickLabel format={this.formattingDate} />
                      )
                    }
                  />
                }
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
        </ErrorBoundary>
      </>
    );
  }
}

export default connect(mapStateToProps)(LineDataSource);
