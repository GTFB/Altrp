import React, {Component} from "react";
import GalleryIcon from "../../../svgs/widget_gallery.svg";
import "../../../sass/altrp-gallery.scss";
import styled from "styled-components";
import AltrpImage from "../altrp-image/AltrpImage";
import {shuffle} from "lodash";
import {isEditor} from "../../../../../front-app/src/js/helpers";

class GalleryWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: props.element.getSettings()
    };
    props.element.component = this;
    if (window.elementDecorator) {
      window.elementDecorator(this);
    }
  }

  render() {
    const orderBy = this.props.element.getContent("order_by_settings", "default");
    const layout = this.props.element.getContent("layout_settings", "grid");
    const gridGap = this.props.element.getContent("spacing_grid_settings", {size: "0", unit: "px"});
    const gridColumns = this.props.element.getContent("columns_grid_settings", 3);
    const heightJustified = this.props.element.getContent("height_justified_settings", { size: "220", unit: "px"})
    const widthJustified = isEditor() ? document.getElementById("editorWindow").offsetWidth : document.body.offsetWidth
    const aspectRatioVariant = this.props.element.getContent("aspect_ratio_grid_settings", "1to1");
    let aspectRatio = "100%";
    let simpleRepeater = this.props.element.getContent("repeater_simple_settings", []);

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

    if(orderBy === "random") {
      simpleRepeater = shuffle(simpleRepeater)
    };

    const emptyRepeater = <div className="altrp-gallery-empty">
      <GalleryIcon className="altrp-gallery-empty-icon"/>
    </div>;

    let images = "";

    if(simpleRepeater.length > 0) {
      images = simpleRepeater.map((img, idx) => {
        const url = img.simple_media_settings ? img.simple_media_settings.url : '/img/nullImage.png'
        console.log(img)
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
          width: ;
        `;
        return <Image key={idx}/>
      })
    }

    console.log(gridGap)
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
    return simpleRepeater.length > 0 ? layoutContainer : emptyRepeater
  }
}

export default GalleryWidget
