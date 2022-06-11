import * as React from "react";
import Chevron from "../../../../../../../editor/src/svgs/chevron.svg";
import store from "../../../../store/store";
import {setUpdatedNode} from "../../../../store/customizer-settings/actions";
import mutate from "dot-prop-immutable";
import {connect} from "react-redux";
import ControllerContainer from "../../other/ControllerContainer";
import {Switch} from "@blueprintjs/core";

class StartNode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
  }

  changeByPath = (e, path) => {

    let node = this.getNode();
    let value = _.isString(e?.target?.value) ? e.target.value : e;

    if(path === "static_method" || path === "async_method") {
      const nodeValue = mutate.get(node, `data.${path}`)

      value = !nodeValue
    }

    node = mutate.set(node, `data.${path}`, value)

    store.dispatch(setUpdatedNode(node));
  }

  getNode(){
    let node =  this.props.customizerSettingsData?.find(n=>{
      return this.props.selectNode?.id == n.id
    });
    return node;
  }

  render() {
    const node = this.getNode();
    const {request_type, static_method, async_method} = node?.data;
    const customizerType = this.props.customizer?.type;

    const requestTypeOptions = [
      {
        value: 'get',
        label: 'Get',
      },
      {
        value: 'post',
        label: 'Post',
      },
      {
        value: 'put',
        label: 'Put',
      },
      {
        value: 'delete',
        label: 'Delete',
      },
    ];
    return (
      <div>

        <div className="settings-section open">
          <div className="settings-section__title d-flex">
            <div className="settings-section__icon d-flex">
              <Chevron/>
            </div>
            <div className="settings-section__label">Settings Start</div>
          </div>

          <div className="controllers-wrapper">
            {
              customizerType === "method" && (
                <>
                  <ControllerContainer label="Static">
                    <Switch
                      checked={static_method || false}
                      onChange={(e) => this.changeByPath(e, "static_method")}
                    />
                  </ControllerContainer>
                  <ControllerContainer label="Async">
                    <Switch
                      checked={async_method || false}
                      onChange={(e) => this.changeByPath(e, "async_method")}
                    />
                  </ControllerContainer>
                </>
              )
            }
            <div className="controller-container controller-container_select">
              <div className="controller-container__label control-select__label controller-label">Request Type:</div>
              <div className="control-container_select-wrapper controller-field">
                <select className="control-select control-field"
                        value={request_type || ''}
                        onChange={e => {
                          this.changeByPath(e, "request_type")
                        }}
                >
                  {requestTypeOptions.map(option => {
                    return <option value={option.value} key={option.value || 'null'}>{option.label}</option>
                  })}
                </select>
              </div>
            </div>
          </div> {/* ./controllers-wrapper */}
        </div> {/* ./settings-section */}

      </div>
    );
  }
}
function mapStateToProps(state){
  return {customizerSettingsData:state.customizerSettingsData}
}
export default connect(mapStateToProps)(StartNode)
