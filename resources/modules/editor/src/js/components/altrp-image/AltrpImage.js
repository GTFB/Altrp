import React, {Component} from 'react';
import {renderAsset} from "../../../../../front-app/src/js/helpers";

class AltrpImage extends Component {
  render() {
    let media = { ...this.props.image };

    media.url = media.url || '/img/nullImage.png';
    media.name = media.name || 'null';
    media.assetType = media.assetType || undefined;


    let image = (
      renderAsset(media, {
        className: this.props.className,
        id: this.props.id,
      })
    );

    return image
  }
}

export default AltrpImage;
