import {
      LineChart,
      LineSeries,
      Line,
      LinearXAxis,
      LinearXAxisTickSeries,
      LinearXAxisTickLabel,
} from "reaviz";

class LineDataSource extends Component {

      constructor(props) {
            super(props);
            this.state = {
                  data: props.data
            };
      }


      render() {
            return (
                  <LineChart
                        data={this.state.data}
                  />
            );
      }
}

export default LineDataSource;