import React from "react";
import styled from "styled-components";

class HoverImage extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {

    switch(this.props.type) {
      case "zoomIn":
        const ZoomIn = styled(this.props.component)`
          transition: transform ${this.props.transition}ms;
          &:hover {
            transform: scale(1.1);
          }
        `;
        return <ZoomIn/>
        break;
      case "zoomOut":
        const ZoomOut = styled(this.props.component)`
          transition: transform ${this.props.transition}ms;
          transform: scale(1.1);
          &:hover {
            transform: scale(1);
          }
        `;
        return <ZoomOut/>
        break;
      case "moveLeft":
        const MoveLeft = styled(this.props.component)`
          transition: transform ${this.props.transition}ms;
          transform: scale(1.2);
          &:hover {
            transform: translate(-8%, 0) scale(1.2);
          }
        `;
        return <MoveLeft/>
        break;
      case "moveRight":
        const MoveRight = styled(this.props.component)`
          transition: transform ${this.props.transition}ms;
          transform: scale(1.2);
          &:hover {
            transform: translate(8%, 0) scale(1.2);
          }
        `;
        return <MoveRight/>
        break;
      case "moveUp":
        const MoveUp = styled(this.props.component)`
          transition: transform ${this.props.transition}ms;
          transform: scale(1.2);
          &:hover {
            transform: translate(0, -8%) scale(1.2);
          }
        `;
        return <MoveUp/>
        break;
      case "moveDown":
        const MoveDown = styled(this.props.component)`
          transition: transform ${this.props.transition}ms;
          transform: scale(1.2);
          &:hover {
            transform: translate(0, 8%) scale(1.2);
          }
        `;
        return <MoveDown/>
        break;
      default:
        return ""
    }
  }

}

export default HoverImage;
