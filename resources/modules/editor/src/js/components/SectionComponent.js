import React, { useState } from "react";

import { contextMenu } from "react-contexify";

const SectionComponent = ({ children, element }) => {
  if (!children.length) {
    throw `Section Component Must Contain at Least One Column as Child`;
  }

  //const [columns, setColumns] = useState(children);
  //const [settings, setSettings] = useState(element.getSettings());

  /* element.component = this;

  if (window.elementDecorator) {
    window.elementDecorator(this);
  } */

  const handleContext = e => {
    e.persist();
    e.preventDefault();
    console.log("Click on Section", e);
    contextMenu.show({
      id: "SectionContextMenu",
      event: e,
      props: {
        element,
        children
      }
    });
  };

  return (
    <div className="altrp-section" onContextMenu={handleContext}>
      {children.map(column => (
        <ElementWrapper
          key={column.getId()}
          component={column.componentClass}
          element={column}
        />
      ))}
    </div>
  );
};

/* class SectionComponent extends Component {
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
    return (
      <MenuProvider id="section_context_menu">
        <div className="altrp-section">
          {this.state.children.map(column => (
            <ElementWrapper
              key={column.getId()}
              component={column.componentClass}
              element={column}
            />
          ))}
        </div>
      </MenuProvider>
    );
  }
} */

export default SectionComponent;
