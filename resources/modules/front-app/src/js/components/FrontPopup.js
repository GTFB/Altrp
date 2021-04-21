import React, { Component } from "react";
import connect from "react-redux/es/connect/connect";
import { Scrollbars } from "react-custom-scrollbars";
import AltrpOffcanvas from "./altrp-offcanvas/AltrpOffcanvas";
import { togglePopup } from "../store/popup-trigger/actions";
import AltrpImage from "../../../../editor/src/js/components/altrp-image/AltrpImage";
import FrontPopupWrapper from './FrontPopupWrapper';


class FrontPopup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isVisible: false,
      rootElement: window.frontElementsFabric.parseData(this.props.template.data, null, this.props.page, this.props.models),
      isShownOnScroll: false
    };

    this.close = this.close.bind(this)
  }

  componentDidMount() {
    switch (this.state.rootElement.getContent("type_popup")) {
      case "popup":
        // const { on_page_load, on_click, inactivity, on_exit, to_element } = _.get(this.props, 'template.triggers.data', {});

        // if (on_page_load || on_page_load === 0) {
        //   setTimeout(() => this.setState({ isVisible: true }), on_page_load * 1000)
        // }
        //
        // if (on_click) {
        //   this.clickCounter = 0;
        //   document.addEventListener('click', () => {
        //     this.clickCounter += 1;
        //     if (this.clickCounter === +on_click) {
        //       this.clickCounter = 0;
        //       this.setState({ isVisible: true });
        //     }
        //   })
        // }
        //
        // if (inactivity) {
        //   this.inactivityTimeout = setTimeout(() => this.setState({ isVisible: true }), inactivity * 1000);
        //
        //   this.resetTimer = () => {
        //     clearTimeout(this.inactivityTimeout);
        //     this.inactivityTimeout = setTimeout(() => this.setState({ isVisible: true }), inactivity * 1000);
        //   };
        //
        //   const events = ['mousedown', 'keydown', 'touchstart'];
        //   events.forEach(event => {
        //     document.addEventListener(event, this.resetTimer, true);
        //   });
        // }
        //
        // if (on_exit) {
        //   // window.addEventListener('beforeunload', (event) => {
        //   //   // Отмените событие, как указано в стандарте.
        //   //   event.preventDefault();
        //   //   this.setState({ isVisible: true })
        //   //   // Хром требует установки возвратного значения.
        //   //   event.returnValue = '';
        //   // });
        //   document.addEventListener('mouseleave', () => this.setState({ isVisible: true }))
        // }

        // if (to_element) {
        //   const htmlCollection = document.getElementsByClassName(to_element);
        //   console.log(htmlCollection);
        //   this.elements = []
        //   for (let index = 0; index < htmlCollection.length; index++) {
        //     const element = htmlCollection[index];
        //     this.elements[index] = getTopPosition(element);
        //   }
        //   console.log(this.elements);
        // }
        break;
    }
  }

  componentDidUpdate(prevProps) {
    let { popupTrigger } = this.props;
    const { on_scroll, to_element } = _.get(this.props, 'template.triggers.data', {});
    const { isShownOnScroll } = this.state;
    switch (this.state.rootElement.getSettings("type_popup", "popup")) {
      case "popup":

        // if (on_scroll && !isShownOnScroll && on_scroll.size <= this.props.scrollPosition.top * 100) {
        //   this.setState({ isVisible: true, isShownOnScroll: true });
        //
        // }
        // if (this.resetTimer && this.props.scrollPosition.top !== prevProps.scrollPosition.top) {
        //
        //  this.resetTimer();
        //
        // }
        // if (to_element && this.props.scrollPosition.top !== prevProps.scrollPosition.top) {
        //
        //  // console.log(this.elements)
        //
        //  console.log(this.props.scrollPosition.scrollTop)
        //  const { scrollTop, clientHeight } = this.props.scrollPosition;
        //
        //  for (let index = 0; index < this.elements.length; index++) {
        //
        //    const element = this.elements[index];
        //
        //     if (isElementTopInViewport(element, scrollTop, clientHeight)) {
        //
        //      this.setState({ isVisible: true });
        //       // this.elements.splice(index, 1);
        //     }
        //   }

        // }
        if (popupTrigger !== prevProps.popupTrigger) {
          this.setState({ isVisible: popupTrigger.popupID === _.get(this.props, 'template.guid') });
        }
        break;
      case "offcanvas":
        // if (on_scroll && !isShownOnScroll && on_scroll.size <= this.props.scrollPosition.top * 100) {
        //   this.setState({ isVisible: true, isShownOnScroll: true });
        // }
        //
        // if (this.resetTimer && this.props.scrollPosition.top !== prevProps.scrollPosition.top) {
        //   this.resetTimer();
        // }

        // if (to_element && this.props.scrollPosition.top !== prevProps.scrollPosition.top) {
        //   // console.log(this.elements)
        //   console.log(this.props.scrollPosition.scrollTop)
        //   const { scrollTop, clientHeight } = this.props.scrollPosition;

        //   for (let index = 0; index < this.elements.length; index++) {
        //     const element = this.elements[index];

        //     if (isElementTopInViewport(element, scrollTop, clientHeight)) {
        //       this.setState({ isVisible: true });
        //       // this.elements.splice(index, 1);
        //     }
        //   }

        // }
        if (popupTrigger !== prevProps.popupTrigger) {
          this.setState({ isVisible: popupTrigger.popupID === _.get(this.props, 'template.guid') });
        }
        break;
    }
  }

  close() {
    this.setState({ isVisible: false, isShownOnScroll: false });
    this.props.closePopup();
  }

  render() {
    const { isVisible } = this.state;
    let classes = [`app-popup`];
    // const { positioning_custom_top } = this.props.template.data.rootElementSettings;
    const rootElement = this.state.rootElement;
    rootElement.popupGUID = _.get(this.props, 'template.guid');
    const rootElementSettings = rootElement.getSettings("");
    const rootElementId = rootElement.getId();

    classes.push(`${rootElementId}-app-popup`);
    const overlayCondition = rootElementSettings.overlay_close_popup_layout || true;

    if(overlayCondition) {
      classes.push("app-popup-overlay")
    }

    //height popup
    switch (rootElementSettings.height_popup_layout) {
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


    // let styleButtonClose = {};
    
    // if(rootElementSettings.popup_close_button_height_size && rootElementSettings.popup_close_button_height_size.size)
    //   styleButtonClose.height = rootElementSettings.popup_close_button_height_size.size + rootElementSettings.popup_close_button_height_size.unit;
    // if(rootElementSettings.popup_close_button_width_size && rootElementSettings.popup_close_button_width_size.size)
    //   styleButtonClose.width = rootElementSettings.popup_close_button_width_size.size + rootElementSettings.popup_close_button_width_size.unit;  
    
    // if(rootElementSettings.popup_close_button_padding) {
    //   styleButtonClose.paddingTop = rootElementSettings.popup_close_button_padding.top + rootElementSettings.popup_close_button_padding.unit;
    //   styleButtonClose.paddingRight = rootElementSettings.popup_close_button_padding.right + rootElementSettings.popup_close_button_padding.unit;
    //   styleButtonClose.paddingBottom = rootElementSettings.popup_close_button_padding.bottom + rootElementSettings.popup_close_button_padding.unit;
    //   styleButtonClose.paddingLeft = rootElementSettings.popup_close_button_padding.left + rootElementSettings.popup_close_button_padding.unit;
    // }

    // if(rootElementSettings.popup_close_button_border_type && rootElementSettings.popup_close_button_border_type !== "none") {
    //   styleButtonClose.borderTopWidth = rootElementSettings.popup_close_button_border_width.top + rootElementSettings.popup_close_button_border_width.unit;
    //   styleButtonClose.borderRightWidth = rootElementSettings.popup_close_button_border_width.right + rootElementSettings.popup_close_button_border_width.unit;
    //   styleButtonClose.borderBottomWidth = rootElementSettings.popup_close_button_border_width.bottom + rootElementSettings.popup_close_button_border_width.unit;
    //   styleButtonClose.borderLeftWidth = rootElementSettings.popup_close_button_border_width.left + rootElementSettings.popup_close_button_border_width.unit;
    //   styleButtonClose.borderStyle = rootElementSettings.popup_close_button_border_type;
    //   if(rootElementSettings.popup_close_button_border_color && rootElementSettings.popup_close_button_border_color.colorPickedHex)
    //     styleButtonClose.borderColor = rootElementSettings.popup_close_button_border_color.colorPickedHex;
    // }
    
    // if(rootElementSettings.popup_close_button_border_radius) {
    //   let borderRadiusTop = (rootElementSettings.popup_close_button_border_radius.top ? rootElementSettings.popup_close_button_border_radius.top : "0") + rootElementSettings.popup_close_button_border_radius.unit;
    //   let borderRadiusRight = (rootElementSettings.popup_close_button_border_radius.right ? rootElementSettings.popup_close_button_border_radius.right : "0") + rootElementSettings.popup_close_button_border_radius.unit;
    //   let borderRadiusBottom = (rootElementSettings.popup_close_button_border_radius.bottom ? rootElementSettings.popup_close_button_border_radius.bottom : "0") + rootElementSettings.popup_close_button_border_radius.unit;
    //   let borderRadiusLeft = (rootElementSettings.popup_close_button_border_radius.left ?  rootElementSettings.popup_close_button_border_radius.left  : "0")+ rootElementSettings.popup_close_button_border_radius.unit;
    //   styleButtonClose.borderRadius = `${borderRadiusTop} ${borderRadiusRight} ${borderRadiusBottom} ${borderRadiusLeft}`;
    // }

    // if(rootElementSettings.popup_close_button_background_color) {
    //   styleButtonClose.backgroundColor = rootElementSettings.popup_close_button_background_color.colorPickedHex;
    // }

    // if(rootElementSettings.popup_close_button_box_shadow) {
    //   let type = rootElementSettings.popup_close_button_box_shadow.type;
    //   let offsetX = rootElementSettings.popup_close_button_box_shadow.horizontal;
    //   let offsetY = rootElementSettings.popup_close_button_box_shadow.vertical;
    //   let blurRadius = rootElementSettings.popup_close_button_box_shadow.blur;
    //   let spreadRadius = rootElementSettings.popup_close_button_box_shadow.spread;
    //   let color = rootElementSettings.popup_close_button_box_shadow.colorPickedHex;
    //   styleButtonClose.boxShadow = `${type} ${offsetX}px ${offsetY}px ${blurRadius}px ${spreadRadius} ${color}`;
    // }

    let content = "";
    const closeButtonCondition = rootElementSettings.switcher_close_button_popup_layout || true;
    let {popup_close_icon_alignment} = rootElementSettings;
    popup_close_icon_alignment = popup_close_icon_alignment || 'right';
    const closeButton = closeButtonCondition ? (
      <button
        className={
          "popup-close-button" +
          (popup_close_icon_alignment === "right" ? " popup-close-button-right" : " popup-close-button-left")
        }
        onClick={() => {
          this.setState({ isVisible: false });
          this.props.closePopup()
        }}
      >
        <AltrpImage
          image={rootElementSettings.popup_close_icon}
          lazy={false}
          default={{
            assetType: "icon",
            name: "deleteOne",
            url: "/img/nullImage.png"
          }}
          className="popup-close-button-icon"
        />
      </button>
    ) : null;

    let maxHeight = "100%";

    if(rootElementSettings.height_popup_layout === "custom") {
      maxHeight = Number(rootElementSettings.height_custom_popup_layout.size) || 0;
    }

    const popup = (
      isVisible ?
        <FrontPopupWrapper 
          settings = {rootElementSettings}
          className={classes.join(' ')}
          onClick={() => {
            if(rootElementSettings.popup_close_click_on_dark_area === undefined || rootElementSettings.popup_close_click_on_dark_area){
              this.setState({ isVisible: false });
              this.props.closePopup()
            }
          }}
        >
            <div className="popup-window"
                 // style={{ top: positioning_custom_top.size + positioning_custom_top.unit}}
                 onClick={e => e.stopPropagation()}
            >

              {closeButton}
              
              <Scrollbars
                autoHide
                autoHeight
                renderThumbHorizontal={props => <div {...props} className="popup-scrollbar-vertical"/>}
                renderTrackHorizontal={() => <div className="popup-scrollbar-track-horizontal"/>}
                renderTrackVertical={(props) => <div {...props} className="popup-scrollbar-track-vertical"/>}
                className="popup-scrollbar"
                autoHeightMin={100}
                autoHeightMax={maxHeight}
                autoHideTimeout={1000}
                autoHideDuration={200}
              >
                <div  className="popup-content">
                  {React.createElement(rootElement.componentClass,
                    {
                      element: rootElement,
                      children: rootElement.children
                    })}
                </div>
              </Scrollbars>
            </div>
        </FrontPopupWrapper>
        : null
    );
    const type = rootElementSettings.type_popup || "popup";
    switch (type) {
      case "popup":
        
        content = popup;
        break;
      case "offcanvas":
        content = <AltrpOffcanvas
          close={this.close}
          show={this.state.isVisible}
          settings={rootElementSettings}
          template={rootElement}
        />;
        break
    }
    return content
  }
}

const mapStateToProps = state => {
  return {
    scrollPosition: state.scrollPosition,
    popupTrigger: state.popupTrigger
  }
};

const mapDispatchToProps = dispatch => {
  return {
    closePopup: () => dispatch(togglePopup(null))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(FrontPopup);


