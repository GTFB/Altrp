import {CSSTransition} from "react-transition-group";

import iconsManager from "../functions/iconsManager";
import {Scrollbars} from "react-custom-scrollbars";
import {togglePopup} from "../store/popup-trigger/actions";
import AltrpImage from "../../../../editor/src/js/components/altrp-image/AltrpImage";
import FrontPopupWrapper from "./FrontPopupWrapper";
import '../../sass/altrp-popup.scss'

class FrontPopup extends Component {
  constructor(props) {
    super(props);
    this.ElementWrapper = props.ElementWrapper || window.ElementWrapper;
    let isVisible
    let popupID = Number(props.popupTrigger.popupID)
    const template = _.isFunction(this.props.getTemplate) ? this.props.getTemplate() : this.props.template
    if (_.isNaN(popupID)) {
      isVisible = props.popupTrigger.popupID === _.get(template, "guid")
    } else {
      isVisible = popupID == _.get(template, "id")
    }

    this.rootElement = window.frontElementsFabric.parseData(
      template.data,
      null,
      this.props.page,
      this.props.models
    )
    this.state = {
      isVisible,
      stylesUrl: `/altrp/css/DEFAULT_BREAKPOINT/${template.guid}.css`,
      isShownOnScroll: false
    };
    this.close = this.close.bind(this);
  }


  componentDidUpdate(prevProps) {
    const template = _.isFunction(this.props.getTemplate) ? this.props.getTemplate() : this.props.template
    let {popupTrigger} = this.props;
    switch (this.rootElement.getSettings("type_popup", "popup")) {
      case "popup":
      case "offcanvas":
        if (popupTrigger !== prevProps.popupTrigger) {
          let isVisible
          let popupID = Number(popupTrigger.popupID)
          if (_.isNaN(popupID)) {
            isVisible = popupTrigger.popupID === _.get(template, "guid")
          } else {
            isVisible = popupID == _.get(template, "id")
          }
          this.setState({
            isVisible
          });
        }
        break;
    }
  }

  close = () => {
    this.setState({isVisible: false, isShownOnScroll: false});
    this.props.closePopup();
  }
  onExited = () => {
    document.body.classList.remove('overflow-hidden');
    window.dispatchEvent(new Event('resize'));
  }
  onExit = () => {
    const rootElement = this.rootElement;
    const type_popup = rootElement.getResponsiveSetting('type_popup')
    const animations_offcanvas = rootElement.getResponsiveSetting('animations_offcanvas')
    const appContainer = document.getElementById('front-app')
    const vertical_position_popup_layout = rootElement.getResponsiveSetting('vertical_position_popup_layout')
    const horizontal_position_popup_layout = rootElement.getResponsiveSetting('horizontal_position_popup_layout')
    if (type_popup === 'offcanvas' && animations_offcanvas === 'push') {
      switch (vertical_position_popup_layout) {
        case 'top': {
          appContainer.style.top = 0
          appContainer.style.bottom = 'auto'
        }
          break;
        case 'bottom': {
          appContainer.style.bottom = 0
          appContainer.style.top = 'auto'
        }
          break;
      }
      switch (horizontal_position_popup_layout) {
        case 'left': {
          appContainer.style.left = 0
          appContainer.style.right = 'auto'
        }
          break;
        case 'right': {
          appContainer.style.right = 0
          appContainer.style.left = 'auto'
        }
          break;
      }
    }
  }
  onEntered = () => {
  }
  onExiting = () => {
  }
  onEntering = () => {
    const rootElement = this.rootElement;
    const type_popup = rootElement.getResponsiveSetting('type_popup')
    const animations_offcanvas = rootElement.getResponsiveSetting('animations_offcanvas')
    const vertical_position_popup_layout = rootElement.getResponsiveSetting('vertical_position_popup_layout')
    const width_popup_layout = rootElement.getResponsiveSetting('width_popup_layout')
    const height_custom_popup_layout = rootElement.getResponsiveSetting('height_custom_popup_layout')
    const appContainer = document.getElementById('front-app')
    const horizontal_position_popup_layout = rootElement.getResponsiveSetting('horizontal_position_popup_layout')
    if (type_popup === 'offcanvas' && animations_offcanvas === 'push') {
      appContainer.style.transitionDuration = _.get(rootElement.getResponsiveSetting('time'), 'size', 0) + 'ms'
      switch (vertical_position_popup_layout) {
        case 'top': {
          appContainer.style.top = height_custom_popup_layout?.size + (height_custom_popup_layout?.unit || 'px')
          appContainer.style.bottom = 'auto'
        }
          break;
        case 'bottom': {
          appContainer.style.bottom = height_custom_popup_layout?.size + (height_custom_popup_layout?.unit || 'px')
          appContainer.style.top = 'auto'
        }
          break;
      }
      switch (horizontal_position_popup_layout) {
        case 'left': {
          appContainer.style.left = width_popup_layout?.size + (width_popup_layout?.unit || 'px')
          appContainer.style.right = 'auto'
        }
          break;
        case 'right': {
          appContainer.style.right = width_popup_layout?.size + (width_popup_layout?.unit || 'px')
          appContainer.style.left = 'auto'
        }
          break;
      }
    }
  }
  onEnter = () => {
    document.body.classList.add('overflow-hidden');
    window.dispatchEvent(new Event('resize'));
    const rootElement = this.rootElement;
    const type_popup = rootElement.getResponsiveSetting('type_popup')
    const animations_offcanvas = rootElement.getResponsiveSetting('animations_offcanvas')
    const vertical_position_popup_layout = rootElement.getResponsiveSetting('vertical_position_popup_layout')
    const appContainer = document.getElementById('front-app')
    const horizontal_position_popup_layout = rootElement.getResponsiveSetting('horizontal_position_popup_layout')
    if (type_popup === 'offcanvas' && animations_offcanvas === 'push') {
      switch (vertical_position_popup_layout) {
        case 'top': {
          appContainer.style.top = 0
          appContainer.style.bottom = 0
        }
          break;
        case 'bottom': {
          appContainer.style.bottom = 0
          appContainer.style.top = 0
        }
          break;
      }
      switch (horizontal_position_popup_layout) {
        case 'left': {
          appContainer.style.left = 0
          appContainer.style.right = 0
        }
          break;
        case 'right': {
          appContainer.style.right = 0
          appContainer.style.left = 0
        }
          break;
      }
    }
  }

