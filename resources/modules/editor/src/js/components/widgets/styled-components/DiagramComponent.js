import styled from "styled-components";
import {getResponsiveSetting} from "../../../../../../front-app/src/js/helpers";
import {defaultStyled, sliderStyled, styledString} from "../../../../../../front-app/src/js/helpers/styles";

export default styled.div`
  ${({settings}) => {
  const styles = [
  ];
  return styledString(styles, settings)
}}
`;
