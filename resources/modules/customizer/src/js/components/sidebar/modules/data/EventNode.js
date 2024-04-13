import * as React from "react";
import Chevron from "../../../../../../../editor/src/svgs/chevron.svg";
import store from "../../../../store/store";
import {setUpdatedNode} from "../../../../store/customizer-settings/actions";
import mutate from "dot-prop-immutable";
import {connect} from "react-redux";
import altrpRandomId from "../../../../../../../front-app/src/js/helpers/functions/altrp-random-id";
import ChangeRepeater from "../../ChangeRepeater";

class EventNode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
  }

  changeByPath = (e, path) => {
    let node = this.getNode();
    node = mutate.set(node, `data.${path}`, e)
    store.dispatch(setUpdatedNode(node));
  }

  getNode() {
    let node = this.props.customizerSettingsData?.find(n => {
      return this.props.selectNode?.id == n.id
    });
    return node;
  }

  addClick = (value) => {
    if (value) {
      const node = this.getNode();
      let items = [...node?.data?.props?.items || []];
      items.push({
        id: altrpRandomId(),
        action: value
      });
      this.changeByPath(items, 'props.items')
    } else {
      const node = this.getNode();
      let items = [...node?.data?.props?.items || []];
      items.push({
        id: altrpRandomId()
      });
      this.changeByPath(items, 'props.items')
    }
  }

  deleteById = (id) => {
    const node = this.getNode();
    let items = node?.data?.props?.items || []
    items = items.filter(i => i.id !== id)
    this.changeByPath(items, 'props.items')
  }

  render() {
    const node = this.getNode();

    const data = node?.data?.data || '';
    const name = node?.data?.name || '';
    return (
      <div>
        <div className="settings-section open">
          <div className="settings-section__title d-flex">
            <div className="settings-section__icon d-flex">
              <Chevron/>
            </div>
            <div className="settings-section__label">Event Settings</div>
          </div>

          <div className="controllers-wrapper">

            <div className="controller-container controller-container_select">
              <div className="controller-container__label control-select__label controller-label">
                Event Name
              </div>
              <div className="bp3-control-group bp3-numeric-input">
                <div className="bp3-input-group">
                  <input type="text"
                         id="mapper-source"
                         onChange={(e) => {
                           this.changeByPath(e.target.value, 'name');
                         }}
                         className="bp3-input"
                         value={name}/>
                </div>

              </div>
            </div>
            <div className="controller-container controller-container_select">
              <div className="controller-container__label control-select__label controller-label">
                Event Param
              </div>
              <div className="bp3-control-group bp3-numeric-input">
                <div className="bp3-input-group">
                  <input type="text"
                         id="mapper-source"
                         onChange={(e) => {
                           this.changeByPath(e.target.value, 'data');
                         }}
                         className="bp3-input"
                         value={data}/>
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

export default connect(mapStateToProps)(EventNode)
