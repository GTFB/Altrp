import React, {Component} from "react";
//import ("./altrp-input.scss");
import AltrpInputFile from "./AltrpInputFile";
import validateEmail from "../../../../../front-app/src/js/functions/validateEmail";
import MaskedInput from "./MaskedInput";
import {addResponseData} from "../../../../../front-app/src/js/store/responses-storage/actions";

class AltrpInput extends Component {
  state = {
    isValid: true
  };

  constructor(props) {
    super(props);
    if (!altrpHelpers.isEditor()) {
      appStore.subscribe(this.onStoreUpdate)
    }
  }

  onStoreUpdate = () => {
    const {
      fieldId,
      formId,
      element,
    } = this.props;
    const res = altrpHelpers.getDataByPath(`altrpresponses.${formId}`)
    if (!res) {
      return
    }
    if(this.state.res === res){
      return;
    }
    let {
      mask_mismatch_message,
    } = this.props.settings;

    if (!mask_mismatch_message) {
      mask_mismatch_message = `{{altrpresponses.${formId}.error_fields.${fieldId}}}`
    }
    mask_mismatch_message = altrpHelpers.replaceContentWithData(mask_mismatch_message, element?.getCardModel()?.getData() || {})

    if (this.state.mask_mismatch_message === mask_mismatch_message) {
      return;
    }
    if(mask_mismatch_message){

      let {
        beh_response_error_show,
      } = this.props.settings;
      beh_response_error_show && this.props.element.updateErrorState(true)
    }
    this.setState(state => ({...state, mask_mismatch_message, res,}))

  }
  rightElement = React.createRef()

  maybeRenderLeftElement = () => {
    const {leftIcon} = this.props;

    if (leftIcon != null) {
      return leftIcon;
    }

    return undefined;
  }

  maybeRenderRightElement = () => {
    const {rightElement} = this.props;
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
    const {rightElementWidth} = this.state;

    if (this.rightElement.current != null) {
      const {clientWidth} = this.rightElement.current;
      // small threshold to prevent infinite loops
      if (rightElementWidth === undefined || Math.abs(clientWidth - rightElementWidth) > 2) {
        this.setState({rightElementWidth: clientWidth});
      }
    } else {
      this.setState({rightElementWidth: undefined});
    }
  }

  componentDidUpdate(prevProps) {
    const {leftElement, rightElement} = this.props;
    if (prevProps.leftElement !== leftElement || prevProps.rightElement !== rightElement) {
      this.updateInputWidth();
    }
  }

  isValidOnChange = e => {
    this.props.onChange(e);
    this.setState({isValid: validateEmail(e.target.value)});
  };

  onChange = e => {
    this.setState(state => ({...state,  mask_mismatch_message: ''}))
    this.props.onChange(e)

    let {
      beh_response_error_show,
    } = this.props.settings;
    beh_response_error_show && this.props.element.updateErrorState(false)

    const {
      beh_clear
    } = this.props.settings

    if (beh_clear) {
      const {
        fieldId,
        formId,
        element,
      } = this.props;
      let res = altrpHelpers.getDataByPath(`altrpresponses.${formId}`)
      if (!res) {
        return
      }
      res = {...res}
      if (res.error_fields?.[fieldId]){
        delete res.error_fields[fieldId]

      }

      appStore.dispatch(addResponseData(formId, res))

    }
  }

  render() {
    const {
      isValid,
      mask_mismatch_message,
    } = this.state;
    const {} = this.props;
    let {
      content_type,
      content_mask,
      beh_response_error_show,
    } = this.props.settings;

    const _inputProps = {
      ...this.props,
    };

    _inputProps.onChange = this.onChange

    const inputProps = {
      ...this.props,
      inputRef: this.props.inputRef,
    };
    delete _inputProps.leftIcon
    delete _inputProps.rightElement
    delete _inputProps.formId
    delete _inputProps.fieldId
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
            element={this.props.element}
            maybeRenderLeftElement={this.maybeRenderLeftElement}
            maybeRenderRightElement={this.maybeRenderRightElement}
          />
          {(!isValid || beh_response_error_show)
          && mask_mismatch_message && <p className="mask-mismatch-message">{mask_mismatch_message}</p>}
        </>
      );
    }


    if (this.state.rightElementWidth) {
      _inputProps.style = {
        paddingRight: `${this.state.rightElementWidth}px`
      }
    }
    delete _inputProps.inputRef
    delete _inputProps.popoverProps
    return <>

      <div className="bp3-input-group">
        {this.maybeRenderLeftElement()}
        <input {..._inputProps} ref={this.props.inputRef}/>
        {this.maybeRenderRightElement()}
      </div>
      {(!isValid || beh_response_error_show  || altrpHelpers.isEditor()) && mask_mismatch_message &&
      <p className="mask-mismatch-message">{mask_mismatch_message}</p>}
    </>;
  }
}

export default AltrpInput;
