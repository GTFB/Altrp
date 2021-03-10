import { Component } from "react";
import ColorPallet from "./ColorPallet";
class ColorSchemeSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
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
  }

  /**
   * @param {Event} e
   */
  addButton = e => {
    e.preventDefault();
    e.stopPropagation();
    const length = this.state.counter + 1;
    const defaultColorSettings = {
      color: "#fff",
      id: Number(length)
    };
    let colors = _.cloneDeep(this.state.colorsObjects, []);
    colors.push(defaultColorSettings);
    this.setState(s => ({ ...s, colorsObjects: colors, counter: length }));
  };

  /**
   * @param {Event} e
   * @param {Number} i
   */
  deleteButton(e, i) {
    console.log("====================================");
    console.log(i);
    console.log("====================================");
    e.preventDefault();
    e.stopPropagation();
    let objects = this.state.colorsObjects;
    let match = _.findIndex(objects, item => item.id === i) !== -1;
    if (!match) {
      return;
    } else {
      objects.splice(i, 1);
    }
    this.setState(s => ({
      ...s,
      colorsObjects: objects
    }));
  }

  /**
   * @param {String} color
   * @param {Number} i
   */
  colorChangeHander(color, i) {
    const hex = color;
    let objects = _.cloneDeep(this.state.colorsObjects, []);
    let match = _.findIndex(objects, item => item.id === i) !== -1;
    if (!match) {
      return;
    } else {
      // _.get(objects, { id: i }).color = hex;
      this.setState(s => ({
        ...s,
        colorsObjects: objects
      }));
    }
  }

  /**
   * @param {Event} e
   */
  inputHandler = e => this.setState({ colorSchemeName: e.target?.value });

  render() {
    console.log("====================================");
    console.log(this.state.colorsObjects);
    console.log("====================================");
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
            {this.state.colorsObjects.map((item, index) => (
              <React.Fragment key={index}>
                <ColorPallet
                  id={item.id}
                  color={item.color || "#fff"}
                  colorChangeHander={this.colorChangeHander}
                  deleteButton={this.deleteButton}
                />
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
