import React, { Component } from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import { connect } from "react-redux";
import { editElement } from "../../store/altrp-dashboard/actions";
import axios from "axios";
import Drawer from "rc-drawer";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import WidgetData from "./WidgetData";
import WidgetPreview from "./WidgetPreview";
import WidgetSettings from "./WidgetSettings";
import AddItemButton from "./settings/AddItemButton";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const mapStateToProps = state => {
  return { editElement: state.editElement };
};

function mapDispatchToProps(dispatch) {
  return {
    editElement: data => dispatch(editElement(data))
  };
}

class DataSourceDashboards extends Component {
  static defaultProps = {
    className: "layout",
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    rowHeight: 60,
    onLayoutChange: function() {}
  };

  constructor(props) {
    super(props);

    this.state = {
      id: props.id,
      items: props.items || [],
      newCounter: props.counter || 1,
      repeater: _.cloneDeep(props.rep, []),
      settingsOpen: false,
      addItemPreview: false,
      settings: props.settings,
      drawer: null,
      datasources: null
    };

    this.onAddItem = this.onAddItem.bind(this);
    this.onAddItemCard = this.onAddItemCard.bind(this);
    this.onBreakpointChange = this.onBreakpointChange.bind(this);
    this.onEditItem = this.onEditItem.bind(this);
    this.onResizeHandler = this.onResizeHandler.bind(this);
    this.onResizeHandlerStop = this.onResizeHandlerStop.bind(this);
    this.saveWidgetData = this.saveWidgetData.bind(this);
    this.onRemoveItem = this.onRemoveItem.bind(this);
    this.setEditItem = this.setEditItem.bind(this);
    this.openSettings = this.openSettings.bind(this);
    this.setCardName = this.setCardName.bind(this);
    this.onDragStop = this.onDragStop.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (!_.isEqual(prevProps.items, this.props.items)) {
      this.setState(state => {
        return { ...state, items: this.props.items };
      });
    }
    if (!_.isEqual(prevProps.counter, this.props.counter)) {
      this.setState(state => {
        return { ...state, newCounter: this.props.counter };
      });
    }
    if (!_.isEqual(prevState.items, this.state.items)) {
      this.setState(state => {
        return { ...state, items: this.state.items };
      });
    }
    const drawer = document.querySelector(".drawer");
    if (!_.isEqual(this.state.drawer, drawer)) {
      this.setState(state => ({
        ...state,
        drawer: drawer
      }));
    }
  }

  saveWidgetData(data = this.state) {
    const { id, items, newCounter } = data;
    const settings = {
      items: items,
      newCounter: newCounter
    };
    try {
      const req = axios
        .post(
          `/ajax/dashboards/datasource/${id}/settings`,
          {
            settings: settings
          },
          {
            headers: {
              "X-CSRF-TOKEN": document
                .querySelector('meta[name="csrf-token"]')
                .getAttribute("content")
            }
          }
        )
        .then(res => {
          // console.log(res.data);
        });
    } catch (e) {
      console.log("ERROR ==>", e);
    }
  }

  setEditItem(item) {
    let items = this.state.items;
    item.edit = true;
    _.replace(items, { i: item.i }, item);
    let index = _.findKey(items, { i: item.i });
    this.setState(state => {
      state.items[index] = item;
      return { ...state, items: items };
    });
  }

  setCardName(name, el) {
    const { items } = this.state;
    let widget = _.find(items, { i: el.i });
    widget.settings.name = name;
    let index = _.findKey(items, { i: el.i });
    this.setState(state => {
      state.items[index] = widget;
      return { ...state, items: items };
    });
    this.saveWidgetData(this.state);
  }

  openSettings(el = null, addItemPreviewBool = null) {
    this.setState(state => {
      if (el === null) {
        state.drawer = null;
      }
      this.props.editElement(el);
      state.editElement = el;
      if (addItemPreviewBool !== null) {
        return {
          ...state,
          settingsOpen: !state.settingsOpen,
          addItemPreview: addItemPreviewBool
        };
      }
      return {
        ...state,
        settingsOpen: !state.settingsOpen
      };
    });
  }

  onEditItem(key, settings) {
    const { items } = this.state;
    let widget = _.find(items, { i: key });
    widget.settings = settings;
    widget.edit = false;
    this.props.editElement(widget);
    _.replace(items, { i: key }, widget);
    let index = _.findKey(items, { i: key });
    this.setState(state => {
      state.items[index] = widget;
      return { ...state, items: items };
    });
    this.saveWidgetData();
  }

