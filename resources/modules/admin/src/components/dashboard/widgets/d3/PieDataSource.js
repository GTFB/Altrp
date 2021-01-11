import React, { Component } from "react";
import { connect } from "react-redux";
import { ResponsivePie } from "@nivo/pie";
import ErrorBoundary from "./ErrorBoundary";
import invert from "invert-color";
import DataAdapter from "./DataAdapter";

import Schemes from "../../../../../../editor/src/js/components/altrp-dashboards/settings/NivoColorSchemes";

const regagroScheme = _.find(Schemes, { value: "regagro" }).colors.reverse();

const mapStateToProps = state => {
  return { formsStore: _.cloneDeep(state.formsStore) };
};
class PieDataSource extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: _.cloneDeep(props.element.settings),
      sources: _.cloneDeep(props.sources),
      legend: _.cloneDeep(props.element.settings.legend),
      color: _.cloneDeep(props.element.settings.color),
      params: _.cloneDeep(props.element.settings.params),
      countRequest: 0,
      isDate: true,
      data: []
    };
  }

  async componentDidUpdate(prevProps, prevState) {
    if (!_.isEqual(prevProps.sources, this.props.sources)) {
      this.setState(state => ({ ...state, sources: this.props.sources }));
      await this.getData();
    }
    if (!_.isEqual(prevProps.element, this.props.element)) {
      this.setState(state => ({
        ...state,
        legend: this.props.element.settings.legend,
        color: this.props.element.settings.color,
        sources: this.props.element.settings.sources
      }));
    }
    if (
      !_.isEqual(
        prevProps.element.settings.params,
        this.props.element.settings.params
      )
    ) {
      this.setState(state => ({
        ...state,
        params: this.props.element.settings.params
      }));
      await this.getData();
    }
    if (!_.isEqual(prevProps.element.settings, this.props.element.settings)) {
      this.setState(s => ({ ...s, settings: this.props.element.settings }));
    }
    if (
      JSON.stringify(prevProps.element.settings.params) !==
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

  async componentDidMount() {
    await this.getData();
  }

  async getData() {
    const adapterObject = await new DataAdapter(
      this.props.element.settings.type,
      this.props.element.settings.sources,
      _.cloneDeep(this.props.formsStore.form_data),
      this.state.params,
      this.state.countRequest
    ).parseDataNotType();
    const { isMultiple, isDate, needCallAgain } = adapterObject;
    let data = adapterObject.data;
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

  render() {
    if (typeof this.state.sources === "undefined") {
      return <div>Укажите источник данных</div>;
    }
    if (Object.keys(this.state.sources).length === 0) {
      return <div>Нет данных </div>;
    }
    if (
      typeof this.state.data !== "undefined" &&
      this.state.data.length === 0
    ) {
      if (this.state.countRequest < 3) {
        return <div>Загрузка...</div>;
      }
      return <div>Нет данных</div>;
    }
    let data = this.state.data;

    if (
      this.state.settings?.sort?.value !== null &&
      typeof this.state.settings?.sort?.value !== "undefined" &&
      typeof data !== "undefined"
    ) {
      const sort = this.state.settings?.sort?.value;
      switch (sort) {
        case "value":
          data = _.sortBy(data, ["value"]);
          break;
        case "key":
          data = _.sortBy(data, ["id"]);
          break;
        default:
          data = data;
          break;
      }
    }

    return (
      <>
        <ErrorBoundary>
          <ResponsivePie
            margin={{
              top: this.state.settings?.margin?.top || 80,
              right: this.state.settings?.margin?.right || 180,
              bottom: this.state.settings?.margin?.bottom || 80,
              left: this.state.settings?.margin?.left || 120
            }}
            sliceLabelsTextColor={datum =>
              invert(datum.color, {
                black: "#000000",
                white: "#FFFFFF",
                threshold: 0.45
              })
            }
            cornerRadius={this.state.settings?.cornerRadius}
            padAngle={this.state.settings?.padAngle}
            borderWidth={this.state.settings?.borderWidth}
            borderColor={this.state.settings?.borderColor}
            data={data}
            colors={
              this.state.settings?.colors?.scheme === "regagro"
                ? regagroScheme
                : this.state.settings?.colors
            }
            sliceLabelsSkipAngle={this.state.settings?.sliceLabelsSkipAngle}
            sliceLabelsRadiusOffset={
              this.state.settings?.sliceLabelsRadiusOffset
            }
            radialLabelsSkipAngle={this.state.settings?.radialLabelsSkipAngle}
            radialLabelsLinkOffset={this.state.settings?.radialLabelsLinkOffset}
            radialLabelsLinkDiagonalLength={
              this.state.settings?.radialLabelsLinkDiagonalLength
            }
            radialLabelsLinkHorizontalLength={
              this.state.settings?.radialLabelsLinkHorizontalLength
            }
            radialLabelsTextXOffset={
              this.state.settings?.radialLabelsTextXOffset
            }
            radialLabelsLinkStrokeWidth={
              this.state.settings?.radialLabelsLinkStrokeWidth
            }
            innerRadius={this.state.settings?.innerRadius}
            enableSliceLabels={this.state.settings?.enableSliceLabels}
            enableRadialLabels={this.state.settings?.enableRadialLabels}
            legends={
              this.state.settings?.enableLegend
                ? [
                    {
                      anchor:
                        this.state.settings?.legendAchor || "bottom-right",
                      direction: this.state.settings?.legendDirection || "row",
                      justify: this.state.settings?.legendJustify || false,
                      translateX: this.state.settings?.legendTranslateX || 0,
                      translateY: this.state.settings?.legendTranslateY || 0,
                      itemsSpacing:
                        this.state.settings?.legendItemsSpacing || 10,
                      itemWidth: this.state.settings?.legendItemWidth || 10,
                      itemHeight: this.state.settings?.legendItemHeight || 10,
                      itemDirection:
                        this.state.settings?.legendItemDirection ||
                        "left-to-right",
                      symbolSize: this.state.settings?.legendSymbolSize || 25,
                      symbolShape: "circle"
                    }
                  ]
                : []
            }
          />
        </ErrorBoundary>
      </>
    );
  }
}

export default connect(mapStateToProps)(PieDataSource);
