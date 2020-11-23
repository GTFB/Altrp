import React, { Component } from "react";
import { customStyle } from "../../widgetTypes";
import format from "date-fns/format";
import {
  ScatterPlot,
  ScatterSeries,
  ChartZoomPan,
  LinearXAxis,
  LinearXAxisTickSeries,
  LinearXAxisTickLabel,
  DiscreteLegend,
  DiscreteLegendEntry,
  TooltipArea,
  ScatterPoint
} from "reaviz";
import formatDistanceStrict from "date-fns/formatDistanceStrict";
import ru from "date-fns/locale/ru";
import { Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import DataAdapter from "../../../../../../editor/src/js/components/altrp-dashboards/helpers/DataAdapter";

const mapStateToProps = state => {
  return { formsStore: state.formsStore };
};

class ScatterDataSource extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sources: props.sources,
      legend: props.element.settings.legend,
      color: props.element.settings.color,
      params: props.element.settings.params,
      countRequest: 0,
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

  async getDataFromIterableDatasources(sources, paramsResult = {}) {
    return Promise.all(
      sources.map(async source => {
        let dataArray = [];
        if (_.keys(this.state.params).length > 0) {
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
    let globalParams = _.cloneDeep(this.props.formsStore.form_data, []);
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
    if (_.keys(this.props.element.settings.sources).length > 0) {
      let data = [];
      let isMultiple = false;
      if (_.keys(this.props.element.settings.sources).length === 1) {
        let source = this.props.element.settings.sources[0];
        if (_.keys(paramsResult).length > 0) {
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
      let resultDates = [];
      let isDate = true;

      if (this.props.element.settings.sources.length > 1) {
        let matches = data.map(obj => {
          if (_.keys(obj).length > 0) {
            return obj.data.length > 0;
          }
          return _.keys(obj).length > 0;
        });
        needCallAgain = _.includes(matches, false);
        if (!needCallAgain) {
          dates = data.map(obj => {
            return obj.data.map(item => item.key instanceof Date);
          });
          dates.forEach(array => (resultDates = resultDates.concat(array)));
          resultDates = _.uniq(resultDates);
          isDate = _.includes(resultDates, false) === true ? false : true;
        }
      } else {
        needCallAgain =
          _.keys(data).length === 0 && this.state.countRequest < 5;
        dates = data.map(obj => {
          return obj.key instanceof Date;
        });
        dates = _.uniq(dates);
        isDate = _.includes(dates, false) ? false : true;
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

  formattingDate(data) {
    return format(data, "d MMM yy", { locale: ru });
  }

  renderLegend(data) {
    let customColors = _.keys(this.state.color).length > 0;
    let legend = data.map((item, key) => {
      return (
        <DiscreteLegendEntry
          key={key}
          className="discrete__legend-item"
          label={`${item.key} (${item.data})`}
          color={customStyle[item.key % customStyle.length] || "#606060"}
        />
      );
    });
    if (customColors) {
      legend = data.map((item, key) => {
        return (
          <DiscreteLegendEntry
            key={key}
            className="discrete__legend-item"
            label={`${item.key} (${item.data})`}
            color={this.state.color[item.key] || "#606060"}
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

    if (this.state.isMultiple) {
      return <div>Укажите только один источник данных</div>;
    }

    if (
      typeof this.state.data !== "undefined" &&
      this.state.data.length === 0
    ) {
      if (this.state.countRequest < 5) {
        console.log(this.state.countRequest);
        return <div>Загрузка...</div>;
      }
      return <div>Нет данных</div>;
    }
    // if (!this.state.isDate) {
    //   return <div>Ключ должен быть в формате даты</div>;
    // }

    return (
      <>
        <div className="chart-content-container">
          <ScatterPlot
            data={this.state.data}
            zoomPan={<ChartZoomPan />}
            series={
              <ScatterSeries point={<ScatterPoint color={customStyle[0]} />} />
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
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps)(ScatterDataSource);
