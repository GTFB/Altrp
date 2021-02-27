import React, { Component } from "react";
import "./altrp-input.scss";
import AltrpInputFile from "./AltrpInputFile";
import { isValueMatchMask, validateEmail } from "../../../../../front-app/src/js/helpers";
const MaskedInput = React.lazy(() => import("react-text-mask"));

class AltrpInput extends Component {
  state = {
    isValid: true
  };

  checkValidity = mask => {
    if (! mask) return;
    let value = this.props.value.replace(/_/g, '');
    let isValid = ! ! (value.length && isValueMatchMask(value, mask));
    this.setState(state => ({...state, isValid}));
    _.set(this, 'props.element.maskIsValid', isValid);
  };

  /**
   *
   * @param {{}} prevProps
   * @param {{}} prevState
   */
  componentDidUpdate(prevProps, prevState){
    if((! this.props.value) && this.props.settings.content_mask && this.state.isValid){
      this.setState(state => ({...state, isValid: false}));
      _.set(this, 'props.element.maskIsValid', false);
    }
  }
  render() {
    const { isValid } = this.state;
    const { content_type, content_mask, mask_mismatch_message } = this.props.settings;
    const inputProps = {
      ...this.props,
    };
    switch (content_type) {
      case "file": {
        return <AltrpInputFile {...inputProps} />;
      }
    }
    if (content_mask) {
      let mask = content_mask.split("");
      mask = mask.map(m => {
        switch (m) {
          case "_": {
            return /\d/;
          }
          case "*": {
            return /\S/;
          }
          default:
            return m;
        }
      });
      inputProps.mask = mask;
      inputProps.guide = true;
      inputProps.onBlur = e => {
        this.props.onBlur(e);
        // if (mask_mismatch_message) {
        //   this.checkValidity(mask)
        // }
        this.checkValidity(mask)
      };
      inputProps.onChange = e => {
        this.props.onChange(e);
        if (! isValid) {
          this.checkValidity(mask)
        }
      };
      return (
        <React.Suspense fallback={<input {...this.props} />}>
          <MaskedInput {...inputProps} />
          {!isValid && mask_mismatch_message && <p className="mask-mismatch-message">{mask_mismatch_message}</p>}
          
        </React.Suspense>
      );
    }

    if (content_type === 'email' && mask_mismatch_message) {
      inputProps.onBlur = e => {
        this.props.onBlur(e);
        this.setState({ isValid: validateEmail(e.target.value) });
      };

      if (!isValid) {
        inputProps.onChange = e => {
          this.props.onChange(e);
          this.setState({ isValid: validateEmail(e.target.value) });
        };
      }
    }

    return <>
      <input {...inputProps} />
      {!isValid && content_type === 'email' && mask_mismatch_message &&
        <p className="mask-mismatch-message">{mask_mismatch_message}</p>}
    </>;
  }
}

export default AltrpInput;
