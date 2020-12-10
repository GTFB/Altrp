import React, { Component } from "react";
import ChooseWidget from "./ChooseWidget";
import domtoimage from "dom-to-image";
import Dropdown from "react-bootstrap/Dropdown";
import ThreeDotsVertical from "react-bootstrap-icons/dist/icons/three-dots-vertical";
import GearFill from "react-bootstrap-icons/dist/icons/sliders";
import TrashFill from "react-bootstrap-icons/dist/icons/trash";
import PrinterFill from "react-bootstrap-icons/dist/icons/printer";
import Files from "react-bootstrap-icons/dist/icons/files";

class WidgetData extends Component {
  constructor(props) {
    super(props);
    let element = _.cloneDeep(props.editElement);
    this.state = { el: element };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!_.isEqual(prevState.el, this.props.editElement)) {
      this.setState(state => ({
        ...state,
        el: _.cloneDeep(this.props.editElement)
      }));
    }
    if (
      JSON.stringify(prevProps.editElement.settings.params) !==
      JSON.stringify(this.props.editElement.settings.params)
    ) {
      this.setState(state => ({
        ...state,
        el: _.cloneDeep(this.props.editElement)
      }));
    }
  }

  render() {
    return (
      <div className="altrp-dashboard__card">
        <div className="title">
          <div>{this.state.el.settings?.name || ""}</div>
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
                    title="Дублировать"
                    onClick={() => this.props.copyWidget(this.state.el)}
                  >
                    <Files />
                  </button>
                </Dropdown.Item>
                <Dropdown.Item>
                  <button
                    type="button"
                    title="Настроить"
                    onClick={() =>
                      this.props.openSettingsHandler(this.state.el)
                    }
                  >
                    <GearFill />
                  </button>
                </Dropdown.Item>
                <Dropdown.Item>
                  <button
                    type="button"
                    title="Удалить"
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
          editElement={_.cloneDeep(this.state.el)}
          params={_.cloneDeep(this.state.el.settings.params)}
          type={_.cloneDeep(this.state.el.settings.type)}
          sources={_.cloneDeep(this.state.el.settings.sources)}
        />
      </div>
    );
  }
}

export default WidgetData;
