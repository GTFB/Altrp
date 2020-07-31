import React, {Component} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {connect} from "react-redux";
import RouteContent from "./RouteContent";
import Styles from "../../../../editor/src/js/components/Styles";

class AppContent extends Component {
  constructor(props){
    super(props);
  }
  componentDidMount(){

  }
  render(){
    return <Router >
      <div className="front-app-content">
        <Switch>
          {this.props.routes.map(route=><Route key={route.id}
                                               children={ <RouteContent {...route}/>}
                                               path={route.path}
                                               exact />)}
        </Switch>
      </div>
      <Styles/>
    </Router>
  }
}

function mapStateToProps(state) {
  return {
    routes: state.appRoutes.routes
  };
}

export default connect(mapStateToProps)(AppContent);
