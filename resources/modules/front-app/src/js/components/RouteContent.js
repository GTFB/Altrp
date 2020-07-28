import React, {Component} from "react";
import AreaComponent from "./AreaComponent";
import {setTitle} from "../helpers";
import { Scrollbars } from "react-custom-scrollbars";
import {Redirect} from "react-router-dom";

class RouteContent extends Component {
  constructor(props){
    super(props);
    setTitle(this.props.title);
    this.state = {
      areas: this.props.areas || []
    };
  }
  componentDidMount(){
    setTitle(this.props.title);
  }
  render(){
    if(! this.props.allowed){
      return<Redirect to={this.props.redirect || '/'}/>
    }
    console.log(this.props.lazy);
    return (
    <Scrollbars
      style={{zIndex: 99999}}
      autoHide
      autoHideTimeout={500}
      autoHideDuration={200}
      renderTrackVertical={({style, ...props})=>{
        return<div className="altrp-scroll__vertical-track" style={style} {...props} />}}
    >

    <div className="route-content">{
      this.state.areas.map(area => <AreaComponent
          {...area}
          page={this.props.id}
          models={this.props.models}
          key={'appArea_' + area.id}/>)
    }</div>
    </Scrollbars>
    )
  }
}

export default RouteContent;