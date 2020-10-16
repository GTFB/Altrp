import {
      LineChart,
      LineSeries,
      Line,
      LinearXAxis,
      LinearXAxisTickSeries,
      LinearXAxisTickLabel,
} from "reaviz";
import { customStyle } from "../../widgetTypes";
import format from "date-fns/format";
import formatDistanceStrict from "date-fns/formatDistanceStrict";
import ru from "date-fns/locale/ru";

class LineDataSource extends Component {

      constructor(props) {
            super(props);
            this.state = {
                  data: props.data
            };
      }

      formattingDate() {
            //  Первая дата
            const firstDate = this.state.data.slice().shift();
            // Последняя дата
            const lastDate = this.state.data.slice().pop();
            // Разница между датами в месяцах
            const diff = parseInt(
                  formatDistanceStrict(firstDate.key, lastDate.key, {
                        unit: "month",
                  })
            );

            if (diff >= 0 && diff <= 12) {
                  return format(this.state.data, "d MMM", { locale: ru });
            } else {
                  return format(this.state.data, "d MMM yy", { locale: ru });
            }
      }


      render() {
            return (
                  <LineChart
                        data={this.state.data}
                        xAxis={
                              <LinearXAxis
                                    type="time"
                                    tickSeries={
                                          <LinearXAxisTickSeries
                                                label={
                                                      <LinearXAxisTickLabel
                                                            format={this.formattingDate}
                                                      />
                                                }
                                          />
                                    }
                              />
                        }
                        series={
                              <LineSeries
                                    colorScheme={customStyle}
                              />
                        }
                  />
            );
      }
}

export default LineDataSource;