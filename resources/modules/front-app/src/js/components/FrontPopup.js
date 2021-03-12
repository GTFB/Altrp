import React, { Component } from "react";
import connect from "react-redux/es/connect/connect";
import { Scrollbars } from "react-custom-scrollbars";
import AltrpOffcanvas from "./altrp-offcanvas/AltrpOffcanvas";
import { togglePopup } from "../store/popup-trigger/actions";
import AltrpImage from "../../../../editor/src/js/components/altrp-image/AltrpImage";

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
    const { positioning_custom_top } = this.props.template.data.settings;
    let rootElement = this.state.rootElement;
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

    let content = "";
    const closeButtonCondition = rootElementSettings.switcher_close_button_popup_layout || true;
    let {position_close_button_popup_layout} = rootElementSettings;
    position_close_button_popup_layout = position_close_button_popup_layout || 'right';
    const closeButton = closeButtonCondition ? (
      <button
        className={
          "popup-close-button" +
          (position_close_button_popup_layout === "right" ? " popup-close-button-right" : " popup-close-button-left")
        }
        onClick={() => {
          this.setState({ isVisible: false });
          this.props.closePopup()
        }}
      >
        <AltrpImage
          image={rootElementSettings.icon_close_button_popup_layout}
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
        <div
          className={classes.join(' ')}
          onClick={() => {
            this.setState({ isVisible: false });
            this.props.closePopup()
          }}
        >
            <div className="popup-window"
                 // style={{ top: positioning_custom_top.size + positioning_custom_top.unit}}
                 onClick={e => e.stopPropagation()}
            >
              {
                closeButton
              }
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
        </div>
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
