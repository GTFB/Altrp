import React, {Component} from "react";

class Heading extends Component {
  constructor(props){
    super(props);
    props.element.component = this;
    this.state = {
      name: props.settings.name ||  props.element.getTitle(),
      classNames: props.settings.classNames || [],
    };
  }
  render(){
    console.log(this.props.element);
    let className = 'widget-container';
    className += ' widget' + this.props.element.getId();
    return<div className={className}>
      <div className="heading">{this.state.name}</div>
    </div>;
  }
}

export default Heading