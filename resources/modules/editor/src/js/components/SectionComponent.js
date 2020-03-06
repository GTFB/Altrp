import React, {Component} from "react";

class SectionComponent extends Component {
  constructor(props){
    super(props);
    this.state={
      children: props.children,
    };
    props.element.component = this;
  }
  render(){
    return <div className="altrp-section">
      {this.state.children.map(
          section => <ElementWrapper component={section.componentClass} element={section}/>
      )}
    </div>
  }
}

export default SectionComponent