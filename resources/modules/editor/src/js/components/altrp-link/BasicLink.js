import React, {Component} from 'react';
import isEditor from "../../../../../front-app/src/js/functions/isEditor";
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

    if(this.props.rel === "nofollow") {
      settings.noFollow = true
    }

    let rel = "";
    if(settings.noFollow) {
      rel = "noFollow"
    }

    let target = null;

    if(this.props.target === "_black") {
      target = "_black"
    }

    let styleChildren = {};

    if(this.props.style) {
      styleChildren = this.props.style
    }

    let className = classes;

    if(this.props.classlink) {
      className += " altrp-link" + " " + this.props.classlink
    }

    let children = this.props.children;

    if(this.props.dangerouslySetInnerHTMLCondition || settings.creativeLink === false) {
      children = React.createElement("span", {
        className: "altrp-inherit",
        dangerouslySetInnerHTML: { __html: this.props.children }
      });
    }

    return settings.tag === "a" ? (
      <a
        href={settings.href}
        rel={rel}
        target={target}
        style={styleChildren}
        className={className}
        onClick={isEditor() ? (e) => e.preventDefault() : () => {}}
      >
        {
          children
        }
      </a>
    ) : (
      <window.Link
        style={styleChildren}
        className={className}
        onClick={isEditor() ? (e) => e.preventDefault() : () => {}}
        href={settings.href}
        to={settings.to}
      >
        {
          children
        }
      </window.Link>
    )
  }
}

export default BasicLink;
