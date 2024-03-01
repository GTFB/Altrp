import React, { Component } from "react";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  sizes: state.globalStyles.sizes || []
});

class PresetGlobalSizes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultValue: ""
    };
  }

  componentDidMount() {
    const sizes = this.props.sizes;
    if (sizes.length > 0) {
      sizes.forEach(effect => {
        if (this.props.checkGlobal(effect.guid)) {
          this.setState(s => ({ ...s, defaultValue: effect.guid }));
        }
      });
    }
  }

  onChange = (e) => {
    const guid = e.target.value;
    this.setState(s => ({ ...s, defaultValue: guid }));
    this.props.setSize(guid);
  }

  render() {
    return (
      <div className="controller-container controller-container_select controller-container_select_size">
        <div className="controller-container__label control-select__label">
          Current Spacing:
        </div>
        <div className="control-container_select-wrapper">
          <select
            name="weightSelect"
            className="control-select control-field"
            onChange={this.onChange}
            value={this.state.defaultValue}
          >
            <option>Choose effect</option>
            {this.props.sizes.map((effect, index) => (
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

export default connect(mapStateToProps)(PresetGlobalSizes);
