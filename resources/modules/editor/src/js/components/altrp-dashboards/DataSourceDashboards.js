import { getDataByPath } from "../../../../../front-app/src/js/helpers";
import GridLayout from 'react-grid-layout';

import AddWidgetDataSource from './AddWidgetDataSource';

import PlusCircle from "react-bootstrap-icons/dist/icons/plus-circle";

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

class DataSourceDashboards extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      repeater: _.cloneDeep(props.rep, []),
      containerWidth: Number(props.containerWidth),
      widgets: [],
      addMode: false,
    };
  }

  /**
   * Компонент обновился
   * @param {{}} prevProps
   * @param {{}} prevState
   */
  componentDidUpdate(prevProps, prevState) {
    if (!_.isEqual(prevProps.rep, this.props.rep)) {
      this.setState(state => ({ ...state, repeater: this.props.rep }));
    }
  }

  addWidgetHandle(id, settings) {
    let widgets = _.cloneDeep(this.state.widgets);
    console.log(widgets);
  }

  render() {
    let repeater = this.props.rep;
    let dataSources = repeater.map(r => {
      let data = getDataByPath(r.path, []);
      data = data.map(d => {
        return {
          data: _.get(d, r.data),
          key: _.get(d, r.key),
        };
      });
      return {
        ...r,
        data,
      };
    });
    const baseLayout = { x: 0, y: 0, w: 3, h: 8, maxW: 12, minW: 3, maxH: 30, minH: 8 };
    console.log('DATASOURCES =>', dataSources);
    return (
      <GridLayout className="layout" cols={12} rowHeight={30} width={this.state.containerWidth}>
        <div key="0" data-grid={baseLayout} >
          <div className="altrp-dashboard__card">
            {
              this.state.addMode ?
                (
                  <AddWidgetDataSource layout={baseLayout} dataSourceList={dataSources} addWidget={this.addWidgetHandle} />
                ) :
                (
                  <button onClick={e => { this.setState({ addMode: true }) }} className="altrp-dashboard__card__add">
                    <div className="title">Добавить виджет</div>
                    <div>
                      <PlusCircle />
                    </div>
                  </button>
                )
            }
          </div>
        </div>

        {this.state.widgets.map((widget) => (
          <div key={widget.id} data-grid={widget.settings.layout || baseLayout}>
            <div className="altrp-dashboard__card">
              Виджет {widget.id}
            </div>
          </div>
        ))}
      </GridLayout>
    );
  }

}

export default DataSourceDashboards;