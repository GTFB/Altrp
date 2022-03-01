import * as React from "react";
import Chevron from "../../../../../../../editor/src/svgs/chevron.svg";
import store from "../../../../store/store";
import {setUpdatedNode} from "../../../../store/customizer-settings/actions";
import mutate from "dot-prop-immutable";
import {connect} from "react-redux";

class ListenerNode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
  }

  // Запись значений input в store
  changeInput(e, type) {
    const node = this.props.selectNode;
    node.data[type] = e.target.value;
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
    const {socket_type, socket_listener} = node?.data;
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
            <div className="controller-container">
              <div className="controller-container__label control-select__label controller-label">Type</div>
              <div className="control-container_select-wrapper controller-field">
                <input
                  className="control-field"
                  value={socket_type || ""}
                  onChange={(e) => {
                    console.log(e)
                  this.changeInput(e, "socket_type")
                }}/>
              </div>
            </div>
            <div className="controller-container">
              <div className="controller-container__label control-select__label controller-label">Listener</div>
              <div className="control-container_select-wrapper controller-field">
                <input
                  className="control-field"
                  value={socket_listener || ""}
                  onChange={(e) => {
                    this.changeInput(e, "socket_listener")
                  }}/>
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
export default connect(mapStateToProps)(ListenerNode)
