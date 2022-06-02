import React, { Component } from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import { connect } from "react-redux";
import { editElement } from "../../store/altrp-dashboard/actions";
import { exportDashboard } from "../../../../../front-app/src/js/store/altrp-dashboard-export/actions";
import axios from "axios";
import { createPortal } from "react-dom";
import Drawer from "rc-drawer";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import WidgetData from "./WidgetData";
import WidgetPreview from "./WidgetPreview";
import WidgetSettings from "./WidgetSettings";
import AddItemButton from "./settings/AddItemButton";
import ExportDashboardButton from "./settings/ExportDashboardButton";
import ImportDashboard from "./settings/ImportDashboard";
import ImportDiagram from "./settings/ImportDiagram";
import isEditor from "../../../../../front-app/src/js/functions/isEditor";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const mapStateToProps = state => {
  return {
    editElement: _.cloneDeep(state.editElement),
    dashboardExport: _.cloneDeep(state.exportDashboard)
  };
};

function mapDispatchToProps(dispatch) {
  return {
    editElementDispatch: data => dispatch(editElement(data)),
    exportDashboardDispatch: data => dispatch(exportDashboard(data))
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
      datasources: null,
      delimer: props.delimer,
      importData: [],
      importWidget: [],
      parentDrawer: document.body
    };

    this.export = this.export.bind(this);
    this.import = this.import.bind(this);
    this.getFile = this.getFile.bind(this);
    this.exportCard = this.exportCard.bind(this);
    this.importDiagram = this.importDiagram.bind(this);
    this.getWidgetFile = this.getWidgetFile.bind(this);
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
    this.copyWidget = this.copyWidget.bind(this);
  }

  componentDidMount() {
    if (isEditor()) {
      this.setState(state => ({
        ...state,
        parentDrawer: document.getElementById("editorContent").contentWindow
          .document.body
      }));
    }
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
      this.saveWidgetData(this.state);
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
          console.log(res.data);
        });
    } catch (e) {
      console.log("ERROR ==>", e);
    }
  }

  putLayoutToLocalStorage(layout) {}

  setEditItem(item) {
    let items = this.state.items;
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
    const index = _.findKey(items, { i: el.i });
    this.setState(state => {
      state.items[index] = widget;
      return { ...state, items: items };
    });
    this.saveWidgetData(this.state);
  }

  openSettings(el = null, addItemPreviewBool = null) {
    const element = _.cloneDeep(el);
    this.setState(state => {
      if (el === null) {
        state.drawer = null;
      }
      this.props.editElementDispatch(element);
      state.editElement = element;
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
    this.props.editElementDispatch(widget);
    _.replace(items, { i: key }, widget);
    let index = _.findKey(items, { i: key });
    this.setState(state => {
      state.items[index] = widget;
      this.saveWidgetData(state);
      return { ...state, items: items };
    });
  }

  onAddItem() {
    this.setState(s => ({ ...s, addItemPreview: true }));
    this.openSettings();
  }

  onAddItemCard(element) {
    if (_.keys(element).length > 0) {
      this.setState(state => {
        if (!Array.isArray(state.items)) {
          state.items = Object.values(state.items);
        }
        let items = state.items.concat(
          this.itemSettingsAdd(state, element.settings)
        );
        return {
          ...state,
          items: items,
          newCounter: state.newCounter + 1,
          addItemPreview: false,
          settingsOpen: false
        };
      });
      return;
    }
    alert("Информация не заполнена");
  }

  itemSettingsAdd(state, settings) {
    return {
      i: typeof state.items !== "undefined" ? "n" + state.newCounter : "n" + 0,
      x:
        typeof state.items !== "undefined"
          ? (state.items.length * 3) % (state.cols || 12)
          : (0 * 3) % (state.cols || 12),
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

  export() {
    const settings = {
      newCounter: _.cloneDeep(this.state.newCounter),
      items: _.cloneDeep(this.state.items)
    };
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(settings));
    let link = document.createElement("a");
    link.setAttribute("href", dataStr);
    link.setAttribute("download", `${this.state.id}.json`);
    link.click();
  }

  exportCard(el) {
    const element = el.settings;
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(element));
    let link = document.createElement("a");
    link.setAttribute("href", dataStr);
    link.setAttribute("download", `${el.settings.name}.json`);
    link.click();
  }

  import() {
    const file = this.state.importData;
    const id = this.state.id;

    if (_.keys(file).length <= 0) {
      alert("Выберите файл");
      return;
    }
    try {
      const req = axios
        .post(
          `/ajax/dashboards/datasource/${id}/settings`,
          {
            settings: file
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
          try {
            const settings = JSON?.parse(res.data.settings);
            const { items, newCounter } = settings;
            this.setState(s => ({
              ...s,
              items: items,
              newCounter: newCounter
            }));
          } catch (error) {}
        });
    } catch (e) {
      console.log("ERROR ==>", e);
    }
  }

  importDiagram() {
    const widget = { settings: this.state.importWidget };
    if (_.keys(widget.settings).length <= 0) {
      alert("Выберите файл");
      return;
    }
    try {
      this.onAddItemCard(widget);
      this.setState(s => ({ importWidget: [] }));
    } catch (e) {
      console.log("ERROR ==>", e);
    }
  }

  getFile(e) {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = e => {
      const file = JSON.parse(e.target.result);
      this.setState(s => ({ ...s, importData: file }));
    };
  }

  getWidgetFile(e) {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = e => {
      const file = JSON.parse(e.target.result);
      this.setState(s => ({ ...s, importWidget: file }));
    };
  }

  copyWidget(widget) {
    this.onAddItemCard(widget);
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
          copyWidget={this.copyWidget}
          exportCard={this.exportCard}
          widgetID={this.state.id}
        />
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.props.showButton && (
          <>
            <AddItemButton onAddItem={this.onAddItem} />
          </>
        )}
        {this.props.showExportButton && (
          <ExportDashboardButton
            className="altrp-dashboars__export-dashboard-button"
            onExport={this.export}
          />
        )}
        <ImportDashboard
          className="altrp-dashboars__import-dashboard-button"
          onImport={this.import}
          getFile={this.getFile}
        />
        <ImportDiagram
          className="altrp-dashboars__import-diagram-button"
          onImport={this.importDiagram}
          getFile={this.getWidgetFile}
        />
        <ResponsiveReactGridLayout
          draggableCancel=".altrp-dashboards__cancle-drag"
          onLayoutChange={this.onLayoutChange}
          onResizeStart={this.onResizeHandler}
          onResizeStop={this.onResizeHandlerStop}
          autoSize={true}
          onDrop={this.onDrop}
          onDragStop={this.onDragStop}
          onBreakpointChange={this.onBreakpointChange}
          {...this.props}
        >
          {_.map(this.state.items, (el, key) => this.createElement(el, key))}
        </ResponsiveReactGridLayout>
        {createPortal(
          <Drawer
            getContainer={null}
            placement="right"
            defaultOpen={true}
            width={this.props.drawerWidth}
            open={this.state.settingsOpen}
            onClose={this.openSettings}
            handler={false}
          >
            {this.state.settingsOpen && (
              <WidgetSettings
                widgetID={this.state.id}
                settings={this.props.settings}
                addItemPreview={this.state.addItemPreview}
                filter_datasource={this.state.settings.filter_datasource}
                datasources={this.props.rep}
                editHandler={this.onEditItem}
                checkboxColor={this.state.settings?.checkboxColor}
                onCloseHandler={this.openSettings}
                onAddItem={this.onAddItemCard}
                setCardName={this.setCardName}
                delimer={this.state.delimer}
              />
            )}
          </Drawer>,
          this.state.parentDrawer
        )}
        {this.state.drawer != null &&
          ReactDOM.createPortal(
            <WidgetPreview
              width={this.props.drawerWidth}
              widgetID={this.state.id}
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
