import React, {Component} from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import "./altrp-breadcrumbs.scss";
import {isEditor} from "../../../../../front-app/src/js/helpers";

class AltrpBreadcrumbs extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let pathname = this.props.location.pathname;

    if(isEditor()) {
      pathname = "/super/example/your_page"
    }

    const breadcrumbs = pathname.split("/");

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
                    {
                      label
                    }
                  </Link>
                ) : (
                  <div className="altrp-nav-breadcrumbs-label altrp-nav-breadcrumbs-current">
                    {
                      label
                    }
                  </div>
                )
              }
              {
                idx !== (breadcrumbs.length - 1) && pathname !== "/" ? (
                  <span className="altrp-nav-breadcrumbs-separator">
                    -
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
