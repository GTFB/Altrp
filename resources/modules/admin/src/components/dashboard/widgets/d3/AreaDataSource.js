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

class AreaDataSource extends Component {

      constructor(props) {
            super(props);
            this.state = {
                  data: props.data
            };
      }


      render() {
            return (
                  <AreaChart
                        data={this.state.data}
                  />
            );
      }
}

export default AreaDataSource;