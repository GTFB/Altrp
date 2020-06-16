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
    console.log(this.state.settings.content_media);
    return <div>
    {  renderAsset(this.state.settings.content_media || {
      assetType: "image",
      name: "null",
      url: "../../../img/nullImage.png"
    }
    , {
      className: this.state.settings.position_css_classes || "altrp-image",
      id: this.state.settings.position_css_id || "", 
    })
    }
    </div>
  }
}

export default ImageWidget