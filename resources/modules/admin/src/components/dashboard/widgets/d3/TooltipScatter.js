import React, { PureComponent } from "react";

class TooltipScatter extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      indexValue: props.datum?.indexValue,
      value: props.datum?.value,
      color: props.datum?.color,
      enable: props?.enable,
      settings: props?.settings,
      data: props.datum?.node?.data
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

  customTooltip() {
    return (
      <>
        <div
          className={`${this.props.widgetID} altrp-dashboard__tooltip--label-background altrp-dashboard__tooltip--width altrp-dashboard__tooltip--label-background-shadow altrp-dashboard__tooltip--border-type altrp-dashboard__tooltip--border-width altrp-dashboard__tooltip--border-color col-12`}
          style={{ padding: "5px 9px" }}
        >
          <div
            style={
              {
                // whiteSpace: "pre",
                // display: "flex",
                // alignItems: "center"
              }
            }
          >
            <div
              className={`${this.props.widgetID} altrp-dashboard__tooltip--font col px-0`}
            >
              {/* <span
                style={{
                  display: "block",
                  width: "12px",
                  height: "12px",
                  background: this.props.datum.node.style.color,
                  marginRight: "7px"
                }}
              ></span> */}
              {this.props.datum.node.data.formattedX}:{" "}
              <strong
                className={`${this.props.widgetID} altrp-dashboard__tooltip--font col px-0`}
              >
                {this.props.datum.node.data.formattedY}
              </strong>
            </div>
            {this.props.datum.node.data?.tooltip?.map((item, index) => {
              return (
                <div
                  style={{
                    color: item?.color || "#000000"
                  }}
                  key={index}
                >
                  {`${item?.label}:`}
                  <strong>{item.value}</strong>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }

  render() {
    if (this.state.enable) {
      return this.customTooltip();
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
                background: this.props.datum.node.style.color,
                marginRight: "7px"
              }}
            ></span>
            <span>
              {this.props.datum.node.data.formattedX}:{" "}
              <strong>{this.props.datum.node.data.formattedY}</strong>
            </span>
          </div>
        </div>
      </>
    );
  }
}

export default TooltipScatter;
