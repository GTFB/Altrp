import React, {Component} from 'react';
import {isEditor} from "../../../../../front-app/src/js/helpers";
import "../../../sass/altrp-offcanvas.scss";

class OffcanvasWidget extends Component {
  constructor(props) {
    super(props);

    this.state = {
      settings: props.element.getSettings(),
      show: false
    };

    props.element.component = this;
    if (window.elementDecorator) {
      window.elementDecorator(this);
    }

    this.offcanvasRef = React.createRef();
    this.offcanvasContentRef = React.createRef();

    this.fireAction = this.fireAction.bind(this);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this)
  }

  fireAction(action) {
    console.log(action);
    if (typeof this.offcanvasRef.current !== undefined) {
      this.show()
    }
    else {
      alert('ERROR, NOT FOUND ACTION');
    }
  }

  show() {
    this.setState({
      show: true
    });
    document.addEventListener("click", this.hide)
  }

  hide(e) {
    if (e.target !== this.offcanvasContentRef.current) {
      this.setState((state) => {
        return {
          ...state,
          hideAnimation: true
        }
      });
      setTimeout(() => {
        this.setState({
          hideAnimation: false,
          show: false
        });
      }, 200);
      document.removeEventListener("click", this.hide, false)
    }
  }

  render() {
    const elementId = this.props.element.getId();
    let classes = "altrp-offcanvas";

    switch (this.getContent('direction_offcanvas')) {
      case "left":
        classes += " altrp-offcanvas-left altrp-offcanvas-vertical";
        break;
      case "right":
        classes += " altrp-offcanvas-right altrp-offcanvas-vertical";
        break;
      case "top":
        classes += " altrp-offcanvas-top altrp-offcanvas-horizontal";
        break;
      case "bottom":
        classes += " altrp-offcanvas-bottom altrp-offcanvas-horizontal";
        break;
      case "topLeft":
        classes += " altrp-offcanvas-top-left altrp-offcanvas-horizontal altrp-offcanvas-vertical";
        break;
      case "topRight":
        classes += " altrp-offcanvas-top-right altrp-offcanvas-horizontal altrp-offcanvas-vertical";
        break;
      case "bottomLeft":
        classes += " altrp-offcanvas-bottom-left altrp-offcanvas-horizontal altrp-offcanvas-vertical";
        break;
      case "bottomRight":
        classes += " altrp-offcanvas-bottom-right altrp-offcanvas-horizontal altrp-offcanvas-vertical";
        break;
    };

    let classesWrapper = "";
    switch (this.getContent("animations_offcanvas")) {
      case "push":
        classesWrapper += " altrp-offcanvas-animation-push";
        break;
      case "reveal":
        classesWrapper += " altrp-offcanvas-animation-reveal";
        break;
      case "none":
        classesWrapper += " altrp-offcanvas-animation-none";
        break;
      default:
        classesWrapper += " altrp-offcanvas-animation-slide";
    }
    return (
      <React.Fragment>
        {
          isEditor() ? (
            <div className="altrp-offcanvas-editor">
              <h3>Offcanvas</h3>
            </div>
          ) : ""
        }
        <div className="altrp-offcanvas-ref" ref={this.offcanvasRef} />
        {
          ReactDOM.createPortal(
            (
              <div
                className={"altrp-offcanvas-wrapper" +
                (this.state.show ? " altrp-offcanvas-wrapper-show" : "") +
                ` ${elementId}-altrp-offcanvas` +
                (this.state.hideAnimation ? " altrp-offcanvas-wrapper-animation-hide" : "") +
                classesWrapper
                }
              >
                <div className={classes} ref={this.offcanvasContentRef}>

                </div>
              </div>
            ),
            isEditor() ?
              document.getElementById("editorContent").contentWindow.document.body
              :
              document.body
          )
        }
      </React.Fragment>
    )
  }
}

export default OffcanvasWidget;
