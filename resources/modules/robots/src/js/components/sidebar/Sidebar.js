import * as React from "react";

import SelectedPanel from "./SelectedPanel";
import WidgetsPanel from "./WidgetsPanel";
import Resource from "../../../../../editor/src/js/classes/Resource";

import Logo from "../../../../../editor/src/svgs/logo.svg";
import Dots from "../../../../../editor/src/svgs/dots.svg";
import Hamburger from "../../../../../editor/src/svgs/hamburger.svg";

const tabs = [
  {
    title: "Selected",
    render: (chart, callbacks) => (
      <SelectedPanel callbacks={callbacks} chart={chart}></SelectedPanel>
    )
  },
  {
    title: "Widgets",
    render: props => <WidgetsPanel></WidgetsPanel>
  }
];

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTab: 0
    };

    this.resource = new Resource({ route: "/admin/ajax/robots" });

    this.changeTab = this.changeTab.bind(this);
    this.update = this.update.bind(this);
  }

  async update() {
    const robotId = new URL(window.location).searchParams.get("robot_id");

    this.resource.put(robotId, {
      data: JSON.stringify(this.props.chart)
    });
  }

  changeTab(index) {
    this.setState(state => ({
      currentTab: index
    }));
  }
  render() {
    return (
      <div className="left-panel">
        <div className="editor-top-panel">
          <button
            onClick={() => this.changeTab(0)}
            className="btn btn_hamburger"
          >
            <Hamburger className="icon" />
          </button>
          <a href="/admin/templates" target="_blank" className="logo">
            {window.admin_logo ? (
              renderAsset(window.admin_logo, { className: "editor__logo" })
            ) : (
              <Logo viewBox="0 0 97 35" className="editor__logo" />
            )}
          </a>
          <button className="btn btn_dots" onClick={() => this.changeTab(1)}>
            <Dots className="icon" />
          </button>
        </div>
        <div className="left-panel-main">
          {tabs[this.state.currentTab].render(
            this.props.chart,
            this.props.callbacks
          )}
        </div>
        <div className="editor-bottom-panel d-flex align-content-center justify-start">
          <div className="control-group d-flex">
            <button
              onClick={this.update}
              className="btn font_montserrat font_500 btn_grey btn_active"
            >
              UPDATE
            </button>
          </div>
        </div>
      </div>
    );
  }
}
