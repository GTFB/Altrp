import { Component } from "react";
import { SketchPicker } from "react-color";

class ColorSchemeSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colorCount: 0,
      colorsObjects: [],
      colorSchemeName: ""
    };
    this.submitHandler = this.submitHandler.bind(this);
    this.inputHandler = this.inputHandler.bind(this);
    this.addButton = this.addButton.bind(this);
    this.deleteButton = this.deleteButton.bind(this);
    this.colorChangeHander = this.colorChangeHander.bind(this);
  }

  /**
   * @param {Event} e
   */
  submitHandler(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log("====================================");
    console.log(e.target);
    console.log("====================================");
  }

  /**
   * @param {Event} e
   */
  addButton = e => {
    e.preventDefault();
    e.stopPropagation();
    let count = this.state.colorCount;
    count += 1;
    this.setState({ colorCount: count });
  };

  /**
   * @param {Event} e
   */
  deleteButton(e) {
    e.preventDefault();
    e.stopPropagation();
    let count = this.state.colorCount;
    count -= 1;
    this.setState({ colorCount: count });
  }

  /**
   * @param {import("react-color").ColorResult} color
   * @param {Number} i
   */
  colorChangeHander(color, i) {
    const hex = color.hex;
    const colorObject = {
      color: hex,
      id: i
    };
    let objects = this.state.colorsObjects;
    let match = _.findIndex(objects, item => item.id === i) !== -1;
    if (!match) {
      objects.push(colorObject);
    } else {
      objects[i] = colorObject;
    }
    console.log("====================================");
    console.log(match);
    console.log(objects);
    console.log("====================================");
  }

  /**
   * @param {Event} e
   */
  inputHandler = e => this.setState({ colorSchemeName: e.target?.value });

  render() {
    return (
      <>
        <form onSubmit={this.submitHandler} method="post">
          <label>
            Color scheme name:
            <input
              className="mb-3"
              name="name"
              placeholder="Enter color scheme name"
              type="text"
              defaultValue={this.state.colorSchemeName}
              onChange={this.inputHandler}
            />
          </label>
          <button onClick={this.addButton} className="mx-3">
            Add color
          </button>
          <input type="hidden" name="colors" value={this.state.colors} />
          <div className="row mb-5">
            {_.times(this.state.colorCount, i => (
              <React.Fragment key={i}>
                <div className="col mb-2">
                  <span
                    style={{
                      cursor: "pointer"
                    }}
                    onClick={this.deleteButton}
                  >
                    X
                  </span>
                  <SketchPicker
                    onChange={color => this.colorChangeHander(color, i)}
                    color={this.state.colorsObjects?.color}
                  />
                </div>
              </React.Fragment>
            ))}
          </div>
          <button type="submit">Save color scheme</button>
        </form>
      </>
    );
  }
}

export default ColorSchemeSettings;
