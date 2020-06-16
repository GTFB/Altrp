import React, {Component} from "react";

class ColumnComponent extends Component {
  constructor(props){
    super(props);
    this.state={
      children: props.children || [],
      settings: props.element.getSettings()
    };
    props.element.component = this;
    if(window.elementDecorator){
      window.elementDecorator(this);
    }
  }
  render(){
    return <div className={"altrp-column " + this.state.settings.column_advanced_attributes_css_classes || ""} id={this.state.settings.column_advanced_attributes_css_id || ""}>
      {this.state.children.map(
          section => <ElementWrapper key={section.getId()} component={section.componentClass} element={section}/>
      )}
    </div>
  }
}

export default ColumnComponent