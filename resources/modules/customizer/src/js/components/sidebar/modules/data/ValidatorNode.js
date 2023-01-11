import * as React from "react";
import Chevron from "../../../../../../../editor/src/svgs/chevron.svg";
import store from "../../../../store/store";
import {setUpdatedNode} from "../../../../store/customizer-settings/actions";
import mutate from "dot-prop-immutable";
import {connect} from "react-redux";
import altrpRandomId from "../../../../../../../front-app/src/js/helpers/functions/altrp-random-id";
import ChangeRepeater from "../../ChangeRepeater";

class ValidatorNode extends React.Component {
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
    const items = node?.data?.props?.items || [];
    return (
      <div>
        <div className="settings-section open">
          <div className="settings-section__title d-flex">
            <div className="settings-section__icon d-flex">
              <Chevron/>
            </div>
            <div className="settings-section__label">Settings Change</div>
          </div>

          <div className="controllers-wrapper">
            <div className="controller-container controller-container_select">
              <div className="settings-section__label QueryBuilderNode__label">Set Actions</div>
              <ChangeRepeater changeByPath={this.changeByPath}
                              path="props.items"
                              deleteById={this.deleteById}
                              items={items}
                              addClick={this.addClick}/>
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

export default connect(mapStateToProps)(ValidatorNode)
