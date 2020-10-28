
import { PieChart, PieArcSeries, PieArcLabel, DiscreteLegend, DiscreteLegendEntry } from "reaviz";
import { customStyle } from "../../widgetTypes";

import DataAdapter from "../../../../../../editor/src/js/components/altrp-dashboards/helpers/DataAdapter";

class PieDataSource extends Component {

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

      render() {
            if (Object.keys(this.state.source).length === 0) {
                  return <div>Нет данных </div>
            }
            const data = (new DataAdapter()).adaptDataByPath(this.state.source.path, this.state.source.key, this.state.source.data);
            if (data.length === 0) {
                  return <div>Нет данных</div>
            }
            return (
                  <PieChart
                        data={data}
                        series={
                              <PieArcSeries
                                    colorScheme={customStyle}
                                    label={<PieArcLabel fontSize={12} fontFill="#000000" />}
                              />
                        }
                  />
            );
      }
}

export default PieDataSource;