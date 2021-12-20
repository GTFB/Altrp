import React, { PureComponent } from "react";

class TooltipPie extends PureComponent {
  render() {
    return (
      <div
        className={`${this.props.widgetID} altrp-dashboard__tooltip--font altrp-dashboard__tooltip--label-background altrp-dashboard__tooltip--width altrp-dashboard__tooltip--label-background-shadow altrp-dashboard__tooltip--border-type altrp-dashboard__tooltip--border-width altrp-dashboard__tooltip--border-color col-12`}
        style={{ padding: "5px 9px" }}
      >
        <div>
          <div
            style={{
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
}

export default TooltipPie;
