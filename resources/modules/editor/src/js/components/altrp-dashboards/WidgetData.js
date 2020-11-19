import React, { Component, Suspense } from "react";
import ChooseWidget from "./ChooseWidget";
import domtoimage from "dom-to-image";
import Dropdown from "react-bootstrap/Dropdown";
import ThreeDotsVertical from "react-bootstrap-icons/dist/icons/three-dots-vertical";
import GearFill from "react-bootstrap-icons/dist/icons/sliders";
import TrashFill from "react-bootstrap-icons/dist/icons/trash";
import PrinterFill from "react-bootstrap-icons/dist/icons/printer";
import FileEarMark from "react-bootstrap-icons/dist/icons/cloud-download";

class WidgetData extends Component {
  constructor(props) {
    super(props);
    let element = _.cloneDeep(props.editElement, []);
    console.log(element);
    this.state = { el: element };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      !_.isEqual(prevState.el, this.props.editElement) ||
      JSON.stringify(prevProps.editElement.settings.params) !==
        JSON.stringify(this.props.editElement.settings.params)
    ) {
      console.log("CHANGE DATA");
      this.setState(state => ({
        ...state,
        el: _.cloneDeep(this.props.editElement, [])
      }));
    }
  }

  render() {
    return (
      <div className="altrp-dashboard__card">
        <div className="title">
          <div>{this.state.el.settings.name}</div>
          <div className="dropdownTogglerContainer">
            <Dropdown drop="left">
              <Dropdown.Toggle variant="light">
                <ThreeDotsVertical color="#7a7a7b" />
              </Dropdown.Toggle>
              <Dropdown.Menu
                className="dropdownMenuToggle"
                style={{
                  zIndex: 999999,
                  background: "rgba(255,255,255,1)"
                }}
              >
                <Dropdown.Item>
                  <button
                    type="button"
                    title="Скачать файл"
                    onClick={this.props.saveWidget}
                  >
                    <FileEarMark />
                  </button>
                </Dropdown.Item>
                <Dropdown.Item>
                  <button
                    type="button"
                    title="Настроить виджет"
                    onClick={() =>
                      this.props.openSettingsHandler(this.props.editElement)
                    }
                  >
                    <GearFill />
                  </button>
                </Dropdown.Item>
                <Dropdown.Item>
                  <button
                    type="button"
                    title="Удалить виджет"
                    onClick={() =>
                      this.props.onRemoveItem(this.props.editElement.i)
                    }
                  >
                    <TrashFill />
                  </button>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <ChooseWidget
          editElement={this.props.editElement}
          params={this.props.editElement.settings.params}
          type={this.props.editElement.settings.type}
          sources={this.props.editElement.settings.sources}
        />
      </div>
    );
  }
}

export default WidgetData;
