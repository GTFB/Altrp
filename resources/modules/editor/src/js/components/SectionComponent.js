import React, { Component } from "react";
import '../../sass/section.scss';
import { connect } from "react-redux";
import '../../sass/section.scss'

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

  // _componentDidMount() {
  //   const { isScrollEffect } = this.props.element.getSettings();
  //   console.log(isScrollEffect)
  //   if (isScrollEffect) {
  //     document.addEventListener('click', this.handleScroll);
  //   }
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('scroll', this.handleScroll);
  // }

  // handleScroll = event => {
  //   // let scrollTop = event.srcElement.body.scrollTop;
  //     // itemTranslate = Math.min(0, scrollTop / 3 - 60);

  //   // console.log({ scrollTop });
  //   console.log("!!!!!!!!!!")
  //   // this.setState({
  //   //   transform: itemTranslate
  //   // });
  // }

  render() {
    let styles = {};
    const  background_image  = this.props.element.getSettings('background_image', {});
    const { isScrollEffect } = this.props.element.getSettings();
    const isContentBoxed = this.state.settings.layout_content_width_type === "boxed";
    const widthType = this.state.settings.layout_content_width_type;
    const sectionID = this.props.element.id;
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

    if (background_image.url/*  && !isScrollEffect */) {
      sectionClasses.push('altrp-background-image');
    }

    if (widthType === "boxed") {
      sectionClasses.push('altrp-section--boxed');
    }

    if (widthType === "full") {
      sectionClasses.push('altrp-section--full-width');
    }
    let ElementWrapper = this.props.ElementWrapper || window.ElementWrapper;
    let sectionWrapper = this.state.children.map(column => (
      <ElementWrapper
          ElementWrapper={ElementWrapper}
          key={column.getId()}
          component={column.componentClass}
          element={column}
      // columnCount={this.props.element.getColumnsCount()}
      />
    ));

    // if (this.state.settings.layout_content_width_type == "full") {
    //   styles.width = getWindowWidth() + "px"
    // }

    if (this.state.settings.layout_height === "fit") {
      styles.height = "100vh"
    }

    return this.props.hiddenSections.includes(sectionID) ? null : React.createElement(this.state.settings.layout_html_tag || "div",
      { style: styles, className: sectionClasses.join(' ') + " " + this.state.settings.position_style_css_classes, id: "" },
      // isScrollEffect ?
      // <>
      //   <div className="motion-effects-container" onScroll={this.handleScroll}>
      //       <div className="altrp-background-image" style={{ width: '100%', height: '130%', transform: 'translateY(110px)' }} />
      //   </div>
      //   <div className={"get-column-count " + `altrp-element-column-count${this.props.element.id}`} id="columnCount" />
      // </> :
      <div className={"get-column-count " + `altrp-element-column-count${this.props.element.id}`} id="columnCount" />,
      sectionWrapper
    );

    // let fullFill = null
    // if(this.state.settings.layout_content_width_type == "full-fill") {
    //   fullFill = section
    //   // <div className="full-fill" style={{width: getWindowWidth() + "px"}}>{section}</div>
    // }

  }
}

function mapStateToProps(state) {
  return {
    changeWidthColumns: state.columnWidth,
    hiddenSections: state.hiddenSections
  };
}

export default connect(mapStateToProps)(SectionComponent);
