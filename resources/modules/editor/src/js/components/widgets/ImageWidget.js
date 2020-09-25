import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import {isEditor, renderAsset} from "../../../../../front-app/src/js/helpers";


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
    const link = this.state.settings.image_link || {};
    const background_image = this.props.element.getSettings('background_image', {});

    let contentMedia = { ...this.state.settings.content_media };
    contentMedia.url = contentMedia.url || '/img/nullImage.png';
    contentMedia.name = contentMedia.name || 'null';
    contentMedia.assetType = contentMedia.assetType || undefined;

    const image = renderAsset(contentMedia, {
      className: this.state.settings.position_css_classes + " altrp-image" + (background_image ? ' altrp-background-image' : ''),
      id: this.state.settings.position_css_id || "",
    });

    if (link.toPrevPage && !isEditor()) {
      return <div className="altrp-image-container cursor-pointer"
        onClick={() => this.props.history.goBack()}
      >
        {image}
      </div>
    } else {
      return <div className="altrp-image-container">
        {link.url && !isEditor() ?
          link.tag === 'a' ?
            <a href={link.url}>{image}</a> :
            <Link to={link.url}>{image}</Link> :
          image}
      </div>
    }
  }
}

export default withRouter(ImageWidget);
