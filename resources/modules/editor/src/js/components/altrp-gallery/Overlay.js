import React, {Component} from "react";
import styled from "styled-components";
import HoverOverlay from "../animations/overlay/HoverOverlay";

class Overlay extends Component {
  render() {
    const OverlayComponent = styled.div`
      position: absolute;
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
    `;

    const ContentComponent = styled.div`
      z-index: 6;
    `;

    const BackgroundComponent = styled.div`
      position: absolute;
      height: 100%;
      width: 100%;
      z-index: 4;
      left: 0;
      top: 0;
    `;

    const overlayContent = (
      <>
        {
          this.props.type !== "none" ? (
            <ContentComponent className="altrp-gallery-overlay-title">
              {
                this.props.title
              }
            </ContentComponent>
          ) : ""
        }
        {
          this.props.type === "titleAndDescription" ? (
            <ContentComponent className="altrp-gallery-overlay-description">
              {
                this.props.description
              }
            </ContentComponent>
          ) : ""
        }
        <BackgroundComponent className="altrp-gallery-overlay-bg"/>
      </>
    );

    const overlayProps = {
      className: "altrp-gallery-overlay"
    };

    if(this.props.animation && this.props.animation !== "none" && this.props.animationDuration) {
      console.log(this.props.animationDuration)
      return <HoverOverlay {...overlayProps} transition={this.props.animationDuration || 800} type={this.props.animation} component={OverlayComponent}>
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
