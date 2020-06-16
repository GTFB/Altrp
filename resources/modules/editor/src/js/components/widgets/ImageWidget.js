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
    return <div>
    {  renderAsset(this.state.settings.content_media, {
      className: this.state.settings.position_css_classes || "",
      id: this.state.settings.position_css_id || "", 
    })
    }
    </div>
  }
}

export default ImageWidget