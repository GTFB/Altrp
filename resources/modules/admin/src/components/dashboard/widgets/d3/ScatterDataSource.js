import React, { Component } from "react";
import { ResponsiveScatterPlotCanvas } from "@nivo/scatterplot";
import ErrorBoundary from "./ErrorBoundary";
import { connect } from "react-redux";
import DataAdapter from "./DataAdapter";

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
      !_.isEqual(prevState?.settings?.sort, this.props.element?.settings?.sort)
    ) {
      this.setState(state => ({
        ...state,
        countRequest: 0
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
    if (
      this.state.settings?.sort?.value !== null &&
      typeof this.state.settings?.sort?.value !== "undefined" &&
      typeof data !== "undefined"
    ) {
      const sort = this.state.settings?.sort.value;
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

    return (
      <>
        <ErrorBoundary>
          <ResponsiveScatterPlotCanvas
            data={this.state.data}
            margin={{ top: 40, right: 120, bottom: 80, left: 100 }}
            xScale={this.state.settings?.xScale}
            enableSliceLabels={false}
            colors={this.state.settings?.colors}
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
            legends={[
              {
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1
                    }
                  }
                ]
              }
            ]}
          />
        </ErrorBoundary>
      </>
    );
  }
}

export default connect(mapStateToProps)(ScatterDataSource);
