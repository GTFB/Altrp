
import { PieChart, PieArcSeries, PieArcLabel, DiscreteLegend, DiscreteLegendEntry } from "reaviz";

class PieDataSource extends Component {

      constructor(props) {
            super(props);
            this.state = {
                  data: props.data
            };
      }


      render() {
            return (
                  <PieChart
                        data={this.state.data}
                  />
            );
      }
}

export default PieDataSource;