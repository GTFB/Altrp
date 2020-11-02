import React, {Component} from 'react';
import AltrpImage from "../altrp-image/AltrpImage";
import {iconsManager} from "../../helpers";
import AltrpLink from "../altrp-link/AltrpLink";
import AltrpMenu from "../altrp-menu/AltrpMenu";

class IconWidget extends Component {
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
    let label = React.createElement(this.state.settings.html_tag_additional_options_content || "h3", {
        className: "altrp-icon-body-label"
      },
      this.state.settings.label_icon_box_content
    );

    let bodyContent = label;
    if(this.state.settings.switch_link_icon_box_content) {
      bodyContent = (
        <AltrpLink className="altrp-icon-body-link" link={this.state.settings.link_icon_box_content}>
          {
            label
          }
        </AltrpLink>
      )
    }

    let readMore = "";
    let readMoreIcon = <AltrpImage
      image={this.state.settings.icon_read_more_content}
    />;

    if(this.state.settings.read_more_button_additional_options_content) {
      readMore = (
        <div className="altrp-icon-read-more">
          <AltrpLink className="altrp-icon-read-more-link" link={this.state.settings.link_read_more_content}>
            {
              this.state.settings.icon_position_additional_options_content === "left" ? readMoreIcon : ""
            }
            {
              this.state.settings.text_read_more_content
            }
            {
              this.state.settings.icon_position_additional_options_content === "right" ? readMoreIcon : ""
            }
          </AltrpLink>
        </div>
      )
    }

    return (
      <div className="altrp-icon">
        <div className="altrp-icon-header">
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
        <div className="altrp-icon-body">
          {
            bodyContent
          }
        </div>
        <div className="altrp-icon-footer">
          <p>
            {
              this.state.settings.description_icon_box_content
            }
          </p>
        </div>
        {
          readMore
        }
      </div>
    );
  }
}

export default IconWidget;
