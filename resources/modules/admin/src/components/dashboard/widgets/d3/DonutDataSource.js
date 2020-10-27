
import { PieChart, PieArcSeries, PieArcLabel, DiscreteLegend, DiscreteLegendEntry } from "reaviz";
import { customStyle } from "../../widgetTypes";
import { Spinner } from 'react-bootstrap';
import DataAdapter from "../../../../../../editor/src/js/components/altrp-dashboards/helpers/DataAdapter";

import { connect } from "react-redux";
import { editElement } from '../../../../../../editor/src/js/store/altrp-dashboard/actions';

class DonutDataSource extends Component {

      constructor(props) {
            super(props);
            this.state = {
                  source: props.source,
                  legend: props.element.settings.legend
            };
      }

      componentDidUpdate(prevProps, prevState) {
            if (!_.isEqual(prevProps.source, this.props.source)) {
                  this.setState(state => ({ ...state, source: this.props.source }));
            }
            if (!_.isEqual(prevProps.element, this.props.element)) {
                  this.setState(state => ({ ...state, legend: this.props.element.settings.legend }));
            }
      }

      renderLegend(data) {
            const legend = data.map((item, key) => {
                  return <DiscreteLegendEntry
                        key={key}
                        className="discrete__legend-item"
                        label={`${item.key} (${item.data})`}
                        color={customStyle[key] || "#606060"}
                  />
            });
            return legend;
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
                  <>
                        <PieChart
                              data={data}
                              series={
                                    <PieArcSeries
                                          doughnut={true}
                                          colorScheme={customStyle}
                                          label={<PieArcLabel fontSize={12} fontFill="#000000" />}
                                    />
                              }
                        />
                        {this.state.legend.enabled && (
                              <DiscreteLegend
                                    className="discrete__legend"
                                    orientation={this.state.legend.side}
                                    entries={this.renderLegend(data)}
                              />
                        )}
                  </>
            );
      }

}

export default DonutDataSource;