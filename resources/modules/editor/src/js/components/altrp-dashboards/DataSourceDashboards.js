import { getDataByPath } from "../../../../../front-app/src/js/helpers";

import { WidthProvider, Responsive } from "react-grid-layout";

import axios from "axios";

import AddWidgetDataSource from './AddWidgetDataSource';

import PlusCircle from "react-bootstrap-icons/dist/icons/plus-circle";
import ReactToPrint from "react-to-print";
import domtoimage from "dom-to-image";
import Dropdown from "react-bootstrap/Dropdown";
import ThreeDotsVertical from "react-bootstrap-icons/dist/icons/three-dots-vertical";
import GearFill from "react-bootstrap-icons/dist/icons/sliders";
import TrashFill from "react-bootstrap-icons/dist/icons/trash";
import PrinterFill from "react-bootstrap-icons/dist/icons/printer";
import FileEarMark from "react-bootstrap-icons/dist/icons/cloud-download";


import ChooseWidget from './ChooseWidget';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

class DataSourceDashboards extends Component {
  static defaultProps = {
    className: "layout",
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    rowHeight: 60,
    onLayoutChange: function () { },
  };

  constructor(props) {
    super(props);

    this.state = {
      id: props.id,
      items: props.items || [],
      newCounter: props.counter || 1,
      repeater: _.cloneDeep(props.rep, []),
    };

    this.onAddItem = this.onAddItem.bind(this);
    this.onBreakpointChange = this.onBreakpointChange.bind(this);
    this.onEditItem = this.onEditItem.bind(this);
    this.onResizeHandler = this.onResizeHandler.bind(this);
    this.onResizeHandlerStop = this.onResizeHandlerStop.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.saveWidgetData = this.saveWidgetData.bind(this);
    this.onRemoveItem = this.onRemoveItem.bind(this);
    this.setEditItem = this.setEditItem.bind(this);

    // this.refData = React.createRef();
  }
  async saveWidget() {
    const itemDom = this.ref;
    const png = await domtoimage.toPng(itemDom);
    const link = document.createElement("a");
    link.download = `widget_${new Date().getTime()}.png`;
    link.href = png;
    link.click();
  };
  componentDidUpdate(prevProps, prevState) {
    if (!_.isEqual(prevProps.items, this.props.items)) {
      this.setState(state => {
        return { ...state, items: this.props.items }
      });
    }
    if (!_.isEqual(prevProps.counter, this.props.counter)) {
      this.setState(state => {
        return { ...state, newCounter: this.props.counter }
      });
    }
    if (!_.isEqual(prevState.items, this.state.items)) {
      this.setState(state => {
        return { ...state, items: state.items }
      });
    }
  }

  saveWidgetData(data = this.state) {
    console.log('SAVING ==>', data);
    const { id, items, newCounter } = data;
    console.log('DATA TO SAVE', items);
    console.log('ID TO SAVE', id);
    const settings = {
      items: items,
      newCounter: newCounter
    };
    try {
      const req = axios.post(`/ajax/dashboards/datasource/${id}/settings`, {
        settings: settings,
      }).then(res => {
        console.log(res.data);
      });
    }
    catch (e) {
      console.log('ERROR ==>', e);
    }
  }

  setEditItem(item) {
    let items = this.state.items;
    item.edit = true;
    _.replace(items, { i: item.i }, item);
    let index = _.findKey(items, { i: item.i });
    this.setState(state => {
      state.items[index] = item;
      return { ...state, items: items }
    });
  }

