import {
      AreaChart,
      AreaSeries,
      MarkLine,
      Line,
      LinearXAxis,
      LinearXAxisTickSeries,
      LinearXAxisTickLabel,
      Area,
      Gradient,
      GradientStop,
} from "reaviz";
import { customStyle } from "../../widgetTypes";
import format from "date-fns/format";
import formatDistanceStrict from "date-fns/formatDistanceStrict";
import ru from "date-fns/locale/ru";
import { Spinner } from 'react-bootstrap';
import DataAdapter from "../../../../../../editor/src/js/components/altrp-dashboards/helpers/DataAdapter";

class AreaDataSource extends Component {

      constructor(props) {
            super(props);
            this.state = {
                  source: props.source,
            };
      }

      componentDidUpdate(prevProps, prevState) {
            if (!_.isEqual(prevProps.source, this.props.source)) {
                  this.setState(state => ({ ...state, source: this.props.source }));
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
                        unit: "month",
                  })
            );

            if (diff >= 0 && diff <= 12) {
                  return format(data, "d MMM", { locale: ru });
            } else {
                  return format(data, "d MMM yy", { locale: ru });
            }
      }


      render() {
            if (Object.keys(this.state.source).length === 0) {
                  return <div>Нет данных </div>
            }
            let data = (new DataAdapter()).adaptDataByPath(this.state.source.path, this.state.source.key, this.state.source.data);
            if (data.length === 0) {
                  return <div>Нет данных</div>
            }
            data = data.map((item) => {
                  let key = new Date(item.key);
                  if (key instanceof Date && !isNaN(key)) {
                        return {
                              key: key,
                              data: Number(item.data),
                        };
                  }
            }).filter(item => typeof item != 'undefined');
            return (
                  <AreaChart
                        data={data}
                        xAxis={
                              <LinearXAxis
                                    type="time"
                                    tickSeries={
                                          <LinearXAxisTickSeries
                                                label={
                                                      <LinearXAxisTickLabel
                                                      // format={this.formattingDate(data)}
                                                      />} />
                                    }
                              />
                        }
                        series={
                              <AreaSeries
                                    markLine={<MarkLine strokeWidth={0} />}
                                    line={<Line strokeWidth={0} />}
                                    area={
                                          <Area
                                                gradient={<Gradient color={"#FFD51F"} stops={[<GradientStop color={"#FFD51F"} />]} />}
                                          />
                                    }
                              />
                        }
                  />
            );
      }
}

export default AreaDataSource;