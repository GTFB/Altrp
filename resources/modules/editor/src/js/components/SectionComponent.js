import React, {Component} from "react";
import '../../sass/section.scss'
import { isEditor, getWindowWidth } from "../helpers"

class SectionComponent extends Component {
  constructor(props) {
    super(props);
    if (!props.children.length) {
      throw `Section Component Must Contain at Least One Column as Child`;
    }
    this.state = {
      children: props.children,
      settings: props.element.getSettings()
    };
    props.element.component = this;
    if (window.elementDecorator) {
      window.elementDecorator(this);
    }
  }

  render() {
    let styles = {};
    let width = {};
    if(this.state.settings.layout_content_width_type === "full") {
      width = {
        width: getWindowWidth() + "px"
      }
    } else {
      width = {}
    }
    

    let sectionClasses = [
      'altrp-section',
      `altrp-section_columns-${this.props.element.getColumnsCount()}`
    ];

    let sectionWrapper = this.state.children.map(column => (
      <ElementWrapper
        key={column.getId()}
        component={column.componentClass}
        element={column}
        // columnCount={this.props.element.getColumnsCount()}
      />
    ));

    if(this.state.settings.layout_content_width_type == "full") {
      styles.width = getWindowWidth() + "px"
    }

    if(this.state.settings.layout_height == "fit") {
      styles.height = "100vh"
    }

    let section = React.createElement(this.state.settings.layout_html_tag || "div",
      {style: styles, className: sectionClasses.join(' ') + " " + this.state.settings.position_style_css_classes, id: ""},
      <div className={"get-column-count " + `altrp-element-column-count${this.props.element.id}`} id="columnCount" data-column-count={"\n" + this.props.element.getColumnsCount()}></div>,
      sectionWrapper
    );

    // let fullFill = null
    // if(this.state.settings.layout_content_width_type == "full-fill") {
    //   fullFill = section
    //   // <div className="full-fill" style={{width: getWindowWidth() + "px"}}>{section}</div>
    // }

    return  section
  }
}

export default SectionComponent;
