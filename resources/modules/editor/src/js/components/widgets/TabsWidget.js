import React, {Component} from "react";
import { renderAssetIcon, renderAsset } from "../../helpers"

class TabsWidget extends Component {
  constructor(props){
    super(props);
    this.show = this.show.bind(this)
    this.switcher = this.switcher.bind(this)
    this.state = {
      settings: props.element.getSettings(),
      switcher: false
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

  switcher() {
    this.setState({switcher: !this.state.switcher});
  }

  render(){
    let tab = null;

    if(this.state.settings.type_type == "tabs") {
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
      tab = <div className={"altrp-tabs" + tabsStyles}>
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
    } else {

      let switcherClasses=`altrp-tabs-switcher altrp-tabs-switcher_${ this.state.switcher ? 'on' : 'off' }`;

      let sectionOne = null;
      switch (this.state.settings.type_section_one) {
        case "image":
          let media = {...this.state.settings.media_section_one};
          media.url = media.url || '/img/nullImage.png';
          media.name = media.name || 'null';
          media.assetType = media.assetType || undefined;
          sectionOne = renderAsset(media, {
            className: "altrp-tabs-switcher-section-one-img altrp-tabs-switcher-section-img"
          })
          break
        case "text":
          sectionOne = React.createElement('div', {
            className: "altrp-tabs-switcher-section-one-text altrp-tabs-switcher-section-text",
            dangerouslySetInnerHTML: {
              __html: this.state.settings.wysiwyg_section_one
            },
          })
          break
      }

      let sectionTwo = null;
      switch (this.state.settings.type_section_two) {
        case "image":
          let media = {...this.state.settings.media_section_two};
          media.url = media.url || '/img/nullImage.png';
          media.name = media.name || 'null';
          media.assetType = media.assetType || undefined;
          sectionTwo = renderAsset(media, {
            className: "altrp-tabs-switcher-section-two-img altrp-tabs-switcher-section-img"
          })
          break
        case "text":
          sectionTwo = React.createElement('div', {
            className: "altrp-tabs-switcher-section-two-text altrp-tabs-switcher-section-text",
            dangerouslySetInnerHTML: {
              __html: this.state.settings.wysiwyg_section_two
            },
          })
          break
      }

      tab = <div className="altrp-tabs">
        <div className="altrp-tabs-switcher-container">
        <div className="altrp-tabs-switcher-label altrp-tabs-switcher-label-section-one">{this.state.settings.title_section_one}</div>

          <div className={switcherClasses} onClick={this.switcher}>
            <div className="altrp-tabs-switcher__caret"/>
          </div>

        <div className="altrp-tabs-switcher-label altrp-tabs-switcher-label-section-two">{this.state.settings.title_section_two}</div>
        </div>

        <div className="altrp-tabs-switcher-wrapper">
          {
            !this.state.switcher ?
              <div className="altrp-tabs-switcher-section-one">
                {
                  sectionOne
                }
              </div>
              :
              <div className="altrp-tabs-switcher-section-two">
                {
                  sectionTwo
                }
              </div>

          }

        </div>
      </div>
    }



    return tab
  }
}

export default TabsWidget



