import React, {Component} from "react";
import Lightbox from "react-image-lightbox";
import 'react-image-lightbox/style.css';
import './altrp-lightbox.scss';

class AltrpLightbox extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    let lightboxStyles = {
      backgroundColor: this.props.color.color
    }
    console.log(this.props.color.color)
    return (
      <Lightbox {...this.props.settings} style={lightboxStyles} wrapperClassName="altrp-lightbox"/>
    )
  }
}

export default AltrpLightbox

