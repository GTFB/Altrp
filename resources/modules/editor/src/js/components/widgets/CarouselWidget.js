import {isClassComponent} from "../../../../../front-app/src/js/helpers/react";
import AltrpCarousel from "../altrp-carousel/AltrpCarousel";

(window.globalDefaults = window.globalDefaults || []).push(`
  .altrp-carousel-slide-img {
      background: no-repeat 50%;
      -webkit-background-size: cover;
      cursor: grab;
      background-size: cover;
      height: 100%;
      width: 100%;
      object-fit: cover;
      border-style: solid;
      border-width: 0;
      position: relative;
  }

  .altrp-carousel-slide {
      overflow: hidden;
      height: 220px;
      position: relative;
  }

  .slick-list {
    height: 100%;
  }

  .altrp-carousel-arrow svg {
    width: 50px;
    height: 50px;
  }

  .slick-slide, .altrp-carousel-dots {
    padding: 0 15px;
  }

  .altrp-carousel-paging {
    width: 10px;
    height: 10px;
    background-color: #a4a4a4;
  }

  .altrp-carousel-slide-overlay {
    background-color: rgb(255, 255, 255);
  }

  .altrp-carousel-arrow {
      cursor: pointer;
      position: relative;
      z-index: 999;
      display: flex;
      justify-content: center;
      align-items: center;
  }

  .altrp-carousel-arrow-next {
      transform: rotate(180deg);
  }

  .altrp-carousel {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 100%;
  }

  .altrp-carousel-paging {
      border-radius: 10vh;
      background-color: #a4a4a4;
      padding-right: 1px;
  }

  .altrp-carousel-container {
      width: 100%;
  }

  .altrp-carousel-dots .slick-active .altrp-carousel-paging {
      background-color: #136aed;
  }

  .altrp-carousel-dots-bottom-left {
      text-align: left !important;
  }

  .altrp-carousel-dots-bottom-right {
      text-align: right !important;
  }

  .altrp-carousel-dots-top-left {
      text-align: left !important;
  }

  .altrp-carousel-dots-top {
      text-align: center !important;
      bottom: auto !important;
  }

  .altrp-carousel-dots-top-right {
      text-align: right !important;
  }

  .altrp-carousel-dots {
      position: relative;
      list-style: none;
      padding: 0;
      text-align: center;
      margin: 0;
      bottom: 0;
  }

  .altrp-carousel-dots li {
      position: relative;
      display: inline-block;
      margin-left: 5px;
      cursor: pointer;
  }

  .altrp-carousel-paging:first-child {
      margin-left: 0;
  }

  .altrp-carousel-container-no-arrow {
      width: 100%;
  }

  .altrp-carousel-arrow-top-left {
      top: 0;
      left: 0;
      margin-top: 10px;
      margin-left: 10px;
  }

  .altrp-carousel-arrows-container {
      position: absolute;
      display: flex;
      font-size: 25px;
      flex-direction: row;
      z-index: 999;
  }

  .altrp-carousel-arrow-top {
      top: 0;
  }

  .altrp-carousel-arrows-container .altrp-carousel-arrow-prev {
      display: flex;
      margin-right: 2em;
  }

  .altrp-carousel-arrows-container .altrp-carousel-arrow-next {
      display: flex;
      margin-left: 2em;
  }

  .altrp-carousel-arrow-top-right {
      top: 0;
      right: 0;
      margin-right: 10px;
  }

  .altrp-carousel-arrow-bottom-left {
      bottom: 0;
      left: 0;
      margin-left: 10px;
  }

  .altrp-carousel-arrow-bottom {
      bottom: 0;

  }

  .altrp-carousel-arrow-bottom-right {
      bottom: 0;
      right: 0;
      margin-right: 10px;
  }

  .altrp-carousel-slides {
      width: 100%;
      display: flex;
  }

  .altrp-carousel-slides-dots-top {
      flex-direction: column-reverse;
  }

  .altrp-carousel-slides-dots-top .altrp-carousel-dots {
      margin-bottom: 15px;
  }

  .altrp-carousel-slides-dots-bottom {
      flex-direction: column;
  }

  .altrp-carousel-slides-dots-bottom .altrp-carousel-dots {
      margin-bottom: -15px;
  }

  .altrp-carousel-slide-overlay {
      width: calc(100% - 40px);
      margin: 20px;
      top: 0;
      opacity: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      perspective: 20px;
      height: calc(100% - 40px);
      padding: 10px;
      cursor: grab;
      background-color: #ffffff;
      z-index: 4;
      position: absolute;
      transition: 0.5s;
  }

  .altrp-carousel-slide:hover .altrp-carousel-slide-overlay {
      opacity: 1;
  }

`);

class CarouselWidget extends Component {
  constructor(props){
    super(props);
    this.state = {
      settings: props.element.getSettings(),
      AltrpCarousel: ()=><div>Loading...</div>
    };
    props.element.component = this;
    if(window.elementDecorator){
      window.elementDecorator(this);
    }
    if(props.baseRender){
      this.render = props.baseRender(this);
    }
    this.carousel = React.createRef();
  }

  /**
   * Получить css классы для carousel widget
   */
  getClasses = ()=>{
    let classes = ``;
    if(this.isActive()){
      classes += 'active '
    }
    if(this.isDisabled()){
      classes += 'state-disabled '
    }
    return classes;
  }

  render(){
    const carouselProps = {
      ...this.props.element.getSettings(),
      currentScreen: this.props.currentScreen,
      elementId: this.props.element.getId(),
      classes: this.getClasses() + (this.props.element.getResponsiveLockedSetting('position_css_classes', '', '') || "")
    };
    if(! carouselProps.slides_repeater){
      carouselProps.slides_repeater = [];
    }
    if(isClassComponent(AltrpCarousel)){
      carouselProps.ref = this.carousel;
    }
    return <AltrpCarousel {...carouselProps}/>
  }
}

export default CarouselWidget
