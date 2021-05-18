import React, { Component } from "react";
import {
  /*Classes, Icon, Intent, TreeNodeInfo,*/ Tree
} from "@blueprintjs/core";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    templateData: JSON.parse(state.templateData.data)
  };
};

class NavigationPanel extends Component {
  constructor(props) {
    super(props);
    console.log("====================================");
    console.log(props);
    console.log("====================================");
  }

  render() {
    return (
      <div>
        <Tree contents={this.initialState} />
      </div>
    );
  }
}

export default connect(mapStateToProps)(NavigationPanel);
