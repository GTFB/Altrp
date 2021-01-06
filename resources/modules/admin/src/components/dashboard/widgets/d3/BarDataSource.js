import React, { Component } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { connect } from "react-redux";
import ErrorBoundary from "./ErrorBoundary";
import DataAdapter from "./DataAdapter";
import invert from "invert-color";
import Schemes from "../../../../../../editor/src/js/components/altrp-dashboards/settings/NivoColorSchemes";

const regagroScheme = _.find(Schemes, { value: "regagro" }).colors.reverse();

const mapStateToProps = state => {
  return { formsStore: _.cloneDeep(state.formsStore) };
};
class BarDataSource extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: _.cloneDeep(props.element.settings),
      sources: _.cloneDeep(props.sources),
      legend: _.cloneDeep(props.element.settings.legend),
      color: _.cloneDeep(props.element.settings.color),
      params: _.cloneDeep(props.element.settings.params),
      countRequest: 0,
      isMultiple: false,
      isDate: true,
      isLarge: false,
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

  async componentWillMount() {
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
    const { isMultiple, isDate, isLarge, needCallAgain } = adapterObject;
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
      isDate: isDate,
      isLarge: isLarge
    }));
  }
  render() {
    if (typeof this.state.sources === "undefined") {
      return <div>Укажите источник данных</div>;
    }
    if (
      this.state.sources === null &&
      Object.keys(this.state.sources).length === 0
    ) {
      return <div>Нет данных</div>;
    }
    if (this.state.isLarge) {
      return <div>Ограничьте диапозон данных или выберите другой источник</div>;
    }
    if (typeof this.state.data !== "undefined" && this.state.data.length > 0) {
      let data = this.state.data;
      const sort = this.state.settings?.sort?.value;
      switch (sort) {
        case "value":
          data = _.sortBy(data, ["value"]);
          break;
        case "key":
          data = _.sortBy(data, ["key"]);
          break;
        default:
          data = data;
          break;
      }
      return (
        <>
          <ErrorBoundary>
            <ResponsiveBar
              data={data}
              indexBy="key"
              enableLabel={this.state.settings?.enableSliceLabels}
              padding={this.state.settings?.padding}
              innerPadding={this.state.settings?.innerPadding}
              reverse={this.state.settings?.reverse}
              groupMode={this.state.settings?.groupMode}
              layout={this.state.settings?.layout}
              labelSkipHeight={this.state.settings?.labelSkipHeight}
              labelSkipWidth={this.state.settings?.labelSkipWidth}
              enableGridY={this.state.settings?.enableGridY}
              enableGridX={this.state.settings?.enableGridX}
              labelTextColor={datum =>
                invert(datum.color, {
                  black: "#000000",
                  white: "#FFFFFF",
                  threshold: 0.45
                })
              }
              margin={{
                top: this.state.settings?.margin?.top || 40,
                right: this.state.settings?.margin?.right || 80,
                bottom: this.state.settings?.margin?.bottom || 80,
                left: this.state.settings?.margin?.left || 80
              }}
              colors={
                this.state.settings?.colors?.scheme === "regagro"
                  ? regagroScheme
                  : this.state.settings?.colors
              }
              colorBy="index"
              tooltip={datum => {
                const { indexValue, value, color } = datum;
                return (
                  <>
                    <span>{indexValue}</span>:<strong> {value}</strong>
                  </>
                );
              }}
              axisLeft={
                this.state.settings?.layout === "horizontal"
                  ? !this.state.settings?.reverse && {
                      tickRotation: 0
                    }
                  : {
                      tickRotation: 0
                    }
              }
              axisRight={
                this.state.settings?.layout === "horizontal"
                  ? this.state.settings?.reverse && {
                      tickRotation: 0
                    }
                  : null
              }
              axisBottom={
                this.state.settings?.layout === "vertical"
                  ? !this.state.settings?.reverse && {
                      ...this.state.settings?.axisBottom
                    }
                  : {
                      ...this.state.settings?.axisBottom
                    }
              }
              axisTop={
                this.state.settings?.layout === "vertical"
                  ? this.state.settings?.reverse && {
                      ...this.state.settings?.axisBottom
                    }
                  : null
              }
              animate={Boolean(this.state.settings?.enableAnimation) || false}
              motionDamping={this.state.settings?.animationMotionDamping}
              motionStiffness={this.state.settings?.animationMotionStiffness}
              legends={
                this.state.settings?.enableLegend
                  ? [
                      {
                        dataFrom: "indexes",
                        anchor:
                          this.state.settings?.legendAchor || "bottom-right",
                        direction:
                          this.state.settings?.legendDirection || "row",
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

    if (this.state.countRequest < 5) {
      return <div>Загрузка...</div>;
    }
    return <div>Нет данных</div>;
  }
}

export default connect(mapStateToProps)(BarDataSource);
