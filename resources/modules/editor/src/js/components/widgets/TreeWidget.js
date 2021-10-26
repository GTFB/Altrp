import React from "react";

const TreeBlueprint = window.altrpLibs.Blueprint.Tree;

class TreeWidget extends Component {
  constructor(props){
    super(props);
    let settings = props.element.getSettings();

    this.state = {
      settings
    };

    props.element.component = this;
    if (window.elementDecorator) {
      window.elementDecorator(this);
    }

    if(props.baseRender){
      this.render = props.baseRender(this);
    }
  }

  render() {

    return <TreeBlueprint
      contents={[
        {
          id: 0,
          hasCaret: false,
          icon: "folder-close",
          label: (
            <div>
              asdasdas
            </div>
          )
        }
      ]}
    >

    </TreeBlueprint>
  }
}

export default TreeWidget
