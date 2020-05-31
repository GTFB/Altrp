import React, {Component} from "react";
import AreaComponent from "./AreaComponent";

class RouteContent extends Component {
  render(){
    return<div className="route-content">{
      this.props.areas.map(area => <AreaComponent template={area.template} key={'appArea_' + area.id}/>)
    }</div>
  }
}

export default RouteContent