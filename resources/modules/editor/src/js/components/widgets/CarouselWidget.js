import {isClassComponent} from "../../../../../front-app/src/js/helpers/react";
import AltrpCarousel from "../altrp-carousel/AltrpCarousel";


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
      elementSettings: this.props.element,
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
