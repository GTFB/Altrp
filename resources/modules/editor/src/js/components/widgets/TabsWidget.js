import React, {Component} from "react";
import { renderAssetIcon } from "../../helpers"

class TabsWidget extends Component {
  constructor(props){
    super(props);
    this.show = this.show.bind(this)
    this.state = {
      settings: props.element.getSettings()
    };
    props.element.component = this;
    if(window.elementDecorator){
      window.elementDecorator(this);
    }
  }

  show(e) {
    let button = e.currentTarget;
    let collectionTabs = button.parentNode.parentNode.getElementsByClassName("altrp-tab-content")[0];
    let currentTab = collectionTabs.children[button.dataset.key];

    for(let i = 0; i < collectionTabs.children.length; i++) {
      collectionTabs.children[i].classList.remove("altrp-tab-show")
    }

    currentTab.classList.add("altrp-tab-show")
  }

  render(){

    let buttonClasses = ""

    switch (this.state.settings.layout_tabs) {
      case "top":
        buttonClasses = " altrp-tab-btn-column altrp-tab-btn-top"
        break
      case "bottom":
        buttonClasses = " altrp-tab-btn-column altrp-tab-btn-bottom"
        break
      case "left":
        buttonClasses = " altrp-tab-btn-row altrp-tab-btn-left"
        break
      case "right":
        buttonClasses = " altrp-tab-btn-row altrp-tab-btn-right"
        break
    }

    let tabs = <div></div>;
    if(this.state.settings.items_tabs) {;
      tabs = this.state.settings.items_tabs.map((tab, idx) => {

        let iconStyles = {}

        if(this.state.settings.alignment_icon_style == "left") {
          iconStyles = {paddingRight: this.state.settings.spacing_icon_style.size + this.state.settings.spacing_icon_style.unit}
        } else {
          iconStyles = {paddingLeft: this.state.settings.spacing_icon_style.size + this.state.settings.spacing_icon_style.unit}
        }

        let icon = null;
        if(tab.icon_items) {
          icon = <div className="altrp-tab-btn-icon" style={iconStyles}>{renderAssetIcon( tab.icon_items, {
          })}</div>
        }

        return<button data-key={idx} className={"altrp-tab-btn" + buttonClasses} onClick={this.show} key={idx}>{this.state.settings.alignment_icon_style == "left" ? icon : null}<p>{tab.title_and_content_items}</p>{this.state.settings.alignment_icon_style == "right" ? icon : null}</button>
      });
    };

    let tabWrapper = <div></div>;
    if(this.state.settings.items_tabs) {
      tabWrapper = this.state.settings.items_tabs.map((tab, idx) => {
        let show = "";
        if(idx == 0) {
          show = "altrp-tab-show";
        }

        return<div data-key={idx} className={"altrp-tab " + show} key={idx}>{tab.wysiwyg_items}</div>
      });
    };

    let tabsStyles = "";

    if(this.state.settings.layout_tabs == "left") {
      tabsStyles = " altrp-tabs-left"
    }
    if(this.state.settings.layout_tabs == "right") {
      tabsStyles = " altrp-tabs-right"
    }

    return <div className={"altrp-tabs altrp-tabs" + tabsStyles}>
      {
        this.state.settings.layout_tabs == "top" || this.state.settings.layout_tabs == "left" ? <div className="altrp-tab-btn-container">{tabs}</div> : null
      }
      <div className="altrp-tab-content">
        {tabWrapper}
      </div>
      {
        this.state.settings.layout_tabs == "bottom" || this.state.settings.layout_tabs == "right" ? <div className="altrp-tab-btn-container">{tabs}</div> : null
      }
    </div>
  }
}

export default TabsWidget



