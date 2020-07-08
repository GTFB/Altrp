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
  constructor(){
    super();
    window.router = React.createRef();
  }
  componentDidMount(){

  }
  render(){
    return <Router ref={window.router}>
      <div className="front-app-content">
        <Switch>
          {this.props.routes.map(route=><Route key={route.id}
                                               /*{...route}component={RouteContent}*/
                                               path={route.path}
                                               exact>
            <RouteContent {...route}/>
          </Route>)}
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
