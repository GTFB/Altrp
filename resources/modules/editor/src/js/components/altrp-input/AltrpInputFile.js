import React, { Component } from "react";
import isEditor from "../../../../../front-app/src/js/functions/isEditor";
import renderAsset from "../../../../../front-app/src/js/functions/renderAsset";
import iconsManager from "../../../../../front-app/src/js/functions/iconsManager";

class AltrpInputFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filesForDisplay: [],
      files: []
    };
  }

  /**
   * Клик по леблу
   * @param {{}} e
   */
  labelClick = e => {
    if (isEditor()) {
      e.preventDefault();
    }
  };
  /**
   * Удалить элемент
   * @param e
   * @param idx
   */
  deleteItem = (e, idx) => {
    e.preventDefault();
    let { files } = this.state;
    files.splice(idx, 1);
    let filesForDisplay = [];
    if (!files.length) {
      this.setState(state => ({ ...state, filesForDisplay, files }));
    }

    _.each(files, f => {
      let fr = new FileReader();
      fr.readAsDataURL(f);
      fr.onload = () => {
        filesForDisplay.push({
          src: fr.result,
          alt: f.name || ""
        });
        if (filesForDisplay.length === files.length) {
          this.setState(state => ({ ...state, filesForDisplay, files }));
        }
      };
    });
    if (_.isFunction(this.props.onChange)) {
      this.props.onChange(files);
    }
  };
  /**
   * Обновление Файлов
   * @param e
   */
  onChange = e => {
    if (!e.target.files instanceof FileList) {
      return;
    }
    let files = [];
    let types = this.props.settings.content_accept
      ? this.props.settings.content_accept.split(",")
      : [];

    _.each(e.target.files, _f => {
      types.forEach(type => {
        type = type.trim();
        type = type.replace("*", "");
        if (_f.type.indexOf(type) === 0) {
          files.push(_f);
        }
      });
    });
    let filesForDisplay = [];
    if (!files.length) {
      this.setState(state => ({ ...state, filesForDisplay, files }));
    }
    _.each(files, f => {
      let fr = new FileReader();
      fr.readAsDataURL(f);
      fr.onload = () => {
        filesForDisplay.push({
          src: fr.result,
          alt: f.name || ""
        });
        if (filesForDisplay.length === files.length) {
          this.setState(state => ({ ...state, filesForDisplay, files }));
        }
      };
    });
    if (_.isFunction(this.props.onChange)) {
      this.props.onChange(files);
    }
  };
  render() {

    let multiple = this.props.settings.select2_multiple;
    let placeholder = this.props.settings.content_placeholder || "";
    const { filesForDisplay } = this.state;
    let accept = this.props.settings.content_accept || "";
    const classes = ["altrp-field-file"];
    if (!filesForDisplay.length) {
      classes.push("altrp-field-file_empty");
    }
    return (
      <label className={classes.join(" ")} onClick={this.labelClick}>
        <span className="altrp-field-file__placeholder">{placeholder}</span>
        <input
          type="file"
          className="altrp-field-file__field"
          multiple={multiple}
          accept={accept}
          onChange={this.onChange}
        />
        <span className="altrp-field-file-media-list media-list">
          {isEditor() ? (
            <span className="media-list-item">
              {iconsManager().renderIcon("times", {
                className: "media-list-item__remove"
              })}
              {renderAsset(
                {},
                {
                  className: "media-list-item__img"
                }
              )}
            </span>
          ) : (
            filesForDisplay.map((f, idx) => {
              return (
                <span key={idx} className="media-list-item">
                  {iconsManager().renderIcon("times", {
                    className: "media-list-item__remove",
                    onClick: e => {
                      this.deleteItem(e, idx);
                    }
                  })}
                  <img className="media-list-item__img" {...f} />
                </span>
              );
            })
          )}
        </span>
      </label>
    );
  }
}

export default AltrpInputFile;
