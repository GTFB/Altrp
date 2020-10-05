import React, {Component} from "react";
import Lightbox from "react-image-lightbox";
import './altrp-lightbox.scss';

class AltrpLightbox extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Lightbox {...this.props.settings} wrapperClassName="altrp-lightbox"/>
    )
  }
}

export default AltrpLightbox

