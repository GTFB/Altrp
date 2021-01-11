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
      content = await resource.getAsText();
      window.assetsCache[this.props.url] = content;
    }
    let propsString = content.match(/<svg(.*?)=\"(.*?)\">/gi)[0];
    let regex = new RegExp('[\\s\\r\\t\\n]*([a-z0-9\\-_]+)[\\s\\r\\t\\n]*=[\\s\\r\\t\\n]*([\'"])((?:\\\\\\2|(?!\\2).)*)\\2', 'ig'); //для работы с циклом
    let props = {};
    let match;
    while (match = regex.exec(propsString)) {
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
    return <svg {...props}  dangerouslySetInnerHTML={{__html: this.state.svg}}/>
  }
}

export default AltrpSVG;