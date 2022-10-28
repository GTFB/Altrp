import Skeleton from './Skeleton';
import ImagePlaceholder from "./ImagePlaceholder";
import {checkElementInViewBox} from "../../../../../front-app/src/js/helpers/elements";
import isEditor from "../../../../../front-app/src/js/functions/isEditor";
import isSSR from "../../../../../front-app/src/js/functions/isSSR";
import renderAsset from "../../../../../front-app/src/js/functions/renderAsset";
import {createGlobalStyle} from "styled-components";
import getResponsiveSetting from '../../../../../front-app/src/js/helpers/get-responsive-setting'

const Global = createGlobalStyle`
.altrp-element .altrp-skeleton.altrp-skeleton,
.altrp-element .altrp-image.altrp-image{
  position:absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;
  height:100%;
  width:100%;
}
${({elementId})=>`.altrp-element${elementId} .altrp-image-placeholder`} {

${(props) => {
  const {settings} = props;
  const aspect_ratio_size = getResponsiveSetting(settings, 'aspect_ratio_size');
  if(Number(aspect_ratio_size) !== 0 && aspect_ratio_size === 'custom'|| Number(aspect_ratio_size)){
    return ''
  }
  if(! props.height || props.height.indexOf('%') !== -1) {
    return ''
  }
  if (props.height) {
    return `height:${props.height};`;
  }
  return '';
}}
  width:${props => {
  if (_.isNumber(props.width)) {
    return props.width + 'px';
  }

  if (props.width) {
    return props.width;
  }
  return '';
}};
}
${({elementId})=>`.altrp-element${elementId}`} .altrp-image-placeholder::before{

${(props) => {
  const {settings, height} = props;
  let style = '';
  const aspect_ratio_size = getResponsiveSetting(settings, 'aspect_ratio_size');
  if(Number(aspect_ratio_size) !== 0) {
    if(aspect_ratio_size === 'custom') {
      let custom_aspect = getResponsiveSetting(settings, 'custom_aspect');
      custom_aspect = Number(custom_aspect) || 100;
      style += `padding-top:${custom_aspect}%;`;
    } else if(Number(aspect_ratio_size)){
      style += `padding-top:${aspect_ratio_size}%;`;
    }
    return style;
  }
  if (height && _.isString(height) && height.indexOf('%') === -1) {
    return style;
  }

  if (Number(props.mediaWidth) && Number(props.mediaHeight)) {
    style += `padding-top:${(props.mediaHeight / props.mediaWidth) * 100}%;`
  }
  return style;
}};
`
class AltrpImage extends Component {
  constructor(props) {
    super(props);
    this.imageRef = React.createRef();
    let visible = true;
    this.state = {
      visible,
      update: 0,
    };
    this.onScroll()
    this.timeoutId = setTimeout(() => this.setState(state => ({...state, update: state.update++})), 500);
  }

  componentDidMount() {
    ! isEditor() && window.addEventListener('scroll',this.onScroll)
  }
  onScroll =  _.debounce(()=>{
      if (this.imageRef.current && checkElementInViewBox(this.imageRef.current, document.documentElement)) {
        clearTimeout(this.timeoutId);
        this.setState(state => ({...state, visible: true}));
      }
    }, 200)


  /**
   * очищаем обновление
   */
  componentWillUnmount() {
    clearTimeout(this.timeoutId);
    window.removeEventListener('scroll', this.onScroll)
  }

  /**
   * Проверим нужно ли обновить видимость
   * @param {{}} prevProps
   * @param {{}} prevState
   */

  componentDidUpdate(prevProps, prevState) {
    if(this.state.visible){
      clearTimeout(this.timeoutId);
    }
    if (this.state.visible || ! this.imageRef.current) {
      return;
    }
    if(this.props?.element?.getRoot()?.popupGUID && this.props.element.getRoot().popupGUID === this.props.popupTrigger.popupID){
      this.setState(state => ({...state, visible: true}));
    }
    if (prevProps.scrollPosition === this.props.scrollPosition && prevState.update === this.state.update) {
      return;
    }

    let scroller = window.mainScrollbars;
    if(! scroller){
      scroller = document.querySelector('.front-app-content');
    }
    if(! scroller){
      scroller = document.querySelector('.front-app');
    }
  }

  render() {
    let media = {...this.props.image};
    const {visible} = this.state;

    const noDefault = this.props.noDefault || false;
    const placeholderStyles = {};

    let width = this.props.width;

    let height = this.props.height;
    if (! isSSR() && this.props.image instanceof File) {
      media = this.props.image
    } else {
      if (this.props.default) {
        if ((Object.keys(media).length === 0)) {
          media = this.props.default;
        }
      } else if (noDefault) {
        return ""
      } else {
        media.url = media.url || '/img/nullImage.png';
        media.name = media.name || 'null';
        media.assetType = media.assetType || undefined;
      }
    }
    let image = renderAsset(media);
    if(visible || window.altrpImageLazy === 'skeleton'){
      placeholderStyles.background = 'transparent';
    }

    let placeholder = <>
      <Global
        settings={this.props.element?.getSettings() || {}}
        elementId={this.props.elementId}
        height={height}
        width={width}
        style={placeholderStyles}
        mediaWidth={media.width}
        mediaHeight={media.height}
      />
      <ImagePlaceholder color={media.main_color}
                                        className={'altrp-image-placeholder '}
                                        ref={this.imageRef}
                                        settings={this.props.element?.getSettings() || {}}
                                        height={height}
                                        width={width}
                                        elementId={this.props.elementId}
                                        style={placeholderStyles}
                                        mediaWidth={media.width}
                                        mediaHeight={media.height}>
      {window.altrpImageLazy === 'skeleton'
        && ! visible
        &&
          <Skeleton className="altrp-skeleton"
                    color={window.altrpSkeletonColor}
                    highlightColor={window.altrpSkeletonHighlightColor}/>

      }
      {visible && React.cloneElement(image, {
        className: this.props.className,
        id: this.props.id || null,
        style: this.props.style,
      })}
      </ImagePlaceholder></>;

    return <React.Fragment>
      {placeholder}
    </React.Fragment>
  }
}

let _export;
if (isEditor()) {
  _export = AltrpImage;
} else {

  function mapStateToProps(state) {
    return {
      scrollPosition: state.scrollPosition,
      popupTrigger: state.popupTrigger,
    };
  }

  _export = window.reactRedux.connect(mapStateToProps)(AltrpImage)
}
export default _export;
