import React, {Component} from "react";
import '../../sass/section.scss'
import { styles } from "react-contexify/lib/utils/styles";

// const SectionComponent = ({ children, element }) => {
//   if (!children.length) {
//     throw `Section Component Must Contain at Least One Column as Child`;
//   }
//
//   //const [columns, setColumns] = useState(children);
//   //const [settings, setSettings] = useState(element.getSettings());
//
//   /* element.component = this;
//
//   if (window.elementDecorator) {
//     window.elementDecorator(this);
//   } */
//
//   const handleContext = e => {
//     e.persist();
//     e.preventDefault();
//     contextMenu.show({
//       id: "element-menu",
//       event: e,
//       props: {
//         element,
//         children
//       }
//     });
//   };
//
//   return (
//     <div className="altrp-section" onContextMenu={handleContext}>
//       {children.map(column => (
//         <ElementWrapper
//           key={column.getId()}
//           component={column.componentClass}
//           element={column}
//         />
//       ))}
//     </div>
//   );
// };

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
    let width = {};
    if(this.state.settings.layout_content_width_type === "full") {
      let element = document.getElementsByTagName("iframe")[0];
      let body = element ? element.offsetWidth : 0;
      let editor = document.getElementById("editor");
      if(editor != undefined) {
        body = window

      } else {
        body = body
      }

      width = {
        width: body + "px"
      }
      
    } else {
      width = {}
    };
    
    let sectionClasses = [
        'altrp-section',
        `altrp-section_columns-${this.props.element.getColumnsCount()}`
    ];
    let sectionWrapper = this.state.children.map(column => (
      <ElementWrapper
          width={width}
          key={column.getId()}
          component={column.componentClass}
          element={column}
          columnCount={this.props.element.getColumnsCount()}
      />
    ));
    let section = React.createElement(this.state.settings.layout_html_tag || "div",
      {style: width, className: sectionClasses.join(' ') + " " + this.state.settings.position_style_css_classes, id: ""},
      <div className="get-column-count" id="columnCount" data-column-count={"\n" + this.props.element.getColumnsCount()}></div>,
      sectionWrapper
    );

    let link = null;
    // if(this.state.settings.link_link.url != null & this.state.settings.link_link.url != "") {
    //   link = <div className="altrp-section">link{section}</div>
    // }
    // return link || section
    return  section
  }
}

export default SectionComponent;
