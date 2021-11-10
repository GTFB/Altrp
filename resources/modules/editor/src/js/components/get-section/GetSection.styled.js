import styled, {css, keyframes} from "styled-components";

export const Wrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100%;
  z-index: 99999;
  display: flex;
  justify-content: center;
  align-items: center;
`

const showBackgroundAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`


export const BackgroundWrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100%;
  z-index: 99999998;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
  cursor: pointer;
  animation: ${showBackgroundAnimation} 0.4s forwards;
`

const contentShowAnimation = keyframes`
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(0);
  }
`

export const Content = styled.div`
  height: calc(100vh - 40px);
  background-color: #FFFFFF;
  width: 80%;
  position: relative;
  z-index: 99999999;
  border-radius: 2px;
  box-shadow: 0 2px 8px 0 rgba(99, 99, 99, 0.2);
  animation: ${contentShowAnimation} ease-in-out 0.4s forwards;
  overflow: hidden;
`

export const Iframe = styled.iframe`
  height: 100%;
  width: 100%;
  position: absolute;
  ${props => {
    if(props.showSections) {
      return css`animation: ${iFrameHide} ease-in-out 0.4s forwards;`
    } else {
      return css`animation: ${iFrameShow} ease-in-out 0.4s forwards;`
    }
  }}
`

const iFrameHide = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
`

const iFrameShow = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
`

export const ContentWithSections = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transform: translateX(100%);
  ${props => {
  if(props.showSections) {
    return css`animation: ${ContentShow} ease-in-out 0.4s forwards;`
  } else {
    return css`animation: ${ContentHide} ease-in-out 0.4s forwards;`
  }
  }}
`;

export const ReturnButton = styled.div`
  cursor: pointer;
  padding: 2px;
  background-color: #315EFB;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;

  &:hover {
    background-color: #274BC8;
  }

  path {
    stroke: #FFFFFF;
  }
`;


const ContentHide = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(100%);
  }
`

const ContentShow = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
`

export const ContentSections = styled.div`
  width: 100%;
  overflow: hidden;
`;

export const Element = styled.section`
  position: relative;
`;

export const ViewElement = styled.div`
  position: relative;
  z-index: 1;
`;

export const Overlap = styled.div`
  position: absolute;
  z-index: 2;
  left: 0;
  top: 0;
  height: calc(100% + 10px);
  width: calc(100% + 10px);
  cursor: pointer;
  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  &:hover {
    opacity: 1;
    background-color: rgba(49, 94, 251, 0.4);
  }
`;
