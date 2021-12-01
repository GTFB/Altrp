import * as React from "react";
import Chevron from "../../../../../../../editor/src/svgs/chevron.svg";
import store from "../../../../store/store";
import {setUpdatedNode} from "../../../../store/customizer-settings/actions";
import mutate from "dot-prop-immutable";
import {connect} from "react-redux";

class StartNode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
  }

  changeSelectCustomizer = (e, type) => {
    let node = this.props.selectNode;
    let value = e?.target?.value ? e.target.value : e;
    node = mutate.set(node, `data.${type}`, value)
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
    const {request_type} = node?.data;
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
            <div className="controller-container controller-container_select">
              <div className="controller-container__label control-select__label controller-label">Request Type:</div>
              <div className="control-container_select-wrapper controller-field">
                <select className="control-select control-field"
                        value={request_type || ''}
                        onChange={e => {
                          this.changeSelectCustomizer(e, "request_type")
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
