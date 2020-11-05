import React, {Component} from 'react';
import AltrpImage from "../altrp-image/AltrpImage";
import AltrpLink from "../altrp-link/AltrpLink";

class IconWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: props.element.getSettings(),
    };
    props.element.component = this;
    if (window.elementDecorator) {
      window.elementDecorator(this);
    }
  }

  render() {
    let label = React.createElement(this.state.settings.html_tag_additional_options_content || "h3", {
        className: "altrp-icon-body-label"
      },
      this.state.settings.label_icon_box_content
    );

    let bodyContent;

    if(this.state.settings.switch_link_icon_box_content && !this.state.settings.global_link_additional_options_content) {
      bodyContent = (
        <AltrpLink className="altrp-icon-body-link" link={this.state.settings.link_icon_box_content}>
          {
            label
          }
        </AltrpLink>
      )
    } else {
      bodyContent = (
        <div className="altrp-icon-body-link" >
          {
            label
          }
        </div>
      )
    }

    //indicator
    let indicator = "";

    if(this.state.settings.indicator_additional_options_content) {
      let pos = {};

      let x = this.state.settings.horizontal_offset_indicator_content;
      let y = this.state.settings.vertical_offset_indicator_content;
      let rotate = this.state.settings.rotate_indicator_content;

      if(x.size === "") {
        x.size = "0";
      }
      if(y.size === "") {
        y.size = "0";
      }
      if(rotate.size === "") {
        rotate.size = "0"
      }

      pos = {
        transform: `translate(${x.size+x.unit}, ${y.size+y.unit}) rotate(${rotate.size}deg)`
      };

      indicator = <AltrpImage
        default={{
          assetType: "icon",
          name: "arrow",
          iconComponent: iconsManager().renderIcon("arrow")
        }}
        style={pos}
        image={this.state.settings.icon_indicator_content}
        className="altrp-icon-indicator"
      />
    }

    //badge
    let badge = "";
    if(this.state.settings.badge_additional_options_content) {

      let badgeClasses = "altrp-icon-badge";

      switch (this.state.settings.position_badge_content) {
        case "topLeft":
          badgeClasses += " altrp-icon-badge-top-left";
          break;
        case "topCenter":
          badgeClasses += " altrp-icon-badge-top-center";
          break;
        case "topRight":
          badgeClasses += " altrp-icon-badge-top-right";
          break;
        case "centerLeft":
          badgeClasses += " altrp-icon-badge-center-left";
          break;
        case "center":
          badgeClasses += " altrp-icon-badge-center";
          break;
        case "centerRight":
          badgeClasses += " altrp-icon-badge-center-right";
          break;
        case "bottomLeft":
          badgeClasses += " altrp-icon-badge-bottom-left";
          break;
        case "bottomCenter":
          badgeClasses += " altrp-icon-badge-bottom";
          break;
        case "bottomRight":
          badgeClasses += " altrp-icon-badge-bottom-right";
          break;
      }

      let pos = {};

      let x = this.state.settings.horizontal_offset_badge_content;
      let y = this.state.settings.vertical_offset_badge_content;
      let rotate = this.state.settings.rotate_badge_content;

      if(x.size === "") {
        x.size = "0";
      }
      if(y.size === "") {
        y.size = "0";
      }
      if(rotate.size === "") {
        rotate.size = "0"
      }

      pos = {
        transform: `translate(${x.size+x.unit}, ${y.size+y.unit}) rotate(${rotate.size}deg)`
      };

      badge = (
        <div className={badgeClasses} style={pos}>
          {
            this.state.settings.text_badge_content
          }
        </div>
      )
    }

    //style for altrp-icon-body, altrp-icon-footer
    let bodyStyles = {};
    let footerStyles = {};
    let headerStyles = {};
    let bodyAlignment = this.state.settings.header_alignment_content_style;
    let footerAligment = this.state.settings.description_alignment_content_style;

    switch (this.state.settings.icon_position_desktop_position_style) {
      case "row":
        if(!bodyAlignment) {
          bodyStyles = {
            justifyContent: "flex-start"
          };
        }
        if(!footerAligment) {
          footerStyles = {
            justifyContent: "flex-start"
          };
        }
        headerStyles = {
          marginLeft: 0,
          marginBottom: 0
        };
        break;
      case "column":
        if(!bodyAlignment) {
          bodyStyles = {
            justifyContent: "center"
          };
        }
        if(!footerAligment) {
          footerStyles = {
            justifyContent: "center"
          };
        }
        headerStyles = {
          marginLeft: 0,
          marginRight: 0
        };
        break;
      case "row-reverse":
        if(!bodyAlignment) {
          bodyStyles = {
            justifyContent: "flex-end"
          };
        }
        if(!footerAligment) {
          footerStyles = {
            justifyContent: "flex-end"
          };
        }
        headerStyles = {
          marginRight: 0,
          marginBottom: 0
        };
        break
    }

    //read more
    let readMore = "";
    if(this.state.settings.read_more_button_additional_options_content) {

      let ReadMoreIcon = (props) => Object.keys(this.state.settings.icon_read_more_content).length !== 0 ? (
        <AltrpImage
          image={this.state.settings.icon_read_more_content}
          className={"altrp-icon-read-more-icon" + " altrp-icon-read-more-icon-" + props.pos}
        />
      ) : "";

      let readMorePosOnHover = {};

      if(this.state.settings.show_on_hover_additional_options_content) {
        let x = this.state.settings.horizontal_offset_additional_options_content;
        let y = this.state.settings.vertical_offset_additional_options_content;

        if(x.size === "") {
          x.size = "0";
        }
        if(y.size === "") {
          y.size = "0";
        }
        readMorePosOnHover = {
          transform: `translate(${x.size+x.unit}, ${y.size+y.unit})`
        }
      }

      let readMoreContent = (
        <React.Fragment>
          {
            this.state.settings.icon_position_additional_options_content === "left" ? <ReadMoreIcon pos="left" /> : ""
          }
          {
            this.state.settings.text_read_more_content
          }
          {
            this.state.settings.icon_position_additional_options_content === "right" ? <ReadMoreIcon pos="right" /> : ""
          }
        </React.Fragment>
      );

      let readMoreLink = (
        <AltrpLink className="altrp-icon-read-more-link" link={this.state.settings.link_read_more_content}>
          {
            readMoreContent
          }
        </AltrpLink>
      );

      let readMoreNoLink = (
        <div className="altrp-icon-read-more-link">
          {
            readMoreContent
          }
        </div>
      );

      readMore = (
        <div style={{...readMorePosOnHover, ...bodyStyles}} className={"altrp-icon-read-more" + (this.state.settings.show_on_hover_additional_options_content ? " altrp-icon-read-more-on-hover" : "")}>
          {
            this.state.settings.global_link_additional_options_content ? readMoreNoLink : readMoreLink
          }
        </div>
      )
    }

    let iconContent = (
      <div className="altrp-icon">
        <div className="altrp-icon-header" style={headerStyles}>
          <div className="altrp-icon-i-wrapper">
            <AltrpImage
              image={this.state.settings.media_icon_box_content}
              default={{
                assetType: "icon",
                name: 'star',
                iconComponent: iconsManager().renderIcon('star')
              }}
              className={"altrp-icon-i"}
            />
          </div>
        </div>
        <div className="altrp-icon-content">
          <div className="altrp-icon-body" style={bodyStyles}>
            {
              bodyContent
            }
          </div>
          <div className="altrp-icon-footer" style={footerStyles}>
            <p className="altrp-icon-footer-text">
              {
                this.state.settings.description_icon_box_content
              }
            </p>
          </div>
          {
            readMore
          }
        </div>

        {
          indicator
        }
        {
          badge
        }
      </div>
    );

    let iconContentLink = (
      <AltrpLink className="altrp-icon-global-link" link={this.state.settings.global_link_link_additional_options_content}>
        {
          iconContent
        }
      </AltrpLink>
    );

    return this.state.settings.global_link_additional_options_content ? iconContentLink : iconContent
  }
}

export default IconWidget;
