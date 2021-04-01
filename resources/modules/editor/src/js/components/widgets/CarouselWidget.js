import React, {Component} from "react";

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
    return <this.state.AltrpCarousel {...this.props.element.getSettings()}
                                     currentScreen={this.props.currentScreen}/>
  }
}

export default CarouselWidget
