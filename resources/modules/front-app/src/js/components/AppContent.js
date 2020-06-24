import React, {Component} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {connect} from "react-redux";
import RouteContent from "./RouteContent";
// import Styles from "./Styles";
import Styles from "../../../../editor/src/js/components/Styles";

class AppContent extends Component {
  render(){
    return <div className="front-app-content">
      <Router>
        <Switch>
          {this.props.routes.map(route=><Route key={route.id} path={route.path} exact>
            <RouteContent {...route}/>
          </Route>)}
        </Switch>
      </Router>
      <Styles/>
    </div>;
  }
}

function mapStateToProps(state) {
  return {
    routes: state.appRoutes.routes
  };
}

export default connect(mapStateToProps)(AppContent);
