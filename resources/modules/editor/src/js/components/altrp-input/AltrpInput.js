import React, { Component } from "react";
import "./altrp-input.scss";
import AltrpInputFile from "./AltrpInputFile";
import { isValueMatchMask } from "../../../../../front-app/src/js/helpers";
const MaskedInput = React.lazy(() => import("react-text-mask"));

class AltrpInput extends Component {
  state = {
    isValid: true
  }

  checkValidity = mask => {
    if (!mask) return;
    if (this.props.value.length && !isValueMatchMask(this.props.value, mask)) {
      this.setState({ isValid: false });
    } else {
      this.setState({ isValid: true });
    }
  }

  render() {
    const { isValid } = this.state;
    const inputProps = { ...this.props };
    switch (this.props.settings.content_type) {
      case "file": {
        return <AltrpInputFile {...inputProps} />;
      }
    }
    if (this.props.settings.content_mask) {
      let mask = this.props.settings.content_mask.split("");
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
        this.checkValidity(mask);
      };
      inputProps.onChange = e => {
        this.props.onChange(e);
        if (!isValid) {
          this.checkValidity(mask);
        }        
      };

      return (
        <React.Suspense fallback={<input {...this.props} />}>
          {this.state.isValid}
          <MaskedInput {...inputProps} />
          {!isValid && <p className="mask-mismatch-message">{this.props.settings.mask_mismatch_message}</p>}
        </React.Suspense>
      );
    }
    return <input {...inputProps} />;
  }
}

export default AltrpInput;
