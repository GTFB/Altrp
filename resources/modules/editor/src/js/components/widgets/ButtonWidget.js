import React, { Component } from "react";
import {Link, Redirect, withRouter } from 'react-router-dom';
import {isEditor} from "../../../../../front-app/src/js/helpers";
import {renderAssetIcon, placeElement} from "../../helpers";

//dropbar
class Dropbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      activePosition: 0,
      positionVariants: placeElement(true).variants,
      contentPosition: {},
      offset: this.props.offset,
    };

    this.show = this.show.bind(this);
    this.leaveHide = this.leaveHide.bind(this);
    this.enterShow = this.enterShow.bind(this);
    this.changePosition = this.changePosition.bind(this);

    this.children = React.createRef();
    this.object = React.createRef();
  };

  show() {
    if(this.props.showDelay.size || this.props.hideDelay.size) {
      if(!this.state.show) {
        setTimeout(() => {
          this.setState((state) => ({ show: !state.show }));
        }, this.props.showDelay.size);
      } else {
        setTimeout(() => {
          this.setState((state) => ({ show: !state.show }));
        }, this.props.hideDelay.size);
      }
    } else {
      this.setState((state) => ({ show: !state.show }));
    };

    this.changePosition();
  };

  leaveHide() {

    if(this.props.hideDelay.size) {
      setTimeout(() => {
        this.setState({ show: false });
      }, this.props.hideDelay.size)
    } else {
      this.setState({ show: false });
    };
  };

  enterShow(e) {
    let current = e.currentTarget;
    if(this.props.showDelay.size && !this.state.show) {
      setTimeout(() => {
        if(this.children.current === current) {
          this.setState({ show: true });
        } else {
          this.setState({ show: false });
        }
      }, this.props.showDelay.size);
    } else {
      this.setState((state) => ({ show: !state.show }));
    };
    this.changePosition();
  };

  changePosition() {
    let offset = this.state.offset;
    let position = placeElement(false,
      {
        target: this.children.current,
        object: this.object.current,
        place: this.state.activePosition.position
      });

    switch (position.vector) {
      case "verBottom":
        position.position.top += Number(offset.size);
        break;
      case "verTop":
        position.position.top += -Number(offset.size);
        break;
      case "horLeft":
        position.position.right += Number(offset.size);
        break;
      case "horRight":
        position.position.left += Number(offset.size);
        break;
    };

    this.setState({ contentPosition: position.position });
  }

  componentDidUpdate(prevProps) {
    if(this.props.mode !== prevProps.mode) {
      this.setState({ show: false });
    };

    if(prevProps.offset !== this.props.offset) {
      this.setState({ offset: this.props.offset, show: false });
    };

    if(this.props.position !== prevProps.position) {
      this.setState({ activePosition: this.state.positionVariants.find(pos => pos.position === this.props.position), show: false });
    };
  }

  componentDidMount() {
    this.setState({ activePosition: this.state.positionVariants.find(pos => pos.position === this.props.position) });
  }

  render() {
    const children = React.Children.only(this.props.children);

    let mainClass = "altrp-dropbar-" + this.props.className;

    let contentPosition = " altrp-dropbar-variant-" + this.state.activePosition.class || "";

    let contentStyles = {};

    if(this.props.width) {
      contentStyles = {width: this.props.width + "px"}
    }

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
          <div
            style={{...this.state.contentPosition, ...contentStyles}} ref={this.object}
            className={"altrp-dropbar-container " + mainClass + "-containter" + (this.state.show ? " altrp-dropbar-container-show" : " altrp-dropbar-container-hide")}
          >
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
        </span>
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
          width={this.state.settings.width_dropbar_options.size}
          position={this.state.settings.position_dropbar_options}
          mode={this.state.settings.mode_dropbar_options}
          content={this.state.settings.content_dropbar_section}
          hideDelay={this.state.settings.hide_delay_dropbar_options}
          showDelay={this.state.settings.show_delay_dropbar_options}
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
