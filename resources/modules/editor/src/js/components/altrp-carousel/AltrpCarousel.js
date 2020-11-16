import React, {Component} from "react";
import Slider from "react-slick";
import AltrpLightbox from "../altrp-lightbox/AltrpLightbox";

import ArrowIcon from "../../../svgs/arrow.svg"
import "slick-carousel/slick/slick.scss";
import "slick-carousel/slick/slick-theme.scss";
import './altrp-carousel.scss';
import {renderAsset} from "../../../../../front-app/src/js/helpers";
import TemplateLoader from "../template-loader/TemplateLoader";

/**
 * Компонент Карусли
 */
class AltrpCarousel extends Component {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.state = {
      activeSlide: 0,
      openLightBox: false,
      sliderImages: []
    }
  }

  componentDidMount() {
    this.props.slides_repeater.forEach(image => {
      this.setState((state) => {

        let img = {...image.image_slides_repeater} || {};
        img.url = img.url || '/img/nullImage.png';

        state.sliderImages.push(img.url);
        return ({...state});
      });
    });
  }

  componentDidUpdate(prevProps) {
    if(this.props.slides_repeater !== prevProps.slides_repeater) {
      let sliderImagesArray = [];
      this.props.slides_repeater.forEach(image => {
        let img = {...image.image_slides_repeater} || {};
        img.url = img.url || '/img/nullImage.png';
        sliderImagesArray.push(img.url);
      });
      this.setState((state) => ({...state, sliderImages: sliderImagesArray}));
    };
  }

  next() {
    this.slider.slickNext();
  }

  previous() {
    this.slider.slickPrev();
  }

  render(){
    let carouselContainerClasses = "altrp-carousel-container";

    carouselContainerClasses += (!this.props.arrows_navigation_content ? " altrp-carousel-container-no-arrow" : "");

    //точки
    let slides = this.props.slides_repeater || [];

    let customPaging = (
      <a>
        <div className="altrp-carousel-paging">
        </div>
      </a>
    );

    let dotsClasses = "altrp-carousel-dots";

    let sliderClasses = "altrp-carousel-slides";

    //позиция точек
    if(this.props.dots_navigation_content) {
      switch (this.props.dots_position_navigation_content) {
        case "topLeft":
          dotsClasses += " altrp-carousel-dots-top-left";
          sliderClasses += " altrp-carousel-slides-dots-top";
          break;
        case "top":
          dotsClasses += " altrp-carousel-dots-top";
          sliderClasses += " altrp-carousel-slides-dots-top";
          break;
        case "topRight":
          dotsClasses += " altrp-carousel-dots-top-right";
          sliderClasses += " altrp-carousel-slides-dots-top";
          break;
        case "bottomLeft":
          dotsClasses += " altrp-carousel-dots-bottom-left";
          sliderClasses += " altrp-carousel-slides-dots-bottom";
          break;
        case "bottom":
          sliderClasses += " altrp-carousel-slides-dots-bottom";
          break;
        case "bottomRight":
          dotsClasses += " altrp-carousel-dots-bottom-right";
          sliderClasses += " altrp-carousel-slides-dots-bottom";
          break
      }
    }

    // настройки слайдера
    let settings = {
      arrows: false,
      customPaging: () => customPaging,
      dotsClass: dotsClasses,
      dots: this.props.dots_navigation_content,
      infinite: this.props.infinite_loop_additional_content,
      pauseOnHover: this.props.pause_on_interaction_loop_additional_content,
      autoplay: this.props.autoplay_additional_content,
      className: sliderClasses,
      autoplaySpeed: Number(this.props.transition_autoplay_duration_additional_content),
      speed: Number(this.props.transition_duration_additional_content),
      slidesToShow: Number(this.props.per_view_slides_content),
      slidesToScroll: Number(this.props.to_scroll_slides_content),
      rows: Number(this.props.per_row_slides_content),
      afterChange: current => this.setState({ activeSlide: current }),
      adaptiveHeight: true,
    };

    // слайды
    let slidesMap = slides.map((slide, idx) => {
      const typeSlide = slide.switch_slides_repeater || false;
      let media = slide.image_slides_repeater ? {...slide.image_slides_repeater} : {};

      media.url = media.url || '/img/nullImage.png';
      media.name = media.name || 'null';
      media.assetType = media.assetType || "mediaBackground";
      if(media.assetType === "media") {
        media.assetType = "mediaBackground";
      }

      let content = renderAsset(media, {
        className: "altrp-carousel-slide-img",
      });
      
      if(typeSlide === true) {
        console.log(slide.card_slides_repeater)
        content = <TemplateLoader templateId={slide.card_slides_repeater}/>
      }
      return (
        <div className="altrp-carousel-slide" key={idx}
          onDoubleClick={ () => {
            if(this.props.lightbox_slides_content) {
              this.setState((state) => ({
                ...state,
                openLightBox: true
              }))
            }
          }}
        >
          {
            content
          }
          {
            this.props.overlay_select_heading_additional_content === "text" ? (
              <div className="altrp-carousel-slide-overlay">
                <p className="altrp-carousel-slide-overlay-text">{slide.overlay_text_repeater}</p>
              </div>
            ) : null
          }
        </div>
      );
    });

    //позиция стрелок
    let prevArrow = "";
    let nextArrow = "";

    let arrowsClasses = "";

    switch (this.props.arrows_position_navigation_content) {
      case "topLeft":
        arrowsClasses += " altrp-carousel-arrow-top-left altrp-carousel-arrow-top-wrapper";
        break;
      case "top":
        arrowsClasses += " altrp-carousel-arrow-top altrp-carousel-arrow-top-wrapper"
        break;
      case "topRight":
        arrowsClasses += " altrp-carousel-arrow-top-right altrp-carousel-arrow-top-wrapper"
        break;
      case "bottomLeft":
        arrowsClasses += " altrp-carousel-arrow-bottom-left altrp-carousel-arrow-bottom-wrapper"
        break;
      case "bottom":
        arrowsClasses += " altrp-carousel-arrow-bottom altrp-carousel-arrow-bottom-wrapper"
        break;
      case "bottomRight":
        arrowsClasses += " altrp-carousel-arrow-bottom-right altrp-carousel-arrow-bottom-wrapper"
        break
    }

    //стрелки
    prevArrow = this.props.arrows_navigation_content ? (
        <div className="altrp-carousel-arrow-prev altrp-carousel-arrow" onClick={this.previous}>
          <ArrowIcon/>
        </div>
      ) : "";

    nextArrow = this.props.arrows_navigation_content ? (
      <div className="altrp-carousel-arrow-next altrp-carousel-arrow" onClick={this.next}>
        <ArrowIcon/>
      </div>
    ) : "";

    let lightbox = "";
    if(this.props.lightbox_slides_content) {

      lightbox =  this.state.openLightBox ? (
        <AltrpLightbox
          settings={{
            mainSrc: this.state.sliderImages[this.state.activeSlide],
            onCloseRequest: () => this.setState({openLightBox: false})
          }}
          color={this.props.color_lightbox_style}
        />
      ) : ""

    }

    return <div className="altrp-carousel">
      {
        this.props.lightbox_slides_content ? lightbox : ""
      }
      { this.props.arrows_position_navigation_content === "center" ?
        prevArrow
        : ""
      }
      <div className={carouselContainerClasses}>
        {
          this.props.arrows_position_navigation_content !== "center" ? (
            <div className={"altrp-carousel-arrows-container" + arrowsClasses}>
              {prevArrow}
              {nextArrow}
            </div>
          ) : ""
        }
        <Slider ref={c => (this.slider = c)} {...settings}>
          {
            slidesMap
          }
        </Slider>
      </div>
      { this.props.arrows_position_navigation_content === "center" ? nextArrow : "" }
    </div>
  }
}

export default AltrpCarousel
