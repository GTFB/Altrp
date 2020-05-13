import React, {Component} from "react";
import {connect} from "react-redux";
import { split as AceEditor } from "react-ace";
import DynamicIcon from '../../../svgs/dynamic.svg';
import "ace-builds/src-min-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/snippets/css";
import "ace-builds/src-noconflict/snippets/json"
import "ace-builds/src-noconflict/theme-textmate";
import "ace-builds/src-noconflict/mode-css";
import controllerDecorate from "../../decorators/controller";

class CssEditorController extends Component {
  constructor(props){
    super(props);
    this.changeValue = this.changeValue.bind(this)
    let value = this.props.currentElement.getSettings(this.props.controlId);
    console.log(value)
    if(value === null && this.props.default){
      value = this.props.default ;
    }
    value = value || '';
    this.state = {value, editorValue: null};
    controllerDecorate(this);
  }

  function() {
    this.setState({
      editorValue: this.state.value.value
    })
  }

  changeValue(newValue){
    this.setState({
      editorValue: newValue
    });
    this.props.currentElement.setSettingValue(this.props.controlId, newValue);
    this._changeValue(this.state.editorValue[0]);
  };

  getDefaultValue(){
    return null;
  }

  render(){
    let value = this.state.editorValue

    return <div className="controller-container controller-container_css-editor">
      <div className="controller-container__label control-css-editor__label">
        Add your own custom CSS here
      </div>
      <div className="control-css-editor-wrapper">
        <AceEditor
          ref="cssEditor"
          mode="css"
          theme="textmate"
          onChange={this.changeValue}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{ $blockScrolling: true }}
          height="15em"
          width="18.5em"
          splits={1}
          value={value}
          enableSnippets
          enableLiveAutocompletion
        />
      </div>
      <div className="control-css-editor-description">
        Use "selector" to target wrapper element. 
        <br />Examples:<br />
        selector "color: red;" // For main element
        selector .child-element "margin: 10px;" // For <br />child element<br />
        .my-class "text-align: center;" // Or use any custom selector
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