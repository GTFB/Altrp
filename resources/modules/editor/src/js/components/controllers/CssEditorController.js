import React, {Component} from "react";
import {connect} from "react-redux";
import AceEditor from "react-ace";
import controllerDecorate from "../../decorators/controller";

class CssEditorController extends Component {
  constructor(props){
    super(props);
    let value = this.props.currentElement.getSettings(this.props.controlId);
    if(value === null && this.props.default){
      value = this.props.default ;
    }
    value = value || '';
    this.state = {value};
    controllerDecorate(this);
  }

  changeValue(value){
    console.log("change:", value)
  }

  render(){

    return <div className="controller-container controller-container_css-editor">
      <div className="controller-container__label">
        Add your own custom CSS here
      </div>
      <div className="control-css-editor-wrapper">
        <AceEditor 
          mode="css"
          theme="textmate"
          onChange={this.changeValue}
          name="aceEditor"
          height="15em"
        />
      </div>
    </div>
  }
}

function mapStateToProps(state) {
  return{
    currentElement:state.currentElement.currentElement,
  };
}
export default connect(mapStateToProps)(CssEditorController);