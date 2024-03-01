import * as React from "react";
import Chevron from "../../../../../../../editor/src/svgs/chevron.svg";
import store from "../../../../store/store";
import {setUpdatedNode} from "../../../../store/customizer-settings/actions";
import mutate from "dot-prop-immutable";
import {connect} from "react-redux";
import PropertyComponent from "../../PropertyComponent";
import isAltrpJS from "../../../../helpers/isAltrpJS";
import {NumericInput} from "@blueprintjs/core";

class ReturnNode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  changeByPath = (e, path) => {

    let node = this.getNode();
    let value = _.isString(e?.target?.value) ? e.target.value : e;

    node = mutate.set(node, `data.${path}`, value)

    store.dispatch(setUpdatedNode(node));
  }

  getNode() {
    let node = this.props.customizerSettingsData?.find(n => {
      return this.props.selectNode?.id == n.id
    });
    return node;
  }

  componentDidMount() {
    this.updateState()
  }

  componentDidUpdate() {
    this.updateState()
  }

  updateState(){

    let onlyExpression = this.props.customizer?.type === 'helper'
    if(this.state.onlyExpression !== onlyExpression){
      this.setState(state=>({...state, onlyExpression}))
    }
  }
  render() {
    const node = this.getNode();

    let {onlyExpression} = this.state

    return (
      <div className="settings-section_parent">
        <div className="settings-section open">
          <div className="settings-section__title d-flex">
            <div className="settings-section__icon d-flex">
              <Chevron/>
            </div>
            <div className="settings-section__label">Settings Return</div>
          </div>
          <div className="controllers-wrapper">
            <div className="controllers-wrapper">
              <div className="controller-container controller-container_select">
                <div className="controller-container__label control-select__label controller-label">Status</div>
                <NumericInput
                  value={node.data.status || 200}
                  onValueChange={(valueAsNumber) => this.changeByPath(valueAsNumber, "status")}
                />
              </div>
            </div>
            <div className="controller-container controller-container_select">
              <div className="controller-container__label control-select__label controller-label ">Return Value:</div>
              <PropertyComponent
                onlyExpression={onlyExpression}
                changeByPath={this.changeByPath}
                property={node.data.property || {}}
                path="property"/>
            </div>
          </div>
        </div>

        {this.props.customizer.type === 'api' && ! isAltrpJS() && (
          <div className="settings-section open">
            <div className="settings-section__title d-flex">
              <div className="settings-section__icon d-flex">
                <Chevron/>
              </div>
              <div className="settings-section__label">Response Fallbacks</div>
            </div>
            <div className="controllers-wrapper">
              <div className="controller-container controller-container_select">
                <div className="controller-container__label control-select__label controller-label">Data Fallback:</div>
                <PropertyComponent
                  changeByPath={this.changeByPath}
                  property={node.data.data_fallback || {}}
                  path="data_fallback"/>
              </div>
            </div>
            <div className="controllers-wrapper">
              <div className="controller-container controller-container_select">
                <div className="controller-container__label control-select__label controller-label">Status Fallback:</div>
                <PropertyComponent
                  changeByPath={this.changeByPath}
                  property={node.data.status_fallback || {}}
                  path="status_fallback"/>
              </div>
            </div>
            <div className="controllers-wrapper">
              <div className="controller-container controller-container_select">
                <div className="controller-container__label control-select__label controller-label">Headers Fallback:</div>
                <PropertyComponent
                  changeByPath={this.changeByPath}
                  property={node.data.headers_fallback || {}}
                  path="headers_fallback"/>
              </div>
            </div>
            <div className="controllers-wrapper">
              <div className="controller-container controller-container_select">
                <div className="controller-container__label control-select__label controller-label">Options Fallback:</div>
                <PropertyComponent
                  changeByPath={this.changeByPath}
                  property={node.data.options_fallback || {}}
                  path="options_fallback"/>
              </div>
            </div>
          </div>
        )}

        {/* ./settings-section */}

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    customizerSettingsData: state.customizerSettingsData,
    customizer: state.currentCustomizer
  }
}

export default connect(mapStateToProps)(ReturnNode)
