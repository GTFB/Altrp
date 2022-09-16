import React, {Component} from "react";
import {createGlobalStyle} from "styled-components";

class AltrpSkeleton extends Component {
 render(){
   const Styles = createGlobalStyle`
   `
   return <div className="altrp-skeleton">
     <Styles/>
   </div>
 }
}

export default AltrpSkeleton
