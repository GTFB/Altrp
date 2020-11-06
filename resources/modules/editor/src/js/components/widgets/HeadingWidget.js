import React, { Component } from "react";
import AltrpLink from "../altrp-link/AltrpLink";
import {isEditor, parseURLTemplate} from "../../../../../front-app/src/js/helpers";
import "../../../sass/altrp-heading.scss";

class HeadingWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: props.element.getSettings()
    };
    props.element.component = this;
    if (window.elementDecorator) {
      window.elementDecorator(this);
    }
  }
  render() {
    let modelData = this.props.element.hasCardModel()
        ? this.props.element.getCardModel().getData()
        : this.props.currentModel.getData();
    const  background_image = this.props.element.getSettings('background_image', {});
    let text = this.getContent('text');
    let link;
    const className = "altrp-heading altrp-heading--link " +
      + this.state.settings.position_css_classes + (background_image.url ? ' altrp-background-image' : '');

    if (this.state.settings.link_link && this.state.settings.link_link.url) {
      let linkProps = {
        rel: this.state.settings.link_link.noFollow ? "nofollow" : null,
        href: this.state.settings.link_link.url,
        className: 'altrp-inherit',
      };
      let tag = 'a';
      if(this.state.settings.link_link.openInNew){
        linkProps.target = '_black';
      }
      if ((this.state.settings.link_link.tag === 'Link') && ! isEditor()) {
        tag = AltrpLink;
        linkProps.to = this.state.settings.link_link.url.replace(':id', this.getModelId() || '');
        if(_.isObject(modelData)){
          linkProps.to = parseURLTemplate(this.state.settings.link_link.url, modelData);
        }
      }
      if(isEditor()){
        linkProps.onClick = e => {e.preventDefault()}
      }
      link = React.createElement(tag, { ...linkProps, }, text);
    } else if (this.state.settings.creative_link_link && this.state.settings.creative_link_link.url && this.state.settings.heading_settings_html_tag !== "p") {
      link = <AltrpLink
        link={this.state.settings.creative_link_link}
        className="altrp-inherit"
        creativeLink={this.getContent("creative_link_controller")}
      >
        {
          text
        }
      </AltrpLink>
    }

    let advancedHeading = "";
    if(this.state.settings.switch_advanced_heading_content) {
      let styles = {};

      let xOffset = this.getContent("horizontal_offset_advanced_heading_content");
      let yOffset = this.getContent("vertical_offset_advanced_heading_content");
      let rotate = this.getContent("rotate_offset_advanced_heading_content");
      let transformOrigin = this.getContent("transform_origin_offset_advanced_heading_content");

      if(xOffset.size === "") {
        xOffset.size = "0";
      }
      if(yOffset.size === "") {
        yOffset.size = "0";
      }
      if(rotate.size === "") {
        rotate.size = "0"
      }

      let origin = "0 0";

      switch (transformOrigin) {
        case "topLeft":
          origin = "0 0";
          break;
        case "topCenter":
          origin = "50% 0";
          break;
        case "topRight":
          origin = "100% 0";
          break;
        case "centerLeft":
          origin = "0 50%";
          break;
        case "center":
          origin = "50% 50%";
          break;
        case "centerRight":
          origin = "100% 50%";
          break;
        case "bottomLeft":
          origin = "0 100%";
          break;
        case "bottomCenter":
          origin = "50% 100%";
          break;
        case "bottomRight":
          origin = "100% 100%";
          break;
      }

      let pos = {
        transform: `translate(${xOffset.size+xOffset.unit}, ${yOffset.size+yOffset.unit}) rotate(${rotate.size}deg)`,
        transformOrigin: origin
      };

      styles = {...pos};

      let classes = "altrp-heading-advanced";

      if(this.props.element.getSettings("main_fill_advanced_heading_style")) {
        classes += " altrp-heading-advanced-main-fill"
      }
      advancedHeading = (
        <div className="altrp-heading-advanced-wrapper">
          <div className={classes} style={styles}>
            {
              this.getContent("text_advanced_heading_content")
            }
          </div>
        </div>
      );

      let currentBreakpoint = {};
      switch (this.getContent("hide_at_offset_advanced_heading_content")) {
        case "never":
          currentBreakpoint = {
            type: "never",
            size: 0
          };
          break;
        case "mobile":
          currentBreakpoint = {
            type: "mobile",
            size: 768
          };
          break;
        case "tablet":
          currentBreakpoint = {
            type: "tablet",
            size: 1025
          };
          break;
        default:
      }

      if(this.getContent("hide_at_offset_advanced_heading_content") !== "never") {
        let bodyWidth = document.body.offsetWidth;

        if(isEditor()) {
          bodyWidth = document.getElementById("editorWindow").offsetWidth
        }

        if(bodyWidth <= currentBreakpoint.size) {
          advancedHeading = ""
        }
      }
    }

    let headingContainer = link ?
      React.createElement(
        this.state.settings.heading_settings_html_tag || 'h2',
        {
          className,
          id: this.state.settings.position_css_id || "",
        },
        link):
      React.createElement(
        this.state.settings.heading_settings_html_tag || 'h2',
        {
          className,
          id: this.state.settings.position_css_id || "",
          dangerouslySetInnerHTML: { __html: text }
        },
        // this.state.settings.switch_advanced_heading_content ? advancedHeading : ""
      );

    return (
      <div className="altrp-heading-wrapper">
        {
          advancedHeading
        }
        {
          headingContainer
        }
      </div>
    )
  }
}

export default HeadingWidget
