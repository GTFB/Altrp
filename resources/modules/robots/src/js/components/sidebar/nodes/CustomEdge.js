import React from 'react';
import { getBezierPath, getMarkerEnd } from 'react-flow-renderer';

export default class Begin extends React.Component {
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
            data = {
              text: "new Edge"
            },
            arrowHeadType,
            markerEndId } = this.props;
        const edgePath = getBezierPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });
        const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);
            
      return (
        <>
        <path id={id} style={style} className="react-flow__edge-path" d={edgePath} markerEnd={markerEnd} data={data}/>
        <text>
          <textPath href={`#${id}`} style={{ fontSize: '12px' }} startOffset="50%" textAnchor="middle">
            {data?.text ?? ""}
          </textPath>
        </text>
        </>
        );
    }
}