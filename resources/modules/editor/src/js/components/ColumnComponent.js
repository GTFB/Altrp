import React, {Component} from "react";
import ElementWrapper from './ElementWrapper'
import decorate from "../decorators/element-component";

class ColumnComponent extends Component {
  constructor(props){
    super(props);
    this.state={
      children: props.children || [],
    };
    props.element.component = this;
    decorate(this);
  }
  render(){
    return <div className="altrp-column">
      {this.state.children.map(
          section => <ElementWrapper key={section.getId()} component={section.componentClass} element={section}/>
      )}
    </div>
  }
}

export default ColumnComponent