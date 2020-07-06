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
    const columnCount = 1;
  }

  componentDidMount() {
    this.columnCount = document.getElementById("columnCount")
  }

  render(){

    let column = React.createElement(this.state.settings.layout_html_tag || "div", 
      {className: "altrp-column " + this.state.settings.position_style_css_classes || "", id:this.state.settings.position_style_css_id || ""},
      this.state.children.map(
        section => <ElementWrapper key={section.getId()} component={section.componentClass} element={section}/>
      )
    );
    
    // let link = null;
    // if(this.state.settings.link_link.url != null & this.state.settings.link_link.url != "") {
    //   link = <div href={this.state.settings.link_link.url} className="altrp-column">link{column}</div>
    // }

    return column
  }
}

export default ColumnComponent