import React, {Component} from "react";
import AltrpSkeletonBoxFrontApp from "../../../../../front-app/src/js/components/AltrpSkeletonBoxFrontApp";
import Styles from "./Styles";
import {connect} from "react-redux";

class AltrpSkeletonBox extends Component {
  render() {
    const {element} = this.props
    const columns = Number(element.getResponsiveSetting('skeleton:columns'))
    let rows = Number(element.getResponsiveSetting('skeleton:rows'))
    if(columns && ! rows){
      rows = 1
    }
    const itemsCount = columns * rows

    return <>
      <Styles element={element}
              settings={this.props.settings}
              currentScreen={this.props.currentScreen} />
      <AltrpSkeletonBoxFrontApp itemsCount={itemsCount}/>
    </>
  }
}

export default connect(state=>{
  return {currentScreen: state.currentScreen}
})(AltrpSkeletonBox)
