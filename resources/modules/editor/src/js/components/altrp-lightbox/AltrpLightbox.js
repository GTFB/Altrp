import React, {Component} from "react";
import Lightbox from "react-image-lightbox";
import 'react-image-lightbox/style.css';
import './altrp-lightbox.scss';

class AltrpLightbox extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Lightbox {...this.props}/>
    )
  }
}

export default AltrpLightbox

