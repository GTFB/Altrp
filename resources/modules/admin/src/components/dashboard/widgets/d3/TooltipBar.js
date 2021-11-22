import React, { PureComponent } from "react";

class TooltipBar extends PureComponent {
  constructor(props) {
    console.log({datumm: props.datum});

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
    console.log({propsdatum: this.props.datum.id});

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
                background: this.props.datum?.color || "#000000",
                marginRight: '3px',
                marginTop: '1px'
              }} />
              {this.props.datum.id}:
              <strong>{this.props.datum?.value}</strong>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default TooltipBar;
