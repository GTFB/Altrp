import { BAR, PIE, DONUT, AREA, LINE, TABLE } from "../../../../../admin/src/components/dashboard/widgetTypes";

import BarDataSource from '../../../../../admin/src/components/dashboard/widgets/d3/BarDataSource';
import PieDataSource from '../../../../../admin/src/components/dashboard/widgets/d3/PieDataSource';
import DonutDataSource from "../../../../../admin/src/components/dashboard/widgets/d3/DonutDataSource";
import AreaDataSource from "../../../../../admin/src/components/dashboard/widgets/d3/AreaDataSource";
import TableDataSource from "../../../../../admin/src/components/dashboard/widgets/d3/TableDataSource";
import LineDataSource from "../../../../../admin/src/components/dashboard/widgets/d3/LineDataSource";

class ChooseWidget extends Component {

      constructor(props) {
            super(props);
            this.state = {
                  source: props.source,
                  type: props.type,
                  element: props.element,
                  legend: props.element.settings.legend
            };
      }

      componentDidUpdate(prevProps, prevState) {
            console.log('CHANGE ');
            if (!_.isEqual(prevProps.element, this.props.element)) {
                  this.setState(state => ({ ...state, element: this.props.element }));
            }
            if (!_.isEqual(prevProps.type, this.props.type)) {
                  this.setState(state => ({ ...state, type: this.props.type }));
            }
            if (!_.isEqual(prevProps.source, this.props.source)) {
                  this.setState(state => ({ ...state, source: this.props.source }));
            }
      }

      getWidget() {
            let widget = 'Выберите тип диаграммы';
            switch (this.state.type) {
                  case BAR:
                        widget = this.renderBar();
                        break;
                  case PIE:
                        widget = this.renderPie();
                        break;
                  case DONUT:
                        widget = this.renderDonut();
                        break;
                  case AREA:
                        widget = this.renderArea();
                        break;
                  case LINE:
                        widget = this.renderLine();
                        break;
                  case TABLE:
                        widget = this.renderTable();
                        break;
                  default:
                        widget = <div>Выберите тип диаграммы</div>;
                        break;
            }
            return <div className={`chart-container ${this.state.element.settings.legend.position}`}>{widget}</div>;
      }

      renderBar() {
            return (
                  <BarDataSource element={this.state.element} source={this.state.source} />
            );
      }

      renderPie() {
            return (
                  <PieDataSource element={this.state.element} source={this.state.source} />
            );
      }

      renderDonut() {
            return (
                  <DonutDataSource element={this.state.element} source={this.state.source} />
            );
      }

      renderArea() {
            return (
                  <AreaDataSource element={this.state.element} source={this.state.source} />
            );
      }

      renderLine() {
            return (
                  <LineDataSource element={this.state.element} source={this.state.source} />
            );
      }

      renderTable() {
            return (
                  <TableDataSource element={this.state.element} source={this.state.source} />
            );
      }

      render() {
            return this.getWidget();
      }

}

export default ChooseWidget;