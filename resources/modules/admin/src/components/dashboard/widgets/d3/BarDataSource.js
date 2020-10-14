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
                        // height={height}
                        // width={width}
                        data={this.state.data}
                        series={<BarSeries layout="horizontal" />}
                        xAxis={<LinearXAxis type="value" />}
                        yAxis={
                              <LinearYAxis
                                    type="category"
                                    tickSeries={<LinearYAxisTickSeries tickSize={20} />}
                              />
                        }
                  />
            );
      }
}

export default BarDataSource;