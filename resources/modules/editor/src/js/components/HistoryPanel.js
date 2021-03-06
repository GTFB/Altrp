import React, { Component } from "react";
import { useSelector } from "react-redux";
import { iconsManager } from "../../../../front-app/src/js/helpers";
import { mountListenerHistory, unmountListenerHistory } from "../helpers";

class HistoryPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "revision"
    };
  }

  setActiveTab(activeTab) {
    return () => {
      this.setState(state => ({
        ...state,
        activeTab
      }));
    };
  }

  renderTabContent() {
    switch (this.state.activeTab) {
      case "actions":
        return <ActionsTabContent />;
      case "revision":
        return <RevisionTabContent />;
      default:
        return "";
    }
  }

  render() {
    let actionsTabClasses =
      "history-panel__tab " +
      (this.state.activeTab === "actions" ? "history-panel__tab--active" : "");
    let revisionTabClasses =
      "history-panel__tab " +
      (this.state.activeTab === "revision" ? "history-panel__tab--active" : "");

    return (
      <div className="history-panel">
        <div className="history-panel__tabs">
          <button
            onClick={this.setActiveTab("actions")}
            className={actionsTabClasses}
          >
            <span>ACTIONS</span>
          </button>
          <button
            onClick={this.setActiveTab("revision")}
            className={revisionTabClasses}
          >
            <span>REVISION</span>
          </button>
        </div>
        <div className="history-panel__tab-content">
          {this.renderTabContent()}
        </div>
      </div>
    );
  }
}

const ActionsTabContent = () => {
  const controllerHistory = window.controllerHistory;
  const historyStore = useSelector(state => state.historyStore.history);
  const current = useSelector(state => state.historyStore.current);

  const handlerHistory = index => {
    return () => {
      if (current > index) {
        for (let i = 0; i < current - index; i++) {
          controllerHistory.undo();
        }
      } else if (current < index) {
        for (let i = 0; i < index - current; i++) {
          controllerHistory.redo();
        }
      }
    };
  };

  return (
    <div className="history-panel__content">
      <div
        key={-1}
        className={
          current === -1
            ? "history-panel__restore-item history-panel__restore-item--active"
            : "history-panel__restore-item"
        }
        onClick={handlerHistory(-1)}
      >
        <span className="history-panel__restore-item-title">start edit</span>
        {current === -1
          ? iconsManager().renderIcon("check", {
              style: { width: 20, height: 20 },
              className: "history-panel__restore-item-icon"
            })
          : ""}
      </div>
      {historyStore.map((item, index) => {
        let title = "";
        if (item.data) {
          title = item.data.element.getTitle();
        }

        let type = "";
        switch (item.type) {
          case "ADD":
            type = "Added";
            break;
          case "EDIT":
            type = "Edited";
            break;
          case "DELETE":
            type = "Removed";
            break;
        }

        let restoreItemClasses = "history-panel__restore-item ";
        if (current === index) {
          restoreItemClasses += "history-panel__restore-item--active ";
        }

        return (
          <div
            key={index}
            className={restoreItemClasses}
            onClick={handlerHistory(index)}
          >
            <span className="history-panel__restore-item-title">{title}</span>
            <span className="history-panel__restore-item-type">{type}</span>
            {current === index
              ? iconsManager().renderIcon("check", {
                  style: { width: 20, height: 20 },
                  className: "history-panel__restore-item-icon"
                })
              : ""}
          </div>
        );
      })}
      <div className="history-panel__actions-tab-subscribe">
        Switch to Revisions tab for older version
      </div>
    </div>
  );
};

const RevisionTabContent = () => {
  // React.useEffect(() => {
  //   unmountListenerHistory();
  //   return () => {
  //     mountListenerHistory();
  //   };
  // });

  return (
    <React.Fragment>
      <div className="history-panel__revision-actions">
        <div className="history-panel__discard">
          {iconsManager().renderIcon("deleteOne", {
            style: { width: 20, height: 20 },
            className: "history-panel__discard-icon"
          })}
          DISCARD
        </div>
        <div className="history-panel__apply">APPLY</div>
      </div>
      <div className="history-panel__title">Revisions</div>
      <div className="history-panel__content">RevisionTabContent</div>
    </React.Fragment>
  );
};

export default HistoryPanel;
