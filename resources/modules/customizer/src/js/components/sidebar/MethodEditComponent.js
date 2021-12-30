import React, {Component} from "react";
import MethodParamsComponent from "./MethodParamsComponent";
import {createPortal} from "react-dom";
import {Button} from "@blueprintjs/core";
import Scrollbars from "react-custom-scrollbars";

class MethodEditComponent extends Component {
  render() {
    return createPortal(
      this.renderContent(),
      document.getElementById('portal-target')
    )
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const editorElement = document.getElementById('customizer-editor')
    if (this.props.show) {
      editorElement.classList.add('pe-none')
    } else {
      editorElement.classList.remove('pe-none')

    }
  }

  renderContent() {
    const {parameters = []} = this.props.method
    const {show} = this.props
    const classes = [
      'method-edit',
      'customizer-left-sidebar',
    ];
    if (show) {
      classes.push('customizer-left-sidebar_show')
    }
    return <>
      {show && <div className="customizer-background" onClick={(e) => {
        if (this.props.methodEditToggle) {
          this.props.methodEditToggle(e)
        }
      }}/>}
      <div className={classes.join(' ')}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Method Params</h5>
          </div>
          <Scrollbars thumbSize={400} autoHide autoHideTimeout={500} autoHideDuration={200}>
            <div className="modal-body">
              {parameters.map((p, idx) => {
                const parameter = _.get(this.props.methodSettings, `parameters.${idx}`, {});
                return <MethodParamsComponent
                  parameter={parameter}
                  parameterSettings={p}
                  key={`${this.props.path}.parameters.${idx}`}
                  changeByPath={this.props.changeByPath}
                  path={`${this.props.path}.parameters.${idx}`}/>
              })}
            </div>
          </Scrollbars>
          <div className="modal-footer ">
            <Button text="Save" intent="success"  onClick={(e) => {
              if (this.props.methodEditToggle) {
                this.props.methodEditToggle(e)
              }
            }}/>
          </div>
        </div>
      </div>
    </>
  }

}

export default MethodEditComponent
