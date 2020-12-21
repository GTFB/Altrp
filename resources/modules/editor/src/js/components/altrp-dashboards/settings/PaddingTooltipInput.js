import React, { Component } from "react";

class PaddingTooltipInput extends Component {
  constructor(props) {
    super(props);
    const defaultPadding = {
      left: 5,
      right: 5,
      bottom: 5,
      top: 5
    };
    this.state = {
      padding: {
        left: props.padding?.left || defaultPadding.left,
        right: props.padding?.right || defaultPadding.right,
        bottom: props.padding?.bottom || defaultPadding.bottom,
        top: props.padding?.top || defaultPadding.top
      }
    };
    this.setProperty = this.setProperty.bind(this);
  }

  componentDidUpdate(prevState, prevProps) {
    if (!_.isEqual(prevState.padding, this.state.padding)) {
      //   this.props.setProperty(this.state.padding, "tooltip.padding");
    }
  }

  setProperty(value, property) {
    this.props.setProperty(this.state.padding, "tooltipPadding");
    this.setState(s => ({
      ...s,
      padding: { ...s.padding, [property]: Number(value) }
    }));
  }

  render() {
    return (
      <div className="mt-2">
        <div className="col">
          <div className="row">
            <div className="col px-0">
              <div
                htmlFor=""
                className={`${this.props.widgetID} altrp-dashboard__drawer--label-font-size`}
              >
                Слева:
              </div>
              <input
                className="form-control"
                style={{
                  width: "100%"
                }}
                type="number"
                min="0"
                defaultValue={this.state.padding.left}
                param="left"
                onChange={e => this.setProperty(e.target.value, "left")}
              />
            </div>
            <div className="col px-0">
              <div
                htmlFor=""
                className={`${this.props.widgetID} altrp-dashboard__drawer--label-font-size`}
              >
                Справа:
              </div>
              <input
                className="form-control"
                style={{
                  width: "100%"
                }}
                type="number"
                min="0"
                defaultValue={this.state.padding.right}
                param="right"
                onChange={e => this.setProperty(e.target.value, "right")}
              />
            </div>
          </div>
          <div className="row mt-1">
            <div className="col px-0">
              <div
                htmlFor=""
                className={`${this.props.widgetID} altrp-dashboard__drawer--label-font-size`}
              >
                Сверху:
              </div>
              <input
                className="form-control"
                style={{
                  width: "100%"
                }}
                type="number"
                min="0"
                defaultValue={this.state.padding.top}
                param="top"
                onChange={e => this.setProperty(e.target.value, "top")}
              />
            </div>
            <div className="col px-0">
              <div
                htmlFor=""
                className={`${this.props.widgetID} altrp-dashboard__drawer--label-font-size`}
              >
                Снизу:
              </div>
              <input
                className="form-control"
                style={{
                  width: "100%"
                }}
                type="number"
                min="0"
                defaultValue={this.state.padding.bottom}
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

export default PaddingTooltipInput;
