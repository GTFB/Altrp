import React, {Component} from "react";

import Lightbox from "react-image-lightbox";

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

