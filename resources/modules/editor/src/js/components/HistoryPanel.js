import React, { Component } from "react";
import { useSelector } from "react-redux";
import { iconsManager } from "../../../../front-app/src/js/helpers";
import { getEditor, getTemplateDataStorage, getFactory } from "../helpers";
import Resource from "../classes/Resource";
import {
  setActiveHistoryStore,
  addHistoryStoreItem
} from "../store/history-store/actions";

import UserSvg from "../../../../admin/src/svgs/user.svg";
import StartFilled from "../../../../admin/src/svgs/start-filled.svg";
import Scrollbars from "react-custom-scrollbars";
import { changeTemplateStatus } from "../store/template-status/actions";
import CONSTANTS from "../consts";

class HistoryPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "actions"
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
        <div className="history-panel__tab-content" style={{height: '100vh'}}>
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
      <Scrollbars autoHide autoHideTimeout={500} autoHideDuration={200}>
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
          if (item.data && item.data.element) {
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
            case "REVISION":
              title = "Revision";
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
      </Scrollbars>
    </div>
  );
};

const RevisionTabContent = () => {
  const [arrayRevisions, setArrayRevisions] = React.useState([]);
  const [currentRevision, setCurrentRevision] = React.useState(-1);
  const [oldRootElement, setOldRootElement] = React.useState();

  React.useEffect(() => {
    setOldRootElement(_.cloneDeep(getTemplateDataStorage().rootElement));
    let templateId = appStore.getState().templateData.id;

    const fetchRevisions = async () => {
      let arrayRevisions = await new Resource({
        route: `/admin/ajax/templates/${templateId}/reviews`
      }).getAll();
      setArrayRevisions(arrayRevisions.reverse());
    };
    fetchRevisions(0);
    window.parent.appStore.dispatch(setActiveHistoryStore(false));
    return () => {
      window.parent.appStore.dispatch(setActiveHistoryStore(true));
    };
  }, []);

  const handleClickDiscard = () => {
    getTemplateDataStorage().replaceAll(oldRootElement);
    getEditor().showWidgetsPanel();
  };

  const handleClickApply = () => {
    window.parent.appStore.dispatch(
      addHistoryStoreItem("REVISION", {
        old: oldRootElement,
        new: _.cloneDeep(getTemplateDataStorage().rootElement)
      })
    );

    window.parent.appStore.dispatch(changeTemplateStatus(CONSTANTS.TEMPLATE_NEED_UPDATE));
    getEditor().showWidgetsPanel();
  };

  const handleSetCurrentRevision = (index, item) => async () => {
    setCurrentRevision(index);
    let response = await new Resource({
      route: `/admin/ajax/templates/${item.parent_template}/reviews/${item.id}`
    }).getAll();

    let revisionRootElement = JSON.parse(response[0].data);

    let parsedData = getFactory().parseData(revisionRootElement);
    getTemplateDataStorage().replaceAll(parsedData);
  };
  return (
    <React.Fragment>
      <div className="history-panel__revision-actions">
        <div className="history-panel__discard" onClick={handleClickDiscard}>
          {iconsManager().renderIcon("deleteOne", {
            style: { width: 14, height: 14 },
            className: "history-panel__discard-icon"
          })}
          DISCARD
        </div>
        <div className="history-panel__apply" onClick={handleClickApply}>
          APPLY
        </div>
      </div>
      <div className="history-panel__title">Revisions</div>
      <div className="history-panel__content history-panel__content--revision">
        <Scrollbars autoHide autoHideTimeout={500} autoHideDuration={200}>
          {arrayRevisions.map((item, index) => {
            let secondsAgo = (Date.now() - Date.parse(item.updated_at)) / 1000;
            let dateString;
            if (secondsAgo < 100) {
              dateString = `${secondsAgo} seconds ago`;
            } else if (secondsAgo < 6000) {
              dateString = `${Math.floor(secondsAgo / 100)} minutes ago`;
            } else if (secondsAgo < 144000) {
              dateString = `${Math.floor(secondsAgo / 6000)} hours ago`;
            } else if (secondsAgo < 4320000) {
              dateString = `${Math.floor(secondsAgo / 144000)} days ago`;
            } else if (secondsAgo < 51840000) {
              dateString = `${Math.floor(secondsAgo / 4320000)} months ago`;
            } else {
              dateString = `${Math.floor(secondsAgo / 51840000)} years ago`;
            }
            let date = new Date(item.updated_at);
            dateString += ` (${date.toLocaleString("en", {
              month: "short"
            })} ${date.getDate()} @ ${date.getHours()}:${
              date.getMinutes() > 9
                ? date.getMinutes()
                : `0${date.getMinutes()}`
            })`;
            return (
              <div
                className={
                  index === currentRevision
                    ? "history-panel__card-revision history-panel__card-revision--active"
                    : "history-panel__card-revision"
                }
                onClick={handleSetCurrentRevision(index, item)}
                key={index}
              >
                <UserSvg className="history-panel__card-avatar" />
                <div className="history-panel__card-content">
                  <div className="history-panel__card-time">{dateString}</div>
                  <div className="history-panel__card-author">
                    Revision by {item.author}
                  </div>
                </div>
                {index === currentRevision && (
                  <StartFilled className="history-panel__card-icon" />
                )}
              </div>
            );
          })}
        </Scrollbars>
      </div>
    </React.Fragment>
  );
};

export default HistoryPanel;
