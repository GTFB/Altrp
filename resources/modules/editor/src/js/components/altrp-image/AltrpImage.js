import React, {cloneElement, Component} from 'react';
import {renderAsset} from "../../../../../front-app/src/js/helpers";

class AltrpImage extends Component {
  render() {
    let media = { ...this.props.image };

    if(this.props.image) {
      if(this.props.default && Object.keys(this.props.image).length === 0) {
        media = this.props.default;
      } else {
        media.url = media.url || '/img/nullImage.png';
        media.name = media.name || 'null';
        media.assetType = media.assetType || undefined;
      }
    }

    let image = renderAsset(media);

    return cloneElement(image, {
      className: this.props.className,
      id: this.props.id || null,
      style: this.props.style
    })
  }
}

export default AltrpImage;
