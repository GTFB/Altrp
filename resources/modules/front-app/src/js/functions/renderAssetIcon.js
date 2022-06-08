import AltrpSVG from "../../../../editor/src/js/components/altrp-svg/AltrpSVG";
import React from "react";
import iconsManager from "./iconsManager";

export default function renderAssetIcon(asset, props = null) {
  if (asset) {
    if (asset.url && asset.type === "svg") {
      return <AltrpSVG {...props} url={asset.url} />;
    }
    switch (asset.assetType) {
      case "icon": {
        return iconsManager().renderIcon(asset.name);
      }
      case "image": {
        return React.createElement("img", { ...props, src: asset.url });
      }
      case "media": {
        return React.createElement("img", { ...props, src: asset.url });
      }
    }
  }
  return "";
}
