import React, { Component } from "react";
import {Link, Redirect, withRouter } from 'react-router-dom';
import {isEditor} from "../../../../../front-app/src/js/helpers";
import {renderAssetIcon} from "../../helpers";
import { NavItem } from "react-bootstrap";

//dropbar
class Dropbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      activePosition: 0,
      positionVariants: [
        {
          position: "bottomLeft",
          class: "bottom-left"
        },
        {
          position: "bottomCenter",
          class: "bottom-center"
        },
        {
          position: "bottomRight",
          class: "bottom-right"
        },
        {
          position: "bottomJustify",
          class: "bottom-justify"
        },
        {
          position: "bottomFullWidth",
          class: "bottom-full-width"
        },
        {
          position: "topLeft",
          class: "top-left"
        },
        {
          position: "topCenter",
          class: "top-center"
        },
        {
          position: "topRight",
          class: "top-right"
        },
        {
          position: "topJustify",
          class: "top-justify"
        },
        {
          position: "topFullWidth",
          class: "top-full-width"
        },
        {
          position: "leftTop",
          class: "left-top"
        },
        {
          position: "leftCenter",
          class: "left-center"
        },
        {
          position: "leftBottom",
          class: "left-bottom"
        },
        {
          position: "leftFullHeight",
          class: "left-full-height"
        },
        {
          position: "rightTop",
          class: "right-top"
        },
        {
          position: "rightCenter",
          class: "right-center"
        },
        {
          position: "rightBottom",
          class: "right-bottom"
        },
        {
          position: "rightFullHeight",
          class: "right-full-height"
        },
      ],
      contentPosition: {},
      offset: this.props.offset
    };

    this.show = this.show.bind(this);
    this.leaveHide = this.leaveHide.bind(this);
    this.enterShow = this.enterShow.bind(this);
    this.changePosition = this.changePosition.bind(this);

    this.children = React.createRef();
    this.content = React.createRef();
  };

  show() {
    //this.children.current.getBoundingClientRect()
    // left: this.children.current.getBoundingClientRect().left - 10 + "px"
    this.setState((state) => ({ show: !state.show }));
    this.changePosition()
  }

  leaveHide() {
    this.setState({ show: false });
  }
  
  enterShow() {
    this.setState({ show: true });
    this.changePosition()
  }

  changePosition() {
    let left = this.children.current.offsetLeft;
    let height = this.children.current.offsetHeight - 1;
    let width = this.children.current.offsetWidth - 1;
    let top = this.children.current.offsetTop;
    let right = left + width / height - 1;
    let position = {};
    let offsetY = height + Number(this.state.offset.size) + "px";
    let offsetXLeft = width + Number(this.state.offset.size);
    
    if(this.state.show) {
      let contentWidth = this.content.current.offsetWidth - 1;
      console.log(contentWidth)
    }

    switch(this.state.activePosition) {
      case 0:
        position = { left: left + "px", top: offsetY }
        break
      case 1:
        position = { top: offsetY }
        break
      case 2:
        position = { right: right + "px", top: offsetY }
        break
      case 3:
        position = { width: width + 2 + "px", top: offsetY }
        break
      case 4:
        position = { width: "100vw", top: offsetY }
        break
      case 5:
        position = { left: left + "px", bottom: offsetY}
        break
      case 6:
        position = { bottom: offsetY }
        break
      case 7:
        position = { right: right + "px", bottom: offsetY }
        break
      case 8:
        position = { width: width + 2 + "px", bottom: offsetY }
        break
      case 9:
        position = { width: "100vw", bottom: offsetY }
        break
      case 10:
        position = { right: right + offsetXLeft, top: top + "px" }
        break
      case 11:
        position = { right: right + offsetXLeft }
        break
      case 12:
        position = { right: right + offsetXLeft, bottom: top + "px" }
        break
      case 13:
        position = { right: right + offsetXLeft, height: "100vh" }
        break
      case 14:
        position = { left: left + offsetXLeft, top: top + "px" }
        break
      case 15:
        position = { left: left + offsetXLeft }
        break
      case 16:
        position = { left: left + offsetXLeft, bottom: top + "px" }
        break
      case 17:
        position = { left: left + offsetXLeft, height: "100vh" }
        break
    }

    this.setState({ contentPosition: position })
    
  }

  componentDidUpdate(prevProps) {
    if(this.props.mode !== prevProps.mode) {
      this.setState({ show: false });
    };
    
    if(prevProps.offset !== this.props.offset) {
      this.setState({ offset: this.props.offset, show: false })
    };

    if(this.props.position !== prevProps.position) {
      this.state.positionVariants.forEach((variant, item) => {
        if(variant.position === this.props.position) {
          this.setState({ activePosition: item, show: false });
        };
      });
    };
  }

  componentDidMount() {
    this.changePosition();

    this.state.positionVariants.forEach((variant, item) => {
      if(variant.position === this.props.position) {
        this.setState({ activePosition: item, show: false });
      };
    });
  }

  render() {
    const children = React.Children.only(this.props.children);

    let mainClass = "altrp-dropbar-" + this.props.className;

    let contentPosition = " altrp-dropbar-variant-" + this.state.positionVariants[this.state.activePosition].class || "";

    return (
      <div className={"altrp-dropbar altrp-dropbar-" + mainClass + contentPosition}>
        <span className={"altrp-dropbar-children-wrapper " + mainClass + "-wrapper"}>
          {
            React.cloneElement(children,
              {
                ref: this.children,
                onClick: this.props.mode === "click" ? this.show : null,
                onMouseEnter: this.props.mode === "hover" ? this.enterShow : null, 
                onMouseLeave: this.props.mode === "hover" ? this.leaveHide : null
              }
            )
          }
        </span>
        {
          this.state.show ? (
            <div ref={this.content} style={this.state.contentPosition} className={"altrp-dropbar-container " + mainClass + "-containter"}>
              {
                React.createElement("div",
                  {
                    className: "altrp-dropbar-content " + mainClass + "-content",
                    dangerouslySetInnerHTML: {
                      __html: this.props.content
                    },
                  }
                )
              }
            </div>
          ): null
        }
      </div>
    );
  };
};

