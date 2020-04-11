import React, {Component} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {connect} from "react-redux";
import RouteContent from "./RouteContent";

class AppContent extends Component {
  render(){
    console.log(this.props);
    return <div className="front-app-content">
      <Router>
        <Switch>
          {this.props.routes.map(route=><Route key={'appRoute_' + route.id} path={route.location}>
            <RouteContent areas={route.areas}/>
          </Route>)}
        </Switch>
      </Router>
    </div>;
  }
}

function mapStateToProps(state) {
  return {
    routes: state.appRoutes.routes
  };
}

export default connect(mapStateToProps)(AppContent);
