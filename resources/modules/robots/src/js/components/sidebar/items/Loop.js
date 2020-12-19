import styled, { css } from "styled-components";

export const Loop = styled.div`
  position: absolute;
  transition: 0.3s ease box-shadow, 0.3s ease margin-top;
  background: url("/svg/hexagon.svg");
  background-size: 100% 100%;
  border-radius: 4px;
  min-width: 250px;
  max-width: 500px;
  height: 100px;
  display: inline-block;
  ${props =>
    props.isSelected &&
    css`
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
      margin-top: -2px;
    `}
`;
