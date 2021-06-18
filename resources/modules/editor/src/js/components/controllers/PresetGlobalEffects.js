import { indexOf } from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  effects: state.globalStyles.effects
});

class PresetGlobalEffects extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const guid = e.target.value;
    this.props.setEffect(guid);
  }

  render() {
    return (
      <div className="controller-container controller-container_select controller-container_select_typographic">
        <div className="controller-container__label control-select__label">
          Global Effects
        </div>
        <div className="control-container_select-wrapper">
          <select
            name="weightSelect"
            className="control-select control-field"
            onChange={this.onChange}
          >
            <option>Choose effect</option>
            {this.props.effects.map((effect, index) => (
              <option key={index} value={effect.guid}>
                {effect.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(PresetGlobalEffects);
