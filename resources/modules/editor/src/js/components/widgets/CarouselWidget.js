import React, {Component} from "react";
import {isClassComponent} from "../../../../../front-app/src/js/helpers/react";

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
   * Асинхронно загрузим  AltrpCarousel
   * @private
   */
  async _componentDidMount(){
    let AltrpCarousel = await import('../altrp-carousel/AltrpCarousel');
    AltrpCarousel = AltrpCarousel.default;
    this.setState(state=>({
        ...state,
      AltrpCarousel
    }))
  }

  render(){
    const carouselProps = {
      ...this.element.getSettings(),
      currentScreen: this.props.currentScreen,
      elementId: this.element.getId(),
    };
    if(isClassComponent(this.state.AltrpCarousel)){
      carouselProps.ref = this.carousel;
    }
    return <this.state.AltrpCarousel {...carouselProps}/>
  }
}

export default CarouselWidget
