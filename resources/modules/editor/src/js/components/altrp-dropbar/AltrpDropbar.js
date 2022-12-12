import React, {Component} from "react";
import AltrpPopper from "../altrp-popper/AltrpPopper";
import TemplateLoader from "../../../js/components/template-loader/TemplateLoader";

import DropbarComponent from "../widgets/styled-components/DropbarComponent";

class Dropbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      updateToken: undefined
    };

    this.show = this.show.bind(this);
    this.leaveHide = this.leaveHide.bind(this);
    this.enterShow = this.enterShow.bind(this);

    this.element = props.element;
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
        this.setState({ show: true });
      }, this.props.showDelay.size);
    } else {
      this.setState((state) => ({ show: !state.show }));
    };
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(this.state.show !== prevState.show) {
    }
  }

  render() {
    const children = React.Children.only(this.props.children);

    let mainClass = this.props.className ? `altrp-dropbar-${this.props.className}` : '';
    let type = this.props.settings.type_dropbar_section || "text";
    let content_dropbar_section = this.props.getContent('content_dropbar_section');

    const id = this.props.settings.template_dropbar_section;


    const cardModel = this.element.hasCardModel() ? this.element.getCardModel() : null
    return (
      <div className={this.props.conditionalClasses + "altrp-dropbar " + mainClass}>
        <span className={this.props.conditionalClasses + "altrp-dropbar-children-wrapper " + (mainClass ? mainClass + "-wrapper" : '')}
              style={{width: '100%'}}
              onMouseEnter={this.props.settings.mode_dropbar_options === "hover" ? this.enterShow : null}
              onMouseLeave={this.props.settings.mode_dropbar_options === "hover" ? this.leaveHide : null}
        >
          {
            React.cloneElement(children,
              {
                ref: this.children,
                onClick: this.props.settings.mode_dropbar_options === "click" ? this.show : null,
                // onMouseEnter: this.props.settings.mode_dropbar_options === "hover" ? this.enterShow : null,
                // onMouseLeave: this.props.settings.mode_dropbar_options === "hover" ? this.leaveHide : null
              }
            )
          }

          <AltrpPopper
            target={this.children}
            portal={true}
            updateToken={this.state.updateToken}
            settings={{
              placement: this.props.settings.position_dropbar_options,
              offset: [0, this.props.settings.offset_dropbar_options?.size||0],
              updateSettings: {
                width: this.props.settings.width_dropbar_options
              }
            }}
          >
            <DropbarComponent settings={this.props.element.getSettings()}
                              className={this.props.conditionalClasses + "altrp-dropbar-container " +
                              (` ${this.props.elemenentId}-altrp-dropbar `) +
                              "altrp-dropbar-btn-containter " +
                              (mainClass ? mainClass + "-containter" : '') +
                              (this.state.show ? " altrp-dropbar-container-show" : " altrp-dropbar-container-hide")}
            >
              {
                type === "text" ? (
                  React.createElement("div",
                    {
                      className: this.props.conditionalClasses + "altrp-dropbar-content " + "altrp-dropbar-btn-content " + (mainClass ? mainClass + "-content" : ''),
                      dangerouslySetInnerHTML: {
                        __html: content_dropbar_section || ''
                      },
                    }
                  )
                ) : (
                  <TemplateLoader
                    cardModel={cardModel}
                    onLoad={() => {
                      this.setState({ updateToken: Math.random() })
                    }}
                    templateId={id}
                  />
                )
              }
            </DropbarComponent>
          </AltrpPopper>
        </span>
      </div>
    );
  };
}

export default Dropbar
