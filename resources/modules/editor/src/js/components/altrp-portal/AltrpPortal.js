import React, {Component} from "react";
import ReactDOM from "react-dom";
import { placeElement } from "../../helpers";

import "./altrp-portal.scss";

class AltrpPortal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      positions: placeElement(true)
    };

    this.object = React.createRef();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(this.props.childrenRef.current.offsetLeft)
  }

  render() {
    let position = {};

    if(this.props.childrenRef.current) {
      let boundingRect = this.props.childrenRef.current.getBoundingClientRect();
      console.log(boundingRect)
      if(this.object.current && this.props.childrenRef.current) {
        position = {
          left: boundingRect.x,
          top: boundingRect.height + boundingRect.top,
        };
        // position = placeElement(false, {
        //     target: this.props.childrenRef.current,
        //     object: this.object.current,
        //     place: "bottomLeft"
        // });
      }
    }

    console.log(position);
    let body = document.body;
    let iframe = document.getElementById("editorContent").contentWindow.document.body;

    let children = (
      <div className="altrp-portal" style={position} ref={this.object}>
        {
          this.props.children
        }
      </div>
    );

    return ReactDOM.createPortal(children, iframe || body)
  }
}

export default AltrpPortal
