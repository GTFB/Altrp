import styled, {keyframes} from "styled-components";

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
  z-index: 99998;
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
  z-index: 99999;
  border-radius: 2px;
  box-shadow: 0 2px 8px 0 rgba(99, 99, 99, 0.2);
  animation: ${contentShowAnimation} ease-in-out 0.4s forwards;
  overflow: hidden;
`

export const Iframe = styled.iframe`
  height: calc(100vh - 40px);
  width: 100%;
`
