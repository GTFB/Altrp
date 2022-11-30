import React, {Component} from "react";
import AutoUpdateInput from "./AutoUpdateInput";
import {iconsManager} from "../js/helpers";
import Resource from "../../../editor/src/js/classes/Resource";
import {SketchPicker} from "react-color"
import IconUpload from "./../svgs/upload.svg"

class StylesSettings extends Component {
  state = {
    iconFile: null,
    image: null,
    uploaderClasses: "admin-assets__uploader uploader",
    itemDeleteClasses: "item__delete",
  };

  async componentDidMount() {
    const progressBarColor = (await new Resource({route: '/admin/ajax/settings'}).get('altrp_progress_bar_color')).altrp_progress_bar_color;

    this.setState(state => ({
      ...state,
      progressBarColor,
    }));
  }

  onDrop = e => {
    e.persist();
    e.preventDefault();
    e.stopPropagation();
    let file = e.dataTransfer.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      this.setState((state) => ({
        ...state,
        image: reader.result,
        iconFile: file,
        uploaderClasses: "admin-assets__uploader uploader",
      }));
    }
    // this.setState(state => {
    //   return {
    //     ...state,
    //     uploaderClasses: "admin-assets__uploader uploader",
    //     iconFile: e.dataTransfer.files[0]
    //   };
    // });
  };

  onDragOver = e => {
    e.preventDefault();
    e.stopPropagation();
    this.setState(state => {
      return {
        ...state,
        uploaderClasses: "admin-assets__uploader uploader uploader_drag-over"
      };
    });
  };

  onDragLeave = e => {
    this.setState(state => {
      return {...state, uploaderClasses: "admin-assets__uploader uploader"};
    });
  };

  submitHandler = e => {
    e.preventDefault();
    new Resource({route: "/admin/ajax/favicon"})
        .postFile(this.state.iconFile)
        .then(() => alert("Icon successfully  uploaded."));
  };
  /**
   * change progress bar color
   */
  progressBarColorChange = async (value) => {
    let progressBarColor = _.isString(value) ? value : `rgba(${value.rgb.r}, ${value.rgb.g}, ${value.rgb.b}, ${value.rgb.a})`;
    await new Resource({route: '/admin/ajax/settings'}).put('altrp_progress_bar_color', {value:progressBarColor});
    this.setState(state =>({...state, progressBarColor}));
  };

  inputFileImage = (e) => {
    // this.setState({iconFile: e.target.files[0]})
    let reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])
    reader.onload = () => {
      this.setState((state) => ({
        ...state,
        image: reader.result,
        iconFile: e.target.files[0]
      }));
    }
  }

  render() {
    const {
      iconFile,
    } = this.state;
    let {
      progressBarColor = 'rgb(48, 79, 253)',
    } = this.state;
    progressBarColor = progressBarColor || 'rgb(48, 79, 253)';
    return (
        <div className="admin-styles-settings">

          <div className="admin-settings-color__blocks">
            <div className="admin-settings-color__block">
              <div className="admin-settings-color row-text" width="10%">
                <label htmlFor="settings-container-width">
                  Container Width:
                </label>
              </div>
              <div className="admin-settings-color__input">
                <AutoUpdateInput
                  type="number"
                  route="/admin/ajax/settings"
                  resourceid="container_width"
                  id="settings-container-width"
                  className="form__input  form_styles_width"
                />
              </div>
            </div>
          </div>

          <table>
            <tbody className="admin-settings-table-row">

            <tr className="admin-settings-table-row">
              <td className="admin-settings-table__td row-text" width="10%">
                Loading Bar Color:
              </td>
              <td className="admin-settings-table__td admin-skeleton-settings">
                <div className="row">
                  <div className="control-color-colorPicker pr-5 progressBarColors__marginBottom progressBarColors__paddingLeft">
                    <SketchPicker presetColors={[]}
                                  color={progressBarColor}
                                  onChange={this.progressBarColorChange}
                                  style={{
                                    padding: 0,
                                    boxShadow: 'none',
                                  }}
                                  name="colorPicker"
                                  className="sketchPicker">
                    </SketchPicker>
                  </div>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
          <form onSubmit={this.submitHandler} className="addFavicon__block">
            <legend>Add Favicon:</legend>
            <div
                className={this.state.uploaderClasses}
                onDragLeave={this.onDragLeave}
                onDrop={this.onDrop}
                onDragOver={this.onDragOver}
            >
              <label className="uploader__label d-flex flex-column align-items-center">
                {this.state.iconFile ? (
                  <img src={this.state.image} width={100} height={100} className="icon-img" alt="Предварительное изображение"/>
                ) : (
                  <IconUpload width={100} height={100} className="icon"/>
                )}
                <input
                    type="file"
                    accept="image/png, image/jpeg, image/gif, image/jpg"
                    onChange={this.inputFileImage}
                    className="uploader__input"
                />
                <span className="uploader__text">
                Drag or Choose File
              </span>
              </label>
            </div>
            {iconFile && (
                <div className="centred mt-2">
                  <button
                      className="admin-styles-button"
                      type="submit"
                  >
                    Upload icon
                  </button>
                </div>
            )}
          </form>
          {/* <table>
          <tbody className="admin-settings-table-row">
            <tr className="admin-settings-table-row">
              <td
                className="admin-settings-table__td row-text pb-0"
                width="10%"
              >
                <label htmlFor="settings-container-width">
                  Color Scheme Pallet
                </label>
              </td>
            </tr>
            <tr className="admin-settings-table-row">
              <td className="admin-settings-table__td row-text" width="10%">
                <ColorSchemeSettings />
              </td>
            </tr>
          </tbody>
        </table> */}
        </div>
    );
  }
}

export default StylesSettings;
