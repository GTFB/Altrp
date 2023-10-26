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
    const card = getResponsiveSetting(props, 'card');
    const cards_on = getResponsiveSetting(props, 'cards_on');
    const slides_item_source = getResponsiveSetting(props, 'slides_item_source');
    let slidesMap = []
    if(cards_on && slides_item_source === 'path' && card && isEditor()){
      slidesMap = generateSlidesForTemplatePreview(card)
    }

    this.state = {
      activeSlide: 0,
      openLightBox: false,
      sliderImages: [],
      updateToken: null,
      slidesMap,
      card,
    }
  }

  componentDidMount() {
    let slides_repeater = getResponsiveSetting(this.props,'slides_repeater', '', []) ;
    slides_repeater.forEach(image => {
      this.setState((state) => {

        let img = {...image.image_slides_repeater} || {};
        img.url = img.url || '/img/nullImage.png';

        state.sliderImages.push(img.url);
        return ({...state});
      });
    });
  }

  componentDidUpdate(prevProps) {

    const card = getResponsiveSetting(this.props, 'card')
    if( this.state.card !== card){
      const cards_on = getResponsiveSetting(this.props, 'cards_on')
      const slides_item_source = getResponsiveSetting(this.props, 'slides_item_source')
      let slidesMap = this.state.slidesMap
      if(cards_on && slides_item_source === 'path' && card && isEditor()){
        slidesMap = generateSlidesForTemplatePreview(card)
      }

      this.setState(state => ({
        ...state,
        slidesMap,
        card
      }))
    }
    let slides_repeater = getResponsiveSetting(this.props,'slides_repeater', '', []) ;
    if(slides_repeater !== prevProps.slides_repeater
        && getResponsiveSetting(this.props, 'slides_item_source', '', 'custom') !== 'custom') {
      let sliderImagesArray = [];
      slides_repeater.forEach(image => {
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
  wrapperClick = (e)=>{
    if(isEditor()){
      return
    }
    if(! _.isArray(this.carouselsToSynchronize)){
      return;
    }
    let maxView = Number(this.props.elementSettings.getResponsiveLockedSetting('per_view_slides_content')) || 1;
    const trackDiv = e.target.closest('.slick-track')
    if(! trackDiv){
      return;
    }
    const slidesLength = trackDiv.querySelectorAll('.slick-slide').length
    if(maxView < slidesLength){
      return
    }

    let slideIndex = e.target.closest('.slick-slide')
    if(! slideIndex){
      return;
    }
    slideIndex = Number(slideIndex.getAttribute('data-index'))

    if(_.isNaN(slideIndex)){
      return
    }
    e.preventDefault()
    e.stopPropagation()
    this.carouselsToSynchronize.forEach(carousel => {carousel.setSlide(slideIndex)})

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
    const itemsSourceType = getResponsiveSetting(this.props, 'slides_item_source', '', 'custom');

    carouselContainerClasses += (!this.props.arrows_navigation_content ? " altrp-carousel-container-no-arrow" : "");

    //точки
    let slides = getResponsiveSetting(this.props,'slides_repeater', '', []) ;

    if (slides.length === 0 && itemsSourceType !== 'path') {
      if (isEditor()) {
        //return 'No Slides'
        slides = [
          {},
          {},
          {},
          {},
        ]
      } else {
        return ''
      }
    }

    let dotsClasses = `${classes} altrp-carousel-dots`;

    let sliderClasses = `${classes} altrp-carousel-slides`;
    let dots_navigation_content = getResponsiveSetting(this.props,'dots_navigation_content') ;
    let dots_position_navigation_content = getResponsiveSetting(this.props,'dots_position_navigation_content') ;

    //позиция точек
    if(dots_navigation_content) {
      switch (dots_position_navigation_content) {
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

    let infinite = this.props.elementSettings.getResponsiveLockedSetting('infinite_loop_additional_content')
    let maxView = Number(this.props.elementSettings.getResponsiveLockedSetting('per_view_slides_content')) || 1;
    let rows = Number(this.props.elementSettings.getResponsiveLockedSetting('per_row_slides_content')) || 1;
    let vertical = this.props.elementSettings.getResponsiveLockedSetting('vertical') || false;

    if(rows > 1) {
      maxView = maxView * rows
    }

    if(maxView >= slides.length) {
      infinite = false
    }

    const transition_duration_additional_content = getResponsiveSetting(this.props, 'transition_duration_additional_content')
    const autoplay_additional_content = getResponsiveSetting(this.props, 'autoplay_additional_content')
    const pause_on_interaction_loop_additional_content = getResponsiveSetting(this.props, 'pause_on_interaction_loop_additional_content')
    const transition_autoplay_duration_additional_content = getResponsiveSetting(this.props, 'transition_autoplay_duration_additional_content')
    const cards_on = getResponsiveSetting(this.props, 'cards_on')
    const slides_item_source = getResponsiveSetting(this.props, 'slides_item_source')
    let card
    if(cards_on){
      card = getResponsiveSetting(this.props, 'card')
    }

    let settings = {
      vertical,
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
      dots: dots_navigation_content,
      infinite,
      pauseOnHover: pause_on_interaction_loop_additional_content,
      autoplay: autoplay_additional_content,
      className: sliderClasses,
      autoplaySpeed: Number(transition_autoplay_duration_additional_content),
      speed: Number(transition_duration_additional_content),
      slidesToShow: Number(this.props.elementSettings.getResponsiveLockedSetting('per_view_slides_content')),
      slidesToScroll: Number(this.props.elementSettings.getResponsiveLockedSetting('to_scroll_slides_content')),
      rows,
      afterChange: current => this.setState({ activeSlide: current }),
      beforeChange: (current, next) => {
        this.carouselsToSynchronize && this.carouselsToSynchronize.forEach(carousel => {carousel.setSlide(next)})
      },
      // adaptiveHeight: false,
    };
    const lightbox_slides_content = getResponsiveSetting(this.props, 'lightbox_slides_content')
    const overlay_select_heading_additional_content = getResponsiveSetting(this.props, 'overlay_select_heading_additional_content')

    // слайды
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

           if(typeSlide === true ) {
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
                     if(lightbox_slides_content && getResponsiveSetting(this.props, 'lightbox_s_click')) {
                       this.setState((state) => ({
                         ...state,
                         activeSlide: slide.id,
                         openLightBox: true
                       }))
                     }
                   }}
                   onDoubleClick={ () => {
                     this.slider.slickGoTo(slide.id);
                     if(lightbox_slides_content) {
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
                  overlay_select_heading_additional_content === "text" ? (
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

          if(cards_on && slides_item_source === 'path' && card){
            slidesMap = this.state.slidesMap

          } else {
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
          }
        } else {
          slidesMap = getDataByPath(getResponsiveSetting(this.props, 'slides_path'));
          if(! _.isArray(slidesMap) && _.isObject(slidesMap)){
            slidesMap = [slidesMap];
          } else if(! _.isArray(slidesMap)){
            slidesMap = [];
          }

          slidesMap = slidesMap.map((media, idx)=>{
            let content

            if(cards_on && slides_item_source === 'path' && card){
              content = <div className={`${classes} altrp-carousel-slide`} key={6}>
                <TemplateLoader
                  cardModel={new altrpHelpers.AltrpModel(media)}
                  templateId={card}
                /></div>
            } else {

              if(_.isObject(media.media)){
                media = media.media;
              }

              media.url = media.url || '/img/nullImage.png';
              media.name = media.name || 'null';
              media.assetType = media.assetType || 'mediaBackground';
              if(media.assetType === 'media') {
                media.assetType = 'mediaBackground';
              }

              content = renderAsset(media, {
                className: `${classes} altrp-carousel-slide-img`,
              });

            }
            return (
                <div className={`${classes} altrp-carousel-slide`} key={idx}
                     onClick={()=>{
                       this.slider.slickGoTo(idx);
                       if(lightbox_slides_content) {
                         this.setState((state) => ({
                           ...state,
                           openLightBox: true
                         }))
                       }
                     }}
                     onDoubleClick={ () => {
                       this.slider.slickGoTo(idx);
                       if(lightbox_slides_content) {
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
    const arrows_position_navigation_content = getResponsiveSetting(this.props, 'arrows_position_navigation_content')

    switch (arrows_position_navigation_content) {
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
    const arrows_navigation_content = getResponsiveSetting(this.props, 'arrows_navigation_content')
    const slides_repeater = getResponsiveSetting(this.props, 'slides_repeater')
    const color_lightbox_style = getResponsiveSetting(this.props, 'color_lightbox_style')

    prevArrow = arrows_navigation_content ? (
        <div className={`${classes} altrp-carousel-arrow-prev altrp-carousel-arrow`} onClick={this.previous}>
          <ArrowIcon/>
        </div>
      ) : "";

    nextArrow = arrows_navigation_content ? (
      <div className={`${classes} altrp-carousel-arrow-next altrp-carousel-arrow`} onClick={this.next}>
        <ArrowIcon/>
      </div>
    ) : "";

    let lightbox = "";
    if(lightbox_slides_content) {
      let imagesSrcs = this.state.sliderImages;

      lightbox =  this.state.openLightBox ? (
        <AltrpLightbox
          images={imagesSrcs}
          current={this.state.activeSlide}
          carousel={true}
          carouselItems={slides_repeater}
          settings={{
            onCloseRequest: () => this.setState({openLightBox: false})
          }}
          color={color_lightbox_style}
        />
      ) : ""

    }

    return <AltrpCarouselWrapper
      onClick={this.wrapperClick}
      settings={{...this.props}} className={`${classes} altrp-carousel`}>
      {
        lightbox_slides_content ? lightbox : ""
      }
      { arrows_position_navigation_content === "center" ?
        prevArrow
        : ""
      }
      <div className={carouselContainerClasses}>
        {
          arrows_position_navigation_content !== "center" ? (
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
      { arrows_position_navigation_content === "center" ? nextArrow : "" }
    </AltrpCarouselWrapper>
  }
}

export default AltrpCarousel

function generateSlidesForTemplatePreview(card){
  return [
    (
      <div className={`altrp-carousel-slide`} key={1}>
        <TemplateLoader
          templateId={card}
        /></div>),
    (
      <div className={`altrp-carousel-slide`} key={2}>
        <TemplateLoader
          templateId={card}
        /></div>),
    (
      <div className={`altrp-carousel-slide`} key={3}>
        <TemplateLoader
          templateId={card}
        /></div>),
    (
      <div className={`altrp-carousel-slide`} key={4}>
        <TemplateLoader
          templateId={card}
        /></div>),
    (
      <div className={`altrp-carousel-slide`} key={5}>
        <TemplateLoader
          templateId={card}
        /></div>),
    (
      <div className={`altrp-carousel-slide`} key={6}>
        <TemplateLoader
          templateId={card}
        /></div>),
  ]
}
