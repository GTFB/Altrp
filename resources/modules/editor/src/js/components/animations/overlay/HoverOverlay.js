import React, {Component} from "react";
import ("../../../../sass/altrp-hover-overlay.scss");
import styled from "styled-components";

class HoverOverlay extends Component {
  render() {
    let classNames = this.props.className ? this.props.className : "";

    switch (this.props.type) {
      case "slideInRight":
        classNames += " altrp-hover-overlay-slide-in-right";
        break;
      case "slideInLeft":
        classNames += " altrp-hover-overlay-slide-in-left";
        break;
      case "slideInUp":
        classNames += " altrp-hover-overlay-slide-in-up";
        break;
      case "slideInDown":
        classNames += " altrp-hover-overlay-slide-in-down";
        break;
      case "zoomIn":
        classNames += " altrp-hover-overlay-zoom-in";
        break;
      case "zoomOut":
        classNames += " altrp-hover-overlay-zoom-out";
        break;
      case "fadeIn":
        classNames += " altrp-hover-overlay-fade-in";
        break;
    }

    const BasicComponent = styled(this.props.component)`
      transition: ${this.props.transition}ms;
    `;

    return <BasicComponent className={classNames} >
      {
        this.props.children
      }
    </BasicComponent>
  }
}

export default HoverOverlay;
