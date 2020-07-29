import React, {Component} from "react";
import Slider from "react-slick";
import renderAsset from "../../helpers"

import "slick-carousel/slick/slick.scss";
import "slick-carousel/slick/slick-theme.scss";
import './altrp-carousel.scss'

/**
 * Компоненты Стрелок
 */
function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    />
  );
}

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    />
  );
}

/**
 * Компонент Карусли
 */
class AltrpCarousel extends Component {
  render(){
    console.log(this.props)

    let slides = this.props.slides_repeater || [];

    let settings = {
      arrows: true,
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <PrevArrow />,
      prevArrow: <NextArrow />
    };

    let slidesMap = slides.map((slide, idx) => {
      // let media = slide.image_slides_repeater;
      // media.url = media.url || '/img/nullImage.png';
      // media.name = media.name || 'null';
      // media.assetType = media.assetType || undefined;
      return (
        <div className="altrp-carousel-slide" key={idx}>
          1111
        </div>
      )
    })

    return <div className="altrp-carousel">
      <Slider {...settings}>
        {
          slidesMap
        }
      </Slider>
    </div>
  }
}

export default AltrpCarousel
