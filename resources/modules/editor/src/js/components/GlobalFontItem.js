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
import { altrpFontsSet } from "../../../../front-app/src/js/constants/fonts";

const familyOptions = _.toPairs(altrpFontsSet).map(([font, type]) => {
  return {
    label: font,
    value: font
  };
});

class GlobalFontItem extends Component {
  constructor(props) {
    super(props);

    this.defaultValues = {
      decoration: "",
      family: "roboto",
      lineHeight: 1,
      size: 16,
      spacing: 0,
      weight: "normal",
      sizeUnit: "",
      style: "",
      transform: "",
      weight: ""
    };

    const { isNew, font } = props;
    this.state = {
      font: isNew ? this.defaultValues : font,
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

  /**
   *
   * @param {Event} event
   */
  nameChange(event) {
    const string = event.target.font;
    this.setState(s => ({
      ...s,
      effect: {
        ...s.font,
        name: string
      }
    }));
  }

  onSlide(value, setting) {
    const { font } = this.state;
    font[setting] = value;
    this.setState(s => ({ ...s, font: font }));
  }

  onSelect(event, value) {
    this.setState(s => ({ ...s, effect: { ...s.font, type: value } }));
  }

  onSaveFont(event) {
    event.preventDefault();
    const { font } = this.state;
    const send = {
      type: "effect",
      settings: font
    };
    this.globalStyleResource.put(font.id, send).then(success => {
      this.props.editEffect(font);
      this.setState(
        s => ({ ...s, edit: false }),
        () => this.props.updateAllTree(font)
      );
    });
  }

  onDeleteFont(event) {
    const confirmation = window.confirm("Are you shure?");
    event.preventDefault();
    if (confirmation) {
      const { font } = this.state;
      this.globalStyleResource.delete(font.id).then(success => {
        this.props.deleteEffect(font);
        // this.props.onSaveEffectClose();
      });
    }
  }

  render() {
    const { font } = this.state;
    return (
      <React.Fragment>
        {!this.props.isNew && (
          <Button
            style={{ width: "100%" }}
            onClick={e => this.setState(s => ({ ...s, edit: !s.edit }))}
          >
            {!this.props.isNew && font.name}
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
                  defaultValue={font.name}
                  onChange={this.nameChange}
                />
              </FormGroup>

              <FormGroup label="Family" inline={true}>
                <Select
                  activeItem={
                    familyOptions.filter(item => item.value == effect.type)[0]
                  }
                  itemRenderer={item => (
                    <MenuItem
                      key={item.key}
                      text={item.label}
                      onClick={e => this.onSelect(e, item.value)}
                    />
                  )}
                  items={familyOptions}
                  noResults={<MenuItem disabled={true} text="No results." />}
                >
                  <Button
                    text={
                      familyOptions.filter(item => item.value == font.type)[0]
                        .label
                    }
                    rightIcon="double-caret-vertical"
                  />
                </Select>
              </FormGroup>
              <FormGroup label="Choose Effect Color">
                <SketchPicker
                  presetColors={[]}
                  color={font.color}
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
                  value={font.blur}
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

export default GlobalFontItem;
