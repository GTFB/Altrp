
import { PieChart, PieArcSeries, PieArcLabel, DiscreteLegend, DiscreteLegendEntry } from "reaviz";
import { customStyle } from "../../widgetTypes";

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
                        series={
                              <PieArcSeries
                                    doughnut={true}
                                    colorScheme={customStyle}
                                    label={<PieArcLabel fontSize={12} fontFill="#000000" />}
                              />
                        }
                  />
            );
      }
}

export default PieDataSource;