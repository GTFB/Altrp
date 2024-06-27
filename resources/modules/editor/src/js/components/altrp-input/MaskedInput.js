import React from "react";
// import { createMask, Masked } from "imask";
// import {isNumber} from "../../../../../altrp-reports/src/helpers/number";

function _parseDefaultValue(defaultValue, mask) {
  if(! defaultValue){
    return defaultValue
  }
  if(! mask){
    return defaultValue
  }
  let numbersLength = (mask.match(/0/g) || []).length;
  let stringLength = (mask.match(/_/g) || []).length;
  if(! stringLength && ! numbersLength){
    return mask
  }
  if(defaultValue.length === mask.length){
    let newStr = ''
    for(const idx in mask){
      if((mask[idx] === '_' || mask[idx] === '0') && defaultValue[idx]){
        newStr += defaultValue[idx]
      }
    }

    return  newStr
  }

  let newStr = ''
  for(const idx in mask){
    if(! defaultValue){
      break;
    }
    if((mask[idx] === '_')){
      newStr += defaultValue[0]
      defaultValue = defaultValue.substring(1)
    } else if(mask[idx] === '0' && ! _.isNaN(Number(defaultValue[0]))){
      newStr += defaultValue[0]
      defaultValue = defaultValue.substring(1)
    } else if(mask[idx] === '0'){
      defaultValue = defaultValue.substring(1)
    }
  }
  return  newStr
}

class MaskedInput extends React.Component {
  constructor(props) {
    super(props);

    let {content_default_value : defaultValue} = props.inputProps.settings
    defaultValue = window.altrpHelpers.replaceContentWithData(defaultValue, this.props.element.getCardModel())
    const value = _parseDefaultValue(defaultValue, _.clone(props.inputProps.settings.content_mask))

    this.state = {
      previewValue: defaultValue ? defaultValue : '',
      value,
      defaultValue,
      max: 0,
      type: [],
      mask: _.clone(props.inputProps.settings.content_mask)
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleBackspace = this.handleBackspace.bind(this);
  }

  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   if(prevProps.inputProps.type !== this.props.inputProps.type) {
  //     this.maskedValue.updateValue()
  //   }
  // }

  componentDidMount() {

    // this.setState((s) => ({
    //   ...s,
    //   mask: this.props.mask
    // }))
    //
    this.updateMask()
  }

  updateMask = ()=> {
    const mask = this.state.mask;
    const value = this.state.value;



    // let mask = "+{7}(000)000-00-00"

    // const findDefaultText = RegExp("[^{}]*", "gm");
    //
    // mask = findDefaultText.exec(mask);
    let previewValue = "";
    let continueSplit = false;
    const split = mask.split("");
    let valueIndex = 0;
    let maxLength = 0;
    let type = "";
    let numbersLength = (mask.match(/0/g) || []).length;
    let stringLength = (mask.match(/_/g) || []).length;
    maxLength += numbersLength + stringLength;

    if(stringLength > 0) {
      type = "string"
    } else if(numbersLength > 0) {
      type = "number"
    }

    if(value) {
      for(const char of split) {
        const currentValueChar = value[valueIndex]

        if(!currentValueChar && char !== "") {
          break;
        }

        if(char === "}") {
          continueSplit = false
        }

        if(continueSplit) {
          previewValue += char;
          continue;
        }

        switch (char) {
          case "0":

            if(currentValueChar && !isNaN(currentValueChar)) {
              previewValue += currentValueChar
              valueIndex = valueIndex + 1;
            }
            break
          case "_":
            if(currentValueChar) {
              previewValue += currentValueChar
              valueIndex = valueIndex + 1;
            }
            break
          default:
            previewValue += char
        }
      }
    }

    this.setState((s) => ({
      ...s,
      previewValue,
      max: maxLength,
      type
    }))

    return previewValue


    // \[([^\][]*)] find []
  }

  handleChange(e) {
    if(this.state.value?.length < this.state.max) {
      let value = e.target.value;
      const newChar = value.slice(-1);

      switch (this.state.type) {
        case "number":
          if(!isNaN(newChar) && newChar !== ' ') {
            this.setState((s) => ({
              ...s,
              value: s.value + newChar
            }), () => {
              this.updateMask()
              this.props.inputProps.onChange({ target: {value: this.state.value}})
            })
          }
          break
        default:
          this.setState((s) => ({
            ...s,
            value: s.value + newChar
          }), () => {
            this.updateMask()
            this.props.inputProps.onChange({ target: {value: this.state.value}})
          })

      }
    }
  }

  handleBackspace(e) {
    if(e.key === "Backspace") {
      this.setState((s) => ({
        ...s,
        value: s.value.slice(0, -1)
      }), () => {
        this.updateMask()
      })

      e.preventDefault()
    }
    this.props.inputProps.onKeyDown(e)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const maskSetting = this.props.inputProps.settings.content_mask;

    let {content_default_value : defaultValue} = this.props.inputProps.settings

    defaultValue = window.altrpHelpers.replaceContentWithData(defaultValue, this.props.element.getCardModel())


    if (defaultValue !== this.state.defaultValue) {
      const value = _parseDefaultValue(defaultValue, _.clone(this.props.inputProps.settings.content_mask))

      this.setState(s => ({
        ...s,
        previewValue: defaultValue ? defaultValue : '',
        value,
        defaultValue,
      }))
    }

    if(this.state.mask !== maskSetting) {
      this.setState((s) => ({
        ...s,
        mask: maskSetting,
        previewValue: "",
        value: "",
        type: [],
        max: 0,
      }))
    }
  }
  render() {

    return (
      <div className="bp3-input-group">
        {this.props.maybeRenderLeftElement()}
        <input
          {...this.props.inputProps}
          onChange={this.handleChange}
          value={this.state.previewValue || this.state.mask.replace(/([_0])/g, ' ')}
          onKeyDown={this.handleBackspace}
        />
        {this.props.maybeRenderRightElement()}
      </div>
    )
  }
}

export default MaskedInput
