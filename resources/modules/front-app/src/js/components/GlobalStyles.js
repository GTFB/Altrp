import { createGlobalStyle } from "styled-components";
import { connect } from "react-redux";
import { getResponsiveSetting } from "../helpers";
import { colorPropertyStyled } from "../helpers/styles";

const GlobalStyles = createGlobalStyle`${({ elementsSettings }) => {
  let styles = "";
  let settingsHeading;
  let elementId;

  _.each(elementsSettings, (item, id) => {
    switch (item.name) {
      case "heading":
        {
          // styles += getHeadingStyles(item.settings, id);
        }
        break;
    }
  });

  if (settingsHeading === undefined) {
    return styles;
  }

  styles += `.altrp-element${elementId} .altrp-heading, .altrp-element${elementId} .altrp-heading a {`;

  const color = getResponsiveSetting(settingsHeading, "heading_style_color");

  if (color) {
    styles += colorPropertyStyled(color, "color");
  }

  styles += `} `;

  return styles;
}}`;

function mapStateToProps(state) {
  return { elementsSettings: state.elementsSettings };
}

export default connect(mapStateToProps)(GlobalStyles);
