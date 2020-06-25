import React, {Component} from "react";
import '../../sass/column.scss'

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
    let column = React.createElement(this.state.settings.layout_html_tag || "div", 
      {className: "altrp-column " + this.state.settings.position_style_css_classes || "", id:this.state.settings.position_style_css_id || ""},
      this.state.children.map(
        section => <ElementWrapper key={section.getId()} component={section.componentClass} element={section}/>
      )
    )
    return column
  }
}

export default ColumnComponent