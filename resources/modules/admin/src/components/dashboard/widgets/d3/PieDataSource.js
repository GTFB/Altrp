import React, { Component } from "react";
import { connect } from "react-redux";
import { ResponsivePieCanvas } from "@nivo/pie";
import ErrorBoundary from "./ErrorBoundary";
import DataAdapter from "./DataAdapter";

import Schemes from "../../../../../../editor/src/js/components/altrp-dashboards/settings/NivoColorSchemes";

const regagroScheme = _.find(Schemes, { value: "regagro" }).colors;

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
          data = _.sortBy(data, ["id"]);
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

    return (
      <>
        <ErrorBoundary>
          <ResponsivePieCanvas
            margin={{ top: 80, right: 250, bottom: 80, left: 140 }}
            data={this.state.data}
            colors={
              this.state.settings?.colors?.scheme === "regagro"
                ? regagroScheme
                : this.state.settings?.colors
            }
            innerRadius={this.state.settings?.innerRadius}
            enableSliceLabels={this.state.settings?.enableSliceLabels}
            enableRadialLabels={this.state.settings?.enableRadialLabels}
            legends={[
              {
                anchor: "right",
                direction: "column",
                justify: false,
                translateX: 180,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 60,
                itemHeight: 14,
                itemDirection: "left-to-right",
                itemOpacity: 1,
                symbolSize: 14,
                symbolShape: "circle"
              }
            ]}
          />
        </ErrorBoundary>
      </>
    );
  }
}

export default connect(mapStateToProps)(PieDataSource);
