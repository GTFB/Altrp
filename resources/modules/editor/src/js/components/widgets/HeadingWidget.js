import React, { Component } from "react";
import AltrpLink from "../altrp-link/AltrpLink";
import {isEditor, parseURLTemplate} from "../../../../../front-app/src/js/helpers";
import "../../../sass/altrp-heading.scss";
import Animating from "../altrp-heading/Animating";

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
    if(props.baseRender){
      this.render = props.baseRender(this);
    }
  }

  render() {

    let heading = <div>
      Loading...
    </div>;

    switch (this.props.element.getSettings("type", 'heading')) {
      case "heading":

        let modelData = this.props.element.getCurrentModel().getData();
        const  background_image = this.props.element.getSettings('background_image', {});
        let text = this.getContent('text');
        let link;
        const className = "altrp-heading altrp-heading--link " +
          + this.state.settings.position_css_classes + (background_image.url ? ' altrp-background-image' : '');
        let wrapperClasses = "altrp-heading-wrapper";

        //sub heading
        const subTag = this.state.settings.sub_heading_settings_html_tag || "h2";
        let subHeading = "";
        if(this.state.settings.text_sub_switch) {
          const subText = this.getContent('text_sub');

          switch (this.getContent("sub_heading_settings_position")) {
            case "top":
              wrapperClasses += " altrp-heading-wrapper-sub-top";
              break;
            case "left":
              wrapperClasses += " altrp-heading-wrapper-sub-left";
              break;
            case "right":
              wrapperClasses += " altrp-heading-wrapper-sub-right";
              break;
            default:
              wrapperClasses += " altrp-heading-wrapper-sub-bottom";
          }
          subHeading = React.createElement(subTag, {
            dangerouslySetInnerHTML: { __html: subText },
            className: "altrp-heading-sub"
          })
        }

        if (this.state.settings.link_link && this.state.settings.link_link.url) {
          let linkProps = {
            rel: this.state.settings.link_link.noFollow ? "nofollow" : null,
            href: this.state.settings.link_link.url,
            className: 'altrp-inherit',
          };

          linkProps.tag = this.state.settings.link_link.tag;
          linkProps.creativelink = this.getContent("heading_settings_html_tag") !== "p" ? this.getContent("creative_link_controller") : null;

          if(this.state.settings.link_link.openInNew){
            linkProps.target = '_black';
          }
          if ((this.state.settings.link_link.tag === 'Link') && ! isEditor()) {
            linkProps.to = this.state.settings.link_link.url.replace(':id', this.getModelId() || '');
            linkProps.href = this.state.settings.link_link.url.replace(':id', this.getModelId() || '');
          }
          if(_.isObject(modelData)){
            linkProps.to = parseURLTemplate(this.state.settings.link_link.url, modelData);
            linkProps.href = parseURLTemplate(this.state.settings.link_link.url, modelData);
          }
          if(isEditor()){
            linkProps.onClick = e => {e.preventDefault()}
          }
          link = (
            <AltrpLink {...linkProps}>
              {
                text
              }
            </AltrpLink>
          )
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
              {
                React.createElement(this.state.settings.heading_settings_html_tag || 'h2', {
                  className: classes,
                  style: styles,
                  dangerouslySetInnerHTML: { __html:  this.getContent("text_advanced_heading_content") }
                })
              }
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
          <React.Fragment>
            {
              React.createElement(
                this.state.settings.heading_settings_html_tag || 'h2',
                {
                  className,
                  id: this.state.settings.position_css_id || "",
                },
                link
              )
            }
            {
              this.state.settings.text_sub_switch && React.createElement(subTag, {
                  className: "altrp-heading-sub-container-link altrp-heading-sub"
                }, (
                  React.createElement(AltrpLink, {
                    link: this.state.settings.link_link,
                    dangerouslySetInnerHTML: { __html: this.state.settings.text_sub},
                    className: "altrp-inherit"
                  })
                )
              )
            }
          </React.Fragment>
          :
          <React.Fragment>
            {
              React.createElement(
                this.state.settings.heading_settings_html_tag || 'h2',
                {
                  className,
                  id: this.state.settings.position_css_id || "",
                  dangerouslySetInnerHTML: { __html: text }
                },
                // this.state.settings.switch_advanced_heading_content ? advancedHeading : ""
              )
            }
            {
              subHeading
            }
          </React.Fragment>;
      heading = (
        <div className={wrapperClasses}>
          {
            advancedHeading
          }
          {
            headingContainer
          }
        </div>
      );
      break;
      case "animating": {
        heading = <Animating settings={this.state.settings} />
      }
    }

    return heading
  }
}

export default HeadingWidget
