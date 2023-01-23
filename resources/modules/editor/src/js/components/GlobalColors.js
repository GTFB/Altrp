import React, { Component } from "react";
import styled from "styled-components";
import {
  ControlGroup,
  InputGroup,
  Button,
  Divider,
  Icon
} from "@blueprintjs/core";
import { SketchPicker } from "react-color";
import invert from "invert-color";
import Resource from "../classes/Resource";
import { connect } from "react-redux";
import {
  setGlobalColors,
  editGlobalColor,
  editGlobalEffect
} from "../store/altrp-global-colors/actions";
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
  colors: state.globalStyles.colors,
  effects: state.globalStyles.effects
});

const mapDispatchToProps = dispatch => ({
  setColors: colors => dispatch(setGlobalColors(colors)),
  editColor: color => dispatch(editGlobalColor(color)),
  editEffect: effect => dispatch(editGlobalEffect(effect))
});

class GlobalColors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: this.props.colors
    };
    this.toggleColorPanel = this.toggleColorPanel.bind(this);
    this.colorChange = this.colorChange.bind(this);
    this.nameChange = this.nameChange.bind(this);
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.debounceChangeColor = this.debounceChangeColor.bind(this);
    this.debounceChangeName = this.debounceChangeName.bind(this);
    this.updateEffectColors = this.updateEffectColors.bind(this);
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
      () => this.props.setColors(colors)
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
        this.props.editColor({ ...color, id: id });
        this.updateEffectColors(color);
        getTemplateDataStorage()
          .getRootElement()
          .children.forEach(child => {
            this.recursiveWalkTree(child, color.guid, color);
          });
      });
  }, 50);

  /**
   * Обновление цвета в эффекте
   * @param {*} color
   */
  updateEffectColors(color) {
    const guid = color.guid;
    this.props.effects.forEach(effect => {
      const check = effect.globalColor === guid;
      if (check) {
        const newEffectColor = {
          ...effect,
          colorRGB: color.colorRGB,
          color: color.color,
          colorPickedHex: color.colorPickedHex
        };
        this.globalStyleResource
          .put(effect.id, { settings: newEffectColor })
          .then(res => {
            this.props.editEffect(newEffectColor);
            getTemplateDataStorage()
              .getRootElement()
              .children.forEach(child => {
                this.recursiveWalkTree(
                  child,
                  newEffectColor.guid,
                  newEffectColor
                );
              });
          });
      }
      // this.globalStyleResource.put();
    });
  }

  /**
   *
   * @param {BaseElement} template
   * @param {String} guid
   * @param {*} color
   */
  recursiveWalkTree(template, guid, color) {
    if (Array.isArray(template)) {
      template?.forEach(
        /**
         * @param {BaseElement} templateItem
         */
        templateItem => {
          const hasGlobal = Boolean(templateItem.hasGlobal(guid));
          if (hasGlobal) {
            templateItem.updateAllGlobals(guid, color);
          }
          this.recursiveWalkTree(templateItem, guid, color);
        }
      );
    } else this.recursiveUpdate(template, guid, color);
  }

  /**
   * @param {BaseElement} template
   * @param {String} guid
   * @param {*} color
   */
  recursiveUpdate(template, guid, color) {
    if (template.hasGlobal(guid)) {
      template.updateAllGlobals(guid, color);
    }
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
      () => this.props.setColors(colors)
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
    color._type = "color";
    this.globalStyleResource.post(color).then(response => {
      const colors = [
        ...this.state.colors,
        {
          id: response.id,
          guid: response.guid,
          _type: 'color',
          ...response.settings
        }
      ];
      this.setState(
        s => ({ ...s, colors: colors }),
        () => this.props.setColors(colors)
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
        () => this.props.setColors(colors)
      );
      this.globalStyleResource.delete(id);
    }
  }

  render() {
    return (
      <Panel>
        {this.state.colors.length > 0 ? (
          this.state.colors.map(item => {
            return (
              <React.Fragment key={item.id}>
                <ControlGroup
                  key={item.id}
                  style={{
                    marginBottom: "10px"
                  }}
                >
                  <InputGroup
                    style={{
                      width: "140px"
                    }}
                    onChange={e => this.nameChange(e.target.value, item.id)}
                    value={item.name}
                  />

                  <Button onClick={e => this.deleteItem(item.id)}>
                    <Icon icon="trash"/>
                  </Button>
                  <Button
                    onClick={e => this.toggleColorPanel(item.id)}
                    style={{
                      backgroundColor: item.color,
                      width: "70px",
                      color: invert(item.colorPickedHex, {
                        black: "#000000",
                        white: "#FFFFFF",
                        threshold: 0.45
                      })
                    }}
                  >
                    {item.colorPickedHex}
                  </Button>
                </ControlGroup>
                <div
                  className={!item.colorPanelOpen ? " control-color-hide" : "control-color-open__global-colors"}
                >
                  <SketchPicker
                    presetColors={[]}
                    color={item.color}
                    onChange={color => this.colorChange(color, item.id)}
                    style={{
                      padding: 0,
                      boxShadow: "none"
                    }}
                  />
                </div>
              </React.Fragment>
            );
          })
        ) : (
          <div>Color list empty</div>
        )}
        <Divider/>
        <Button style={{ width: "100%" }} onClick={this.addItem}>
          ➕Add Color➕
        </Button>
      </Panel>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(GlobalColors);
