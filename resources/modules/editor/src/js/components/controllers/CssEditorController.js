import React, {Component} from "react";
import {connect} from "react-redux";
import  AceEditor  from "react-ace";
import "ace-builds/src-min-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/snippets/css";
import "ace-builds/src-noconflict/snippets/json"
import "ace-builds/src-noconflict/theme-textmate";
import "ace-builds/src-noconflict/mode-css";
import controllerDecorate from "../../decorators/controller";

class CssEditorController extends Component {
  constructor(props){
    super(props);
    this.onChange = this.onChange.bind(this);
    let value = this.props.currentElement.getSettings(this.props.controlId);
    if(value === null && this.props.default){
      value = this.props.default ;
    }

    value = value || '';
    /**
     * Баг старых версий
     * */
    if(typeof value === 'object'){
      value = '';
    }
    this.state = {
      value,
      show: true,
    };
    controllerDecorate(this);
  }


  onChange(newValue){
    this._changeValue(newValue);
  };

  getDefaultValue(){
    return null;
  }

  render(){

    if(this.state.show === false) {
      return '';
    }
      return <div className="controller-container controller-container_css-editor">
        <div className="controller-container__label control-css-editor__label">
          Add your own custom CSS here
        </div>
        <div className="control-css-editor-wrapper">
          {/*<AceEditor*/}
            {/*ref="cssEditor"*/}
            {/*mode="css"*/}
            {/*theme="textmate"*/}
            {/*onChange={this.changeValue}*/}
            {/*name="UNIQUE_ID_OF_DIV"*/}
            {/*editorProps={{ $blockScrolling: true }}*/}
            {/*height="15em"*/}
            {/*width="18.5em"*/}
            {/*splits={1}*/}
            {/*value={value}*/}
            {/*enableSnippets*/}
            {/*enableLiveAutocompletion*/}
          {/*/>*/}
          {this.editor || (this.editor = <AceEditor
              mode="css"
              theme="textmate"
              onChange={this.onChange}

              name="aceEditor"
              height="15em"
              // defaultValue={this.state.value || ''}
              // value={this.state.value || ''}
              setOptions={{
                value: this.state.value
              }}
              // value={}
              enableLiveAutocompletion={true}
          />)}

        </div>
        <div className="control-css-editor-description">
          Use "selector" to target wrapper element.
          <br />Examples:
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
