import {controllerMapStateToProps} from "../../decorators/controller";
import React, { Component } from "react";
import { connect } from "react-redux";
import DynamicIcon from '../../../svgs/dynamic.svg'
import controllerDecorate from "../../decorators/controller";
import styled from "styled-components";

const Heading = styled.h1`
  ${(props) => props.small ? "font-size: 14px" : "font-size: 16px"}
`

class HeadingController extends Component {
  constructor(props) {
    super(props);
    controllerDecorate(this);
    let value = this.getSettings(this.props.controlId);
    if (value === null && this.props.default) {
      value = this.props.default;
    }
    value = value || '';
    this.state = {
      value,
      show: true
    };
  }

  getDefaultValue() {
    return '';
  }

  render() {

    if (this.state.show === false) {
      return '';
    }

    return <div className="controller-container controller-container_heading">
      <Heading small={this.props.small} className="control-heading">{this.props.label}</Heading>
    </div>
  }
}

function mapStateToProps(state) {
  return {
    currentElement: state.currentElement.currentElement,
    currentState: state.currentState,
    currentScreen: state.currentScreen
  };
}
export default connect(controllerMapStateToProps)(HeadingController);
