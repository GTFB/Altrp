import React, { PureComponent } from "react";

class TooltipPie extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      indexValue: props.datum?.indexValue,
      value: props.datum?.value,
      color: props.datum?.color,
      enable: props?.enable,
      settings: props?.settings
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (!_.isEqual(prevProps.enable, this.props.enable)) {
      this.setState(s => ({
        ...s,
        enable: this.props?.enable
      }));
    }
  }

  render() {
    if (this.state.enable) {
      return (
        <div
          className={`${this.props.widgetID} altrp-dashboard__tooltip--font altrp-dashboard__tooltip--label-background altrp-dashboard__tooltip--width altrp-dashboard__tooltip--label-background-shadow altrp-dashboard__tooltip--border-type altrp-dashboard__tooltip--border-width altrp-dashboard__tooltip--border-color col-12`}
          style={{ padding: "5px 9px" }}
        >
          <div>
            <div
              style={{
                color: 'white',
                display: 'flex'
              }}
            >
              <div style={{
                height: '100%',
                display: 'flex',
                alignItems: 'center'
              }}>
                <div style={{
                  width: '15px',
                  height: '15px',
                  background: this.props.datum.datum.color || "#000000",
                  marginRight: '3px',
                  marginTop: '1px'
                }} />
              </div>
              {this.props.datum?.datum?.label}:
              <strong>{this.props.datum?.datum?.value}</strong>
            </div>
          </div>
        </div>
      )
    }
    return (
      <>
        <div
          style={{
            background: "white",
            color: "inherit",
            fontSize: "{{SIZE}}px",
            borderRadius: "2px",
            boxShadow: "rgba(0, 0, 0, 0.25) 0px 1px 2px",
            padding: "5px 9px"
          }}
        >
          <div
            style={{
              whiteSpace: "pre",
              display: "flex",
              alignItems: "center"
            }}
          >
            <span
              style={{
                display: "block",
                width: "12px",
                height: "12px",
                background: this.props.datum.datum.color,
                marginRight: "7px"
              }}
            ></span>
            <span>
              {this.props.datum.datum.label}:{" "}
              <strong>{this.props.datum.datum.value}</strong>
            </span>
          </div>
        </div>
      </>
    );
  }
}

export default TooltipPie;
