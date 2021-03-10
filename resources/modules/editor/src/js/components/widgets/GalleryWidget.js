import React, {Component} from "react";
import GalleryIcon from "../../../svgs/widget_gallery.svg";
import "../../../sass/altrp-gallery.scss";
import styled from "styled-components";
import AltrpImage from "../altrp-image/AltrpImage";
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
      lightbox: false,
      currentImg: 0,
      shuffled: false
    };

    props.element.component = this;
    if (window.elementDecorator) {
      window.elementDecorator(this);
    };

    this.showLightbox = this.showLightbox.bind(this);
    this.closeLightbox = this.closeLightbox.bind(this);
    this.nextImg = this.nextImg.bind(this);
    this.prevImg = this.prevImg.bind(this);
    this.updateRepeater = this.updateRepeater.bind(this);
  }

  updateRepeater() {
    const propsSimpleRepeater = this.props.element.getContent("repeater_simple_settings", []);
    const simpleRepeater = this.state.simpleRepeater;

    if(isEditor() && JSON.stringify(propsSimpleRepeater) !== JSON.stringify(simpleRepeater)) {
      this.setState({simpleRepeater: propsSimpleRepeater});
    };
  }

  _componentDidMount() {
    this.updateRepeater()
  }

  _componentDidUpdate(prevProps, prevState) {
    const orderBy = this.props.element.getContent("order_by_settings", "default");

    this.updateRepeater();

    let repeater = this.props.element.getContent("repeater_simple_settings", []);

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

  nextImg(simpleRepeater) {
    this.setState((state) => {
      let currentImg = state.currentImg + 1;

      if(currentImg >= simpleRepeater.length) {
        currentImg = 0
      }

      return {currentImg: currentImg}
    });
  }

  prevImg(simpleRepeater) {
    this.setState((state) => {
      let currentImg = state.currentImg - 1;

      if(currentImg <= -1) {
        currentImg = simpleRepeater.length - 1;
      }

      return {currentImg: currentImg}
    });
  }

  render() {
    const layout = this.props.element.getContent("layout_settings", "grid");
    const gridGap = this.props.element.getContent("spacing_grid_settings", {size: "0", unit: "px"});
    const gridColumns = this.props.element.getContent("columns_grid_settings", 3);
    const heightJustified = this.props.element.getContent("height_justified_settings", { size: "220", unit: "px"})
    const widthJustified = isEditor() ? document.getElementById("editorWindow").offsetWidth : document.body.offsetWidth;
    const aspectRatioVariant = this.props.element.getContent("aspect_ratio_grid_settings", "1to1");
    const linkType = this.props.element.getContent("link_type_grid_settings", "none");
    const hoverAnimationType = this.props.element.getContent("image_hover_animation", "none");
    const hoverAnimationDuration = this.props.element.getContent("image_transition", {size: 800});
    const overlaySwitcher = this.props.element.getContent("overlay_switcher", false);
    const overlayType = this.props.element.getContent("overlay_title_and_description", "none");
    const overlayAnimationType = this.props.element.getContent("hover_animation_overlay", "none");
    const overlayAnimationDuration = this.props.element.getContent("hover_animation_overlay", {size: 800});
    let simpleRepeater = this.state.simpleRepeater;
    let aspectRatio = "100%";

    console.log(hoverAnimationType)

    switch (aspectRatioVariant) {
      case "3to2":
        aspectRatio = "66.6667%";
        break
      case "4to3":
        aspectRatio = "75%";
        break
      case "9to16":
        aspectRatio = "177.778%";
        break
      case "16to9":
        aspectRatio = "56.25%";
        break
      case "21to9":
        aspectRatio = "42.8571%";
        break
    }

    const EmptyContainer = styled.div`
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      background-color: #C4C4C4;
    `;

    const EmptyIcon = styled(GalleryIcon)`
      height: 35px;
      width: 35px;
      opacity: 0.5;
    `;

    const emptyRepeater = <EmptyContainer>
      <EmptyIcon/>
    </EmptyContainer>;

    let images = "";

    if(simpleRepeater.length > 0) {
      images = simpleRepeater.map((img, idx) => {
        const url = img.simple_media_settings ? img.simple_media_settings.url : '/img/nullImage.png';
        // console.log(img.simple_media_settings)
        const Image = styled.div`
          background-image: url(${url});
          background-size: cover;
          padding-bottom: ${aspectRatio};
          background-position: center center;
          width: 100%;
          transform-origin: center top;
        `;

        const JustifiedImage = styled(Image)`
          position: absolute;
        `;

        const ImageContainer = styled.div`
          position: relative;
          overflow: hidden;
        `

        let image = <Image className="altrp-gallery-img" data-idx={idx}  onClick={linkType === "media" ? this.showLightbox : null}/>

        if(hoverAnimationType && hoverAnimationType !== "none" ) {
          image = <HoverImage type={hoverAnimationType} transition={hoverAnimationDuration.size} component={Image} attributes={{
            className: "altrp-gallery-img",
            onClick: linkType === "media" ? this.showLightbox : null
          }}
          />
        }

        return <ImageContainer className="altrp-gallery-img-container" data-idx={idx} key={idx}>
          {
            image
          }
          {
            overlaySwitcher ? <Overlay animation={overlayAnimationType} animationDuration={overlayAnimationDuration}/> : null
          }
          </ImageContainer>
      })
    }

    const GridLayout = styled.div`
      display: grid;
      grid-gap: ${gridGap.size}px ${gridGap.size}px;
      grid-template-columns: repeat(${gridColumns}, 1fr);
      position: relative;
    `;

    const JusifiedLayout = styled.div`
      padding-top: calc(${heightJustified.size} / ${widthJustified} * 100%);
      position: relative;
      display: flex;
      min-height: 1px;
      flex-wrap: wrap;
    `;

    let layoutContainer = <GridLayout>{ images }</GridLayout>;

    switch (layout) {
      case "justified":
        layoutContainer = <JusifiedLayout>{ images }</JusifiedLayout>;
        break
    }

    let nextImgSrc = "";
    if(linkType === "media" && simpleRepeater[this.state.currentImg+1]) {
      nextImgSrc = simpleRepeater[this.state.currentImg+1].simple_media_settings.url;
    } else if(linkType === "media" && simpleRepeater.length > 1) {
      nextImgSrc = simpleRepeater[0].simple_media_settings.url;
    };

    let prevImgSrc = "";
    if(linkType === "media" && simpleRepeater[this.state.currentImg-1]) {
      prevImgSrc = simpleRepeater[this.state.currentImg-1].simple_media_settings.url;
    }

    let mainImgSrc = "";
    if(linkType === "media" && simpleRepeater[this.state.currentImg]) {
      mainImgSrc = simpleRepeater[this.state.currentImg].simple_media_settings.url;
    };

    return simpleRepeater.length > 0 ? (
      <>
        {
          layoutContainer
        }
        {
          this.state.lightbox ? (
            <AltrpLightbox settings={{
              mainSrc: mainImgSrc,
              onCloseRequest: this.closeLightbox,
              nextSrc: nextImgSrc,
              prevSrc: prevImgSrc,
              onMoveNextRequest: () => this.nextImg(simpleRepeater),
              onMovePrevRequest: () => this.prevImg(simpleRepeater)
            }}
            />
          ) : ""
        }
      </>
    ) : emptyRepeater
  }
}

export default GalleryWidget
