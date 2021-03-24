import React from "react";
import styled from "styled-components";
import "../../../../sass/altrp-hover-image.scss";

class HoverImage extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    let classNames = this.props.className ? this.props.className : "";

    switch (this.props.type) {
      case "zoomIn":
        classNames += " altrp-animation-img-zoom-in";
        break;
      case "zoomOut":
        classNames += " altrp-animation-img-zoom-out";
        break;
      case "moveLeft":
        classNames += " altrp-animation-img-move-left";
        break;
      case "moveRight":
        classNames += " altrp-animation-img-move-right";
        break;
      case "moveUp":
        classNames += " altrp-animation-img-move-up";
        break;
      case "moveDown":
        classNames += " altrp-animation-img-move-down"
        break;
      default:
        return "altrp-animation-img-zoom-in"
    }

    const BasicComponent = styled(this.props.component)`
      transition: ${this.props.transition}ms;
    `;

    return <BasicComponent className={classNames}/>
  }

}

export default HoverImage;
