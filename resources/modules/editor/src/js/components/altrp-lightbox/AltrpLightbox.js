import React, {Component} from 'react';
import Lightbox from 'react-image-lightbox';
import {connect} from "react-redux";
import ('./altrp-lightbox.scss');

class AltrpLightbox extends Component {
  constructor(props) {
    super(props);

    let current

    if(props.carousel) {
      const value = props.carouselItems.findIndex(img => props.current === img.id);
      if(value !== -1) {
        current = props.carouselItems.findIndex(img => props.current === img.id);
      } else if(props.current) {
        current = props.current
      } else {
        current = 0
      }
    } else {
      current = props.current
    }

    this.state = {
      current: current
    }
  }

  getImages(){
    const {lightboxID} = this.props
    if(!lightboxID){
      return this.props.images
    }
    return this.props.lightboxImages[lightboxID] || this.props.images
  }

  componentDidMount() {
    this.updateCurrentIdx()
  }

  updateCurrentIdx(){
    const {currentUrl} = this.props
    if(! currentUrl){
      return
    }
    const images = this.getImages();
    let idx = images.indexOf(currentUrl)
    if(idx === -1){
      idx = 0
    }
    if(this.state.current === idx){
      return
    }
    this.setState(state=>({...state, current: idx}))
  }

  render() {
    let images = this.getImages();
    const settings = this.props.settings;
    let nextSrc = null;
    let prevSrc = null;
    const current = this.state.current || 0;

    if(images.length === 0 || images[0] === "") {
      images = ["/img/nullImage.png"]
    }

    if(images.length > 1) {
      nextSrc = images[(current + 1) % images.length];
      prevSrc = images[(current + images.length - 1) % images.length];
    }

    return (
      <Lightbox
        {...settings}
        mainSrc={images[current] || "/img/nullImage.png"}
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

        prevSrc={prevSrc} nextSrc={nextSrc}
        wrapperClassName="altrp-lightbox"
      />
    )
  }
}
function mapStateToProps({lightboxImages}) {
  return {lightboxImages}
}
export default connect(mapStateToProps)(AltrpLightbox)

