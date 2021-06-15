import React, { Component } from "react";
import styled from "styled-components";
import {
  ControlGroup,
  InputGroup,
  Button,
  Divider,
  Collapse,
  Icon
} from "@blueprintjs/core";
import { SketchPicker } from "react-color";
import invert from "invert-color";
import Resource from "../classes/Resource";
import { connect } from "react-redux";
import { setGlobalEffect } from "../store/altrp-global-colors/actions";
import { createGlobalColor, getTemplateDataStorage } from "../helpers";
import BaseElement from "../classes/elements/BaseElement";

const Panel = styled.div`
  background-color: #fff;
  padding: 25px 15px;
  width: 100%;
  margin: 20px 0;
  overflow: auto;
`;

const mapStateToProps = state => ({
  effects: state.globalStyles.effects
});

const mapDispatchToProps = dispatch => ({
  setEffect: effect => dispatch(setGlobalEffect(effect))
});

class GlobalEffects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: props.colors
    };
    this.toggleColorPanel = this.toggleColorPanel.bind(this);
    this.colorChange = this.colorChange.bind(this);
    this.nameChange = this.nameChange.bind(this);
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.debounceChangeColor = this.debounceChangeColor.bind(this);
    this.debounceChangeName = this.debounceChangeName.bind(this);
    this.globalStyleResource = new Resource({
      route: "/admin/ajax/global_template_styles"
    });
  }

  toggleColorPanel(id) {
    const colors = _.cloneDeep(this.state.colors, []);
    let color = _.find(colors, color => color.id === id);
    color.colorPanelOpen = !color.colorPanelOpen;
    this.setState(s => ({ ...s, colors: colors }));
  }

  colorChange = (value, id) => {
    const rgba = `rgba(${value.rgb.r}, ${value.rgb.g}, ${value.rgb.b}, ${value.rgb.a})`;
    const hex = value.hex;
    const rgb = value.rgb;
    const colors = _.cloneDeep(this.state.colors, []);
    let currentColor = _.find(colors, color => color.id === id);
    currentColor.color = rgba;
    currentColor.colorPickedHex = hex;
    currentColor.colorRGB = rgb;
    this.setState(
      s => ({ ...s, colors: colors }),
      () => this.props.setEffect(colors)
    );
    const data = {
      color: rgba,
      colorPickedHex: hex,
      colorRGB: rgb,
      guid: currentColor.guid
    };
    this.debounceChangeColor(data, id);
  };

  debounceChangeColor = _.debounce((color, id) => {
    this.globalStyleResource
      .put(id, {
        settings: { ...color },
        type: "color"
      })
      .then(res => {
        getTemplateDataStorage()
          .getRootElement()
          .children.forEach(child => {
            this.recursiveWalkTree(child, color.guid, color);
          });
      });
  }, 50);

  /**
   * @param {BaseElement} template
   * @param {String} guid
   * @param {*} color
   */
  recursiveWalkTree(template, guid, color) {
    template.children?.forEach(
      /**
       * @param {BaseElement} child
       */
      child => {
        if (child.hasGlobal(guid)) {
          child.updateAllGlobals(guid, color);
        }
        child.children.length > 0 &&
          this.recursiveWalkTree(child.children, guid, color);
      }
    );
  }

  nameChange = (value, id) => {
    if (value.length === 0) throw "Value cannot be empty";
    const colors = _.cloneDeep(this.state.colors, []);
    let color = _.find(colors, color => color.id === id);
    color.name = value;
    this.setState(
      s => ({ ...s, colors: colors }),
      () => this.props.setEffect(colors)
    );
    this.debounceChangeName(value, id);
  };

  debounceChangeName = _.debounce((value, id) => {
    this.globalStyleResource.put(id, {
      settings: { name: value },
      type: "color"
    });
  }, 150);

  addItem(e) {
    const color = {};
    color.settings = JSON.stringify(createGlobalColor());
    color.type = "color";
    this.globalStyleResource.post(color).then(response => {
      const colors = [
        ...this.state.colors,
        {
          id: response.id,
          guid: response.guid,
          ...response.settings
        }
      ];
      this.setState(
        s => ({ ...s, colors: colors }),
        () => this.props.setEffect(colors)
      );
    });
  }

  deleteItem(id) {
    const confirm = window.confirm("Are you shure?");
    if (confirm) {
      let colors = _.cloneDeep(this.state.colors, []);
      colors = colors.filter(item => item.id !== id);
      this.setState(
        s => ({ ...s, colors: colors }),
        () => this.props.setEffect(colors)
      );
      this.globalStyleResource.delete(id);
    }
  }

  render() {
    return (
      <Panel>
        <Collapse isOpen={true}>
          <ControlGroup>
            <div className={!item?.colorPanelOpen ? " control-color-hide" : ""}>
              <SketchPicker
                presetColors={[]}
                color={item.color}
                onChange={color => this.colorChange(color, item.id)}
                style={{
                  padding: 0,
                  boxShadow: "none"
                }}
              ></SketchPicker>
            </div>
          </ControlGroup>
        </Collapse>
        <Divider></Divider>
        <Button style={{ width: "100%" }} onClick={this.addItem}>
          Add Item
        </Button>
      </Panel>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(GlobalEffects);
