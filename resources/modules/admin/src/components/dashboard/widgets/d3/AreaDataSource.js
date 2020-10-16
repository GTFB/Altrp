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

class AreaDataSource extends Component {

      constructor(props) {
            super(props);
            this.state = {
                  data: props.data
            };
      }

      formattingDate() {
            //  Первая дата
            const firstDate = this.data.slice().shift();
            // Последняя дата
            const lastDate = this.data.slice().pop();
            // Разница между датами в месяцах
            const diff = parseInt(
                  formatDistanceStrict(firstDate.key, lastDate.key, {
                        unit: "month",
                  })
            );

            if (diff >= 0 && diff <= 12) {
                  return format(this.data, "d MMM", { locale: ru });
            } else {
                  return format(this.data, "d MMM yy", { locale: ru });
            }
      }


      render() {
            return (
                  <AreaChart
                        data={this.state.data}
                        xAxis={
                              <LinearXAxis
                                    type="time"
                                    tickSeries={
                                          <LinearXAxisTickSeries label={<LinearXAxisTickLabel format={this.formattingDate} />} />
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