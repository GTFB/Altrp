import React, {Component} from "react";
import Resource from "../../classes/Resource";

class AltrpSVG extends Component {
  constructor(props) {
    super(props);
    this.state = {
      svg: '',
      props: {},
    };
  }
  async componentDidMount() {
    window.assetsCache = window.assetsCache || {};
    if(! this.props.url){
      return;
    }
    let content = (window.assetsCache[this.props.url]);
    if(! content){
      let resource = new Resource({route: this.props.url});
      let svg = await resource.getAsText();
      svg = svg.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
      window.assetsCache[this.props.url] = svg;
      //todo: извлечь аттрибуты из файла и сохранить как this.state.props
      this.setState(state=>({...state, svg}));
    }
  }
  render(){
    let props = _.assign(this.state.props, this.props);
    return <svg {...props} dangerouslySetInnerHTML={{__html: this.state.svg}}/>
  }
}

export default AltrpSVG