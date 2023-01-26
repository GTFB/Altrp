import React, { Component } from "react";
import {
  ControlGroup,
  FormGroup,
  InputGroup,
  Button,
  MenuItem,
  NumericInput,
  HTMLSelect,
  Collapse, Alignment
} from "@blueprintjs/core";
import { Select } from "@blueprintjs/select";
import Resource from "../classes/Resource";
import { altrpFontsSet } from "../../../../front-app/src/js/constants/fonts";
import CONSTANTS from "../consts";
import mutate from 'dot-prop-immutable'
import updateCssVars from "../helpers/update-css-vars";

const familyOptions = _.toPairs(altrpFontsSet).map(([font, type]) => {
  return {
    label: font,
    value: font
  };
});

const SCREENS = [
  ...CONSTANTS.SCREENS,
  {
    icon: "2K+",
    name: "screen_2K+",
    id: 7,
    width: "100%",
    fullMediaQuery: "@media screen and (min-width: 1921px)",
    mediaQuery: "@media screen and (min-width: 1921px)"
  },
]
const screensOptions = SCREENS.map(s=>({
  value: s.name,
  label: s.name,
  icon: s.icon,
}))

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
class GlobalFontItem extends Component {
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
    this.onDeleteFont = this.onDeleteFont.bind(this);
    this.globalStyleResource = new Resource({
      route: "/admin/ajax/global_template_styles"
    });
  }

  /**
   *
   * @param {Event} event
   */
  nameChange(event) {
    this.setState(s => ({
      ...s,
      font: {
        ...s.font,
        name: event.target.value
      }
    }));
  }

  onSelect(event, _font) {

    let { font } = this.state;
    let { currentScreen } = this.props;
    if(currentScreen.name !== SCREENS[0].name){
      font = mutate.set(font, `${currentScreen.name}.label`, _font.label)
      font = mutate.set(font, `${currentScreen.name}.family`, _font.value)
    } else {
      font = mutate.set(font, 'label', _font.label)
      font = mutate.set(font, 'family', _font.value)
    }
    this.setState(s => ({ ...s, font}));

  }

  changeUnit(event) {
    const unit = event.target.value;
    let { font } = this.state;
    let { currentScreen } = this.props;
    if(currentScreen.name !== SCREENS[0].name){
      font = mutate.set(font, `${currentScreen.name}.sizeUnit`, unit)
    } else {
      font = mutate.set(font, 'sizeUnit', unit)
    }
    this.setState(s => ({ ...s, font}));
  }

  changeSize(value) {
    let { font } = this.state;
    let { currentScreen } = this.props;

    if(currentScreen.name !== SCREENS[0].name){
      font = mutate.set(font, `${currentScreen.name}.size`, value)
    } else {
      font = mutate.set(font, 'size', value)
    }
    this.setState(s => ({ ...s, font}));
  }

  changeLineHeight(value) {
    let { font } = this.state;
    let { currentScreen } = this.props;
    if(currentScreen.name !== SCREENS[0].name){
      font = mutate.set(font, `${currentScreen.name}.lineHeight`, value)
    } else {
      font = mutate.set(font, 'lineHeight', value)
    }
    this.setState(s => ({ ...s, font}));
  }

  changeSpacing(value) {
    const { currentScreen } = this.props;
    let { font } = this.state;
    if(currentScreen.name !== SCREENS[0].name){
      font = mutate.set(font, `${currentScreen.name}.spacing`, value)
    } else {
      font = mutate.set(font, 'spacing', value)
    }
    this.setState(s => ({ ...s, font}));
  }

  changeWeight(event) {
    const weight = event.target.value;

    const { currentScreen } = this.props;
    let { font } = this.state;
    if(currentScreen.name !== SCREENS[0].name){
      font = mutate.set(font, `${currentScreen.name}.weight`, weight)
    } else {
      font = mutate.set(font, 'weight', weight)
    }
    this.setState(s => ({ ...s, font}));
  }

  changeTransform(event) {
    const transform = event.target.value;

    const { currentScreen } = this.props;
    let { font } = this.state;
    if(currentScreen.name !== SCREENS[0].name){
      font = mutate.set(font, `${currentScreen.name}.transform`, transform)
    } else {
      font = mutate.set(font, 'transform', transform)
    }
    this.setState(s => ({ ...s, font}));
  }

  changeStyle(event) {
    const style = event.target.value;

    const { currentScreen } = this.props;
    let { font } = this.state;
    if(currentScreen.name !== SCREENS[0].name){
      font = mutate.set(font, `${currentScreen.name}.style`, style)
    } else {
      font = mutate.set(font, 'style', style)
    }
    this.setState(s => ({ ...s, font}));
  }

  changeDecoration(event) {
    const decoration = event.target.value;
    let { font } = this.state;
    let { currentScreen } = this.props;
    if(currentScreen.name !== SCREENS[0].name){
      font = mutate.set(font, `${currentScreen.name}.decoration`, decoration)
    } else {
      font = mutate.set(font, 'decoration', decoration)
    }
    this.setState(s => ({ ...s, font}));
  }

  onSaveFont(event) {
    event.preventDefault();
    const { font } = this.state;
    const send = {
      type: "font",
      settings: font
    };
    this.globalStyleResource.put(font.id, send).then(success => {
      this.props.editFont(font);
      this.setState(
        s => ({ ...s, edit: false }),
        () => this.props.updateAllTree(font)
      );
      updateCssVars()
    });

  }

  onDeleteFont(event) {
    const confirmation = window.confirm("Are you shure?");
    event.preventDefault();
    if (confirmation) {
      const { font } = this.state;
      this.globalStyleResource.delete(font.id).then(success => {
        this.props.deleteFont(font);
        // this.props.onSaveEffectClose();
        updateCssVars()
      });

    }
  }
  itemRenderer=(item, {handleClick}) => {
    const {currentScreen} = this.props
    return <MenuItem
      text={item.label}
      key={item.value}
      active={item.value === currentScreen.name }
      onClick={handleClick}
    />
  }
  onItemSelect=(item)=>{
    const currentScreen = SCREENS.find(s=>s.name === item.value)
    this.props.setScreen(currentScreen)
  }

  static fontProperties = [
    'decoration',
    'label',
    'family',
    'weight',
    'transform',
    'style',
    'lineHeight',
    'spacing',
    'size',
    'sizeUnit',
  ]
  static reverseScreens = SCREENS.slice().reverse()

  getFont =()=>{
    let { font } = this.state;
    const { currentScreen } = this.props;
    font= {...font}
    if(currentScreen.name !== SCREENS[0].name){
      const screenIndex = _.findIndex(GlobalFontItem.reverseScreens, s=>s.name === currentScreen.name)
      const screens = GlobalFontItem.reverseScreens.slice(screenIndex)
      GlobalFontItem.fontProperties.forEach(p=>{
        let value = _.get(font, `${currentScreen.name}.${p}`)
          screens.forEach(s=>{
            if(! value){
              value = _.get(font, `${s.name}.${p}`)

            }
          })

        font[p] = value ? value : font[p]

      })
    }
    return font
  }
  render() {
    const {currentScreen} = this.props
    const font  = this.getFont();
    const mgButton = this.state.edit ? '20px' : '0';

    return (
      <>
        {" "}
        {!this.props.isNew && (
          <Button
            style={{ width: "100%", marginBottom: mgButton }}
            onClick={e => this.setState(s => ({ ...s, edit: !s.edit }))}
          >
            {!this.props.isNew && font.name}
          </Button>
        )}
        {this.state.edit && (
          <form onSubmit={this.onSaveFont}>
            <div className="global-font__group">
              <label htmlFor="size">Screen</label>
              <ControlGroup fill={true} vertical={false}>
                <Select
                  value={currentScreen.name}
                  itemRenderer={this.itemRenderer}
                  items={screensOptions}
                  onItemSelect={this.onItemSelect}>

                  <Button
                    fill={true}
                    alignText={Alignment.LEFT}
                    text={currentScreen.name}
                    rightIcon="double-caret-vertical"
                  />
                </Select>
              </ControlGroup>
            </div>
            <div className="global-font__group">
              <label htmlFor="enter_for_name">Enter Font Name</label>
              <InputGroup
                required
                name="name"
                id="text-input"
                placeholder="Enter Font Name"
                defaultValue={font.name}
                onChange={this.nameChange}
              />
            </div>
            <div className="global-font__group">
              <label htmlFor="family">Family</label>
              <Select
                itemPredicate={(query, item) =>
                  item.label.indexOf(query) >= 0
                }
                activeItem={familyOptions.filter(item => item.value === font.family)[0]}
                matchTargetWidth
                itemRenderer={item => (
                  <MenuItem
                    text={item.label}
                    key={item.label}
                    active={item.value === font.family}
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
            <FormGroup>
              <button
                className="btn-global__fonts-delete"
                onClick={this.onDeleteFont}
                style={{ width: "100%" }}
              >
                Delete
              </button>
            </FormGroup>
          </form>
        )}
      </>
    );
  }
}

export default GlobalFontItem;
