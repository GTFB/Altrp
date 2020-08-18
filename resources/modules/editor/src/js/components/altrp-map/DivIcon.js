import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { divIcon } from "leaflet/src/layer/marker/DivIcon";

import MemoAnimalsIcon from "./Icons/AnimalsIcon";
import MemoBeeIcon from "./Icons/BeeIcon";
import MemoCowIcon from "./Icons/CowIcon";
import MemoHomeIcon from "./Icons/HomeIcon";
import MemoHorseIcon from "./Icons/HorseIcon";
import MemoMarkerIcon from "./Icons/MarkerIcon";
import MemoPigIcon from "./Icons/PigIcon";
import MemoSheepIcon from "./Icons/SheepIcon";

export const iconTypes = {
  Marker: MemoMarkerIcon,
  Animals: MemoAnimalsIcon,
  Bee: MemoBeeIcon,
  Cow: MemoCowIcon,
  Home: MemoHomeIcon,
  Horse: MemoHorseIcon,
  Pig: MemoPigIcon,
  Sheep: MemoSheepIcon,
};

export const customIcon = (name = "Marker", color = "#3388ff", size = [36, 36]) => {
  // Получаем svg
  let html;
  let Icon = iconTypes[name];
  if (Icon) {
    html = renderToStaticMarkup(<Icon fill={color} width={size[0]} height={size[1]} />);
  } else {
    html = renderToStaticMarkup(<MemoMarkerIcon fill={color} width={size[0]} height={size[1]} />);
  }
  // Возвращаем html-svg иконку
  return new divIcon({ html });
};
