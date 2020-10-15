import { getDataByPath } from "../../../../../front-app/src/js/helpers";
import GridLayout from 'react-grid-layout';
import RGL, { WidthProvider } from "react-grid-layout";

const ReactGridLayout = WidthProvider(RGL);

import AddWidgetDataSource from './AddWidgetDataSource';

import PlusCircle from "react-bootstrap-icons/dist/icons/plus-circle";

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

class DataSourceDashboards extends Component {

  static defaultProps = {
    className: "layout",
    cols: 12,
    rowHeight: 30,
    onLayoutChange: function () { }
  };

  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      repeater: _.cloneDeep(props.rep, []),
      containerWidth: Number(props.containerWidth),
      widgets: [],
      addMode: false,
      settings: props.settings,
    };
    this.onAddItem = this.onAddItem.bind(this);
    this.onLayoutChange = this.onLayoutChange.bind(this);
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

  onLayoutChange(layout) {
    this.setState({ layout });
    this.props.onLayoutChange(layout);
    console.log(this.state.layout);
  }

  async addWidgetHandle(id, settings) {
    // console.log(this.state.widgets);
    // let widgets = typeof this.state.widgets !== 'undefined' && _.cloneDeep(this.state.widgets, []);
    let widget = {
      ...settings,
      layout: {
        ...settings.layout
      }
    }

    console.log(widget);
    // console.log(widgets);
    // console.log(settings);
    // const data = {
    //   ...widget,
    //   title: title.current.value,
    //   options: JSON.stringify(widget.options),
    //   filter: JSON.stringify(widget.filter),
    // };
    // const req = await axios.post(`/ajax/dashboards/${id}`, data);
    // if (req.status === 200) {
    //   onAdd(req.data);
    //   setIsShow(false);
    // }
  }
  onAddItem() {
    console.log(123);
  }
  onBreakpointChange(breakpoint, cols) {
    console.log(123);
  }
  onRemoveItem(i) {
    console.log("removing", i);
  }

  resizeHandle(layout, oldLayoutItem, layoutItem, placeholder) {
    console.log(layoutItem, placeholder);
  }

  createElement(widget) {
    return <div key={widget.id} data-grid={widget.settings.layout || baseLayout}>
      <div className="altrp-dashboard__card">
        Виджет {widget.id}
      </div>
    </div>
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

    return (
      <GridLayout
        {...this.props}
        layout={this.state.layout}
        onLayoutChange={this.onLayoutChange}
        width={1010}>
        <div key="0" data-grid={baseLayout} >
          <div className="altrp-dashboard__card">
            {
              this.state.addMode ?
                (
                  <AddWidgetDataSource
                    resizeHandle={this.resizeHandle(this.state.layout, widget.settings)} layout={baseLayout} dataSourceList={dataSources} addWidget={this.addWidgetHandle} />
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

        {this.state.widgets.map((widget) => this.createElement(widget))}
      </GridLayout>
    );
  }

}

export default DataSourceDashboards;