import React, {Component} from "react";
import styled from "styled-components";
import HoverOverlay from "../animations/overlay/HoverOverlay";

class Overlay extends Component {
  render() {
    let OverlayComponent = styled.div`
      position: absolute;
      height: 100%;
      width: 100%;
      left: 0;
      top: 0;
    `;

    if(this.props.animation && this.props.animation !== "none") {
      OverlayComponent = <HoverOverlay transition={this.props.transition.size} type={this.props.animation} component={OverlayComponent}/>;
    };

    return (
      <OverlayComponent className="altrp-gallery-overlay"></OverlayComponent>
    );
  }
}

export default Overlay;
