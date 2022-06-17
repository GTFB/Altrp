import React, { Component } from "react";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  fonts: state.globalStyles.fonts
});

class PresetGlobalFonts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultValue: ""
    };
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    const fonts = this.props.fonts;
    if (fonts.length > 0) {
      fonts.forEach(fonts => {
        if (this.props.checkGlobal(fonts.guid)) {
          this.setState(s => ({ ...s, defaultValue: fonts.guid }));
        }
      });
    }
  }

  onChange(e) {
    const guid = e.target.value;
    this.setState(s => ({ ...s, defaultValue: guid }));
    this.props.setFont(guid);
  }

  render() {
    return (
      <div className="controller-container controller-container_select controller-container_select_typographic">
        <div className="controller-container__label control-select__label">
          Global Fonts
        </div>
        <div className="control-container_select-wrapper">
          <select
            name="weightSelect"
            className="control-select control-field"
            onChange={this.onChange}
            value={this.state.defaultValue}
          >
            <option>Choose font</option>
            {this.props.fonts.map((font, index) => (
              <option key={index} value={font.guid}>
                {font.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(PresetGlobalFonts);
