import React, { Component } from "react";
import {
  ControlGroup,
  FormGroup,
  InputGroup,
  Button,
  NumericInput,
  MenuItem,
  HTMLSelect, Alignment
} from "@blueprintjs/core";
import { Select } from "@blueprintjs/select";
import Resource from "../classes/Resource";
import { altrpFontsSet } from "../../../../front-app/src/js/constants/fonts";
import updateCssVars from "../helpers/update-css-vars";

const familyOptions = _.toPairs(altrpFontsSet).map(([font, type]) => {
  return {
    label: font,
    value: font
  };
});

const units = ["px", "em", "rem", "%", "vw", "vh"];

const weightOptions = [
  {
    value: "100",
    label: "100"
  },
  {
    value: "200",
    label: "200"
  },
  {
    value: "300",
    label: "300"
  },
  {
    value: "400",
    label: "400"
  },
  {
    value: "500",
    label: "500"
  },
  {
    value: "600",
    label: "600"
  },
  {
    value: "700",
    label: "700"
  },
  {
    value: "800",
    label: "800"
  },
  {
    value: "900",
    label: "900"
  },
  {
    value: "bold",
    label: "bold"
  },
  {
    value: "normal",
    label: "normal"
  },
  {
    value: "bolder",
    label: "bolder"
  },
  {
    value: "lighter",
    label: "lighter"
  }
];
const transformOptions = [
  {
    value: "none",
    label: "default",
    key: 0
  },
  {
    value: "capitalize",
    label: "capitalize",
    key: 1
  },
  {
    value: "uppercase",
    label: "uppercase",
    key: 2
  },
  {
    value: "lowercase",
    label: "lowercase",
    key: 3
  }
];
const styleOptions = [
  {
    value: "normal",
    label: "normal",
    key: 0
  },
  {
    value: "italic",
    label: "italic",
    key: 1
  },
  {
    value: "oblique",
    label: "oblique",
    key: 2
  }
];
const decorationOptions = [
  {
    value: "none",
    label: "none",
    key: 0
  },
  {
    value: "underline",
    label: "underline",
    key: 1
  },
  {
    value: "overline",
    label: "overline",
    key: 3
  },
  {
    value: "line-through",
    label: "line-through",
    key: 4
  }
];
class GlobalFontItemAdd extends Component {
  constructor(props) {
    super(props);
    this.defaultValues = {
      name: "",
      decoration: "",
      family: "Roboto",
      lineHeight: 1,
      size: 16,
      spacing: 0,
      sizeUnit: "px",
      weight: "normal",
      style: "",
      transform: ""
    };
    const { isNew, font } = props;
    this.state = {
      font: isNew ? this.defaultValues : font,
      edit: false
    };
    this.nameChange = this.nameChange.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.changeUnit = this.changeUnit.bind(this);
    this.changeSize = this.changeSize.bind(this);
    this.changeWeight = this.changeWeight.bind(this);
    this.changeTransform = this.changeTransform.bind(this);
    this.changeStyle = this.changeStyle.bind(this);
    this.changeDecoration = this.changeDecoration.bind(this);
    this.changeLineHeight = this.changeLineHeight.bind(this);
    this.changeSpacing = this.changeSpacing.bind(this);
    this.onSaveFont = this.onSaveFont.bind(this);
    this.globalStyleResource = new Resource({
      route: "/admin/ajax/global_template_styles"
    });
  }
  /**
   *
   * @param {Event} event
   */
  nameChange(event) {
    const string = event.target.value;
    this.setState(s => ({
      ...s,
      font: {
        ...s.font,
        name: string
      }
    }));
  }

  onSelect(event, font) {
    this.setState(s => ({
      ...s,
      font: { ...s.font, family: font.value, label: font.label }
    }));
  }

  onSaveFont(event) {
    event.preventDefault();
    const { font } = this.state;
    const send = {
      type: "font",
      settings: JSON.stringify(font)
    };
    this.globalStyleResource.post(send).then(success => {
      const font = {
        id: success.id,
        guid: success.guid,
        _type: 'font',
        ...success.settings
      };
      this.props.addFont(font);
      this.props.onSaveFontClose();
      updateCssVars()
    });

  }

  changeUnit(event) {
    const unit = event.target.value;
    this.setState(s => ({ ...s, font: { ...s.font, sizeUnit: unit } }));
  }

  changeSize(value) {
    this.setState(s => ({ ...s, font: { ...s.font, size: value } }));
  }

  changeLineHeight(value) {
    this.setState(s => ({ ...s, font: { ...s.font, lineHeight: value } }));
  }

