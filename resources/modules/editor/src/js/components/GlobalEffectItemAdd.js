import React, { Component } from "react";
import {
  ControlGroup,
  FormGroup,
  InputGroup,
  Button,
  Slider,
  MenuItem, Alignment
} from "@blueprintjs/core";
import { Select } from "@blueprintjs/select";
import { SketchPicker } from "react-color";
import Resource from "../classes/Resource";
import GlobalPresetColors from "./controllers/GlobalPresetColors";

const typeOptions = [
  {
    value: " ",
    label: "outline",
    key: 0
  },
  {
    value: "inset",
    label: "Inset",
    key: 1
  }
];

class GlobalEffectItemAdd extends Component {
  constructor(props) {
    super(props);
    this.defaultValues = {
      blur: 0,
      color: `rgba(255, 255, 255, 1)`,
      colorPickedHex: "#FFFFFF",
      colorRGB: {
        r: 255,
        g: 255,
        b: 255,
        a: 1
      },
      globalColor: "",
      horizontal: 0,
      opacity: 1,
      spread: 0,
      type: " ",
      vertical: 0,
      name: ""
    };
    const { isNew, effect } = props;
    this.state = {
      effect: isNew ? this.defaultValues : effect,
      edit: false
    };
    this.nameChange = this.nameChange.bind(this);
    this.colorChange = this.colorChange.bind(this);
    this.onSlide = this.onSlide.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.globalColor = this.globalColor.bind(this);
    this.onSaveEffect = this.onSaveEffect.bind(this);
    this.globalStyleResource = new Resource({
      route: "/admin/ajax/global_template_styles"
    });
  }

  globalColor = value => {
    const guid = value.guid;
    const rgba = `rgba(${value.colorRGB.r}, ${value.colorRGB.g}, ${value.colorRGB.b}, ${value.colorRGB.a})`;
    const hex = value.colorPickedHex;
    const rgb = value.colorRGB;
    this.setState(s => ({
      ...s,
      effect: {
        ...s.effect,
        color: rgba,
        colorPickedHex: hex,
        colorRGB: rgb,
        globalColor: guid
      }
    }));
  };

  colorChange = value => {
    const rgba = `rgba(${value.rgb.r}, ${value.rgb.g}, ${value.rgb.b}, ${value.rgb.a})`;
    const hex = value.hex;
    const rgb = value.rgb;
    this.setState(s => ({
      ...s,
      effect: {
        ...s.effect,
        color: rgba,
        colorPickedHex: hex,
        colorRGB: rgb,
        globalColor: ""
      }
    }));
  };
  /**
   *
   * @param {Event} event
   */
  nameChange(event) {
    const string = event.target.value;
    this.setState(s => ({
      ...s,
      effect: {
        ...s.effect,
        name: string
      }
    }));
  }

  onSlide(value, setting) {
    const { effect } = this.state;
    effect[setting] = value;
    this.setState(s => ({ ...s, effect: effect }));
  }

  onSelect(event, value) {
    this.setState(s => ({ ...s, effect: { ...s.effect, type: value } }));
  }

  onSaveEffect(event) {
    event.preventDefault();
    const { effect } = this.state;
    const send = {
      type: "effect",
      settings: JSON.stringify(effect)
    };
    this.globalStyleResource.post(send).then(success => {
      const effect = {
        id: success.id,
        guid: success.guid,
        ...success.settings
      };
      this.props.addEffect(effect);
      this.props.onSaveEffectClose();
    });
  }

  render() {
    const { effect } = this.state;
    return (
      <>
        <form onSubmit={this.onSaveEffect}>
          <div className="global-effect__group">
            <label htmlFor="enter_effect_name">Enter Effect Name</label>
            <InputGroup
              required
              name="name"
              id="text-input"
              placeholder="Enter Effect Name"
              defaultValue={effect.name}
              onChange={this.nameChange}
            />
          </div>

          <div className="global-effect__group">
            <label htmlFor="choose_effect_color">Choose Effect Color</label>
            <div
              className={"control-color-colorPicker"}
              style={{
                position: "relative",
                marginTop: `0`,
              }}
            >
              <SketchPicker
                color={effect.color}
                presetColors={[]}
                onChange={color => this.colorChange(color)}
                style={{
                  padding: 0,
                  boxShadow: "none"
                }}
              />
              <GlobalPresetColors
                changeValue={color => {
                  this.globalColor(color);
                  // this._changeValue(color);
                  // this.setState(state=>({...state, colorRGB: color.colorRGB}))
                }}
              />
            </div>
          </div>

          <div className="global-effect__group">
            <label htmlFor="position">Position</label>
            <Select
              matchTargetWidth
              activeItem={
                typeOptions.filter(item => item.value === effect.type)[0]
              }
              itemRenderer={item => (
                <MenuItem
                  key={item.key}
                  active={item.value === this.state.effect.type}
                  text={item.label}
                  onClick={e => this.onSelect(e, item.value)}
                />
              )}
              items={typeOptions}
              noResults={<MenuItem disabled={true} text="No results." />}
            >
              <Button
                fill={true}
                alignText={Alignment.LEFT}
                text={typeOptions.filter(item => item.value === effect.type)[0].label}
                rightIcon="double-caret-vertical"
              />
            </Select>
          </div>

          <FormGroup label="Blur">
            <Slider
              onChange={value => this.onSlide(value, "blur")}
              min={0}
              max={100}
              stepSize={1}
              labelStepSize={10}
              showTrackFill={true}
              value={effect.blur}
            />
          </FormGroup>
          <FormGroup label="Horizontal displacement">
            <Slider
              onChange={value => this.onSlide(value, "horizontal")}
              min={-100}
              max={100}
              stepSize={1}
              labelStepSize={25}
              value={effect.horizontal}
              showTrackFill={true}
            />
          </FormGroup>
          <FormGroup label="Vertical displacement">
            <Slider
              onChange={value => this.onSlide(value, "vertical")}
              min={-100}
              max={100}
              stepSize={1}
              labelStepSize={25}
              value={effect.vertical}
              showTrackFill={true}
            />
          </FormGroup>
          <FormGroup label="Spread">
            <Slider
              onChange={value => this.onSlide(value, "spread")}
              min={-100}
              max={100}
              stepSize={1}
              labelStepSize={25}
              value={effect.spread}
              showTrackFill={true}
            />
          </FormGroup>

          <FormGroup>
            <button className="btn-global__fonts-save" type="submit" style={{ width: "100%" }}>
              Save
            </button>
          </FormGroup>
        </form>
      </>
    );
  }
}

export default GlobalEffectItemAdd;
