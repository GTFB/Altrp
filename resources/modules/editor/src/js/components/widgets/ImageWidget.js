import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import {
  getDataByPath,
  isEditor
} from "../../../../../front-app/src/js/helpers";
import AltrpImage from "../altrp-image/AltrpImage";

class ImageWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: props.element.getSettings()
    };
    props.element.component = this;
    if (window.elementDecorator) {
      window.elementDecorator(this);
    }
  }

  render() {
    const { element } = this.props;
    const link = this.state.settings.image_link || {};
    const background_image = this.props.element.getSettings(
      "background_image",
      {}
    );
    let media = this.state.settings.content_media;
    /**
     * Для карточки модель может быть другой
     * @type {AltrpModel}
     */
    let model = element.hasCardModel()
      ? element.getCardModel()
      : this.props.currentModel;
    /**
     * Возьмем данные из окружения
     */
    if (
      this.state.settings.content_path &&
      _.isObject(getDataByPath(this.state.settings.content_path, null, model))
    ) {
      media = getDataByPath(this.state.settings.content_path, null, model);
      /**
       * Проверим массив ли с файлами content_path
       */
      if (_.get(media, "0") instanceof File) {
        media = _.get(media, "0");
      } else {
        media.assetType = "media";
      }
    } else if (
      this.state.settings.content_path &&
      _.isString(getDataByPath(this.state.settings.content_path, null, model))
    ) {
      media = getDataByPath(this.state.settings.content_path, null, model);
      media = {
        assetType: "media",
        url: media,
        name: "null"
      };
    }

    let altrpImage = (
      <AltrpImage
        image={media}
        id={this.state.settings.position_css_id}
        className={
          this.state.settings.position_css_classes +
          " altrp-image" +
          (background_image ? " altrp-background-image" : "")
        }
      />
    );

    if (link.toPrevPage && !isEditor()) {
      return (
        <div
          className="altrp-image-container cursor-pointer"
          onClick={() => this.props.history.goBack()}
        >
          {altrpImage}
        </div>
      );
    } else {
      return (
        <div className="altrp-image-container">
          {link.url && !isEditor() ? (
            link.tag === "a" ? (
              <a href={link.url}>{altrpImage}</a>
            ) : (
              <Link to={link.url}>{altrpImage}</Link>
            )
          ) : (
            altrpImage
          )}
        </div>
      );
    }
  }
}

const path = window.location.pathname;
let _export;
if (path.includes("reports")) {
  _export = ImageWidget;
} else {
  _export = withRouter(ImageWidget);
}
export default _export;
