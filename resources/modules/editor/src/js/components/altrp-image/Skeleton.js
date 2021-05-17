import styled, { keyframes} from 'styled-components';

export const defaultBaseColor = "#eee";

export const defaultHighlightColor = "#f5f5f5";

export const skeletonKeyframes = (duration, delay) => keyframes`
  0% {
    background-position: -200px 0;
  }
  ${
  delay > 0
    ? `${Math.floor((1 / (duration + delay)) * duration * 100)}% {
    background-position: calc(200px + 100%) 0;
  }`
    : undefined
}
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;
const SkeletonSpan = styled.span`
  animation: ${skeletonKeyframes} 1.2s ease-in-out infinite;
  background-color: ${({color})=>`${color || defaultBaseColor}`};
  background-size: 200px 100%;
  background-repeat: no-repeat;
  background-image: linear-gradient(90deg, ${({highlightColor, color})=>{
    return `${color || defaultBaseColor}, ${highlightColor || defaultHighlightColor}, ${color || defaultBaseColor}`;
  }});
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
`;
const Skeleton = (props) => <div className={props.className}><SkeletonSpan {...props} className="altrp-skeleton__span"/></div>
export default Skeleton;
