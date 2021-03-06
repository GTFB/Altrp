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

  render() {
    let breadcrumbs = [];
    const routes = ! isEditor() ? replaceContentWithData(appStore.getState().appRoutes.routes) : [
      {
        title: "this",
        id: 1,
        path: "/thisSiteIsWonderful",
        parent_page_id: null
      },
      {
        title: "site",
        id: 2,
        path: "/thisSiteIsWonderful",
        parent_page_id: 1
      },
      {
        title: "is",
        id: 3,
        path: "/thisSiteIsWonderful",
        parent_page_id: 2
      },
      {
        title: "wonderful",
        id: 4,
        path: "/thisSiteIsWonderful",
        parent_page_id: 3
      }
    ];
    const currentTitle = ! isEditor() ? replaceContentWithData(appStore.getState().currentTitle) : "wonderful";

    console.log(currentTitle);
    if(currentTitle !== routes[0].title) {
      let idCurrent = 0;

      routes.forEach((route, idx) => {
        if(currentTitle === route.title) {
          idCurrent = idx
        }
      })

      let breadcrumbsClone = [];

      breadcrumbsClone.push(routes[idCurrent])

      function getParent(parentId) {
        routes.forEach(route => {
          if(route.id === parentId) {
            breadcrumbsClone.push(route)
            if(route.parent_page_id) {
              getParent(route.parent_page_id)
            }
          }
        })
      }

      if(routes[idCurrent].parent_page_id) {
        getParent(routes[idCurrent].parent_page_id)
      }

      breadcrumbs = breadcrumbsClone.reverse()
    } else {
      breadcrumbs.push(routes[0])
    }


    const separatorType = this.props.element.getContent("breadcrumbs_type_separator", "default");
    let separatorClasses = "altrp-nav-breadcrumbs-separator";
    let separator = "-";

    switch (separatorType) {
      case "text":
        const textSeparator = this.props.element.getContent("breadcrumbs_separator_text", ">");
        separatorClasses += " altrp-nav-breadcrumbs-separator-text";
        separator = textSeparator;
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
        break
      default:
        separatorClasses += " altrp-nav-breadcrumbs-separator-default";
    }

    return (
      <ul className="altrp-nav-breadcrumbs">
        {
          breadcrumbs.map((route, idx) => {
            const to = route.path;
            const label = route.title;

            return <li className="altrp-nav-breadcrumbs-li" key={idx}>
              {
                route.title !== currentTitle ? (
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
                idx !== (breadcrumbs.length - 1) ? (
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
