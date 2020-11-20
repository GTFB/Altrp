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
import format from "date-fns/format";
import formatDistanceStrict from "date-fns/formatDistanceStrict";
import ru from "date-fns/locale/ru";
import { Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import DataAdapter from "../../../../../../editor/src/js/components/altrp-dashboards/helpers/DataAdapter";
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
    if (!_.isEqual(prevProps.formsStore, this.props.formsStore)) {
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

  async getDataFromIterableDatasources(sources, paramsResult = {}) {
    return Promise.all(
      sources.map(async source => {
        let dataArray = [];
        if (_.keys(paramsResult).length > 0) {
          dataArray = await new DataAdapter().adaptDataByPath(
            source,
            paramsResult
          );
        } else {
          dataArray = await new DataAdapter().adaptDataByPath(source);
        }
        const multipleDataArray = _.sortBy(
          dataArray.map((item, index) => {
            return {
              data: item.data,
              key: item.key,
              id: index
            };
          }),
          "key"
        );
        return {
          key: source.title || source.path,
          data: multipleDataArray
        };
      })
    );
  }

  async getData() {
    let globalParams = _.cloneDeep(this.props.formsStore, []);
    delete globalParams["changedField"];
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
    let isMultiple = false;
    if (_.keys(this.props.element.settings.sources).length > 0) {
      let data = [];
      if (_.keys(this.props.element.settings.sources).length === 1) {
        let source = this.props.element.settings.sources[0];
        if (_.keys(paramsResult).length > 0) {
          console.log("PARAM");
          data = await new DataAdapter().adaptDataByPath(source, paramsResult);
        } else {
          data = await new DataAdapter().adaptDataByPath(source);
        }
      } else {
        data = await this.getDataFromIterableDatasources(
          this.props.element.settings.sources,
          paramsResult
        );
        isMultiple = true;
      }
      let needCallAgain = true;
      let dates = [];
      let isDate = true;
      if (this.props.element.settings.sources.length > 1) {
        let matches = data.map(obj => obj.data.length > 0);
        needCallAgain = _.includes(matches, false);
        dates = data.map(dataSet =>
          dataSet.map(obj => obj.key instanceof Date)
        );
        isDate = _.includes(dates, true);
      } else {
        needCallAgain =
          _.keys(data).length === 0 && this.state.countRequest < 5;
        if (_.keys(data).length > 0) {
          dates = data.map(obj => obj.key instanceof Date);
          isDate = _.includes(dates, true);
        }
      }
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
    if (this.props.element.settings.sources.length > 1) {
      let matches = this.state.data.map(obj => obj.data.length > 0);
      let check = _.includes(matches, false);
      if (check) {
        return <div>Загрузка...</div>;
      }
    } else {
      if (!this.state.isDate) {
        return <div>Ключ должен быть в формате даты</div>;
      }
    }
    if (
      typeof this.state.data !== "undefined" ||
      this.state.data.length === 0
    ) {
      if (this.state.countRequest < 5) {
        return <div>Загрузка...</div>;
      }
      return <div>Нет данных</div>;
    }

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
                type="time"
                tickSeries={
                  <LinearXAxisTickSeries
                    label={
                      <LinearXAxisTickLabel format={this.formattingDate} />
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
