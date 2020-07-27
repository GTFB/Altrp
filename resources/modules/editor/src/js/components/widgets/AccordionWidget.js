import React, {Component} from "react";

import { renderAssetIcon } from "../../helpers"

class AccordionWidget extends Component {
  constructor(props){
    super(props);
    this.state = {
      settings: props.element.getSettings(),
      activeItem: 0
    };
    this.open = this.open.bind(this);
    props.element.component = this;
    if(window.elementDecorator){
      window.elementDecorator(this);
    };
  }

  componentDidUpdate(previousProps, previousState) {
    if(Number(this.state.settings.active_item_additional_content) !== previousState.activeItem) {
      this.setState(() => ({
        activeItem: Number(this.state.settings.active_item_additional_content)
      }));
    }
  }

  open(e) {
    let activeItem = Number(e.currentTarget.dataset.key) || 0;

    this.setState((state) => ({
      ...state,
      activeItem
    }));
  };

  render(){
    let items = this.state.settings.repeater_accordion_content || []
    let icon = "";
    let active_icon = "";

    if(this.state.settings.icon_accordion_content) {
      icon = renderAssetIcon(this.state.settings.icon_accordion_content,
        {className: "altrp-accordion-item-icon-svg"}
        );
    };

    if(this.state.settings.active_icon_accordion_content) {
      active_icon = renderAssetIcon(this.state.settings.active_icon_accordion_content,
        {className: "altrp-accordion-item-active-icon-svg"}
      );
    };

    let accordion_items = items.map((item, idx) => {

      return (
        <div className="altrp-accordion-item" key={idx}>
          {/*button*/}
          <div className="altrp-accordion-item-button" data-key={idx} onClick={(e) => this.open(e)}>
            <div className="altrp-accordion-item-label-container">
              {
                React.createElement(
                  this.state.settings.title_html_tag_accordion_content,
                  {
                    className: "altrp-accordion-item-label"
                  },
                  [item.title_repeater]
                )
              }
            </div>
            {/*icon*/}
            <div className="altrp-accordion-item-icon">
              {this.state.activeItem === idx ? active_icon : icon}
            </div>
          </div>
          {/*content*/}
          {
            React.createElement("div", {
              className: "altrp-accordion-item-content" + (this.state.activeItem === idx ?
                  " altrp-accordion-item-content-show"
                  :
                  ""
              )
              ,
              dangerouslySetInnerHTML: {
                __html: item.wysiwyg_repeater
              },
              "data-item": idx
            })
          }
        </div>
      )
    });

    return <div className="altrp-accordion">
      {
        accordion_items
      }
    </div>
  }
}

export default AccordionWidget
