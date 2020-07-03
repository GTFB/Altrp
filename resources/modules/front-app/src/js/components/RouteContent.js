import React, {Component} from "react";
import AreaComponent from "./AreaComponent";
import {setTitle} from "../helpers";

class RouteContent extends Component {
  componentDidMount(){
    setTitle(this.props.title);
  }
  render(){
    return<div className="route-content">{
      this.props.areas.map(area => <AreaComponent {...area} key={'appArea_' + area.id}/>)
    }</div>
  }
}

export default RouteContent