import GalleryIcon from "../../../svgs/widget_gallery.svg";
import ("../../../sass/altrp-gallery.scss");
import isEditor from "../../../../../front-app/src/js/functions/isEditor";
import AltrpLightbox from "../altrp-lightbox/AltrpLightbox";
import HoverImage from "../animations/image/HoverImage";
import Overlay from "../altrp-gallery/Overlay";

(window.globalDefaults = window.globalDefaults || []).push(`
  .altrp-gallery-overlay {
    left: 0;
    top: 0;
    align-items: flex-start;
    justify-content: flex-start;
  }

  .altrp-gallery-overlay-bg {
    mix-blend-mode: none;
  }

  .altrp-gallery-grid {
    display: grid;
    position: relative;
    grid-template-columns: repeat(3, 1fr);
  }

  .altrp-gallery-img {
    background-size: cover;
    background-position: center center;
    width: 100%;
    transform-origin: center top;
    padding-bottom:100%;
  }

  .altrp-gallery-img-container {
    position: relative;
    overflow: hidden;
  }

  .altrp-gallery-icon {
    height: 35px;
    width: 35px;
    opacity: 0.5;
  }

  .altrp-gallery-empty-container {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background-color: #C4C4C4;
  }

`);

class GalleryWidget extends Component {
  constructor(props) {
    super(props);

    const settings = props.element.getSettings();

    this.state = {
      settings,
      simpleRepeater: [],
      currentImg: -1,
      lightbox: false,
      shuffled: false
    };

    props.element.component = this;
    if (window.elementDecorator) {
      window.elementDecorator(this);
    };

    this.showLightbox = this.showLightbox.bind(this);
    this.closeLightbox = this.closeLightbox.bind(this);
    this.updateRepeater = this.updateRepeater.bind(this);
  }

  updateRepeater() {
    const propsSimpleRepeater = this.props.element.getResponsiveLockedSetting("repeater_simple_settings", "", []);
    const simpleRepeater = this.state.simpleRepeater;

    if(isEditor() && JSON.stringify(propsSimpleRepeater) !== JSON.stringify(simpleRepeater)) {
      this.setState({simpleRepeater: propsSimpleRepeater});
    };
  }

  _componentDidMount() {
    this.updateRepeater()

    let repeater = this.props.element.getResponsiveLockedSetting("repeater_simple_settings", "",[]);
    const orderBy = this.state.settings.order_by_settings || "default";

    if(!isEditor() && this.state.simpleRepeater.length === 0 && repeater.length !== 0) {
      if(orderBy === "random" && !this.state.shuffled) {
        repeater = _.shuffle(repeater)
      };

      this.setState({simpleRepeater: repeater})
    }
  }

  _componentDidUpdate(prevProps, prevState) {
    const orderBy = this.state.settings.order_by_settings || "default";

    this.updateRepeater();

    let repeater = this.props.element.getResponsiveLockedSetting("repeater_simple_settings", "",[]);

    if(!isEditor() && this.state.simpleRepeater.length === 0 && repeater.length !== 0) {
      if(orderBy === "random" && !this.state.shuffled) {
        repeater = _.shuffle(repeater)
      };

      this.setState({simpleRepeater: repeater})
    }

    // if(this.state.simpleRepeater.length > 0) {
    //   const imgUrl = this.state.simpleRepeater[0].simple_media_settings.url;
    //   let image = new Image();
    //   image.src = imgUrl
    //   console.log(image.width)
    // }

  }


  showLightbox(e) {
    const currentImg = Number.parseInt(e.currentTarget.dataset.idx);
    this.setState({ lightbox: true, currentImg });
  }

  closeLightbox() {
    this.setState({ lightbox: false });
  }

  /**
   * Получить css классы для gallery widget
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
    const layout = this.props.element.getResponsiveLockedSetting("layout_settings", "", "grid");
    const linkType = this.props.element.getResponsiveLockedSetting("link_type_grid_settings", "","none");
    const hoverAnimationType = this.props.element.getResponsiveLockedSetting("image_hover_animation", "", "none");
    const hoverAnimationDuration = this.props.element.getResponsiveLockedSetting("image_transition", "", {size: 800});
    const overlaySwitcher = this.props.element.getResponsiveLockedSetting("overlay_switcher", "", false);
    const overlayType = this.props.element.getResponsiveLockedSetting("overlay_title_and_description", "", "none");
    const overlayAnimationType = this.props.element.getResponsiveLockedSetting("hover_animation_overlay", "", "none");
    const overlayAnimationDuration = this.props.element.getResponsiveLockedSetting("overlay_transition", "", {size: 800});
    let simpleRepeater = this.state.simpleRepeater;
    let classes =
      this.getClasses() + (this.props.element.getResponsiveLockedSetting('position_css_classes', '', '') || "")

    const emptyRepeater = <div className={`${classes} altrp-gallery-empty-container`}>
      <GalleryIcon className={`${classes} altrp-gallery-icon`}/>
    </div>;

    let images = "";

    if(simpleRepeater.length > 0) {
      images = simpleRepeater.map((img, idx) => {
        let url = img?.simple_media_settings ? img?.simple_media_settings.url : '/img/nullImage.png';

        if(url) {
          url = "/ajax" + url;
        }

        const imageProps = {
          className: `${classes} altrp-gallery-img`,
          style: { backgroundImage: `url(${url})` }
        };

        let containerClassNames = `${classes} altrp-gallery-img-container`;

        if(hoverAnimationType && hoverAnimationType !== "none" ) {
          containerClassNames += `${classes} altrp-hover-parent-image`;
        };

        if(overlayAnimationType && overlayAnimationType !== "none" ) {
          containerClassNames += `${classes} altrp-hover-parent-overlay`;
        };

        const containerProps = {
          className: containerClassNames,
          onClick: linkType === "media" ? this.showLightbox : null,
          "data-idx": idx,
          key: idx
        }

        const overlayProps = {
          animation: overlayAnimationType,
          animationDuration: overlayAnimationDuration.size,
          description: img?.simple_description_media_settings,
          title: img?.simple_title_media_settings,
          type: overlayType
        }

        let image = <div {...containerProps}>
          <div {...imageProps} />
          {
            overlaySwitcher ? <Overlay {...overlayProps}/> : null
          }
        </div>;

        switch(layout) {
          case "justified":
            break
        }

        if(hoverAnimationType && hoverAnimationType !== "none" ) {
          image = <div {...containerProps}>
            {/*<HoverImage type={hoverAnimationType} hoverParent="altrp-gallery-img-container" transition={hoverAnimationDuration.size} component={Image} attributes={imageProps}/>*/}
            {
              overlaySwitcher ? <Overlay {...overlayProps}/> : null
            }
          </div>
        }

        return image
      })
    }

    let layoutContainer =
      <div className={`${classes} altrp-gallery-grid`}>
        { images }
      </div>
    ;

    switch (layout) {
      case "justified":
        break
    }

    let imagesSrcs = [];
    if(linkType === "media" && simpleRepeater.length > 0) {
      imagesSrcs = simpleRepeater.map(img => img?.simple_media_settings?.url)
    }

    return simpleRepeater.length > 0 ? (
      <>
        {
          layoutContainer
        }
        {
          this.state.lightbox ? (
            <AltrpLightbox
              images={imagesSrcs}
              current={this.state.currentImg}
              settings={{
              onCloseRequest: this.closeLightbox,
            }}
            />
          ) : ""
        }
      </>
    ) : emptyRepeater
  }
}

export default GalleryWidget
