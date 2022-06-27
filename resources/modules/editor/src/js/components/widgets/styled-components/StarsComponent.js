import {defaultStyled, sliderStyled, styledString} from "../../../../../../front-app/src/js/helpers/styles";
import {getResponsiveSetting} from"../../../../../../front-app/src/js/helpers";


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

    //state disabled
    ".state-disabled .altrp-stars-list",
    ["flex-direction", "direction", "", ".state-disabled"],
    ["grid-gap", "gap", "slider", ".state-disabled"],
    () => {
      const direction = getResponsiveSetting(settings, "direction", ".state-disabled", "row");
      const alignment = getResponsiveSetting(settings, "alignment", ".state-disabled", "flex-start");
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
    //state active
    ".active .altrp-stars-list",
    ["flex-direction", "direction", "", ".active"],
    ["grid-gap", "gap", "slider", ".active"],
    () => {
      const direction = getResponsiveSetting(settings, "direction", ".active", "row");
      const alignment = getResponsiveSetting(settings, "alignment", ".active", "flex-start");
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


    //state disabled
    ".state-disabled .altrp-stars-star svg",
    ["height", "size", "slider", ".state-disabled"],
    ["width", "size", "slider", ".state-disabled"],
    ["fill", "color", "color", ".state-disabled"],
    "}",

    ".state-disabled .altrp-stars-visual svg",
    ["fill", "visual_color", "color", ".state-disabled"],
    "}",
    //state active
    ".active .altrp-stars-star svg",
    ["height", "size", "slider", ".active"],
    ["width", "size", "slider", ".active"],
    ["fill", "color", "color", ".active"],
    "}",

    ".active .altrp-stars-visual svg",
    ["fill", "visual_color", "color", ".active"],
    "}",


    "altrp-stars-star:hover svg",
      ["fill", "color", "color", ":hover"],
    "}",

    "altrp-stars-star.active svg",
      ["fill", "color", "color", ".active"],
    "}",

    "altrp-stars-visual.active svg",
      ["fill", "visual_color", "color"],
    "}",

    "altrp-stars-visual.active svg",
    ["fill", "visual_color", "color", ".active"],
    "}",

    "& li.altrp-stars-visual.active:hover svg",
     ["fill", "visual_color", "color", ":hover"],
    "}",
  ];

  return styledString(styles, settings)
}
