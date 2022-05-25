import React from "react";
import renderAssetIcon from "./renderAssetIcon";

export default function renderIcon(isHidden, icon, defaultIcon, className) {
  if (isHidden) return null;

  return (
    <span className={className}>
      {icon && icon.assetType ? renderAssetIcon(icon) : defaultIcon}
    </span>
  );
  // if()
}
