import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import RouteContent from "./RouteContent";
import Styles from "../../../../editor/src/js/components/Styles";
import {isAltrpTestMode} from "../helpers";
import EmailTemplatesRenderer from "./EmailTemplatesRenderer";

class AppContent extends Component {
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
        <EmailTemplatesRenderer/>
        <div className={`front-app-content ${isAltrpTestMode() ? 'front-app-content_test' : ''}`}>
          <Switch>
            {this.props.routes.map(route => (
              <Route
                key={route.id}
                children={<RouteContent {...route} />}
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

function mapStateToProps(state) {
  return {
    routes: state.appRoutes.routes
  };
}

export default connect(mapStateToProps)(AppContent);
