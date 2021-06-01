import styled from "styled-components";
import {getResponsiveSetting} from "../../../../../../front-app/src/js/helpers";
import {defaultStyled, sliderStyled, styledString} from "../../../../../../front-app/src/js/helpers/styles";

export default styled.div`
  ${({settings}) => {
  const styles = [
    "altrp-video",
      ["width", "video_width", "slider"],
      ["height", "video_height", "slider"],
    "}"
  ];
  return styledString(styles, settings)
}}
`;
