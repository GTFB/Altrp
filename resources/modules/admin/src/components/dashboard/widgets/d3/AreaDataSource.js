import React, { Component } from "react";
import {
  AreaChart,
  AreaSeries,
  ChartZoomPan,
  MarkLine,
  Line,
  LinearXAxis,
  LinearXAxisTickSeries,
  LinearXAxisTickLabel,
  Area,
  Gradient,
  GradientStop,
  DiscreteLegend,
  DiscreteLegendEntry,
  TooltipArea
} from "reaviz";
import { customStyle } from "../../widgetTypes";
import format from "date-fns/format";
import formatDistanceStrict from "date-fns/formatDistanceStrict";
import ru from "date-fns/locale/ru";
import { Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import DataAdapter from "../../../../../../editor/src/js/components/altrp-dashboards/helpers/DataAdapter";

const mapStateToProps = state => {
  return { formsStore: state.formsStore };
};
class AreaDataSource extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sources: props.sources,
      legend: props.element.settings.legend,
      color: props.element.settings.color,
      params: props.element.settings.params,
      isMultiple: false,
      countRequest: 0,
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
        const multipleDataArray = _.uniq(
          _.sortBy(
            dataArray.map((item, index) => {
              return {
                data: item.data,
                key: item.key,
                id: index
              };
            }),
            "key"
          ),
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
        if (_.keys(this.state.params).length > 0) {
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
      if (this.props.element.settings.sources.length > 1) {
        let matches = data.map(obj => obj.data.length > 0);
        needCallAgain = _.includes(matches, false);
      } else {
        needCallAgain =
          _.keys(data).length === 0 && this.state.countRequest < 5;
      }
      if (needCallAgain) {
        setTimeout(() => {
          this.getData();
          let count = this.state.countRequest;
          count += 1;
          this.setState(s => ({ ...s, countRequest: count }));
        }, 3500);
      }
      this.setState(s => ({ ...s, data: data, isMultiple: isMultiple }));
    }
  }

  formattingDate(data) {
    //  Первая дата
    const firstDate = data.slice().shift();
    // Последняя дата
    const lastDate = data.slice().pop();
    // Разница между датами в месяцах
    const diff = parseInt(
      formatDistanceStrict(firstDate.key, lastDate.key, {
        unit: "month"
      })
    );

    if (diff >= 0 && diff <= 12) {
      return format(data, "d MMM", { locale: ru });
    } else {
      return format(data, "d MMM yy", { locale: ru });
    }
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

    if (
      typeof this.state.data !== "undefined" &&
      this.state.data.length === 0
    ) {
      return <div>Нет данных</div>;
    }

    return (
      <>
        <AreaChart
          zoomPan={<ChartZoomPan />}
          series={
            <AreaSeries
              type={this.state.isMultiple ? "grouped" : "standard"}
              tooltip={<TooltipArea disabled={true} />}
              colorScheme={customStyle}
              markLine={null}
            />
          }
          xAxis={
            <LinearXAxis
              type="time"
              tickSeries={
                <LinearXAxisTickSeries
                  label={<LinearXAxisTickLabel rotation={false} />}
                />
              }
            />
          }
          data={this.state.data}
        />
        {this.state.legend.enabled && (
          <DiscreteLegend
            className={`discrete__legend  ${this.props.element.settings.legend
              .side || ""}`}
            orientation={this.state.legend.side}
            entries={this.renderLegend(this.state.data)}
          />
        )}
      </>
    );
  }
}

export default connect(mapStateToProps)(AreaDataSource);
