import React, { Component } from "react";

class ImportDiagram extends Component {
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
          style={{
            margin: "5px 5px 5px 5px"
          }}
          onClick={this.props.onImport}
        >
          Импорт виджета
        </button>
        <input
          type="file"
          onChange={e => this.props.getFile(e)}
          accept="application/json"
        />
      </div>
    );
  }
}

export default ImportDiagram;
