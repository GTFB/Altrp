import React, { Component } from "react";
import { ResponsiveScatterPlotCanvas } from "@nivo/scatterplot";
import ErrorBoundary from "./ErrorBoundary";
import { connect } from "react-redux";
import DataAdapter from "./DataAdapter";

import Schemes from "../../../../../../editor/src/js/components/altrp-dashboards/settings/NivoColorSchemes";
const regagroScheme = _.find(Schemes, { value: "regagro" }).colors;
import moment from "moment";

const mapStateToProps = state => {
  return { formsStore: _.cloneDeep(state.formsStore) };
};

class ScatterDataSource extends Component {
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
    const {
      data,
      isMultiple,
      isDate,
      needCallAgain,
      isLarge
    } = await new DataAdapter(
      this.props.element.settings.type,
      this.props.element.settings.sources,
      _.cloneDeep(this.props.formsStore.form_data),
      this.state.params,
      this.state.countRequest
    ).parseData();
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
    if (Object.keys(this.state.sources).length === 0) {
      return <div>Нет данных </div>;
    }
    if (!this.state.sources > 1) {
      if (
        typeof this.state.data === "undefined" &&
        this.state.data[0].data.length === 0
      ) {
        if (this.state.countRequest < 3) {
          return <div>Загрузка...</div>;
        }
        return <div>Нет данных</div>;
      }
    } else {
      let matches = this.state.data.map(obj => {
        if (_.keys(obj).length > 0) {
          return obj.data.length > 0;
        }
        return _.keys(obj).length > 0;
      });
      let check = _.includes(matches, false);
      if (check) {
        if (this.state.countRequest < 5) {
          return <div>Загрузка...</div>;
        }
        return <div>Нет данных</div>;
      }
    }

    let data = [];
    if (this.state.settings?.xScale?.type === "time") {
      data = _.cloneDeep(this.state.data, []);
      data = data.map(item => {
        item.data = item.data.map(object => {
          object.x = moment(object.x).format("DD.MM.YYYY");
          return object;
        });
        return item;
      });
    } else {
      data = this.state.data;
    }
    if (
      this.state.settings?.sort?.value !== null &&
      typeof this.state.settings?.sort?.value !== "undefined" &&
      typeof data !== "undefined"
    ) {
      const sort = this.state.settings?.sort?.value;
      switch (sort) {
        case "value":
          data.forEach((item, index) => {
            if (item.data.length > 0) {
              data[index].data = _.sortBy(item.data, ["y"]);
            }
          });
          break;
        case "key":
          data.forEach((item, index) => {
            if (item.data.length > 0) {
              data[index].data = _.sortBy(item.data, ["x"]);
            }
          });
          break;

        default:
          // data = data;
          break;
      }
    }
    return (
      <>
        <ErrorBoundary>
          <ResponsiveScatterPlotCanvas
            data={data}
            margin={{
              top: this.state.settings?.margin?.top || 40,
              right: this.state.settings?.margin?.right || 180,
              bottom: this.state.settings?.margin?.bottom || 80,
              left: this.state.settings?.margin?.left || 100
            }}
            xScale={this.state.settings?.xScale}
            enableSliceLabels={false}
            colors={
              this.state.settings?.colors?.scheme === "regagro"
                ? regagroScheme
                : this.state.settings?.colors
            }
            xFormat={
              this.state.settings?.xScale?.type === "time" && "time:%d.%m.%Y"
            }
            axisBottom={
              this.state.settings?.xScale?.type === "time"
                ? {
                    format: this.state.settings.xScale.format,
                    ...this.state.settings?.axisBottom
                  }
                : {
                    ...this.state.settings?.axisBottom
                  }
            }
            enableGridY={this.state.settings?.enableGridY}
            enableGridX={this.state.settings?.enableGridX}
            animate={Boolean(this.state.settings?.enableAnimation) || false}
            motionDamping={this.state.settings?.animationMotionDamping}
            motionStiffness={this.state.settings?.animationMotionStiffness}
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

export default connect(mapStateToProps)(ScatterDataSource);
