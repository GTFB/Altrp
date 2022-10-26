import Skeleton from '../../../editor/src/js/components/altrp-image/Skeleton';
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
    imageLazyLoading: 'none',
  };

  async componentDidMount() {
    const imageLazyLoading = (await new Resource({route: '/admin/ajax/settings'}).get('altrp_image_lazy')).altrp_image_lazy;
    const skeletonColor = (await new Resource({route: '/admin/ajax/settings'}).get('altrp_skeleton_color')).altrp_skeleton_color;
    const skeletonHighlightColor = (await new Resource({route: '/admin/ajax/settings'}).get('altrp_skeleton_highlight_color')).altrp_skeleton_highlight_color;

    this.setState(state => ({
      ...state,
      imageLazyLoading,
      skeletonColor,
      skeletonHighlightColor,
    }));
  }

  /**
   * Изменить ленивую загрузку
   * @param e
   * @return {Promise<void>}
   */

  updateImageLazyLoading = async (e) => {
    let value = e.target.value;
    await new Resource({route: '/admin/ajax/settings'}).put('altrp_image_lazy', {value});
    this.setState(state => ({
      ...state,
      imageLazyLoading: value,
    }))
  };

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
   * Меняем цвет мерцания скелетона картинок
   */
  skeletonHighlightColorChange = async (value) => {
    let skeletonHighlightColor = _.isString(value) ? value : `rgba(${value.rgb.r}, ${value.rgb.g}, ${value.rgb.b}, ${value.rgb.a})`;
    await new Resource({route: '/admin/ajax/settings'}).put('altrp_skeleton_highlight_color', {value:skeletonHighlightColor});
    this.setState(state =>({...state, skeletonHighlightColor}));
  };
  /**
   * Меняем основной цвет скелетона картинок
   */
  skeletonColorChange = async (value) => {
    let skeletonColor = _.isString(value) ? value : `rgba(${value.rgb.r}, ${value.rgb.g}, ${value.rgb.b}, ${value.rgb.a})`;
    await new Resource({route: '/admin/ajax/settings'}).put('altrp_skeleton_color', {value:skeletonColor});
    this.setState(state =>({...state, skeletonColor}));
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
    let UploadIcon = iconsManager().getIconComponent("upload");
    const {
      iconFile,
      imageLazyLoading,
    } = this.state;
    let {
      skeletonColor = '#F3F3F3',
      skeletonHighlightColor = '#EBECEC',
    } = this.state;
    skeletonColor = skeletonColor || '#F3F3F3';
    skeletonHighlightColor = skeletonHighlightColor || '#EBECEC';
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
           <div className="admin-settings-color__block">
             <div className="admin-settings-color row-text" width="10%">
               Image Lazy Loading:
             </div>
             <div className="admin-settings-color__input">
               <div className="form-group">
                 <select className="form-control" value={imageLazyLoading} onChange={this.updateImageLazyLoading}>
                   <option value="none">None</option>
                   <option value="color">Color</option>
                   <option value="skeleton">Skeleton</option>
                 </select></div>
             </div>
           </div>
          </div>

          <table>
            <tbody className="admin-settings-table-row">

            {imageLazyLoading === 'skeleton' &&
            <tr className="admin-settings-table-row">
              <td className="admin-settings-table__td row-text" width="10%">
                Skeleton Colors:
              </td>
              <td className="admin-settings-table__td admin-skeleton-settings">
                <div className="row">
                  <div className="control-color-colorPicker pr-5 skeletonColors__marginBottom skeletonColors__paddingLeft">
                    <SketchPicker presetColors={[]}
                                  color={skeletonColor}
                                  onChange={this.skeletonColorChange}
                                  style={{
                                    padding: 0,
                                    boxShadow: 'none',
                                  }}
                                  name="colorPicker"
                                  className="sketchPicker">
                    </SketchPicker>
                  </div>
                  <div className="control-color-colorPicker pr-5 skeletonColors__marginBottom">
                    <SketchPicker presetColors={[]}
                                  color={skeletonHighlightColor}
                                  onChange={this.skeletonHighlightColorChange}
                                  style={{
                                    padding: 0,
                                    boxShadow: 'none',
                                  }}
                                  name="colorPicker"
                                  className="sketchPicker">
                    </SketchPicker>
                  </div>
                  <div className="admin-skeleton pr-5 position-relative skeleton_marginRight skeletonColors__marginBottom">
                      <Skeleton className="altrp-skeleton"
                                color={skeletonColor}
                                highlightColor={skeletonHighlightColor}/>
                  </div>
                  <button className="admin-media-input__button btn btn_success align-self-end skeletonColors__marginBottom" onClick={async()=>{
                    await this.skeletonHighlightColorChange('#d0d0d0');
                    await this.skeletonColorChange('#ccc');
                  }}>
                    Reset Colors
                  </button>
                </div>
              </td>
            </tr>}
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
