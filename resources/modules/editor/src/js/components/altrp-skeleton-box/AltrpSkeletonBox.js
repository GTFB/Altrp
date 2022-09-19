import React, {Component} from "react";
import AltrpSkeletonBoxFrontApp from "../../../../../front-app/src/js/components/AltrpSkeletonBoxFrontApp";
import Styles from "./Styles";

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
      <Styles element={element} />
      <AltrpSkeletonBoxFrontApp itemsCount={itemsCount}/>
    </>
  }
}

export default AltrpSkeletonBox
