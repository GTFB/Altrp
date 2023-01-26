
class HtmlWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: props.element.getSettings()
    };
    props.element.component = this;
    if (window.elementDecorator) {
      window.elementDecorator(this);
    }
    if (props.baseRender) {
      this.render = props.baseRender(this);
    }
    this.ref = React.createRef()
  }
  shouldComponentUpdate(nextProps, nextState){
    let data = this.getLockedContent("data");
    return this.data !== data
  }

  _componentDidMount(){
    if(this.ref.current){
      nodeScriptReplace(this.ref.current)
    }
  }

  _componentDidUpdate(){
    if(this.ref.current){
      nodeScriptReplace(this.ref.current)
    }
  }
  /**
   * Получить css классы для html widget
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

  render() {
    let data = this.getLockedContent("data");
    this.data = data
    let classes = this.getClasses() + (this.props.element.getResponsiveLockedSetting('position_css_classes', '', '') || "")

    return (
      <>
        <div
          ref={this.ref}
          className={classes}
          dangerouslySetInnerHTML={{
            __html: data
          }}
        />
      </>
    );
  }
}

export default HtmlWidget;
function nodeScriptReplace(node) {
  if ( nodeScriptIs(node) === true ) {
    node.parentNode.replaceChild( nodeScriptClone(node) , node );
  }
  else {
    var i = -1, children = node.childNodes;
    while ( ++i < children.length ) {
      nodeScriptReplace( children[i] );
    }
  }

  return node;
}
function nodeScriptClone(node){
  var script  = document.createElement("script");
  script.text = node.innerHTML;

  var i = -1, attrs = node.attributes, attr;
  while ( ++i < attrs.length ) {
    script.setAttribute( (attr = attrs[i]).name, attr.value );
  }
  return script;
}

function nodeScriptIs(node) {
  return node.tagName === 'SCRIPT';
}
