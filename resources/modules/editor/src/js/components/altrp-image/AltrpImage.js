import {connect} from "react-redux";
import React, {cloneElement, Component} from 'react';
import {isEditor, renderAsset} from "../../../../../front-app/src/js/helpers";
import ImagePlaceholder from "./ImagePlaceholder";
import {checkElementInViewBox} from "../../../../../front-app/src/js/helpers/elements";

class AltrpImage extends Component {
  constructor(props) {
    super(props);
    this.imageRef = React.createRef();
    console.log(window.altrpImageLazy);
    let visible = true;
    if (isEditor()) {

    } else if (window.altrpImageLazy && window.altrpImageLazy !== 'none') {
      visible = false;
    }
    this.state = {
      visible,
      update: 0,
    };
    this.intervalId = setInterval(() => this.setState(state => ({...state, update: state.update++})), 100);
  }

  /**
   * очищаем обновление
   */
  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  /**
   * Проверим нужно ли обновить видимость
   * @param {{}} prevProps
   * @param {{}} prevState
   */

  componentDidUpdate(prevProps, prevState) {
    if (this.state.visible || !this.imageRef.current) {
      return;
    }
    if (prevProps.scrollPosition === this.props.scrollPosition && prevState.update === this.state.update) {
      return;
    }
    if (checkElementInViewBox(this.imageRef.current, window.mainScrollbars)) {
      clearInterval(this.intervalId);
      this.setState(state => ({...state, visible: true}));
    }
  }

  render() {
    let media = {...this.props.image};
    const noDefault = this.props.noDefault || false;
    const placeholderStyles = {display: 'none'};
    if (!this.state.visible) {
      delete placeholderStyles.display;
    }
    let width = this.props.width;
    let height = this.props.height;
    let placeholder = <ImagePlaceholder color={media.main_color}
                                        className={'altrp-image-placeholder '}
                                        ref={this.imageRef}
                                        height={height}
                                        width={width}
                                        style={placeholderStyles}
                                        mediaWidth={media.width}
                                        mediaHeight={media.height}/>;
    if (this.props.image instanceof File) {
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
    return <React.Fragment>{this.state.visible && cloneElement(image, {
      className: this.props.className,
      id: this.props.id || null,
      style: this.props.style,
    })}
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
    };
  }

  _export = connect(mapStateToProps)(AltrpImage)
}
export default _export;
