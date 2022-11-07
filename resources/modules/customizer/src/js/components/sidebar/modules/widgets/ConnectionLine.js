import React from 'react';
import {getBezierPath, getSmoothStepPath} from "react-flow-renderer";
import {useSelector} from "react-redux";
import cn from "classnames"
// export default ({
//   sourceX,
//   sourceY,
//   sourcePosition,
//   targetX,
//   targetY,
//   targetPosition,
//   connectionLineType,
//   connectionLineStyle,
// }) => {
//   return (
//     <g>
//       <path
//         fill="none"
//         stroke="#222"
//         strokeWidth={1.5}
//         className="animated"
//         d={`M${sourceX},${sourceY} C ${sourceX} ${targetY} ${sourceX} ${targetY} ${targetX},${targetY}`}
//       />
//       <circle cx={targetX} cy={targetY} fill="#fff" r={3} stroke="#222" strokeWidth={1.5} />
//     </g>
//   );
// };





function ConnectionLine ({
                  sourceX,
                  sourceY,
                  sourcePosition,
                  targetX,
                  targetY,
                  targetPosition,
                  connectionLineType,
                  connectionLineStyle,
                }) {
  const lineState = useSelector(({connectionLineTypeData}) => connectionLineTypeData.animateLine)
  let dAttr = '';

  if (connectionLineType === "default") {
    dAttr = getBezierPath({
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition,
    });
  } else if (connectionLineType === "step") {
    dAttr = getSmoothStepPath({
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition,
      borderRadius: 0,
    });
  } else if (connectionLineType === "smoothstep") {
    dAttr = getSmoothStepPath({
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition,
    });
  } else {
    dAttr = `M${sourceX},${sourceY} ${targetX},${targetY}`;
  }

  return (
    <g className="react-flow__connection">
      <path
        d={dAttr}
        className={cn('react-flow__connection-path', {
          animated: lineState
        })}
        style={connectionLineStyle}
      />
      <circle cx={targetX} cy={targetY} fill="#fff" r={3} stroke="#222" strokeWidth={1.5} />
    </g>
  );
}



export default ConnectionLine;
