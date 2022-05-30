import Arrow from "../../svgs/arrow.svg";
import WidgetIcon from "./WidgetIcon";
import React, {useEffect, useRef, useState} from "react";

function WidgetsGroupItem(props) {
  const [widgetsHeight, setWidgetsHeight] = useState(null)
  const block = useRef(null)

  useEffect(() => {
    setWidgetsHeight(block.current.scrollHeight + "px")
  },[])

  const toggleHeight = (e) => {
    setWidgetsHeight(widgetsHeight !== '0px' ? '0px' : block.current.scrollHeight + "px")
    props.toggleGroups(e)
  }

  return (
    <div className="widget-panel__block">
      <div onClick={toggleHeight} data-group={props.name} className="widget__group">
        <h2 className="title-group__widgets">{props.name}</h2>
        <Arrow width={20} height={14} className={`arrow-group__widgets${props.activeGroup ? '' : ' arrow-group__widgets-close'}`}/>
      </div>
      <div ref={block} style={{maxHeight: `${widgetsHeight}`}} className="widgets__block">
        <div className="widgets">
          {props.widgets.filter(item => {
            if(!item.getGroup){
              return false
            }
            return item.getGroup() === props.name
          }).map(widget => {
            return <WidgetIcon element={widget} key={widget.getName()} />;
          })}
        </div>
      </div>
    </div>
  )
}

export default WidgetsGroupItem;
