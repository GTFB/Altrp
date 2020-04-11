import React, {Component} from "react";
import ElementWrapper from "./ElementWrapper";

class SectionComponent extends Component {
  constructor(props){
    super(props);
    if(!props.children.length){
      throw `Section Component Must Contain at Least One Column as Child`;
    }
    this.state={
      children: props.children,
      settings: props.element.getSettings()
    };
    props.element.component = this;
  }
  render(){
    return <div className="altrp-section">
      {this.state.children.map(
          column => <ElementWrapper key={column.getId()} component={column.componentClass} element={column}/>
      )}
    </div>
  }
}

export default SectionComponent