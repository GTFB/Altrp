import React, { Component } from "react";

class ExportDashboardButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <button
          style={{
            margin: "5px 5px 5px 5px"
          }}
          onClick={this.props.onExport}
        >
          Экспорт диаграмм
        </button>
        <input type="file" />
      </>
    );
  }
}

export default ExportDashboardButton;