  createElement(el, key) {
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
    el.y = el.y == null ? Infinity : el.y;
    return (
      <div key={el.i} data-grid={el} >
        {el.edit ? (
          <div className="altrp-dashboard__card">
            <AddWidgetDataSource editHandler={this.onEditItem} widget={el} settings={el.settings} dataSourceList={dataSources} />
          </div>
        ) : (
            <div className="altrp-dashboard__card">
              <div className="title">
                <div>{el.settings.name}</div>
                <div className="dropdownTogglerContainer">
                  <Dropdown drop="left">
                    <Dropdown.Toggle variant="light" >
                      <ThreeDotsVertical color="#7a7a7b" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdownMenuToggle" style={{
                      zIndex: 999999,
                      background: 'rgba(255,255,255,1)'
                    }}>
                      {/* <Dropdown.Item>
                      <ReactToPrint
                        trigger={() => {
                          return (
                            <button type="button" title="Распечатать виджет">
                              <PrinterFill />
                            </button>
                          );
                        }}
                        content={() => {
                          console.log(this.refData);
                          // this.refData[key].current
                        }}
                      /></Dropdown.Item> */}
                      <Dropdown.Item>
                        <button type="button" title="Скачать файл" onClick={this.saveWidget}>
                          <FileEarMark />
                        </button>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <button type="button" title="Настроить виджет" onClick={() => this.setEditItem(el)}>
                          <GearFill />
                        </button>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <button type="button" title="Удалить виджет" onClick={() => this.onRemoveItem(el.i)}>
                          <TrashFill />
                        </button>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
              <ChooseWidget type={el.settings.type} data={el.settings.data} />
            </div>
          )
        }
      </div>
    );
  }

  onEditItem(key, settings) {
    const { items } = this.state;
    let widget = _.find(items, { i: key })
    widget.settings = settings;
    widget.edit = false;
    _.replace(items, { i: key }, widget);
    let index = _.findKey(items, { i: key });
    this.setState(state => {
      state.items[index] = widget;
      return { ...state, items: items }
    });
    this.saveWidgetData();
  }

  onAddItem() {
    this.setState(state => ({
      items: state.items.concat({
        i: "n" + this.state.newCounter,
        x: (this.state.items.length * 3) % (this.state.cols || 12),
        y: Infinity,
        w: 3,
        h: 5,
        settings: {
          data: [],
          source: '',
          type: ''
        },
        edit: true,
      }),
      newCounter: state.newCounter + 1
    }));
  }

  onResizeHandler(layout, oldItem, newItem, placeholder) {
    const newLayoutsSettings = typeof newItem === 'object' ? [newItem] : newItem;
    newLayoutsSettings.forEach(item => {
      console.log(item);
      const { i, x, y, w, h } = item;
      let widget = _.find(this.state.items, { i: i })
      widget = { ...widget, x: x, y: y, w: w, h: h, settings: { ...widget.settings }, };
      let index = _.findKey(this.state.items, { i: i });
      this.setState(state => {
        state.items[index] = widget;
        return { ...state, items: state.items }
      });
    })
  }

  onResizeHandlerStop(layout, oldItem, newItem, placeholder) {
    console.log('ITEMS =>>', this.state.items);
    this.saveWidgetData();
  }

  onDrop(layout, layoutItem, event) {
    console.log(layoutItem);
    console.log('ITEMS =>>', this.state.items);
  }

  // We're using the cols coming back from this to calculate where to add new items.
  onBreakpointChange(breakpoint, cols) {
    this.setState({
      breakpoint: breakpoint,
      cols: cols
    });
  }

  onLayoutChange(layout) {
    console.log(layout);
    this.props.onLayoutChange(layout);
    // this.setState({ layout: layout });
  }

  onRemoveItem(i) {
    console.log("removing", i);
    this.state.items = _.reject(this.state.items, { i: i });
    this.setState({ items: this.state.items });
    this.saveWidgetData(this.state);
  }

  render() {
    return (
      <div>
        <button onClick={this.onAddItem}>Добавить виджет</button>
        <ResponsiveReactGridLayout
          onLayoutChange={this.onLayoutChange}
          onResizeStart={this.onResizeHandler}
          onResizeStop={this.onResizeHandlerStop}
          onDrop={this.onDrop}
          onBreakpointChange={this.onBreakpointChange}
          {...this.props}
        >
          {_.map(this.state.items, (el, key) => this.createElement(el, key))}
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}

export default DataSourceDashboards;