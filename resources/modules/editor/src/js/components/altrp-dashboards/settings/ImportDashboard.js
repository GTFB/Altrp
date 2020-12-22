import React, { Component } from "react";

class ImportDashboard extends Component {
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
          onClick={this.props.onImport}
        >
          Импорт диаграмм
        </button>
      </>
    );
  }
}

export default ImportDashboard;
