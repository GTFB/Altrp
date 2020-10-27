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
import { Spinner } from 'react-bootstrap';
import DataAdapter from "../../../../../../editor/src/js/components/altrp-dashboards/helpers/DataAdapter";

class BarDataSource extends Component {

      constructor(props) {
            super(props);
            this.state = {
                  source: props.source,
            };
      }
      componentDidUpdate(prevProps, prevState) {
            if (!_.isEqual(prevProps.source, this.props.source)) {
                  console.log('IM CHANGE EDIT ELEMENT', this.props.source);
                  this.setState(state => ({ ...state, source: this.props.source }));
            }
      }

      render() {
            if (Object.keys(this.state.source).length === 0) {
                  return <div>Нет данных </div>
            }
            let data = (new DataAdapter()).adaptDataByPath(this.state.source.path, this.state.source.key, this.state.source.data);
            // console.log(data);
            if (data.length > 0) {
                  return (
                        <BarChart
                              data={data}
                              series={
                                    <BarSeries
                                          colorScheme={customStyle}
                                          bar={<Bar gradient={<Gradient stops={[<GradientStop stopOpacity={1} />]} />} />}
                                    />
                              }
                        />
                  );
            }
            return <div>Нет данных</div>

      }
}

export default BarDataSource;