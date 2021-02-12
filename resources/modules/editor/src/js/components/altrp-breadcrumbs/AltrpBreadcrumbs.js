import React, {Component} from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import "./altrp-breadcrumbs.scss";
import {isEditor, replaceContentWithData} from "../../../../../front-app/src/js/helpers";
import AltrpImage from "../altrp-image/AltrpImage";

class AltrpBreadcrumbs extends Component {
  constructor(props) {
    super(props);
  }


  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(replaceContentWithData(appStore.getState()))
  }

  render() {
    let pathname = this.props.location.pathname;

    if(isEditor()) {
      pathname = "/super/example/your_page"
    }

    const breadcrumbs = pathname.split("/");

    const separatorType = this.props.element.getContent("breadcrumbs_type_separator", "default");
    let separatorClasses = "altrp-nav-breadcrumbs-separator";
    let separator = "-";

    switch (separatorType) {
      case "text":
        const textSeparator = this.props.element.getContent("breadcrumbs_separator_text", ">");
        separatorClasses += " altrp-nav-breadcrumbs-separator-text";
        separator = textSeparator;
        console.log(textSeparator)
        break
      case "icon":
        const iconSeparator = this.props.element.getContent("breadcrumbs_separator_icon", {});
        separatorClasses += " altrp-nav-breadcrumbs-separator-icon";
        separator = <AltrpImage
          image={iconSeparator}
          default={{
            assetType: "icon",
            name: 'star',
            iconComponent: iconsManager.renderIcon('star')
          }}
        />
        console.log(iconSeparator)
        break
      default:
        separatorClasses += " altrp-nav-breadcrumbs-separator-default";
    }

    return (
      <ul className="altrp-nav-breadcrumbs">
        {
          breadcrumbs.map((name, idx) => {
            const to = idx === 0 ? "/" : pathname.split(name)[0] + name;
            const label = idx === 0 ? this.props.element.getContent("breadcrumbs_label", "Home") : name;

            return <li className="altrp-nav-breadcrumbs-li" key={idx}>
              {
                breadcrumbs.length - 1 !== idx && pathname !== "/" ? (
                  <Link
                    to={to}
                    onClick={isEditor() ? (e) => e.preventDefault() : null}
                    className="altrp-nav-breadcrumbs-label altrp-nav-breadcrumbs-link"
                  >
                    { label }
                  </Link>
                ) : (
                  <div className="altrp-nav-breadcrumbs-label altrp-nav-breadcrumbs-current">
                    { label }
                  </div>
                )
              }
              {
                idx !== (breadcrumbs.length - 1) && pathname !== "/" ? (
                  <span className={separatorClasses}>
                    { separator }
                  </span>
                ) : ""
              }
            </li>
          })
        }
      </ul>
    );
  }
}

export default withRouter(AltrpBreadcrumbs);
