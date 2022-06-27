import React, {Component} from "react";
import Slider from "react-slick";
import AltrpLightbox from "../altrp-lightbox/AltrpLightbox";

import ArrowIcon from "../../../svgs/arrow.svg"
import ("slick-carousel/slick/slick.scss");
import ("slick-carousel/slick/slick-theme.scss");
import ('./altrp-carousel.scss');
import isEditor from "../../../../../front-app/src/js/functions/isEditor";
import renderAsset from "../../../../../front-app/src/js/functions/renderAsset";
import getDataByPath from "../../../../../front-app/src/js/functions/getDataByPath";
import getComponentByElementId from "../../../../../front-app/src/js/functions/getComponentByElementId";
import getResponsiveSetting from "../../../../../front-app/src/js/functions/getResponsiveSetting";
import TemplateLoader from "../../../../src/js/components/template-loader/TemplateLoader";
import AltrpCarouselWrapper from "./AltrpCarouselWrapper";

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
      sliderImages: [],
      updateToken: null,
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
    if(this.props.slides_repeater !== prevProps.slides_repeater
        && getResponsiveSetting(this.props, 'slides_item_source', '', 'custom') !== 'custom') {
      let sliderImagesArray = [];
      this.props.slides_repeater.forEach(image => {
        let img = {...image.image_slides_repeater} || {};
        img.url = img.url || '/img/nullImage.png';
        sliderImagesArray.push(img.url);
      });
      this.setState((state) => ({...state, sliderImages: sliderImagesArray}));
    }
    if(getResponsiveSetting(this.props, 'slides_item_source', '', 'custom') === 'path'){

      let sliderImages = getDataByPath(getResponsiveSetting(this.props, 'slides_path'));
      if(! _.isArray(sliderImages) && _.isObject(sliderImages)){
        sliderImages = [sliderImages];
      } else if(! _.isArray(sliderImages)){
        sliderImages = [];
      }
      sliderImages = sliderImages.map(item => _.get(item, 'media.url') ? _.get(item, 'media.url') : item.url);
      if(!_.isEqual(sliderImages, this.state.sliderImages)){
        this.setState((state) => ({...state, sliderImages}));
      }
    }
    let {synchronized_id} = this.props;
    if(synchronized_id){
      synchronized_id = synchronized_id.split(',');
      synchronized_id.forEach(id=>{
        let anotherSlider = getComponentByElementId(id);
        if(anotherSlider){
          this.pushSliderToSynchronize(anotherSlider);
        }
      });
    }
  }

  /**
   * Добавляем компонент слайдера к синхронизируемым
   */
  pushSliderToSynchronize(carousel){
    if(_.isArray(carousel)){
      this.carouselsToSynchronize = [...carousel];
      this.carouselsToSynchronize = this.carouselsToSynchronize.filter(carousel=> carousel !== this);
      return;
    }
    const carouselsToSynchronize = this.carouselsToSynchronize || [];

    carousel = _.get(carousel, 'elementRef.current.carousel.current');

    if(carousel && carouselsToSynchronize.indexOf(carousel) === -1){
      carouselsToSynchronize.push(carousel);
      carouselsToSynchronize.push(this);
      carouselsToSynchronize.forEach(carousel=>{
        carousel.pushSliderToSynchronize(carouselsToSynchronize);
      });
    }
  }
  /**
   *
   * @param {int} index
   */
  setSlide(index){
    this.slider.slickGoTo(index)
  }
  next() {
    this.slider.slickNext();
  }

  previous() {
    this.slider.slickPrev();
  }

  render(){
    let classes = this.props.classes
    let carouselContainerClasses = `${classes} altrp-carousel-container`;

    carouselContainerClasses += (!this.props.arrows_navigation_content ? " altrp-carousel-container-no-arrow" : "");

    //точки
    let slides = getResponsiveSetting(this.props,'slides_repeater', '', []) ;
    if (slides.length === 0) {
      if (isEditor()) {
        return 'No Slides'
      } else {
        return ''
      }
    }

    let dotsClasses = `${classes} altrp-carousel-dots`;

    let sliderClasses = `${classes} altrp-carousel-slides`;

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

    let infinite = this.props.infinite_loop_additional_content;
    let maxView = Number(this.props.per_view_slides_content) || 1;
    let rows = Number(this.props.per_row_slides_content) || 1;

    if(rows > 1) {
      maxView = maxView * rows
    }

    if(maxView >= slides.length) {
      infinite = false
    }

    let settings = {
      arrows: false,
      customPaging: (idx) => {
        let active = false;
        if(this.slider){
          active = this.slider.innerSlider.state.currentSlide === idx;
        }
        return (
            <a>
              <div className={`${classes} altrp-carousel-paging ` + (active ? 'active' : '')}/>
            </a>
        )},
      dotsClass: dotsClasses,
      dots: this.props.dots_navigation_content,
      infinite,
      pauseOnHover: this.props.pause_on_interaction_loop_additional_content,
      autoplay: this.props.autoplay_additional_content,
      className: sliderClasses,
      autoplaySpeed: Number(this.props.transition_autoplay_duration_additional_content),
      speed: Number(this.props.transition_duration_additional_content),
      slidesToShow: Number(this.props.per_view_slides_content),
      slidesToScroll: Number(this.props.to_scroll_slides_content),
      rows,
      afterChange: current => this.setState({ activeSlide: current }),
      beforeChange: (current, next) => {
        this.carouselsToSynchronize && this.carouselsToSynchronize.forEach(carousel => {carousel.setSlide(next)})
      },
      // adaptiveHeight: false,
    };

    // слайды
    const itemsSourceType = getResponsiveSetting(this.props, 'slides_item_source', '', 'custom');
    let slidesMap;
    switch(itemsSourceType){
      case 'custom':{
        slidesMap = slides.map((slide, idx) => {
          const typeSlide = slide.switch_slides_repeater || false;
          let media = slide.image_slides_repeater ? {...slide.image_slides_repeater} : {};

          media.url = media.url || '/img/nullImage.png';
          media.name = media.name || 'null';
          media.assetType = media.assetType || 'mediaBackground';
          if(media.assetType === 'media') {
            media.assetType = 'mediaBackground';
          }
          if(getResponsiveSetting(this.props, 'img_content')){
            media.assetType = 'image';
          }
          let content = renderAsset(media, {
            className: `${classes} altrp-carousel-slide-img`,
          });

          if(typeSlide === true) {
            content = <TemplateLoader
              onLoad={() => {
                this.setState({ updateToken: Math.random() })
              }}
              templateId={slide.card_slides_repeater}
            />
          }

          return (
              <div className={`${classes} altrp-carousel-slide`} key={slide.id}
                   onClick={()=>{
                     this.slider.slickGoTo(slide.id);
                     if(this.props.lightbox_slides_content && getResponsiveSetting(this.props, 'lightbox_s_click')) {
                       this.setState((state) => ({
                         ...state,
                         activeSlide: slide.id,
                         openLightBox: true
                       }))
                     }
                   }}
                   onDoubleClick={ () => {
                     this.slider.slickGoTo(slide.id);
                     if(this.props.lightbox_slides_content) {
                       this.setState((state) => ({
                         ...state,
                         activeSlide: slide.id,
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
                      <div className={`${classes} altrp-carousel-slide-overlay`}>
                        <p className={`${classes} altrp-carousel-slide-overlay-text`}>{slide.overlay_text_repeater}</p>
                      </div>
                  ) : null
                }
              </div>
          );
        });
      }break;
      case 'path':{
        if(isEditor()){
          slidesMap = [
            (
              <div className={`${classes} altrp-carousel-slide`} key={1}>{
                renderAsset({
                  url: '/img/nullImage.png',
                  assetType: 'mediaBackground',
                }, {
                  key: 1,
                  className: `${classes} altrp-carousel-slide-img`,
                })
              }</div>
            ),
            (
              <div className={`${classes} altrp-carousel-slide`} key={2}>{
                renderAsset({
                  url: '/img/nullImage.png',
                  assetType: 'mediaBackground',
                }, {
                  key: 1,
                  className: `${classes} altrp-carousel-slide-img`,
                })
              }</div>
            ),
            (
              <div className={`${classes} altrp-carousel-slide`} key={3}>{
                renderAsset({
                  url: '/img/nullImage.png',
                  assetType: 'mediaBackground',
                }, {
                  key: 1,
                  className: `${classes} altrp-carousel-slide-img`,
                })
              }</div>
            ),
            (
              <div className={`${classes} altrp-carousel-slide`} key={4}>{
                renderAsset({
                  url: '/img/nullImage.png',
                  assetType: 'mediaBackground',
                }, {
                  key: 1,
                  className: `${classes} altrp-carousel-slide-img`,
                })
              }</div>
            ),
            (
              <div className={`${classes} altrp-carousel-slide`} key={5}>{
                renderAsset({
                  url: '/img/nullImage.png',
                  assetType: 'mediaBackground',
                }, {
                  key: 1,
                  className: `${classes} altrp-carousel-slide-img`,
                })
              }</div>
            ),
            (
              <div className={`${classes} altrp-carousel-slide`} key={6}>{
                renderAsset({
                  url: '/img/nullImage.png',
                  assetType: 'mediaBackground',
                }, {
                  key: 1,
                  className: `${classes} altrp-carousel-slide-img`,
                })
              }</div>
            ),
          ];
        } else {
          slidesMap = getDataByPath(getResponsiveSetting(this.props, 'slides_path'));
          if(! _.isArray(slidesMap) && _.isObject(slidesMap)){
            slidesMap = [slidesMap];
          } else if(! _.isArray(slidesMap)){
            slidesMap = [];
          }

          slidesMap = slidesMap.map((media, idx)=>{
            if(_.isObject(media.media)){
              media = media.media;
            }

            media.url = media.url || '/img/nullImage.png';
            media.name = media.name || 'null';
            media.assetType = media.assetType || 'mediaBackground';
            if(media.assetType === 'media') {
              media.assetType = 'mediaBackground';
            }

            let content = renderAsset(media, {
              className: `${classes} altrp-carousel-slide-img`,
            });

            return (
                <div className={`${classes} altrp-carousel-slide`} key={idx}
                     onClick={()=>{
                       this.slider.slickGoTo(idx);
                       if(this.props.lightbox_slides_content) {
                         this.setState((state) => ({
                           ...state,
                           openLightBox: true
                         }))
                       }
                     }}
                     onDoubleClick={ () => {
                       this.slider.slickGoTo(idx);
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
                </div>
            );
          });
        }
      }break;
    }

    //позиция стрелок
    let prevArrow = ` ${classes} `;
    let nextArrow = ` ${classes} `;

    let arrowsClasses = ` ${classes} `;

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
        <div className={`${classes} altrp-carousel-arrow-prev altrp-carousel-arrow`} onClick={this.previous}>
          <ArrowIcon/>
        </div>
      ) : "";

    nextArrow = this.props.arrows_navigation_content ? (
      <div className={`${classes} altrp-carousel-arrow-next altrp-carousel-arrow`} onClick={this.next}>
        <ArrowIcon/>
      </div>
    ) : "";

    let lightbox = "";
    if(this.props.lightbox_slides_content) {
      let imagesSrcs = this.state.sliderImages;

      lightbox =  this.state.openLightBox ? (
        <AltrpLightbox
          images={imagesSrcs}
          current={this.state.activeSlide}
          carousel={true}
          carouselItems={this.props.slides_repeater}
          settings={{
            onCloseRequest: () => this.setState({openLightBox: false})
          }}
          color={this.props.color_lightbox_style}
        />
      ) : ""

    }
    slidesMap
    return <AltrpCarouselWrapper settings={{...this.props}} className={`${classes} altrp-carousel`}>
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
        <Slider ref={c => (this.slider = c)}
                {...settings}>
          {
            slidesMap
          }
        </Slider>
      </div>
      { this.props.arrows_position_navigation_content === "center" ? nextArrow : "" }
    </AltrpCarouselWrapper>
  }
}

export default AltrpCarousel
