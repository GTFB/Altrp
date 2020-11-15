import React, {Component} from "react";
import AltrpPopper from "../altrp-popper/AltrpPopper";

class Dropbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
    };

    this.show = this.show.bind(this);
    this.leaveHide = this.leaveHide.bind(this);
    this.enterShow = this.enterShow.bind(this);

    this.children = React.createRef();
  };

  show() {
    if(this.props.settings.show_delay_dropbar_options.size || this.props.settings.hide_delay_dropbar_options.size) {
      if(!this.state.show) {
        setTimeout(() => {
          this.setState((state) => ({ show: !state.show }));
        }, this.props.settings.show_delay_dropbar_options.size);
      } else {
        setTimeout(() => {
          this.setState((state) => ({ show: !state.show }));
        }, this.props.settings.hide_delay_dropbar_options.size);
      }
    } else {
      this.setState((state) => ({ show: !state.show }));
    };
  };

  leaveHide() {

    if(this.props.settings.hide_delay_dropbar_options.size) {
      setTimeout(() => {
        this.setState({ show: false });
      }, this.props.settings.hide_delay_dropbar_options.size)
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
  };

  render() {
    const children = React.Children.only(this.props.children);

    let mainClass = "altrp-dropbar-" + this.props.className;
    console.log((this.state.show ? " altrp-dropbar-container-show" : " altrp-dropbar-container-hide"))
    return (
      <div className={"altrp-dropbar altrp-dropbar-" + mainClass}>
        <span className={"altrp-dropbar-children-wrapper " + mainClass + "-wrapper"}>
          {
            React.cloneElement(children,
              {
                ref: this.children,
                onClick: this.props.settings.mode_dropbar_options === "click" ? this.show : null,
                onMouseEnter: this.props.settings.mode_dropbar_options === "hover" ? this.enterShow : null,
                onMouseLeave: this.props.settings.mode_dropbar_options === "hover" ? this.leaveHide : null
              }
              )
          }
          <AltrpPopper
            target={this.children}
            settings={{
              placement: this.props.settings.position_dropbar_options,
              offset: [0, this.props.settings.offset_dropbar_options.size],
              updateSettings: {
                width: this.props.settings.width_dropbar_options
              }
            }}
          >
            <div
              className={"altrp-dropbar-container " + mainClass + "-containter" + (this.state.show ? " altrp-dropbar-container-show" : " altrp-dropbar-container-hide")}
            >
              {
                React.createElement("div",
                  {
                    className: "altrp-dropbar-content " + mainClass + "-content",
                    dangerouslySetInnerHTML: {
                      __html: this.props.settings.content_dropbar_section
                    },
                  }
                  )
              }
            </div>
          </AltrpPopper>
        </span>
      </div>
    );
  };
};

export default Dropbar
