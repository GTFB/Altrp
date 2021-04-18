import React, { Component } from "react";
import { StaticRouter as Router, Switch, Route, Link } from "react-router-dom";
import RouteContentServer from "./RouteContentServer";
import Styles from "../../../../editor/src/js/components/Styles";
import { isAltrpTestMode } from "../helpers";
import EmailTemplatesRenderer from "./EmailTemplatesRenderer";

class AppContentServer extends Component {
  constructor(props) {
    super(props);

    this.router = React.createRef();
  }
  componentDidMount() {
    if (this.router.current) {
      window.frontAppRouter = this.router.current;
    }
  }

  render() {
    return (
      <Router ref={this.router}>
        <EmailTemplatesRenderer />
        <div className={`front-app-content `}>
          <Switch>
            {this.props.routes.map(route => (
              <Route
                key={route.id}
                children={<RouteContentServer {...route} areas={route.areas} />}
                path={route.path}
                exact
              />
            ))}
          </Switch>
        </div>
        <Styles />
      </Router>
    );
  }
}
export default AppContentServer;
