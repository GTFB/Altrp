import React, {Component} from 'react';
import {isEditor} from "../../../../../front-app/src/js/helpers";
import {Link} from "react-router-dom";

class BasicLink extends Component {
  render() {
    let classes = this.props.className;

    let settings = {
      attributes: "",
      openInNew: false,
      noFollow: false,
      url: "/",
      tag: this.props.tag || "a",
      to: this.props.to || _.get(this,'props.link.url', '/'),
      href: this.props.href || _.get(this,'props.link.url', '/'),
      toPrevPage: false
    };
    if(this.props.link) {
      settings = {
        ...settings,
        ...this.props.link
      }
    }

    let rel = "";
    if(settings.noFollow) {
      rel = "noFollow"
    }

    let styleChildren = {};

    if(this.props.style) {
      styleChildren = this.props.style
    }

    let className = classes;

    if(this.props.classlink) {
      className += " altrp-link" + " " + this.props.classlink
    }

    const children = !settings.creativeLink ? React.createElement("span", {
      className: "altrp-inherit",
      dangerouslySetInnerHTML: { __html: this.props.children }
    }) : ( this.props.children );

    return settings.tag === "a" ? (
      <a
        {...this.props}
        href={settings.href}
        rel={rel}
        style={styleChildren}
        className={className}
        onClick={isEditor() ? (e) => e.preventDefault() : () => {}}
      >
        {
          children
        }
      </a>
    ) : (
      <Link
        {...this.props}
        style={styleChildren}
        className={className}
        onClick={isEditor() ? (e) => e.preventDefault() : () => {}}
        to={settings.to}
      >
        {
          children
        }
      </Link>
    )
  }
}

export default BasicLink;
