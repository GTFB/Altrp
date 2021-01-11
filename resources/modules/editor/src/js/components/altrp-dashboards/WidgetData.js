import React, { Component } from "react";
import ChooseWidget from "./ChooseWidget";
import { exportComponentAsPNG } from "react-component-export-image";
import Dropdown from "react-bootstrap/Dropdown";
import ThreeDotsVertical from "react-bootstrap-icons/dist/icons/three-dots-vertical";
import GearFill from "react-bootstrap-icons/dist/icons/sliders";
import TrashFill from "react-bootstrap-icons/dist/icons/trash";
import PrinterFill from "react-bootstrap-icons/dist/icons/printer";
import ArrowBarUp from "react-bootstrap-icons/dist/icons/arrow-bar-up";
import FileEarMark from "react-bootstrap-icons/dist/icons/cloud-download";
import Files from "react-bootstrap-icons/dist/icons/files";

class WidgetData extends Component {
  constructor(props) {
    super(props);
    let element = _.cloneDeep(props.editElement);
    this.state = { el: element };
    this.ref = React.createRef();
    this.downloadWidget = this.downloadWidget.bind(this);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!_.isEqual(prevState.el, this.props.editElement)) {
      this.setState(state => ({
        ...state,
        el: _.cloneDeep(this.props.editElement)
      }));
    }
    if (
      JSON.stringify(prevProps.editElement.settings?.params) !==
      JSON.stringify(this.props.editElement.settings?.params)
    ) {
      this.setState(state => ({
        ...state,
        el: _.cloneDeep(this.props.editElement)
      }));
    }
  }

  downloadWidget() {
    exportComponentAsPNG(this.ref, this.props.editElement.settings.name);
  }

  render() {
    return (
      <div
        className="
      altrp-dashboard__card
      altrp-dashboard__card--border
      altrp-dashboard__card--border-radius
      altrp-dashboard__card--border-color
      altrp-dashboard__card--border-style
      altrp-dashboard__card--background
      altrp-dashboard__card--font"
      >
        <div className="title altrp-dashboards__cancle-drag">
          <div
            className="
            altrp-dashboard__card--font
            altrp-dashboard__card--font-size
            altrp-dashboard__card--font-weight
            altrp-dashboard__card--font-color"
            style={{
              width: "100%"
            }}
          >
            {this.state.el.settings?.name || ""}
          </div>
          <div className="dropdownTogglerContainer">
            <Dropdown drop="left">
              <Dropdown.Toggle
                className="altrp-dashboard__card--background"
                variant="light"
              >
                <ThreeDotsVertical color="#7a7a7b" />
              </Dropdown.Toggle>
              <Dropdown.Menu
                className="dropdownMenuToggle altrp-dashboard__card--settings-tooltip-background"
                style={{
                  zIndex: 999999,
                  background: "rgba(255,255,255,1)"
                }}
              >
                <Dropdown.Item className="altrp-dashboard__card--settings-tooltip-background">
                  <button
                    type="button"
                    title="Скачать файл"
                    className="altrp-dashboard__card--settings-tooltip-icon-background"
                    onClick={this.downloadWidget}
                  >
                    <FileEarMark />
                  </button>
                </Dropdown.Item>
                <Dropdown.Item className="altrp-dashboard__card--settings-tooltip-background">
                  <button
                    type="button"
                    title="Экспорт"
                    className="altrp-dashboard__card--settings-tooltip-icon-background"
                    onClick={() => this.props.exportCard(this.state.el)}
                  >
                    <ArrowBarUp />
                  </button>
                </Dropdown.Item>
                <Dropdown.Item className="altrp-dashboard__card--settings-tooltip-background">
                  <button
                    type="button"
                    title="Дублировать"
                    className="altrp-dashboard__card--settings-tooltip-icon-background"
                    onClick={() => this.props.copyWidget(this.state.el)}
                  >
                    <Files />
                  </button>
                </Dropdown.Item>
                <Dropdown.Item className="altrp-dashboard__card--settings-tooltip-background">
                  <button
                    type="button"
                    title="Настроить"
                    className="altrp-dashboard__card--settings-tooltip-icon-background"
                    onClick={() =>
                      this.props.openSettingsHandler(this.state.el)
                    }
                  >
                    <GearFill />
                  </button>
                </Dropdown.Item>
                <Dropdown.Item className="altrp-dashboard__card--settings-tooltip-background">
                  <button
                    type="button"
                    title="Удалить"
                    className="altrp-dashboard__card--settings-tooltip-icon-background"
                    onClick={() => this.props.onRemoveItem(this.state.el.i)}
                  >
                    <TrashFill />
                  </button>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <ChooseWidget
          ref={this.ref}
          editElement={_.cloneDeep(this.state.el)}
          params={_.cloneDeep(this.state.el.settings?.params)}
          type={_.cloneDeep(this.state.el.settings?.type)}
          sources={_.cloneDeep(this.state.el.settings?.sources)}
          widgetID={this.props.widgetID}
        />
      </div>
    );
  }
}

export default WidgetData;
