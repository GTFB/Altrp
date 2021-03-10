import React from 'react';
import { getSmoothStepPath, getMarkerEnd } from 'react-flow-renderer';

export default class CustomEdge extends React.Component {
    constructor(props) {
      super(props);
    }
  
    render() {
        let { id,
            sourceX,
            sourceY,
            targetX,
            targetY,
            sourcePosition,
            targetPosition,
            style = {},
            data = {},
            label,
            arrowHeadType,
            markerEndId } = this.props;
        const edgePath = getSmoothStepPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition});
        const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);
            
      return (
        <>
        <path id={id} style={style} className={'react-flow__edge-path'} d={edgePath} markerEnd={markerEnd} />
        <text>
          <textPath href={`#${id}`} style={{ fontSize: '12px' }} startOffset="50%" textAnchor="middle">
            {label ?? ""}
          </textPath>
        </text>
        </>
        );
    }
}