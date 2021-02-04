import React, {Component} from "react";
import Lightbox from "react-image-lightbox";
import './altrp-lightbox.scss';

class AltrpLightbox extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let mainSrc = this.props.settings.mainSrc;
    let settings = this.props.settings;

    delete settings.mainSrc

    if(!mainSrc) {
      mainSrc = "/img/nullImage.png"
    }

    return (
      <Lightbox mainSrc={mainSrc} {...settings} wrapperClassName="altrp-lightbox"/>
    )
  }
}

export default AltrpLightbox

