import {
      BarChart,
      BarSeries,
      Bar,
      Gradient,
      GradientStop,
      DiscreteLegend,
      DiscreteLegendEntry,
      LinearXAxis,
      LinearYAxis,
      LinearYAxisTickSeries

} from "reaviz";
import { customStyle } from "../../widgetTypes";

class BarDataSource extends Component {

      constructor(props) {
            super(props);
            this.state = {
                  data: props.data
            };
      }


      render() {
            return (
                  <BarChart
                        data={this.state.data}
                        series={
                              <BarSeries
                                    colorScheme={customStyle}
                                    bar={<Bar gradient={<Gradient stops={[<GradientStop stopOpacity={1} />]} />} />}
                              />
                        }
                  />
            );
      }
}

export default BarDataSource;