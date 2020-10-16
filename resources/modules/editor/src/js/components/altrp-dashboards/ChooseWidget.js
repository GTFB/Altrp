import {
      BAR,
      PIE,
      DONUT,
      AREA,
      LINE,
      TABLE
} from "../../../../../admin/src/components/dashboard/widgetTypes";


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
                  type: props.type,
                  data: props.data
            };
      }

      /**
   * Компонент обновился
   * @param {{}} prevProps
   * @param {{}} prevState
   */
      componentDidUpdate(prevProps, prevState) {
            if (!_.isEqual(prevProps.type, this.props.type)) {
                  this.setState(state => ({ ...state, type: this.props.type }));
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
                        widget = 'Выберите тип диаграммы';
                        break;
            }
            return widget;
      }

      renderBar() {
            return <div className="chart-container">
                  <BarDataSource data={this.state.data} />
            </div>;
      }

      renderPie() {
            return <div className="chart-container">
                  <PieDataSource data={this.state.data} />
            </div>;
      }

      renderDonut() {
            return <div className="chart-container">
                  <DonutDataSource data={this.state.data} />
            </div>;
      }

      renderArea() {
            return <div className="chart-container">
                  <AreaDataSource data={this.state.data} />
            </div>;
      }

      renderLine() {
            return <div className="chart-container">
                  <LineDataSource data={this.state.data} />
            </div>;
      }

      renderTable() {
            return <div className="chart-container">
                  <TableDataSource data={this.state.data} />
            </div>;
      }

      render() {
            return this.getWidget();
      }

}

export default ChooseWidget;