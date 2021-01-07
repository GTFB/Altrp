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

    if(! content) {
      let resource = new Resource({route: this.props.url});
      let svg = await resource.getAsText();

      let propsString = svg.match(/<svg(.*?)=\"(.*?)\">/gi)[0];
      let regex = new RegExp('[\\s\\r\\t\\n]*([a-z0-9\\-_]+)[\\s\\r\\t\\n]*=[\\s\\r\\t\\n]*([\'"])((?:\\\\\\2|(?!\\2).)*)\\2', 'ig'); //для работы с циклом
      let props = {};
      let match;
      while (match = regex.exec(propsString)) {
        props[match[1]] = match[3];
      }
      this.setState(state => ({...state, props}));

      svg = svg.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
      svg = svg.replace(/<svg(.*?)=\"(.*?)\">/gi, "").replace(/<\/svg>/gi, "");

      window.assetsCache[this.props.url] = svg;
      this.setState(state=>({...state, svg}));
    } else {
      this.setState(state=>({...state, svg: content}));
    }
  }
  render(){
    let props = _.assign(this.state.props, this.props);
    return <svg {...props}  dangerouslySetInnerHTML={{__html: this.state.svg}}/>
  }
}

export default AltrpSVG;