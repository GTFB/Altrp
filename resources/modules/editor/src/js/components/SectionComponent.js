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
    if(this.state.settings.layout_stretch_section) {
      let body = document.documentElement.clientWidth
      let editor = document.getElementById("editor")
      if(editor != undefined) {
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
      />
    ));
    let section = React.createElement(this.state.settings.layout_html_tag || "div",
      {style: width, className: sectionClasses.join(' ') + " " + this.state.settings.position_style_css_classes, id: this.state.settings.position_style_css_id},
      sectionWrapper
    )

    let link = null;
    if(this.state.settings.link_link.url != null & this.state.settings.link_link.url != "") {
      link = <div className="altrp-section">link{section}</div>
    }
    return link || section
  }
}

export default SectionComponent;
