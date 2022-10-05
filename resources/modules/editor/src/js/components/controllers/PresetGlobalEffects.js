import React, { Component } from "react";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  effects: state.globalStyles.effects
});

class PresetGlobalEffects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultValue: ""
    };
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    const effects = this.props.effects;
    if (effects.length > 0) {
      effects.forEach(effect => {
        if (this.props.checkGlobal(effect.guid)) {
          this.setState(s => ({ ...s, defaultValue: effect.guid }));
        }
      });
    }
  }

  onChange(e) {
    const guid = e.target.value;
    this.setState(s => ({ ...s, defaultValue: guid }));
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
            value={this.state.defaultValue}
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
