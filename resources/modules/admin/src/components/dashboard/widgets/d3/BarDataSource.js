import React, { Component } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { connect } from "react-redux";
import ErrorBoundary from "./ErrorBoundary";
import DataAdapter from "./DataAdapter";

import Schemes from "../../../../../../editor/src/js/components/altrp-dashboards/settings/NivoColorSchemes";
const regagroScheme = _.find(Schemes, { value: "regagro" }).colors;

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
    if (
      !_.isEqual(prevState?.settings?.sort, this.props.element?.settings?.sort)
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
    if (
      this.state.settings?.sort?.value !== null &&
      typeof this.state.settings?.sort?.value !== "undefined" &&
      typeof data !== "undefined"
    ) {
      const sort = this.state.settings?.sort.value;
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
      return (
        <>
          <ErrorBoundary>
            <ResponsiveBar
              data={this.state.data}
              indexBy="key"
              enableLabel={this.state.settings?.enableSliceLabels}
              padding={this.state.settings?.padding}
              innerPadding={this.state.settings?.innerPadding}
              reverse={this.state.settings?.reverse}
              groupMode={this.state.settings?.groupMode}
              layout={this.state.settings?.layout}
              margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
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
              axisBottom={{ ...this.state.settings?.axisBottom }}
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
