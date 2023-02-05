

class AltrpSVG extends Component {
  constructor(props) {
    super(props);
    window.assetsCache = window.assetsCache || {};
    this.regex = new RegExp('[\\s\\r\\t\\n]*([a-z0-9\\-_]+)[\\s\\r\\t\\n]*=[\\s\\r\\t\\n]*([\'"])((?:\\\\\\2|(?!\\2).)*)\\2', 'ig');

    let _props = {};
    let svg = '';
    if(this.props.rawSVG){
      window.assetsCache[this.props.url] = this.props.rawSVG;
      svg = this.props.rawSVG;
      let propsString = svg.match(/<svg(.*?)=\"(.*?)\">/gi)?svg.match(/<svg(.*?)=\"(.*?)\">/gi)[0] : '';

      let match;
      while (match = this.regex.exec(propsString)) {
        _props[match[1]] = match[3];
      }

      svg = svg.replace(/<!--[\s\S]*?-->/g, '')
      svg = svg.replace(/<![\s\S]*?>/g, '')
      svg = svg.replace(/<\?[\s\S]*?\?>/g, '')
      svg = svg.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
      // svg = svg.replace(/<svg[\s\S]*?>/gi, "").replace(/<\/svg>/gi, "");
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
      let resource = new window.altrpHelpers.Resource({route: this.props.url});
      content = await resource.getAsText();
      window.assetsCache[this.props.url] = content;
    }
    let propsString = content.match(/<svg(.*?)=\"(.*?)\">/gi)?content.match(/<svg(.*?)=\"(.*?)\">/gi)[0] : '';
    let props = {};
    let match;
    while (match = this.regex.exec(propsString)) {
      props[match[1]] = match[3];
    }
    this.setState(state => ({...state, props}));

    content = content.replace(/<!--[\s\S]*?-->/g, '')
    content = content.replace(/<![\s\S]*?>/g, '')
    content = content.replace(/<\?[\s\S]*?\?>/g, '')
    content = content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
    // content = content.replace(/<svg[\s\S]*?>/gi, "").replace(/<\/svg>/gi, "");

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
    let divElement;
    let svg = '';
    if(window.SSR){
      divElement = parse(`<div>${this.state.svg}</div>`)
      divElement.childNodes[1]?.removeAttribute('width')
      divElement.childNodes[1]?.removeAttribute('height')
      svg = divElement.childNodes[1]?.outerHTML;
    } else {
      divElement = document.createElement('div');
      divElement.innerHTML = this.state.svg;
      divElement.children[0]?.removeAttribute('width')
      divElement.children[0]?.removeAttribute('height')
      svg = divElement.children[0]?.outerHTML;
    }
    return <span {...props}  dangerouslySetInnerHTML={{__html: svg || this.state.svg}}/>
  }
}

export default AltrpSVG;
