import React, { PureComponent } from "react";

class TooltipScatter extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    console.log({datum: this.props.datum.node});

    return (
      <div
        className={`${this.props.widgetID} altrp-dashboard__tooltip--font altrp-dashboard__tooltip--label-background altrp-dashboard__tooltip--width altrp-dashboard__tooltip--label-background-shadow altrp-dashboard__tooltip--border-type altrp-dashboard__tooltip--border-width altrp-dashboard__tooltip--border-color col-12`}
        style={{ padding: "5px 9px" }}
      >
        <div>
          <div
            style={{
              color: 'black',
              backgroundColor: 'white',
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
                background: this.props.datum.node.style?.color || "#000000",
                marginRight: '3px',
                marginTop: '1px'
              }} />
            </div>
            {this.props.datum.node.data?.serieId} <strong style={{marginLeft: '4px'}}>x: {this.props.datum.node.data.x} y: {this.props.datum.node.data.y}</strong>
          </div>
        </div>
      </div>
    )
  }
}

export default TooltipScatter;
