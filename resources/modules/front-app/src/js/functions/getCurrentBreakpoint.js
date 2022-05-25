import CONSTANTS from "../../../../editor/src/js/consts";
import getWindowWidth from "./getWindowWidth";

/**
 * Возвращает брейкпоинт относительно текущего размера экрана
 */
export default function getCurrentBreakpoint() {
  const currentWidth = getWindowWidth();
  const breakPoints = CONSTANTS.SCREENS;
  const breakPointsSizes = breakPoints.map(item => ({
    name: item.name,
    size: Number(item.width.split("px")[0])
  }));
  for (let breakpoint of breakPointsSizes) {
    if (breakpoint.size < currentWidth) {
      return breakpoint.name;
    }
  }
}
