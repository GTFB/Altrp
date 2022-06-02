import React, { Component } from "react";
import ("./altrp-input.scss");
import AltrpInputFile from "./AltrpInputFile";
import validateEmail from "../../../../../front-app/src/js/functions/validateEmail";
import MaskedInput from "./MaskedInput";

class AltrpInput extends Component {
  state = {
    isValid: true
  };

  // checkValidity = mask => {
  //   if (! mask) return;
  //   let value = this.props.value.replace(/_/g, '');
  //   let isValid = ! ! (value.length);
  //   this.setState(state => ({...state, isValid}));
  //   _.set(this, 'props.element.maskIsValid', isValid);
  // };

  // /**
  //  *
  //  * @param {{}} prevProps
  //  * @param {{}} prevState
  //  */
  // componentDidUpdate(prevProps, prevState){
  //   if((! this.props.value) && this.state.isValid){
  //     this.setState(state => ({...state, isValid: false}));
  //     _.set(this, 'props.element.maskIsValid', false);
  //   }
  // }
  render() {
    let Input = window.altrpLibs.Blueprint.InputGroup;
    const { isValid } = this.state;
    const { content_type, content_mask, mask_mismatch_message } = this.props.settings;
    const inputProps = {
      ...this.props,
      inputRef: this.props.inputRef,
    };
    switch (content_type) {
      case "file": {
        return <AltrpInputFile {...inputProps} />;
      }
    }
    if (content_mask) {
      return (<>
          <MaskedInput
            mask={content_mask}
            inputProps={inputProps}
            input={Input}
          />
          {!isValid && mask_mismatch_message && <p className="mask-mismatch-message">{mask_mismatch_message}</p>}
        </>
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
      <Input {...inputProps} />
      {!isValid && content_type === 'email' && mask_mismatch_message &&
      <p className="mask-mismatch-message">{mask_mismatch_message}</p>}
    </>;
  }
}

export default AltrpInput;
