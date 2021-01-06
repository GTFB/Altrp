import React, {Component} from "react";

class HistoryPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "actions"
    }
  }
  render() {
    let actionsTabClasses =
      "panel-tab d-flex " +
      (this.state.activeTab === "actions" ? "active" : "");
    let revisionTabClasses =
      "panel-tab d-flex " +
      (this.state.activeTab === "revision" ? "active" : "");
    return (
    <div className="panel history-panel d-flex">
      <div className="panel-tabs d-flex">
        <button
          className={actionsTabClasses}
        >
          <span className="panel-tab__text">
            ACTIONS
          </span>
        </button>
        <button
          className={revisionTabClasses}
        >
          <span className="panel-tab__text">
            REVISION
          </span>
        </button>
      </div>
    </div>
    )
  }
}

export default HistoryPanel