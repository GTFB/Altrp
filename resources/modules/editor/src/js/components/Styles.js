import React, {Component} from "react";

class Styles extends Component {
  constructor(props){
    super(props);
    this.state = {
      elementStyles: []
    };
  }
  render(){
    return <div>
      {this.state.elementStyles.map(elementStyle => <style key={elementStyle.elementId}>{elementStyle.styles}</style>)}
    </div>
  }
}

export default Styles