//button
class ButtonWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: props.element.getSettings(),
      pending: false,
      // redirect: false
    };
    props.element.component = this;
    if (window.elementDecorator) {
      window.elementDecorator(this);
    }
    this.onClick = this.onClick.bind(this);
  }

  async onClick(e) {
    if (isEditor()) {
      console.log(this.state.settings);
    } else {
      this.setState(state => ({ ...state, pending: true }));
      this.props.element.getForms().forEach(
        /**
         * @param {AltrpForm} form
         */ async form => {
          try {
            let res = await form.submit(this.getModelId());
            if (res.success) {
              const { redirect_to_prev_page, redirect_after } = this.state.settings;
              if (redirect_to_prev_page) {
                this.props.history.goBack();
              }

              if (redirect_after) {
                this.props.history.push(redirect_after);
              }
              // let redirect = this.state.settings.redirect_after
              //   ? this.state.settings.redirect_after
              //   : false;
              // this.setState(state => ({ ...state, pending: false, redirect }));
            } else if(res.message){
              alert(res.message);
            }
            this.setState(state => ({ ...state, pending: false }));
          } catch (e) {
            console.error(e);
            this.setState(state => ({ ...state, pending: false }));
          }
        }
      );
    }
  }

  render() {
    // if (this.state.redirect) {
    //   return <Redirect to={this.state.redirect} push={true} />;
    // }
    let classes = "altrp-btn " + (this.state.settings.position_css_classes || "");
    let buttonMedia = {...this.state.settings.button_icon};

    if (this.state.pending) {
      classes += " altrp-disabled";
    }

    classes += this.state.settings.link_button_type === "dropbar" ? "altrp-btn-dropbar" : ""

    let button = (
      this.state.settings.link_button_type === "none" ? (
        <button
          onClick={this.onClick}
          className={classes}
          id={this.state.settings.position_css_id}
        >
          {this.state.settings.button_text || ""}
          <span className={"altrp-btn-icon "}>{ renderAssetIcon( buttonMedia ) } </span>
        </button>
      ) : (
        <Dropbar 
          offset={this.state.settings.offset_dropbar_options} 
          className="btn" 
          position={this.state.settings.position_dropbar_options} 
          mode={this.state.settings.mode_dropbar_options} 
          content={this.state.settings.content_dropbar_section}
        >
          <button
            onClick={this.onClick}
            className={classes}
            id={this.state.settings.position_css_id}
          >
            {this.state.settings.button_text || ""}
            <span className={"altrp-btn-icon "}>{ renderAssetIcon( buttonMedia ) } </span>
          </button>
        </Dropbar>
      )
    );

    let link = null;
    if (this.state.settings.link_link.url) {
      if(this.state.settings.link_link.tag === 'a' || isEditor()) {

        link = (
          <a href={this.state.settings.link_link.url} onClick={this.onClick} className={classes}>
            {" "}
            {this.state.settings.button_text || ""}
            <span className={"altrp-btn-icon "}>{ renderAssetIcon( buttonMedia ) } </span>
          </a>
        );
      } else {
        link = (
          <Link to={this.state.settings.link_link.url} onClick={this.onClick} className={classes}>
            {" "}
            {this.state.settings.button_text || ""}
          </Link>
        );
      }
    }

    return link || button || buttonMedia;
  }
}

export default withRouter(ButtonWidget);