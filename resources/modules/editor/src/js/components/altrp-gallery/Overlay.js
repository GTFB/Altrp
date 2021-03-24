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
      display: flex;
      flex-direction: column;
    `;

    const overlayContent = (
      <>
        {
          this.props.type !== "none" ? (
            <div className="altrp-gallery-overlay-title">
              {
                this.props.title
              }
            </div>
          ) : ""
        }
        {
          this.props.type === "titleAndDescription" ? (
            <div className="altrp-gallery-overlay-description">
              {
                this.props.description
              }
            </div>
          ) : ""
        }
      </>
    );

    const overlayProps = {
      className: "altrp-gallery-overlay"
    };

    if(this.props.animation && this.props.animation !== "none" && this.props.animationDuration) {
      console.log(this.props.animationDuration)
      return <HoverOverlay {...overlayProps} transition={this.props.animationDuration.size} type={this.props.animation} component={OverlayComponent}>
        {
          overlayContent
        }
      </HoverOverlay>;
    } else {
      return (
        <OverlayComponent {...overlayProps}>
          {
            overlayContent
          }
        </OverlayComponent>
      );
    }
  }
}

export default Overlay;
