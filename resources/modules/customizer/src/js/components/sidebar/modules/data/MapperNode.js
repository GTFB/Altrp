import * as React from "react";
import Chevron from "../../../../../../../editor/src/svgs/chevron.svg";
import store from "../../../../store/store";
import {setUpdatedNode} from "../../../../store/customizer-settings/actions";
import mutate from "dot-prop-immutable";
import {connect} from "react-redux";
import altrpRandomId from "../../../../../../../front-app/src/js/helpers/functions/altrp-random-id";
import ChangeRepeater from "../../ChangeRepeater";

class MapperNode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
  }

  changeByPath = (value, path) => {
    let node = this.getNode();
    node = mutate.set(node, `data.${path}`, value)
    store.dispatch(setUpdatedNode(node));
  }

  getNode() {
    let node = this.props.customizerSettingsData?.find(n => {
      return this.props.selectNode?.id == n.id
    });
    return node;
  }

  render() {
    const node = this.getNode();
    const {
      store = '',
      source = '',
    } = node.data

    return (
      <div>
        <div className="settings-section open">
          <div className="settings-section__title d-flex">
            <div className="settings-section__icon d-flex">
              <Chevron/>
            </div>
            <div className="settings-section__label">Settings Mapper</div>
          </div>

          <div className="controllers-wrapper">
            <div className="controller-container controller-container_select">
              <div className="controller-container__label control-select__label controller-label">Date Source * (without `context` prefix)</div>
              <div className="bp3-control-group bp3-numeric-input">
                <div className="bp3-input-group">
                  <input type="text"
                         id="mapper-source"
                         onChange={(e)=>{
                           this.changeByPath(e.target.value, 'source');
                         }}
                         className="bp3-input"
                         value={source}/>
                </div>

              </div>
            </div>
            <div className="controller-container controller-container_select">
              <div className="controller-container__label control-select__label controller-label">Store Result to (without `context` prefix)</div>
              <div className="bp3-control-group bp3-numeric-input">
                <div className="bp3-input-group">
                  <input type="text"
                         id="store-path"
                         onChange={(e)=>{
                           this.changeByPath(e.target.value, 'store');
                         }}
                         className="bp3-input"
                         value={store}/>
                </div>

              </div>
            </div>
          </div>
          {/* ./controllers-wrapper */}
        </div>
        {/* ./settings-section */}

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {customizerSettingsData: state.customizerSettingsData}
}

export default connect(mapStateToProps)(MapperNode)
