import React, {Component} from "react";
import GalleryIcon from "../../../svgs/widget_gallery.svg";
import ("../../../sass/altrp-gallery.scss");
import {isEditor} from "../../../../../front-app/src/js/helpers";
import AltrpLightbox from "../altrp-lightbox/AltrpLightbox";
import HoverImage from "../animations/image/HoverImage";
import Overlay from "../altrp-gallery/Overlay";

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
    const propsSimpleRepeater = this.element.getResponsiveSetting("repeater_simple_settings", "", []);
    const simpleRepeater = this.state.simpleRepeater;

    if(isEditor() && JSON.stringify(propsSimpleRepeater) !== JSON.stringify(simpleRepeater)) {
      this.setState({simpleRepeater: propsSimpleRepeater});
    };
  }

  _componentDidMount() {
    this.updateRepeater()
  }

  _componentDidUpdate(prevProps, prevState) {
    const orderBy = this.state.settings.order_by_settings || "default";

    this.updateRepeater();

    let repeater = this.element.getResponsiveSetting("repeater_simple_settings", "",[]);

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

  render() {
    const layout = this.element.getResponsiveSetting("layout_settings", "", "grid");
    const linkType = this.element.getResponsiveSetting("link_type_grid_settings", "","none");
    const hoverAnimationType = this.element.getResponsiveSetting("image_hover_animation", "", "none");
    const hoverAnimationDuration = this.element.getResponsiveSetting("image_transition", "", {size: 800});
    const overlaySwitcher = this.element.getResponsiveSetting("overlay_switcher", "", false);
    const overlayType = this.element.getResponsiveSetting("overlay_title_and_description", "", "none");
    const overlayAnimationType = this.element.getResponsiveSetting("hover_animation_overlay", "", "none");
    const overlayAnimationDuration = this.element.getResponsiveSetting("overlay_transition", "", {size: 800});
    let simpleRepeater = this.state.simpleRepeater;

    const emptyRepeater = <div className="altrp-gallery-empty-container">
      <GalleryIcon className="altrp-gallery-icon"/>
    </div>;

    let images = "";

    if(simpleRepeater.length > 0) {
      images = simpleRepeater.map((img, idx) => {
        const url = img.simple_media_settings ? img.simple_media_settings.url : '/img/nullImage.png';

        const imageProps = {
          className: "altrp-gallery-img",
          style: { backgroundImage: `url(${url})` }
        };

        let containerClassNames = "altrp-gallery-img-container";

        if(hoverAnimationType && hoverAnimationType !== "none" ) {
          console.log(hoverAnimationType)
          containerClassNames += " altrp-hover-parent-image";
        };

        if(overlayAnimationType && overlayAnimationType !== "none" ) {
          console.log(overlayAnimationType)
          containerClassNames += " altrp-hover-parent-overlay";
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
          description: img.simple_description_media_settings,
          title: img.simple_title_media_settings,
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
            <HoverImage type={hoverAnimationType} hoverParent="altrp-gallery-img-container" transition={hoverAnimationDuration.size} component={Image} attributes={imageProps}/>
            {
              overlaySwitcher ? <Overlay {...overlayProps}/> : null
            }
          </div>
        }

        return image
      })
    }

    let layoutContainer =
      <div className="altrp-gallery-grid">
        { images }
      </div>
    ;

    switch (layout) {
      case "justified":
        break
    }

    let imagesSrcs = [];
    if(linkType === "media" && simpleRepeater.length > 0) {
      imagesSrcs = simpleRepeater.map(img => img.simple_media_settings.url)
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
