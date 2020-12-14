import React, { Component } from "react";
import {
  BAR,
  PIE,
  LINE,
  TABLE,
  POINT
} from "../../../../../../admin/src/components/dashboard/widgetTypes";

const defaultBarMargin = {
  left: 80,
  right: 80,
  bottom: 80,
  top: 40
};

const defaultPieMargin = {
  left: 120,
  right: 180,
  bottom: 80,
  top: 80
};

const defaultLineMargin = {
  left: 100,
  right: 120,
  bottom: 80,
  top: 40
};

const defaultScatterMarign = {
  top: 40,
  right: 180,
  bottom: 80,
  left: 100
};

class MarginInput extends Component {
  constructor(props) {
    super(props);
    let defaultMargin = {
      left: 30,
      right: 30,
      bottom: 30,
      top: 30
    };
    switch (props.type) {
      case LINE:
        defaultMargin = defaultLineMargin;
        break;
      case BAR:
        defaultMargin = defaultBarMargin;
        break;
      case PIE:
        defaultMargin = defaultPieMargin;
        break;
      case POINT:
        defaultMargin = defaultScatterMarign;
        break;
    }
    this.state = {
      margin: {
        left: props.margin?.left || defaultMargin.left,
        right: props.margin?.right || defaultMargin.right,
        bottom: props.margin?.bottom || defaultMargin.bottom,
        top: props.margin?.top || defaultMargin.top
      }
    };
    this.setProperty = this.setProperty.bind(this);
  }

  componentDidUpdate(prevState, prevProps) {
    if (!_.isEqual(prevState.margin, this.state.margin)) {
      this.props.setProperty(this.state.margin, "margin");
    }
  }

  setProperty(value, property) {
    this.setState(s => ({
      ...s,
      margin: { ...s.margin, [property]: Number(value) }
    }));
  }

  render() {
    return (
      <div className="mt-2">
        <div className="col">
          <div className="row">
            <div className="col px-0">
              <label htmlFor="" className="form-label">
                Слева:
              </label>
              <input
                className="form-control"
                style={{
                  width: "100%"
                }}
                type="number"
                min="0"
                defaultValue={this.state.margin.left}
                param="left"
                onChange={e => this.setProperty(e.target.value, "left")}
              />
            </div>
            <div className="col px-0">
              <label htmlFor="" className="form-label">
                Справа:
              </label>
              <input
                className="form-control"
                style={{
                  width: "100%"
                }}
                type="number"
                min="0"
                defaultValue={this.state.margin.right}
                param="right"
                onChange={e => this.setProperty(e.target.value, "right")}
              />
            </div>
          </div>
          <div className="row mt-1">
            <div className="col px-0">
              <label htmlFor="" className="form-label">
                Сверху:
              </label>
              <input
                className="form-control"
                style={{
                  width: "100%"
                }}
                type="number"
                min="0"
                defaultValue={this.state.margin.top}
                param="top"
                onChange={e => this.setProperty(e.target.value, "top")}
              />
            </div>
            <div className="col px-0">
              <label htmlFor="" className="form-label">
                Снизу:
              </label>
              <input
                className="form-control"
                style={{
                  width: "100%"
                }}
                type="number"
                min="0"
                defaultValue={this.state.margin.bottom}
                param="bottom"
                onChange={e => this.setProperty(e.target.value, "bottom")}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MarginInput;
