import React, {Component} from "react";

class EditorWindow extends Component {

  constructor(props){
    super(props);
    this.state = {};
  }

  render() {

    return <div className="editor-window">
      {
        this.state.rootElement ? React.createElement(
            this.state.rootElement.componentClass,{
              settings: {},
              children: this.state.rootElement.children,
              element:this.state.rootElement,
            }

        ) : ''
      }
    </div>
  }
}

export default EditorWindow