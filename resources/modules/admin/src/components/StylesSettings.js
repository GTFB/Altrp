import React, { Component } from "react";
import AutoUpdateInput from "./AutoUpdateInput";
import { iconsManager } from "../js/helpers";
import Resource from "../../../editor/src/js/classes/Resource";


class StylesSettings extends Component {
  state = {
    iconFile: null,
    uploaderClasses: 'admin-assets__uploader uploader',
    itemDeleteClasses: 'item__delete',
  };

  onDrop = (e) => {
    e.persist();
    e.preventDefault();
    e.stopPropagation();
    this.setState(state => {
      return { ...state, uploaderClasses: 'admin-assets__uploader uploader', iconFile: e.dataTransfer.files[0] }
    })
  }

  onDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState(state => {
      return { ...state, uploaderClasses: 'admin-assets__uploader uploader uploader_drag-over' }
    });
  }

  onDragLeave = (e) => {
    this.setState(state => {
      return { ...state, uploaderClasses: 'admin-assets__uploader uploader' }
    });
  }

  submitHandler = e => {
    e.preventDefault();
    const data = new FormData();
    data.append("favicon", this.state.iconFile);

    new Resource({ route: '/admin/ajax/favicon' }).post(data)
      .then(() => alert("Icon successfully  uploaded."));
  }

  render() {
    let UploadIcon = iconsManager().getIconComponent('upload');
    const { iconFile } = this.state;
    return <div className="admin-styles-settings">
      <table>
        <tbody className="admin-settings-table-row">
          <tr className="admin-settings-table-row">
            <td className="admin-settings-table__td row-text" width="10%">
              <label htmlFor="settings-container-width">
                Container Width
              </label>
            </td>
            <td className="admin-settings-table__td">
              <AutoUpdateInput type="number"
                route="/admin/ajax/settings"
                resourceid="container_width"
                id="settings-container-width"
                className="form__input w-25" />
            </td>
          </tr>
        </tbody>
      </table>
      <form>
        <legend>Add Favicon</legend>
        <div className={this.state.uploaderClasses}
          onDragLeave={this.onDragLeave}
          onDrop={this.onDrop}
          onDragOver={this.onDragOver}>
          <label className="uploader__label d-flex flex-column align-items-center">
            <UploadIcon width={100} height={100} className="icon" />
            <input type="file"
              accept="image/*"
              onChange={e => this.setState({ iconFile: e.target.files[0] })}
              className="uploader__input" />
            <span className="uploader__text text text_bold">
              Drag or Choose File
            </span>
          </label>
        </div>
        {iconFile && <div className="centred mt-2">
          <button className="admin-settings-button btn btn-sm" type="submit">Upload icon</button>
        </div>}
      </form>
    </div>
  }
}

export default StylesSettings