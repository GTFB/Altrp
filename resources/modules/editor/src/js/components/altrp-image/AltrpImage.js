import React, {cloneElement, Component} from 'react';
import {renderAsset} from "../../../../../front-app/src/js/helpers";

class AltrpImage extends Component {
  render() {
    let media = { ...this.props.image };
    const noDefault = this.props.noDefault || false;

    if(this.props.image instanceof File){
      media = this.props.image
    } else {
      if(this.props.default) {
        if((Object.keys(media).length === 0)) {
          media = this.props.default;
        }
      } else if(noDefault) {
        return ""
      } else {
        media.url = media.url || '/img/nullImage.png';
        media.name = media.name || 'null';
        media.assetType = media.assetType || undefined;
      }
    }
    console.log(media)
    let image = renderAsset(media);

    return cloneElement(image, {
      className: this.props.className,
      id: this.props.id || null,
      style: this.props.style
    })
  }
}

export default AltrpImage;
