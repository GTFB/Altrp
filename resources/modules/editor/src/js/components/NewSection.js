import React, {Component} from "react";
import PlusIcon from '../../svgs/plus.svg'
import FolderIcon from '../../svgs/folder.svg'
import DropTarget from "./DropTarget";

class NewSection extends Component {
  render() {
    return <DropTarget>
      <div className="new-section">
        <div className="new-section-buttons d-flex">
          <button className="new-section__button new-section__button_add d-flex "><PlusIcon/></button>
          <button className="new-section__button new-section__button_library d-flex"><FolderIcon/></button>
        </div>
        <div className="new-section__text">Drag widget here</div>
      </div>
    </DropTarget>;
  }
}

export default NewSection