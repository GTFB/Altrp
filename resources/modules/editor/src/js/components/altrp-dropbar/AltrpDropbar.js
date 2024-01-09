import React, {Component} from "react";
import AltrpPopper from "../altrp-popper/AltrpPopper";
import TemplateLoader from "../../../js/components/template-loader/TemplateLoader";

import DropbarComponent from "../widgets/styled-components/DropbarComponent";
import renderAsset from "../../../../../front-app/src/js/functions/renderAsset";
import iconsManager from "../../../../../front-app/src/js/functions/iconsManager";
const {
  isEditor
} = window.altrpHelpers
class Dropbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      updateToken: undefined
    };
    this.element = props.element;
    this.children = React.createRef();
    this.wrapper = React.createRef();
    if(! isEditor() && props.settings.mode_dropbar_options === 'click'){
      document.addEventListener('click', this.onDocumentClick)
    }
  };
  onDocumentClick = e=>{
    if(! this.state.show){
      return
    }
    if(! e.target.closest(`.altrp-dropbar${this.props.elemenentId}`) && ! e.target.closest(`.altrp-element${this.props.elemenentId}`)){
      this.setState({show: false});
    }
  }
  onContainerClick = e=>{
    if(!this.props.settings?.prevent){
      this.show()
    }
  }
  show =()=> {
    const element = this.element
    const body = document.body
    let full_window = element.getResponsiveLockedSetting('full_window')
    if(this.state.show){
      body.classList.remove('overflow-hidden')
    } else if(full_window){
      body.classList.add('overflow-hidden')
    }
    if(this.props.settings.show_delay_dropbar_options?.size || this.props.settings.hide_delay_dropbar_options?.size) {
      if(!this.state.show) {

        setTimeout(() => {
          this.setState((state) => ({ show: !state.show }));
        }, this.props.settings.show_delay_dropbar_options?.size);
      } else {
        setTimeout(() => {
          this.setState((state) => ({ show: !state.show }));
        }, this.props.settings.hide_delay_dropbar_options?.size);
      }
    } else {
      this.setState((state) => ({ show: !state.show }));
    };

  };

  leaveHide = ()=> {
    if(this.props.settings.hide_delay_dropbar_options?.size) {

      setTimeout(() => {
        if(! this.state.overContainer && !this.state.overButton){
          this.setState({ show: false });
        }
      }, this.props.settings.hide_delay_dropbar_options?.size)
    } else {
      this.setState({ show: false });
    };
  };
  onContainerOver = ()=>{
    if(! this.state.overContainer){
      this.setState({ overContainer: true });
    }
  }
  onButtonOver = ()=>{
    if(! this.state.overButton){
      this.setState({ overButton: true });
    }
  }
  onContainerLeave = ()=>{
    if( this.state.overContainer){
      this.setState({ overContainer: false });
      this.leaveHide()
    }
  }
  onButtonLeave = ()=>{
    if( this.state.overButton){
      this.setState({ overButton: false });
      this.leaveHide()
    }
  }
  enterShow = (e)=> {
    let current = e.currentTarget;

    if(this.props.showDelay?.size && !this.state.show) {
      setTimeout(() => {
        this.setState({ show: true });
      }, this.props.showDelay?.size);
    }
    // else {
    //   console.log('update');
    //   console.log(this.state.show);
    //   this.setState((state) => ({ show: !state.show }));
    // };
  };

  componentDidMount() {
    this.wrapper.current.dropbarComponent = this

  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if(this.state.show !== prevState.show) {
    }
  }

  render() {
    const children = React.Children.only(this.props.children);
    let classesState = (this.props.element.getResponsiveLockedSetting('position_css_classes', '', '') || "")
    const classes = ["altrp-btn", "dropbar", `${classesState}`];
    this.state.show ? classes.push('active') : null;
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
      <div className={this.props.conditionalClasses + "altrp-dropbar " + mainClass}ref={this.wrapper} >
        <span className={this.props.conditionalClasses + "altrp-dropbar-children-wrapper " + (mainClass ? mainClass + "-wrapper" : '')}
              style={{width: '100%'}}
              onMouseEnter={this.props.settings.mode_dropbar_options === "hover" ? this.enterShow : null}
              onMouseOver={this.props.settings.mode_dropbar_options === "hover" ? this.onButtonOver : null}
              onMouseLeave={this.props.settings.mode_dropbar_options === "hover" ? this.onButtonLeave : null}
        >
          {
            React.cloneElement(children,
              {
                ref: this.children,
                onClick: this.props.settings.mode_dropbar_options === "click" ? this.show : null,
                className:classes.join(' '),
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
            <div
              onClick={this.onContainerClick}
              onMouseOver={this.props.settings.mode_dropbar_options === "hover" ? this.onContainerOver : null}
              onMouseLeave={this.props.settings.mode_dropbar_options === "hover" ? this.onContainerLeave : null}
              className={this.props.conditionalClasses + "altrp-dropbar-container " +
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
