import Skeleton from './Skeleton';
import ImagePlaceholder from "./ImagePlaceholder";
import {checkElementInViewBox} from "../../../../../front-app/src/js/helpers/elements";
const {isEditor, isSSR, renderAsset} = window.altrpHelpers;

class AltrpImage extends Component {
  constructor(props) {
    super(props);
    this.imageRef = React.createRef();
    let visible = true;
    if(isSSR() && ! props.element?.getResponsiveSetting('lazyload_disable')){
      visible = false;
    } else if (isEditor() || props.lazy === false) {

    } else if (window.altrpImageLazy
        && window.altrpImageLazy !== 'none'
        && props.element
        && ! props.element?.getResponsiveSetting('lazyload_disable')) {
      visible = false;
    }
    this.state = {
      visible,
      update: 0,
    };
    this.timeoutId = setTimeout(() => this.setState(state => ({...state, update: state.update++})), 500);
  }

  /**
   * очищаем обновление
   */
  componentWillUnmount() {
    clearTimeout(this.timeoutId);
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
    if (this.imageRef.current && checkElementInViewBox(this.imageRef.current, scroller)) {
      clearTimeout(this.timeoutId);
      this.setState(state => ({...state, visible: true}));
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

    let placeholder = <ImagePlaceholder color={media.main_color}
                                        className={'altrp-image-placeholder'}
                                        ref={this.imageRef}
                                        settings={this.props.element?.getSettings() || {}}
                                        height={height}
                                        width={width}
                                        elementId={this.props.elementId}
                                        style={placeholderStyles}
                                        mediaWidth={media.width || 100}
                                        mediaHeight={media.height || 75}>
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
      </ImagePlaceholder>;

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
