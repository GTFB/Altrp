import React, {Component} from "react";
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
    let contentMedia = {...this.state.settings.content_media};
    contentMedia.url = contentMedia.url || '/img/nullImage.png';
    contentMedia.name = contentMedia.name || 'null';
    contentMedia.assetType = contentMedia.assetType || undefined;
    return <div className="altrp-image-container">
      {  renderAsset( contentMedia, {
        className: this.state.settings.position_css_classes || "altrp-image",
        id: this.state.settings.position_css_id || "", 
      })
      }
    </div>
  }
}

export default ImageWidget