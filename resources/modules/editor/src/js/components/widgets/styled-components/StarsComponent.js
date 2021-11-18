import {defaultStyled, sliderStyled, styledString} from "../../../../../../front-app/src/js/helpers/styles";
import {getResponsiveSetting} from "../../../../../../front-app/src/js/helpers";


export default function StarsComponent(settings) {
  const styles = [
    "altrp-stars-list",
      ["flex-direction", "direction"],
      ["grid-gap", "gap", "slider"],
      () => {
        const direction = getResponsiveSetting(settings, "direction", "", "row");
        const alignment = getResponsiveSetting(settings, "alignment", "", "flex-start");
        let value = ""

        switch (direction) {
          case "row":
          case "row-reverse":
            value =`justify-content: ${alignment};`
            break
          case "column":
          case "column-reverse":
            value = `align-items: ${alignment};`
            break
        }

        return value
      },
    "}",

    "altrp-stars-star svg",
      ["height", "size", "slider"],
      ["width", "size", "slider"],
      ["fill", "color", "color"],
    "}",

    "altrp-stars-star:hover svg",
      ["fill", "color", "color", ":hover"],
    "}",

    "altrp-stars-star.active svg",
      ["fill", "color", "color", ".active"],
    "}",
  ];

  return styledString(styles, settings)
}
