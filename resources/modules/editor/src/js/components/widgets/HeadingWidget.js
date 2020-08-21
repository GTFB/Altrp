import React, { Component } from "react";
import { Link } from 'react-router-dom'
import {isEditor} from "../../../../../front-app/src/js/helpers";
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
    let text = this.getContent('text');
    if (this.state.settings.link_link && this.state.settings.link_link.url) {
      let linkProps = {
        rel: this.state.settings.link_link.noFollow ? "nofollow" : null,
        href: this.state.settings.link_link.url,
      };
      let tag = 'a';
      if ((this.state.settings.link_link.tag === 'Link') && ! isEditor()) {
        tag = Link;
        linkProps.to = this.state.settings.link_link.url.replace(':id', this.getModelId() || '')
      }
      if(isEditor()){
        linkProps.onClick = e => {e.preventDefault()}
      }
      text = React.createElement(tag, linkProps, text);
    }
    let headingContainer = React.createElement(this.state.settings.heading_settings_html_tag || 'h2', { className: "altrp-heading altrp-heading--link " + this.state.settings.position_css_classes, id: this.state.settings.position_css_id || "", },
      text);


    return headingContainer
  }
}

export default HeadingWidget
