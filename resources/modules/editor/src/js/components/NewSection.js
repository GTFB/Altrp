import React, { Component } from "react";
import PlusIcon from "../../svgs/plus.svg";
import FolderIcon from "../../svgs/folder.svg";
import { getEditor } from "../helpers";
import Column from "../classes/elements/Column";
import GetTemplate from "./get-template/GetTemplate";
import GetSection from "./get-section/GetSection";

class NewSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTemplates: false,
      showSections: false,
    };

    this.showTemplates = this.showTemplates.bind(this);
  }

  onDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }

  onDragEnter(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }

  onDrop(e) {
    /**
     * @member {HTMLElement} target
     * */

    let newWidgetName = e.dataTransfer.getData("text/plain");
    e.preventDefault();
    e.stopPropagation();
    getEditor().modules.templateDataStorage.addWidgetInSection(newWidgetName);
    return false;
  }

  showTemplates() {
    this.setState((s) => ({
      ...s,
      showTemplates: !s.showTemplates
    }));
  }

  toggleSection =() => {
    this.setState((s) => ({
      ...s,
      showSections: !s.showSections
    }));
  }

  render() {
    return (
      <>
        <div
          className="new-section"
          onDragOver={this.onDragOver}
          onDragEnter={this.onDragEnter}
          onDrop={this.onDrop}
          data-element-type="new-section"
        >
          <div className="new-section-buttons d-flex">
            <button
              onClick={this.toggleSection}
              draggable="true"
              className="new-section__button new-section__button_add d-flex "
            >
              <PlusIcon />
            </button>
            <button
              onClick={this.showTemplates}
              className="new-section__button new-section__button_library d-flex"
            >
              <FolderIcon />
            </button>
          </div>
          <div className="new-section__text">Drag widget here</div>
        </div>
        {
          this.state.showTemplates && <GetTemplate showTemplates={this.showTemplates}/>
        }
        {
          this.state.showSections && <GetSection toggleSection={this.toggleSection}/>
        }
      </>
    );
  }
}

export default NewSection;
