import React, { Component } from "react";

class ExportDashboardButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        className={this.props.className}
        style={{
          display: "inline-block"
        }}
      >
        <button
          className={`altrp-btn-draw`}
          style={{
            margin: "5px 5px 5px 5px"
          }}
          onClick={this.props.onExport}
        >
          Экспорт диаграмм
        </button>
      </div>
    );
  }
}

export default ExportDashboardButton;
