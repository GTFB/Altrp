import React, { Component } from "react";
//import ("./altrp-input.scss");
import AltrpInputFile from "./AltrpInputFile";
import validateEmail from "../../../../../front-app/src/js/functions/validateEmail";
import MaskedInput from "./MaskedInput";

class AltrpInput extends Component {
  state = {
    isValid: true
  };

  rightElement = React.createRef()
  maybeRenderLeftElement() {
    const {  leftIcon } = this.props;

    if (leftIcon != null) {
      return leftIcon;
    }

    return undefined;
  }
  maybeRenderRightElement() {
    const { rightElement } = this.props;
    if (rightElement == null) {
      return undefined;
    }
    return (
      <span className="bp3-input-action" ref={this.rightElement}>
                {rightElement}
            </span>
    );
  }
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

  componentDidMount() {
    this.updateInputWidth();
  }

  updateInputWidth() {
    const {  rightElementWidth } = this.state;

    if (this.rightElement.current != null) {
      const { clientWidth } = this.rightElement.current;
      // small threshold to prevent infinite loops
      if (rightElementWidth === undefined || Math.abs(clientWidth - rightElementWidth) > 2) {
        this.setState({ rightElementWidth: clientWidth });
      }
    } else {
      this.setState({ rightElementWidth: undefined });
    }
  }
  componentDidUpdate(prevProps) {
    const { leftElement, rightElement } = this.props;
    if (prevProps.leftElement !== leftElement || prevProps.rightElement !== rightElement) {
      this.updateInputWidth();
    }
  }

  render() {
    const { isValid } = this.state;
    const { content_type, content_mask, mask_mismatch_message } = this.props.settings;
    const _inputProps = {
      ...this.props,
    };
    const inputProps = {
      ...this.props,
      inputRef: this.props.inputRef,
    };
    delete _inputProps.leftIcon
    delete _inputProps.rightElement
    switch (content_type) {
      case "file": {
        return <AltrpInputFile {...inputProps} />;
      }
    }
    _inputProps.className += ' bp3-input'

    if (content_mask) {
      return (<>
          <MaskedInput
            mask={content_mask}
            inputProps={_inputProps}
            input={props=>{
              return<div className="bp3-input-group">
                {this.maybeRenderLeftElement()}
                <input {..._inputProps} {...props} ref={this.props.inputRef}/>
                {this.maybeRenderRightElement()}
              </div>}
            }
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

    if(this.state.rightElementWidth){
      _inputProps.style= {
        paddingRight: `${this.state.rightElementWidth}px`
      }
    }
    return <>

    <div className="bp3-input-group">
      {this.maybeRenderLeftElement()}
      <input {..._inputProps} ref={this.props.inputRef}/>
      {this.maybeRenderRightElement()}
    </div>
      {!isValid && content_type === 'email' && mask_mismatch_message &&
      <p className="mask-mismatch-message">{mask_mismatch_message}</p>}
    </>;
  }
}

export default AltrpInput;