  changeSpacing(value) {
    this.setState(s => ({ ...s, font: { ...s.font, spacing: value } }));
  }

  changeWeight(event) {
    const weight = event.target.value;
    this.setState(s => ({ ...s, font: { ...s.font, weight: weight } }));
  }

  changeTransform(event) {
    const transform = event.target.value;
    this.setState(s => ({ ...s, font: { ...s.font, transform: transform } }));
  }

  changeStyle(event) {
    const style = event.target.value;
    this.setState(s => ({ ...s, font: { ...s.font, style: style } }));
  }

  changeDecoration(event) {
    const decoration = event.target.value;
    this.setState(s => ({ ...s, font: { ...s.font, decoration: decoration } }));
  }

  render() {
    const { font } = this.state;
    return (
      <>
        <form onSubmit={this.onSaveFont}>
          <div className="global-font__group">
            <label htmlFor="enter_for_name">Enter Font Name</label>
            <InputGroup
              required
              name="name"
              id="text-input"
              placeholder="Enter Font Name"
              defaultValue={font?.name || ""}
              onChange={this.nameChange}
            />
          </div>
          <div className="global-font__group">
            <label htmlFor="family">Family</label>
            <Select
              matchTargetWidth
              itemPredicate={(query, item) => item.label.indexOf(query) >= 0}
              activeItem={
                familyOptions.filter(item => item.value === font.family)[0]
              }
              itemRenderer={item => (
                <MenuItem
                  text={item.label}
                  key={item.label}
                  active={item.value === this.state.font.family}
                  onClick={e => this.onSelect(e, item)}
                />
              )}
              items={familyOptions}
              noResults={<MenuItem disabled={true} text="No results." />}
            >
              <Button
                fill={true}
                alignText={Alignment.LEFT}
                text={familyOptions.filter(item => item.value === font.family)[0].label}
                rightIcon="double-caret-vertical"
              />
            </Select>
          </div>
          <div className="global-font__group">
            <label htmlFor="size">Size</label>
            <ControlGroup fill={true} vertical={false}>
              <NumericInput
                style={{
                  width: "100px"
                }}
                value={font.size}
                placeholder="Enter size"
                min={0}
                max={200}
                stepSize={0.1}
                onValueChange={this.changeSize}
              />
              <HTMLSelect
                onChange={this.changeUnit}
                options={units}
                defaultChecked={font.sizeUnit}
                value={font.sizeUnit}
              />
            </ControlGroup>
          </div>
          <div className="global-font__group">
            <label htmlFor="weight">Weight</label>
            <ControlGroup fill={true} vertical={false}>
              <HTMLSelect
                onChange={this.changeWeight}
                options={weightOptions}
                defaultChecked={font.weight}
                value={font.weight}
              />
            </ControlGroup>
          </div>
          <div className="global-font__group">
            <label htmlFor="transform">Transform</label>
            <ControlGroup fill={true} vertical={false}>
              <HTMLSelect
                onChange={this.changeTransform}
                options={transformOptions}
                defaultChecked={font.transform}
                value={font.transform}
              />
            </ControlGroup>
          </div>
          <div className="global-font__group">
            <label htmlFor="style">Style</label>
            <ControlGroup fill={true} vertical={false}>
              <HTMLSelect
                onChange={this.changeStyle}
                options={styleOptions}
                defaultChecked={font.style}
                value={font.style}
              />
            </ControlGroup>
          </div>
          <div className="global-font__group">
            <label htmlFor="decoration">Decoration</label>
            <ControlGroup fill={true} vertical={false}>
              <HTMLSelect
                onChange={this.changeDecoration}
                options={decorationOptions}
                defaultChecked={font.decoration}
                value={font.decoration}
              />
            </ControlGroup>
          </div>
          <div className="global-font__group numeric_fix">
            <label htmlFor="line_height">Line height</label>
            <ControlGroup fill={true} vertical={false}>
              <NumericInput
                value={font.lineHeight}
                placeholder="Enter line height"
                stepSize={0.1}
                min={0.1}
                max={10}
                onValueChange={this.changeLineHeight}
              />
            </ControlGroup>
          </div>
          <div className="global-font__group numeric_fix">
            <label htmlFor="letter_spacing">Letter spacing</label>
            <ControlGroup fill={true} vertical={false}>
              <NumericInput
                value={font.spacing}
                placeholder="Enter letter spacing"
                stepSize={0.1}
                min={-5}
                max={10}
                onValueChange={this.changeSpacing}
              />
            </ControlGroup>
          </div>
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

export default GlobalFontItemAdd;
