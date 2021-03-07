import React, {Component} from 'react';
import CircleIcon from "../../../.././../svgs/highlighted/circle.svg";
import CurlyIcon from "../../../.././../svgs/highlighted/curly.svg";
import UnderlineIcon from "../../../../../svgs/highlighted/underline.svg";
import DoubleIcon from "../../../../../svgs/highlighted/double.svg";
import DoubleUnderlineIcon from "../../../../../svgs/highlighted/double_underline.svg";
import UnderlineZigzagIcon from "../../../../../svgs/highlighted/underline_zigzag.svg";
import DiagonalIcon from "../../../../../svgs/highlighted/diagonal.svg";
import StrikethroughIcon from "../../../../../svgs/highlighted/strikethrough.svg";
import XIcon from "../../../../../svgs/highlighted/x.svg";
import "./highlighted.scss";

class Highlighted extends Component {
  render() {
    let svgClasses = "altrp-animating-highlighted-svg";
    let shape = "";
    const bringToFront = this.props.bringToFront || false;
    const roundedEdges = this.props.roundedEdges || false;

    if(roundedEdges) {
      svgClasses += " altrp-animating-highlighted-rounded-edges"
    }

    if(bringToFront) {
      svgClasses += " altrp-animating-highlighted-bring-to-front"
    }

    if(this.props.shape) {
      svgClasses += ` altrp-animating-highlighted-${this.props.shape}`

      switch (this.props.shape) {
        case "circle":
          shape = <CircleIcon/>
          break
        case "curly":
          shape = <CurlyIcon/>
          break
        case "underline":
          shape = <UnderlineIcon/>
          break
        case "double":
          shape = <DoubleIcon/>
          break
        case "doubleUnderline":
          shape = <DoubleUnderlineIcon/>
          break
        case "underlineZigzag":
          shape = <UnderlineZigzagIcon/>
          break
        case "diagonal":
          shape = <DiagonalIcon/>
          break
        case "strikethrough":
          shape = <StrikethroughIcon/>
          break
        case "x":
          shape = <XIcon/>
          break
      }
    } else {
      svgClasses += " altrp-animating-highlighted-circle"
    }

    return (
      <span className="altrp-animating-highlighted">
        <span className="altrp-animating-highlighted-text altrp-animating-text">
          {
            this.props.text
          }
        </span>
        <span className={svgClasses}>
          {
            shape
          }
        </span>
      </span>
    );
  }
}

export default Highlighted;
