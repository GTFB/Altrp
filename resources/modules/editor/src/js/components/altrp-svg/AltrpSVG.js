import React, {Component} from "react";
import Resource from "../../classes/Resource";

class AltrpSVG extends Component {
  constructor(props) {
    super(props);
    window.assetsCache = window.assetsCache || {};
    this.regex = new RegExp('[\\s\\r\\t\\n]*([a-z0-9\\-_]+)[\\s\\r\\t\\n]*=[\\s\\r\\t\\n]*([\'"])((?:\\\\\\2|(?!\\2).)*)\\2', 'ig'); //для работы с циклом

    let _props = {};
    let svg = '';
    if(this.props.rawSVG){
      window.assetsCache[this.props.url] = this.props.rawSVG;
      svg = this.props.rawSVG;
      let propsString = svg.match(/<svg(.*?)=\"(.*?)\">/gi)[0];

      let match;
      while (match = this.regex.exec(propsString)) {
        _props[match[1]] = match[3];
      }
      svg = svg.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
      svg = svg.replace(/<svg(.*?)=\"(.*?)\">/gi, "").replace(/<\/svg>/gi, "");
    }
    this.state = {
      svg: svg || '',
      props: _props,
    };
  }
  async componentDidMount() {
    window.assetsCache = window.assetsCache || {};
    if(this.props.rawSVG){
      window.assetsCache[this.props.url] = this.props.rawSVG;
    }
    if(! this.props.url){
      return;
    }
    let content = (window.assetsCache[this.props.url]);

    if(! content) {
      let resource = new Resource({route: this.props.url});
      content = await resource.getAsText();
      window.assetsCache[this.props.url] = content;
    }
    let propsString = content.match(/<svg(.*?)=\"(.*?)\">/gi)[0];
    let props = {};
    let match;
    while (match = this.regex.exec(propsString)) {
      props[match[1]] = match[3];
    }
    this.setState(state => ({...state, props}));

    content = content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
    content = content.replace(/<svg(.*?)=\"(.*?)\">/gi, "").replace(/<\/svg>/gi, "");

    this.setState(state=>({...state, svg: content}));
  }

  /**
   * Обновиим если url в пропсах изменился
   * @param prevProps
   * @param prevState
   */
  componentDidUpdate(prevProps, prevState) {
    if(this.props.url !== prevProps.url){
      this.componentDidMount();
    }
  }
  render(){
    let props = _.assign(this.state.props, this.props);
    _.unset(props, 'url');
    _.unset(props, 'rawSVG');
    if(! this.state.svg){
      return '';
    }
    return <svg {...props}  dangerouslySetInnerHTML={{__html: this.state.svg}}/>
  }
}

export default AltrpSVG;
