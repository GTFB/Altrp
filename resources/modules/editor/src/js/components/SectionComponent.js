import React, { Component } from "react";
import '../../sass/section.scss';
import { connect } from "react-redux";
import '../../sass/section.scss'
import { isEditor, getWindowWidth } from "../../../../front-app/src/js/helpers"

class SectionComponent extends Component {
  constructor(props) {
    super(props);
    if (!props.children.length) {
      throw `Section Component Must Contain at Least One Column as Child`;
    }
    this.state = {
      children: props.children,
      settings: props.element.getSettings(),
    };
    props.element.component = this;
    if (window.elementDecorator) {
      window.elementDecorator(this);
    }
  }


  render() {
    let styles = {};
    // let width = {};
    const { background_image } = this.props.element.settings;
    const isContentBoxed = this.state.settings.layout_content_width_type === "boxed";
    // if (this.state.settings.layout_content_width_type === "full") {
    //   width = {
    //     width: getWindowWidth() + "px"
    //   }
    // } else {
    //   width = {}
    // }


    let sectionClasses = [
      'altrp-section',
      `altrp-section_columns-${this.props.element.getColumnsCount()}`
    ];

    if (background_image.url) {
      sectionClasses.push('altrp-background-image');      
    }

    if (isContentBoxed) {
      sectionClasses.push('altrp-section--boxed');
    }

    let sectionWrapper = this.state.children.map(column => (
      <ElementWrapper
        key={column.getId()}
        component={column.componentClass}
        element={column}
      // columnCount={this.props.element.getColumnsCount()}
      />
    ));

    // if (this.state.settings.layout_content_width_type == "full") {
    //   styles.width = getWindowWidth() + "px"
    // }

    if (this.state.settings.layout_height == "fit") {
      styles.height = "100vh"
    }

    let section = React.createElement(this.state.settings.layout_html_tag || "div",
      { style: styles, className: sectionClasses.join(' ') + " " + this.state.settings.position_style_css_classes, id: "" },
      <div className={"get-column-count " + `altrp-element-column-count${this.props.element.id}`} id="columnCount" ></div>,
      sectionWrapper
    );

    // let fullFill = null
    // if(this.state.settings.layout_content_width_type == "full-fill") {
    //   fullFill = section
    //   // <div className="full-fill" style={{width: getWindowWidth() + "px"}}>{section}</div>
    // }

    return section
  }
}

function mapStateToProps(state) {
  return {
    changeWidthColumns: state.columnWidth,
  };
}

export default connect(mapStateToProps)(SectionComponent);
