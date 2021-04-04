import React, {Component} from "react";
import Lightbox from "react-image-lightbox";
import './altrp-lightbox.scss';

class AltrpLightbox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current: props.current || 0
    }
  }

  render() {
    let images = this.props.images;
    const settings = this.props.settings;
    let nextSrc = null;
    let prevSrc = null;
    const current = this.state.current;

    if(images.length === 0) {
      images = ["/img/nullImage.png"]
    }

    if(images.length > 1) {
      nextSrc = images[(current + 1) % images.length]
      prevSrc = images[(current + images.length - 1) % images.length]
    }

    return (
      <Lightbox
        {...settings}
        onMovePrevRequest={() => {
          this.setState({
            current: (current + images.length - 1) % images.length,
          })
        }}
        onMoveNextRequest={() => {
            this.setState({
              current: (current + 1) % images.length,
            })
        }}
        mainSrc={images[current]}
        prevSrc={prevSrc} nextSrc={nextSrc}
        wrapperClassName="altrp-lightbox"
      />
    )
  }
}

export default AltrpLightbox

