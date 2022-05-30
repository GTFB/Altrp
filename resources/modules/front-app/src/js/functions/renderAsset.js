import React from "react";
import AltrpSVG from "../../../../editor/src/js/components/altrp-svg/AltrpSVG";
import isSSR from "./isSSR";
import iconsManager from "./iconsManager";

/**
 * @param {object} asset
 * @param {object} props
 * @return {React.DetailedReactHTMLElement<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> | React.DetailedReactHTMLElement<React.HTMLAttributes<T>, HTMLElement> | React.ReactSVGElement | React.DOMElement<React.DOMAttributes<T>, Element> | React.FunctionComponentElement<{}> | React.CElement<{}, React.ClassicComponent<{}, React.ComponentState>> | React.CElement<{}, React.Component<P, React.ComponentState>> | React.ReactElement<{}> | string}
 * @throws Исключение если иконка не найдена
 * */
export default function renderAsset(asset, props = null) {
  if(_.isEmpty(asset)){
    return  ''
  }
  if(asset.type === 'image' && asset.dataUrl){
    return React.createElement("img", {
      ...props,
      src: asset.dataUrl,
    });
  }
  if (asset.url && asset.type === "svg") {
    return <AltrpSVG {...props} url={asset.url} rawSVG={asset.rawSVG} />;
  }
  if (! isSSR() && asset instanceof File) {
    let refImg = React.createRef();
    let fr = new FileReader();
    fr.readAsDataURL(asset);
    fr.onload = () => {
      if (refImg.current) {
        refImg.current.src = fr.result;
        refImg.current.alt = asset.name;
      }
    };
    return React.createElement("img", {
      ...props,
      src: asset.url,
      ref: refImg
    });
  }
  switch (asset.assetType) {
    case "icon": {
      return iconsManager().renderIcon(asset.name, props);
    }
    case "image": {
      return React.createElement("img", { ...props, src: asset.url });
    }
    case "media": {
      return React.createElement("img", { ...props, src: asset.url });
    }
    case "mediaBackground": {
      return React.createElement("div", {
        ...props,
        style: { backgroundImage: `url(${asset.url})` }
      });
    }
    case undefined: {
      return React.createElement("img", {
        ...props,
        src: "/img/nullImage.png"
      });
    }
  }
  return "";
}
