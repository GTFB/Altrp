import React, {Component} from "react";
import {placeElement} from "../../helpers";

class Dropbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      activePosition: { class: "", position: "" },
      positionVariants: placeElement(true).variants,
      contentPosition: {},
    };

    this.show = this.show.bind(this);
    this.leaveHide = this.leaveHide.bind(this);
    this.enterShow = this.enterShow.bind(this);
    this.changePosition = this.changePosition.bind(this);

    this.children = React.createRef();
    this.object = React.createRef();
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

    this.changePosition();
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
    this.changePosition();
  };

  changePosition() {
    let offset = this.props.settings.offset_dropbar_options;
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
    if(this.props.settings.mode_dropbar_options !== prevProps.settings.mode_dropbar_options) {
      this.setState({ show: false });
    };

    if(prevProps.settings.offset_dropbar_options !== this.props.settings.offset_dropbar_options) {
      this.setState({ offset: this.props.settings.offset_dropbar_options, show: false });
    };

    if(this.props.settings.position_dropbar_options !== prevProps.settings.position_dropbar_options) {
      this.setState({ activePosition: this.state.positionVariants.find(pos => pos.position === this.props.settings.position_dropbar_options), show: false });
    };
  }

  componentDidMount() {
    this.setState({ activePosition: this.state.positionVariants.find(pos => pos.position === this.props.settings.position_dropbar_options) });
  }

  render() {
    const children = React.Children.only(this.props.children);

    let mainClass = "altrp-dropbar-" + this.props.className;

    let contentPosition = "";
    if(this.state.activePosition) {
      contentPosition = " altrp-dropbar-variant-" + this.state.activePosition.class || "";
    }

    let contentStyles = {};

    if(this.props.settings.width_dropbar_options) {
      contentStyles = {width: this.props.settings.width_dropbar_options.size + "px"}
    }

    return (
      <div className={"altrp-dropbar altrp-dropbar-" + mainClass + contentPosition}>
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
          <div
            style={{...this.state.contentPosition, ...contentStyles}} ref={this.object}
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
        </span>
      </div>
    );
  };
};

export default Dropbar
