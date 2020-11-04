import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {isEditor} from "../../../../../front-app/src/js/helpers";
import "./altrp-link.scss";

class AltrpLink extends Component {
  render() {
    let classes = this.props.className;

    let settings = {
      attributes: "",
      openInNew: false,
      noFollow: false,
      url: "/",
      tag: "a",
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

    let BasicLink = (linkProps) => {
      let styleChildren = {};

      if(linkProps.style) {
        styleChildren = linkProps.style
      }

      let className = classes;

      if(linkProps.classLink) {
        className += " altrp-link" + " " + linkProps.classLink
      }

      return settings.tag === "a" ? (
        <a
          href={settings.url}
          rel={rel}
          style={styleChildren}
          className={className}
          onClick={isEditor() ? (e) => e.preventDefault() : () => {}}
        >
          {
            linkProps.children
          }
        </a>
      ) : (
        <Link
          style={styleChildren}
          className={className}
          onClick={isEditor() ? (e) => e.preventDefault() : () => {}}
          to={settings.url}
        >
          {
            linkProps.children
          }
        </Link>
      );
    };

    let link = <BasicLink>
      {
      this.props.children
      }
    </BasicLink>;

    //creative link
    let creativeLink = "";
    if(this.props.creativeLink) {
      let creativeLinkStyles = this.props.creativeLink;
      let styles = {
        background: "",
        backgroundPickedHex: "",
        backgroundRGB: "",
        color: "",
        colorPickedHex: "",
        colorRGB: "",
        label: "",
        lineHeight: "",
        opacity: 1,
        sizeUnit: "",
        opacityBg: 1,
        size: "",
        style: "",
      };

      if(creativeLinkStyles) {
        styles = {...styles, ...creativeLinkStyles}
      }
      console.log(styles);

      let forStyles = {
      };

      if(styles.size) {
        forStyles.transitionDuration = styles.size + "s"
      } else {
        forStyles.transitionDuration = "0.2s"
      }

      let content = this.props.children;

      console.log(content)
      switch (styles.style) {
        case "none":
          creativeLink = "";
          break;
        case "cl-style-1":
          creativeLink = <BasicLink classLink="altrp-link-cl-style-1-link">
            <div className="altrp-link-cl-style-1 altrp-link-cl-style-1-left" style={forStyles}>
              [
            </div>
            {
              content
            }
            <div className="altrp-link-cl-style-1 altrp-link-cl-style-1-right" style={forStyles}>
              ]
            </div>
          </BasicLink>;
        break;
        case "cl-style-2":
          creativeLink = <BasicLink classLink="altrp-link-cl-style-2-link">
            <div className="altrp-link-cl-style-2-container" style={forStyles}>
              {
                content
              }
            </div>
          </BasicLink>;
        break;
        case "cl-style-3":
          creativeLink = <BasicLink classLink="altrp-link-cl-style-3-link">
            <div className="altrp-link-cl-style-3" style={forStyles}>
              {
                content
              }
            </div>
          </BasicLink>;
        break;
        case "cl-style-4":
          creativeLink = <BasicLink classLink="altrp-link-cl-style-4-link">
            <div className="altrp-link-cl-style-4" style={forStyles}>
              {
                content
              }
            </div>
          </BasicLink>;
        break;
        case "cl-style-5":
          creativeLink = <BasicLink classLink="altrp-link-cl-style-5-link">
            <div className="altrp-link-cl-style-5" style={forStyles}>
              {
                content
              }
              <div className="altrp-link-cl-style-5-clone">
                {
                  content
                }
              </div>
            </div>
          </BasicLink>;
        break;
        case "cl-style-6":
          creativeLink = <BasicLink classLink="altrp-link-cl-style-6-link">
            <div className="altrp-link-cl-style-6" style={forStyles}>
              {
                content
              }
            </div>
          </BasicLink>;
        break;
        case "cl-style-7":
          creativeLink = <BasicLink classLink="altrp-link-cl-style-7-link">
            <div className="altrp-link-cl-style-7" style={forStyles}>
              {
                content
              }
            </div>
          </BasicLink>;
        break;
        case "cl-style-8":
          creativeLink = <BasicLink classLink="altrp-link-cl-style-8-link">
            <div className="altrp-link-cl-style-8" style={forStyles}>
              {
                content
              }
            </div>
          </BasicLink>;
        break;
        case "cl-style-9":
          creativeLink = <BasicLink classLink="altrp-link-cl-style-9-link">
            <div className="altrp-link-cl-style-9" style={forStyles}>
              {
                content
              }
              <div className="altrp-link-cl-style-9-description" style={forStyles}>
                {
                  content
                }
              </div>
            </div>
          </BasicLink>;
        break;
        case "cl-style-10":
          creativeLink = <BasicLink classLink="altrp-link-cl-style-10-link">
            <div className="altrp-link-cl-style-10" data-hover={content} style={forStyles}>
              <div className="altrp-link-cl-style-10-content">
                {
                  content
                }
              </div>

              {/*<div className="altrp-link-cl-style-10-block-left" style={forStyles}>*/}
              {/*  {*/}
              {/*    content*/}
              {/*  }*/}
              {/*</div>*/}
            </div>
          </BasicLink>;
        break;
        case "cl-style-11":
          creativeLink = <BasicLink classLink="altrp-link-cl-style-11-link">
            <div className="altrp-link-cl-style-11" data-hover={content} style={forStyles}>
                {
                  content
                }
            </div>
          </BasicLink>;
          break;
        case "cl-style-12":
          creativeLink = <BasicLink classLink="altrp-link-cl-style-12-link">
            <div className="altrp-link-cl-style-12" style={forStyles}>
              {
                content
              }
            </div>
          </BasicLink>;
        break;
        case "cl-style-13":
          creativeLink = <BasicLink classLink="altrp-link-cl-style-13-link">
            <div className="altrp-link-cl-style-13" style={forStyles}>
              {
                content
              }
            </div>
          </BasicLink>;
        break;
        case "cl-style-14":
          creativeLink = <BasicLink classLink="altrp-link-cl-style-14-link">
            <div className="altrp-link-cl-style-14" style={forStyles}>
              {
                content
              }
            </div>
          </BasicLink>;
        break;
        case "cl-style-15":
          creativeLink = <BasicLink classLink="altrp-link-cl-style-15-link">
            <div className="altrp-link-cl-style-15" data-hover={content} style={forStyles}>
              {
                content
              }
            </div>
          </BasicLink>;
        break;
        case "cl-style-16":
          creativeLink = <BasicLink classLink="altrp-link-cl-style-16-link">
            <div className="altrp-link-cl-style-16" data-hover={content} style={forStyles}>
              {
                content
              }
            </div>
          </BasicLink>;
        break;
        case "cl-style-17":
          creativeLink = <BasicLink classLink="altrp-link-cl-style-17-link">
            <div className="altrp-link-cl-style-17" data-hover={content} style={forStyles}>
              {
                content
              }
            </div>
          </BasicLink>;
        break;
        case "cl-style-18":
          creativeLink = <BasicLink classLink="altrp-link-cl-style-18-link">
            <div className="altrp-link-cl-style-18" style={forStyles}>
              {
                content
              }
            </div>
          </BasicLink>;
        break;
        case "cl-style-19":
          creativeLink = <BasicLink classLink="altrp-link-cl-style-19-link">
            <div className="altrp-link-cl-style-19" data-hover={content} style={forStyles}>
              {
                content
              }
            </div>
          </BasicLink>;
        break;
        case "cl-style-20":
          creativeLink = <BasicLink classLink="altrp-link-cl-style-20-link" style={forStyles}>
            <div className="altrp-link-cl-style-20" data-hover={content} style={forStyles}>
              {
                content
              }
            </div>
          </BasicLink>;
        break;
        case "cl-style-21":
          creativeLink = <BasicLink classLink="altrp-link-cl-style-21-link">
            <div className="altrp-link-cl-style-21" style={forStyles}>
              {
                content
              }
            </div>
          </BasicLink>;
        break;
        case "cl-style-22":
          creativeLink = <BasicLink classLink="altrp-link-cl-style-22-link">
            <div className="altrp-link-cl-style-22" style={forStyles}>
              {
                content
              }
            </div>
          </BasicLink>;
        break;
        case "cl-style-23":
          creativeLink = <BasicLink classLink="altrp-link-cl-style-23-link">
            <div className="altrp-link-cl-style-23" style={forStyles}>
              {
                content
              }
            </div>
          </BasicLink>;
        break;
        case "cl-style-24":
          creativeLink = <BasicLink classLink="altrp-link-cl-style-24-link">
            <div className="altrp-link-cl-style-24" style={forStyles}>
              {
                content
              }
            </div>
          </BasicLink>;
        break;
        case "cl-style-25":
          creativeLink = <BasicLink classLink="altrp-link-cl-style-25-link">
            <div className="altrp-link-cl-style-25" style={forStyles}>
              {
                content
              }
            </div>
          </BasicLink>;
        break;
        case "cl-style-26":
          creativeLink = <BasicLink classLink="altrp-link-cl-style-26-link">
            <div className="altrp-link-cl-style-26" style={forStyles}>
              {
                content
              }
            </div>
          </BasicLink>;
        break;
        case "cl-style-27":
          creativeLink = <BasicLink classLink="altrp-link-cl-style-27-link">
            <div className="altrp-link-cl-style-27" style={forStyles}>
              {
                content
              }
            </div>
          </BasicLink>;
        break;
        case "cl-style-28":
          creativeLink = <BasicLink classLink="altrp-link-cl-style-28-link">
            <div className="altrp-link-cl-style-28" style={forStyles}>
              {
                content
              }
            </div>
          </BasicLink>;
        break;
        case "cl-style-29":
          creativeLink = <BasicLink classLink="altrp-link-cl-style-29-link">
            <div className="altrp-link-cl-style-29" style={forStyles}>
              {
                content
              }
            </div>
          </BasicLink>;
          break;
      }
    }
    //creative link закончился))))

    return creativeLink ? creativeLink : link
  }
}

export default AltrpLink;
