import React, {Component} from "react";
import ReactDOM from "react-dom";
import "./altrp-portal.scss";
import {isEditor} from "../../../../../front-app/src/js/helpers";

class AltrpPortal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // position: {}
      renderComponent: false
    };

    this.object = React.createRef();
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.childrenRefs !== this.props.childrenRef && !prevState.renderComponent) {
      this.setState({ renderComponent: true })
    }
  }

  render() {
    let frame = document.body;

    if(isEditor()) {
      frame = document.getElementById("editorContent").contentWindow.document.body
    }
    let position = {};

    if(this.props.childrenRef) {
      let boundingRect = this.props.childrenRef.getBoundingClientRect();
      position = {
        left: boundingRect.x,
        top: boundingRect.height + boundingRect.top,
      };
    }

    let show = this.props.show || false;

    let children = (
      <div className={ this.props.id + "-altrp-portal altrp-portal"} style={{...position, display: show ? "block" : "none"}} ref={this.object}>
        {
          this.props.children
        }
      </div>
    );

    return this.state.renderComponent ? ReactDOM.createPortal(children, frame) : ""
  }
}

export default AltrpPortal
