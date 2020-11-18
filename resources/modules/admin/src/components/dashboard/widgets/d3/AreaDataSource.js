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
      source: props.source,
      legend: props.element.settings.legend,
      color: props.element.settings.color,
      params: props.element.settings.params,
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

  async getData() {
    let globalParams = _.cloneDeep(this.props.formsStore.form_data, []);
    let globalParamsArray = _.keys(globalParams).map(param => {
      return { [param]: globalParams[param] };
    });
    let localParams = _.cloneDeep(this.state.params, []);
    let paramsResult = localParams.concat(globalParamsArray);
    console.log(paramsResult);
    if (typeof this.props.element.settings.source.path !== "undefined") {
      let data = {};
      if (_.keys(this.state.params).length > 0) {
        data = await new DataAdapter().adaptDataByPath(
          this.state.source.path,
          this.state.source.key,
          this.state.source.data,
          paramsResult
        );
      } else {
        data = await new DataAdapter().adaptDataByPath(
          this.state.source.path,
          this.state.source.key,
          this.state.source.data
        );
      }
      if (_.keys(data).length === 0) {
        setTimeout(() => {
          this.getData();
        }, 2500);
      }
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
    if (Object.keys(this.state.source).length === 0) {
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
              tooltip={<TooltipArea disabled={true} />}
              markLine={null}
            />
          }
          data={this.state.data}
          xAxis={
            <LinearXAxis
              type="category"
              tickSeries={
                <LinearXAxisTickSeries
                  label={<LinearXAxisTickLabel rotation={false} />}
                />
              }
            />
          }
          series={
            <AreaSeries
              markLine={<MarkLine strokeWidth={0} />}
              line={<Line strokeWidth={0} />}
              area={
                <Area
                  gradient={
                    <Gradient
                      color={"#FFD51F"}
                      stops={[<GradientStop color={"#FFD51F"} />]}
                    />
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
      </>
    );
  }
}

export default connect(mapStateToProps)(AreaDataSource);