  onAddItem() {
    this.setState(s => ({ ...s, addItemPreview: true }));
    this.openSettings();
  }

  onAddItemCard(element) {
    if (_.keys(element).length > 0) {
      this.setState(state => ({
        ...state,
        items: state.items.concat(
          this.itemSettingsAdd(state, element.settings)
        ),
        newCounter: state.newCounter + 1,
        addItemPreview: false,
        settingsOpen: false
      }));
      return;
    }
    alert("Информация не заполнена");
  }

  itemSettingsAdd(state, settings) {
    return {
      i: "n" + state.newCounter,
      x: (state.items.length * 3) % (state.cols || 12),
      y: Infinity,
      w: 3,
      h: 5,
      settings: settings
    };
  }

  onResizeHandler(layout, oldItem, newItem, placeholder) {
    const newLayoutsSettings =
      typeof newItem === "object" ? [newItem] : newItem;
    newLayoutsSettings.forEach(item => {
      const { i, x, y, w, h } = item;
      let widget = _.find(this.state.items, { i: i });
      widget = {
        ...widget,
        x: x,
        y: y,
        w: w,
        h: h,
        settings: { ...widget.settings }
      };
      let index = _.findKey(this.state.items, { i: i });
      this.setState(state => {
        state.items[index] = widget;
        return { ...state, items: state.items };
      });
    });
  }

  onResizeHandlerStop(layout, oldItem, newItem, placeholder) {
    const { i, x, y, w, h } = newItem;
    let item = _.find(this.state.items, { i: i });
    const itemKey = _.findKey(this.state.items, { i: i });
    item = {
      ...item,
      x: x,
      y: y,
      w: w,
      h: h
    };
    this.setState(s => ({ ...s, items: { ...s.items, [itemKey]: item } }));
    this.saveWidgetData(this.state);
  }

  onBreakpointChange(breakpoint, cols) {
    this.setState({
      breakpoint: breakpoint,
      cols: cols
    });
  }

  onLayoutChange(layout) {
    this.props.onLayoutChange(layout);
  }

  onDragStop(layout, oldItem, newItem, placeholder, event, element) {
    const { i, x, y, w, h } = newItem;
    let item = _.find(this.state.items, { i: i });
    const itemKey = _.findKey(this.state.items, { i: i });
    item = {
      ...item,
      x: x,
      y: y,
      w: w,
      h: h
    };
    this.setState(s => ({ ...s, items: { ...s.items, [itemKey]: item } }));
    this.saveWidgetData(this.state);
  }

  onRemoveItem(i) {
    this.state.items = _.reject(this.state.items, { i: i });
    this.setState({ items: this.state.items });
    this.saveWidgetData(this.state);
  }

  createElement(el, key) {
    el.y = el.y == null ? Infinity : el.y;
    return (
      <div key={el.i} data-grid={el}>
        <WidgetData
          editElement={_.cloneDeep(el, {})}
          settings={el.settings}
          openSettingsHandler={this.openSettings}
          setEditItem={this.setEditItem}
          onRemoveItem={this.onRemoveItem}
          saveWidget={this.saveWidgetData}
        />
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.props.showButton && <AddItemButton onAddItem={this.onAddItem} />}
        <ResponsiveReactGridLayout
          onLayoutChange={this.onLayoutChange}
          onResizeStart={this.onResizeHandler}
          onResizeStop={this.onResizeHandlerStop}
          onDrop={this.onDrop}
          onDragStop={this.onDragStop}
          onBreakpointChange={this.onBreakpointChange}
          {...this.props}
        >
          {_.map(this.state.items, (el, key) => this.createElement(el, key))}
        </ResponsiveReactGridLayout>

        <Drawer
          getContainer={document.body}
          placement="right"
          open={true}
          defaultOpen={true}
          width={"30vh"}
          open={this.state.settingsOpen}
          onClose={this.openSettings}
          handler={false}
        >
          {this.state.settingsOpen && (
            <WidgetSettings
              addItemPreview={this.state.addItemPreview}
              filter_datasource={this.state.settings.filter_datasource}
              datasources={this.props.rep}
              editHandler={this.onEditItem}
              onCloseHandler={this.openSettings}
              onAddItem={this.onAddItemCard}
            />
          )}
        </Drawer>
        {this.state.drawer != null &&
          ReactDOM.createPortal(
            <WidgetPreview
              addItemPreview={this.state.addItemPreview}
              setCardName={this.setCardName}
            />,
            this.state.drawer
          )}
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true
})(DataSourceDashboards);
