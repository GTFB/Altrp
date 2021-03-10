import { Component } from "react";
import { SketchPicker } from "react-color";

class ColorPallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: props.color,
      id: props.id
    };
    this.changeColorHandler = this.changeColorHandler.bind(this);
    this.debounceColorHandler = this.debounceColorHandler.bind(this);
  }

  /**
   *
   * @param {import("react-color").ColorResult} color
   */
  changeColorHandler(color) {
    const hex = color.hex;
    this.setState(
      s => ({ ...s, color: hex }),
      () => {
        this.props.colorChangeHander(hex, this.state.id);
      }
    );
  }

  debounceColorHandler = _.debounce(
    /**
     * @param {import("react-color").ColorResult} color
     */
    color => this.changeColorHandler(color),
    50
  );

  render() {
    return (
      <div className="col mb-2">
        <span
          style={{
            cursor: "pointer"
          }}
          onClick={e => this.props.deleteButton(e, this.state.id)}
        >
          X
        </span>
        <SketchPicker
          onChange={this.debounceColorHandler}
          color={this.state.color}
        />
      </div>
    );
  }
}

export default ColorPallet;
