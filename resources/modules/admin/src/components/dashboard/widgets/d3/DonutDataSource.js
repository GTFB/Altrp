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
import DataAdapter from "./DataAdapter";

import ErrorBoundary from "./ErrorBoundary";
import { connect } from "react-redux";
import { editElement } from "../../../../../../editor/src/js/store/altrp-dashboard/actions";

const mapStateToProps = state => {
  return { formsStore: state.formsStore };
};
class DonutDataSource extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sources: props.sources,
      legend: props.element.settings.legend,
      color: props.element.settings.color,
      params: props.element.settings.params,
      countRequest: 0,
      isMultiple: false,
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

    if (this.state.isMultiple) {
      return <div>Укажите только один источник данных</div>;
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
    let customColors = _.keys(this.state.color).length > 0;
    return (
      <>
        <ErrorBoundary>
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
        </ErrorBoundary>
      </>
    );
  }
}

export default connect(mapStateToProps)(DonutDataSource);
