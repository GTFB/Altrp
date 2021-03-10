import React, {Component} from "react";
import styled from "styled-components";

class HoverOverlay extends Component {
  render() {
    const basicComponent = styled(this.props.component)`
      transition: ${this.props.transition}ms;
    `;

    switch (this.props.type) {

    }
  }
}

export default HoverOverlay;
