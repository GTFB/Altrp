import React, {Component} from 'react';
import {isEditor} from "../../helpers";
import "./altrp-offcanvas.scss";
import TemplateLoader from "../../../../../editor/src/js/components/template-loader/TemplateLoader";
import ReactDOM from "react-dom";
import AltrpImage from "../../../../../editor/src/js/components/altrp-image/AltrpImage";
import {Scrollbars} from "react-custom-scrollbars";

class OffcanvasWidget extends Component {
  constructor(props) {
    super(props);

    this.state = {
      settings: props.settings,
      elementId: props.template.getId(),
      show: false,
    };

    this.offcanvasRef = React.createRef();
    this.offcanvasContentRef = React.createRef();

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.hideButton = this.hideButton.bind(this)
  }

  show() {
    this.setState({
      show: true
    });
    document.addEventListener("click", this.hide)
  }

  hide(e) {
    if (!e.path.includes(this.offcanvasContentRef.current)) {
      this.props.close();
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
      document.removeEventListener("click", this.hide)
    }
  }

  hideButton() {
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
      document.removeEventListener("click", this.hide)
    }, 200);
    this.props.close();
  }

  componentDidUpdate(prevProps) {
    if (this.props.show !== prevProps.show) {
      this.show()
    }
  }

  render() {
    let classes = "altrp-offcanvas";

    switch (this.state.settings.direction_offcanvas) {
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
    switch (this.state.settings.animations_offcanvas) {
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

    let content = "";
    let rootElement = this.props.template;

    if(rootElement) {
      content = (
        React.createElement(rootElement.componentClass,
          {
            element: rootElement,
            children: rootElement.children
          })
      );
    }

    classesWrapper += ` altrp-offcanvas-wrapper-cursor-${this.state.settings.close_cursor_offcanvas} ${this.state.settings.overflow_visible_offcanvas ? "altrp-offcanvas-wrapper-overflow-visible" : ""}`;

    const closeButton = this.state.settings.close_offcanvas ? (
      <div className={"altrp-offcanvas-button" + ` altrp-offcanvas-button-${this.state.settings.close_button_position_offcanvas}`} onClick={this.hideButton}>
        <AltrpImage image={this.state.settings.close_button_icon_offcanvas} default={{assetType: "icon", name: "deleteOne"}} className="altrp-offcanvas-button-icon"/>
      </div>
    ) : "";
    return (
      <React.Fragment>
        <div className="altrp-offcanvas-ref" ref={this.offcanvasRef} />
        {
          ReactDOM.createPortal(
            (
              <div
                className={"altrp-offcanvas-wrapper" +
                (this.state.show ? " altrp-offcanvas-wrapper-show" : "") +
                ` ${this.state.elementId}-altrp-offcanvas` +
                (this.state.hideAnimation ? " altrp-offcanvas-wrapper-animation-hide" : "") +
                classesWrapper
                }
              >
                <div className={classes} ref={this.offcanvasContentRef}>
                  <Scrollbars
                    autoHide
                    autoHideTimeout={1000}
                    autoHideDuration={200}
                    universal={true}
                  >
                  {
                    closeButton
                  }
                  {
                    content
                  }
                  </Scrollbars>
                </div>
              </div>
            ),
          document.getElementById("front-app")
          )
        }
      </React.Fragment>
    )
  }
}

export default OffcanvasWidget;
