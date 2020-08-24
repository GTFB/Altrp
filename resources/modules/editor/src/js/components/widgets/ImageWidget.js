import React, {Component} from "react";
import { Link } from "react-router-dom";
import { renderAsset } from "../../helpers"

class ImageWidget extends Component {
  constructor(props){
    super(props);
    this.state = {
      settings: props.element.getSettings()
    };
    props.element.component = this;
    if(window.elementDecorator){
      window.elementDecorator(this);
    }
  }

  render(){
    const link = this.state.settings.image_link || {};
    
    let contentMedia = {...this.state.settings.content_media};
    contentMedia.url = contentMedia.url || '/img/nullImage.png';
    contentMedia.name = contentMedia.name || 'null';
    contentMedia.assetType = contentMedia.assetType || undefined;

    const image = renderAsset(contentMedia, {
      className: this.state.settings.position_css_classes + " altrp-image",
      id: this.state.settings.position_css_id || "",
    });

    return <div className="altrp-image-container">
      {link.url ?
        link.tag === 'a' ?
          <a href={link.url}>{image}</a> :
          <Link to={link.url}>{image}</Link> :        
        image
      }
    </div>
  }
}

export default ImageWidget
