import React, { Component } from "react";
import {
  ControlGroup,
  FormGroup,
  InputGroup,
  Button,
  Slider,
  MenuItem,
  Collapse
} from "@blueprintjs/core";
import { Select } from "@blueprintjs/select";
import { SketchPicker } from "react-color";
import Resource from "../classes/Resource";

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

class GlobalEffectItem extends Component {
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
    this.onSaveEffect = this.onSaveEffect.bind(this);
    this.onDeleteEffect = this.onDeleteEffect.bind(this);
    this.globalStyleResource = new Resource({
      route: "/admin/ajax/global_template_styles"
    });
  }

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
        colorRGB: rgb
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
      settings: effect
    };
    this.globalStyleResource.put(effect.id, send).then(success => {
      this.props.editEffect(effect);
      this.setState(s => ({ ...s, edit: false }));
    });
  }
  onDeleteEffect(event) {
    const confirmation = window.confirm("Are you shure?");
    event.preventDefault();
    if (confirmation) {
      const { effect } = this.state;
      this.globalStyleResource.delete(effect.id).then(success => {
        this.props.deleteEffect(effect);
        // this.props.onSaveEffectClose();
      });
    }
  }

  render() {
    const { effect } = this.state;
    return (
      <React.Fragment>
        {!this.props.isNew && (
          <Button
            style={{ width: "100%" }}
            onClick={e => this.setState(s => ({ ...s, edit: !s.edit }))}
          >
            {!this.props.isNew && effect.name}
          </Button>
        )}
        <Collapse isOpen={this.state.edit}>
          <ControlGroup vertical>
            <form onSubmit={this.onSaveEffect}>
              <FormGroup label="Enter Effect Name">
                <InputGroup
                  required
                  name="name"
                  id="text-input"
                  placeholder="Enter Effect Name"
                  defaultValue={effect.name}
                  onChange={this.nameChange}
                />
              </FormGroup>

              <FormGroup label="Choose Effect Color">
                <SketchPicker
                  color={effect.color}
                  onChange={color => this.colorChange(color)}
                  style={{
                    padding: 0,
                    boxShadow: "none"
                  }}
                ></SketchPicker>
              </FormGroup>
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
              <FormGroup label="Position" inline={true}>
                <Select
                  activeItem={
                    typeOptions.filter(item => item.value == effect.type)[0]
                  }
                  itemRenderer={item => (
                    <MenuItem
                      key={item.key}
                      text={item.label}
                      onClick={e => this.onSelect(e, item.value)}
                    />
                  )}
                  items={typeOptions}
                  noResults={<MenuItem disabled={true} text="No results." />}
                >
                  <Button
                    text={
                      typeOptions.filter(item => item.value == effect.type)[0]
                        .label
                    }
                    rightIcon="double-caret-vertical"
                  />
                </Select>
              </FormGroup>
              <FormGroup>
                <Button
                  type="submit"
                  style={{ width: "100%", marginBottom: "5px" }}
                >
                  Edit
                </Button>
                <Button
                  intent="danger"
                  onClick={this.onDeleteEffect}
                  style={{ width: "100%" }}
                >
                  Delete
                </Button>
              </FormGroup>
            </form>
          </ControlGroup>
        </Collapse>
      </React.Fragment>
    );
  }
}

export default GlobalEffectItem;
