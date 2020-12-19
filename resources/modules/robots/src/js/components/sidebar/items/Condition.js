import styled, { css } from "styled-components";

export const Condition = styled.div`
  position: absolute;
  transition: 0.3s ease box-shadow, 0.3s ease margin-top;
  background: url("/svg/diamond.svg");
  background-size: 100% 100%;
  display: table-cell;
  vertical-align: center;
  height: 100px;
  min-width: 250px;
  ${props =>
    props.isSelected &&
    css`
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
      margin-top: -2px;
    `}
`;