  onError = e =>{
    const template = _.isFunction(this.props.getTemplate) ? this.props.getTemplate() : this.props.template
    e.preventDefault()
    e.stopPropagation()
    this.setState(state =>({...state,
      stylesUrl: `/altrp/css/${template.guid}.css`,
    }))
  }
  componentDidCatch = (e)=>{
    console.error(e);
  }
  render() {
    const template = _.isFunction(this.props.getTemplate) ? this.props.getTemplate() : this.props.template
    const {isVisible, stylesUrl} = this.state;
    let classes = [`app-popup`];
    const rootElement = this.rootElement;
    rootElement.popupGUID = _.get(template, "guid");
    const rootElementSettings = rootElement.getSettings("");
    let popup_close_icon = rootElement.getResponsiveSetting('popup_close_icon')
    let popup_close_icon_width_size = rootElement.getResponsiveSetting('popup_close_icon_width_size')
    let popup_close_icon_height_size = rootElement.getResponsiveSetting('popup_close_icon_height_size')
    if (!popup_close_icon_height_size) {
      popup_close_icon_height_size = '50px'
    } else {
      popup_close_icon_height_size = `${popup_close_icon_height_size.size || '0'}${popup_close_icon_height_size.unit}`
    }

    if (!popup_close_icon_width_size) {
      popup_close_icon_width_size = '50px'
    } else {
      popup_close_icon_width_size = `${popup_close_icon_width_size.size || '0'}${popup_close_icon_width_size.unit}`
    }
    const type_popup = rootElement.getResponsiveSetting('type_popup')
    if (type_popup === 'offcanvas') {
      classes.push("app-popup_offcanvas")
    }
    const rootElementId = rootElement.getId();
    const close_context = rootElement.getResponsiveSetting('close_context')

    classes.push(`${rootElementId}-app-popup`);
    const overlayCondition =
      rootElement.getResponsiveSetting('overlay_close_popup_layout');

    if (overlayCondition) {
      classes.push("app-popup-overlay");
    }

    //height popup
    switch (rootElementSettings.height_popup_layout) {
      case "fitToContent":
        classes.push("app-popup-height-fit-to-content");
        break;
      case "fitToScreen":
        classes.push("app-popup-height-fit-to-screen");
        break;
      case "custom":
        classes.push("app-popup-height-custom");
        break;
    }

    //horizontal position horizontal_position_popup_layout
    switch (rootElementSettings.horizontal_position_popup_layout) {
      case "left":
        classes.push("app-popup-horizontal-left");
        break;
      case "center":
        classes.push("app-popup-horizontal-center");
        break;
      case "right":
        classes.push("app-popup-horizontal-right");
        break;
      default:
        classes.push("app-popup-horizontal-center");
    }

    //vertical position vertical_position_popup_layout
    switch (rootElementSettings.vertical_position_popup_layout) {
      case "top":
        classes.push("app-popup-vertical-top");
        break;
      case "center":
        classes.push("app-popup-vertical-center");
        break;
      case "bottom":
        classes.push("app-popup-vertical-bottom");
        break;
      default:
        classes.push("app-popup-vertical-center");
    }

    const closeButtonCondition =
      rootElement.getResponsiveSetting('switcher_close_button_popup_layout');
    let {popup_close_icon_alignment} = rootElementSettings;
    popup_close_icon_alignment = popup_close_icon_alignment || "right";
    const closeButton = closeButtonCondition ? (
      <button
        className={
          "popup-close-button" +
          (popup_close_icon_alignment === "right"
            ? " popup-close-button-right"
            : " popup-close-button-left")
        }
        onClick={() => {
          this.setState({isVisible: false});
          this.props.closePopup();
        }}
      >
        <AltrpImage
          image={popup_close_icon}
          lazy={false}
          width={popup_close_icon_width_size}
          height={popup_close_icon_height_size}
          default={{
            assetType: "icon",
            name: "deleteOne",
            url: "/img/nullImage.png"
          }}
          className="popup-close-button-icon"
        />
      </button>
    ) : (
      <button
        className={
          "popup-close-button" +
          (popup_close_icon_alignment === "right"
            ? " popup-close-button-right"
            : " popup-close-button-left")
        }
        onClick={() => {
          this.setState({isVisible: false});
          this.props.closePopup();
        }}
      >
        {iconsManager().renderIcon('times', {
          width: popup_close_icon_width_size,
          height: popup_close_icon_height_size,
          className: "popup-close-button-icon"
        })}
      </button>
    );
    classes.push(
      `${type_popup || 'popup'}-${rootElement.getResponsiveSetting('horizontal_position_popup_layout') || 'center'}-${rootElement.getResponsiveSetting('vertical_position_popup_layout') || 'center'}-${rootElement.getResponsiveSetting('animations_offcanvas') || 'animations_offcanvas'}`
    );
    const animations_offcanvas = rootElement.getResponsiveSetting('animations_offcanvas')

    let timeout = _.get(rootElement.getResponsiveSetting('time'), 'size', 100)
    if (type_popup === 'popup' && timeout && animations_offcanvas === 'slide') {
      classes.push(`popup-slide-direction_${rootElement.getResponsiveSetting('s_direction') || 'left'}`);
    }

    const content_height = rootElement.getResponsiveSetting('content_height_custom_popup_layout')
    const size = content_height?.size
    const unit = content_height?.unit
    const style = {}
    if (size && unit) {
      style['height'] = size + unit;
    }


    return (
      <>
        <link rel="stylesheet"
              onError={this.onError}
              href={stylesUrl}/>
        <CSSTransition
          in={isVisible}
          timeout={Number(timeout)}
          onEnter={this.onEnter}
          onEntering={this.onEntering}
          onEntered={this.onEntered}
          onExit={this.onExit}
          onExiting={this.onExiting}
          onExited={this.onExited}
          unmountOnExit={true}
          classNames="popup-transition-state">
          <FrontPopupWrapper
            settings={rootElementSettings}
            className={classes.join(" ")}
            onClick={() => {
              if (
                overlayCondition
              ) {
                this.setState({isVisible: false});
                this.props.closePopup();
              }
            }}
          >
            {close_context === 'window' && closeButton}
            <div
              className="popup-window"
              // style={{ top: positioning_custom_top.size + positioning_custom_top.unit}}
              onClick={this.onClink}
            >
              {close_context !== 'window' && closeButton}
              {rootElement.getSettings("").height_popup_layout === 'fitToContent'
                ? <div className="popup-content" style={style}>
                  {React.createElement(rootElement.componentClass, {
                    element: rootElement,
                    ElementWrapper: this.ElementWrapper,
                    children: rootElement.children
                  })}
                </div>
                : <Scrollbars
                  autoHide
                  renderThumbHorizontal={props => (
                    <div {...props} className="popup-scrollbar-vertical"/>
                  )}
                  renderTrackHorizontal={() => (
                    <div className="popup-scrollbar-track-horizontal"/>
                  )}
                  renderTrackVertical={props => (
                    <div {...props} className="popup-scrollbar-track-vertical"/>
                  )}
                  className="popup-scrollbar"
                  autoHeight
                  autoHeightMax="100vh"
                  autoHideTimeout={1000}
                  autoHideDuration={200}
                >
                  <div className="popup-content" style={style}>
                    {React.createElement(rootElement.componentClass, {
                      element: rootElement,
                      ElementWrapper: this.ElementWrapper,
                      children: rootElement.children
                    })}
                  </div>
                </Scrollbars>
              }
            </div>
          </FrontPopupWrapper>
        </CSSTransition>
      </>
    );

  }

  onClink = e => {
    // console.log(e.target.closest('[data-altrp-wrapper-click-actions]'));
    if (e.target.closest('[data-altrp-wrapper-click-actions]')) {
      return
    }
    e.stopPropagation()
  }


}

const mapStateToProps = state => {
  return {
    scrollPosition: state.scrollPosition,
    popupTrigger: state.popupTrigger
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closePopup: () => dispatch(togglePopup(null))
  };
};

export default window.reactRedux.connect(mapStateToProps, mapDispatchToProps)(FrontPopup);
