import React, {Component} from "react";
import AltrpPopper from "../altrp-popper/AltrpPopper";
import TemplateLoader from "../../../js/components/template-loader/TemplateLoader";

import DropbarComponent from "../widgets/styled-components/DropbarComponent";
import renderAsset from "../../../../../front-app/src/js/functions/renderAsset";
import iconsManager from "../../../../../front-app/src/js/functions/iconsManager";

class Dropbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      updateToken: undefined
    };

    this.leaveHide = this.leaveHide.bind(this);
    this.enterShow = this.enterShow.bind(this);

    this.element = props.element;
    this.children = React.createRef();
  };

  show =()=> {
    const element = this.element
    const body = document.body
    let full_window = element.getResponsiveLockedSetting('full_window')
    if(this.state.show){
      body.classList.remove('overflow-hidden')
    } else if(full_window){
      body.classList.add('overflow-hidden')
    }
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

    const {element} = this.props
    let mainClass = this.props.className ? `altrp-dropbar-${this.props.className}` : '';
    let type = this.props.settings.type_dropbar_section || "text";
    let content_dropbar_section = this.props.getContent('content_dropbar_section');

    const id = this.props.settings.template_dropbar_section;

    let close_icon = element.getResponsiveLockedSetting('close_icon')
    let full_window = element.getResponsiveLockedSetting('full_window')
    let close_icon_position = element.getResponsiveLockedSetting('close_icon_position')

    if(full_window){
      if(! _.isEmpty(close_icon)){
        close_icon = renderAsset(close_icon)
      } else {
        close_icon = iconsManager().renderIcon('times')
      }
    }else {
      close_icon = ''
    }

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
              }
            )
          }

          <DropbarComponent settings={this.props.element.getSettings()}
                            selector={`.altrp-dropbar${this.props.elemenentId}`}
          />
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
            <div className={this.props.conditionalClasses + "altrp-dropbar-container " +
                              (` altrp-dropbar${this.props.elemenentId} `) +
                              "altrp-dropbar-btn-containter " +
                              (mainClass ? mainClass + "-containter" : '') +
                              (full_window ? " altrp-dropbar_full-window " : '') +
                              (this.state.show ? " altrp-dropbar-container-show" : " altrp-dropbar-container-hide")}
            >
              <div className={`altrp-dropbar__close-icon altrp-dropbar__close-icon_${close_icon_position}`}
              onClick={this.show}>
                {close_icon}
              </div>
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
            </div>
          </AltrpPopper>
        </span>
      </div>
    );
  };
}

export default Dropbar
