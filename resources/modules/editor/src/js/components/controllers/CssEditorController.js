import {controllerMapStateToProps} from "../../decorators/controller";
import React, { Component } from "react";
import { connect } from "react-redux";
import controllerDecorate from "../../decorators/controller";

class CssEditorController extends Component {
  constructor(props) {
    super(props);
    controllerDecorate(this);
    this.onChange = this.onChange.bind(this);
    let value = this.getSettings(this.props.controlId);
    if (value === null && this.props.default) {
      value = this.props.default;
    }

    value = value || '';
    /**
     * Баг старых версий
     * */
    if (typeof value === 'object') {
      value = '';
    }
    this.state = {
      value,
      show: true,
      // editorComponent: <window.AceEditor
      // />,
    };
  }

  onKeyDown = (event) => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
  }

  onChange(newValue) {
    this._changeValue(newValue);
  };

  shouldComponentUpdate(newProps, newState) {
    if (newProps.currentElement.getId() !== this.props.currentElement.getId()) {
      let value = newProps.currentElement.getSettings(newProps.controlId);
      if (value === null && this.props.default) {
        value = this.props.default;
      }
      if (!_.isString(value)) {
        value = '';
      }
      this.editor = <window.AceEditor
        mode="css"
        theme="textmate"
        onChange={this.onChange}

        name="aceEditor"
        height="15em"
        setOptions={{
          value: value || ''
        }}
        enableLiveAutocompletion={true} />
    }
    return true;
  }


  getDefaultValue() {
    return '';
  }

  render() {

    if (this.state.show === false) {
      return '';
    }
    let value = this.getSettings(this.props.controlId) || this.getDefaultValue();
    if(! _.isString(value)){
      value = '';
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
        {/*{this.editor || (this.editor = <AceEditor*/}
        {/*/>)}*/}
        {this.editor = (this.editor || <window.AceEditor
          mode="css"
          theme="textmate"
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          width="200px"
          name="aceEditor"
          height="15em"
          setOptions={{
            value: value || ''
          }}
          enableLiveAutocompletion={true} />)}

      </div>
      <div className="control-css-editor-description">
        Use "__selector__" to target wrapper element.
          <br />Examples:
          selector "color: red;" // For main element
          selector .child-element "margin: 10px;" // For <br />child element<br />
          .my-class "text-align: center;" // Or use any custom selector
        </div>
    </div>
  }
}

function mapStateToProps(state) {
  return {
    currentElement: state.currentElement.currentElement,
    currentState: state.currentState,
    currentScreen: state.currentScreen
  };
}
export default connect(controllerMapStateToProps)(CssEditorController);
