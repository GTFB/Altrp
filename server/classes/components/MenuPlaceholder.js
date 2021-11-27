import Skeleton from "../../../resources/modules/editor/src/js/components/altrp-image/Skeleton";
import styled from "styled-components";
import React from "react";
import SkeletonPlaceholder from "./SkeletonPlaceholder";
import {mbParseJSON} from "../../../resources/modules/front-app/src/js/helpers";

const Container = styled.div`
  display: flex;

 ${props => {
    let styles = "";

    if(props.type === "vertical") {
      styles += "flex-direction: column;";
    } else if(styles === "horizontal") {
      styles += "flex-direction: row;";
    }

    if(props.gap) {
      styles += `grid-gap: ${props.gap}`
    }

    return styles
  }}
`

const MenuPlaceholder = props=>{
  const divStyles = {
    position: 'relative',
    width: props.element.getResponsiveSetting('skeleton_width') || '100%',
    height: props.element.getResponsiveSetting('skeleton_height') || '30px',
  };

  const guid = props.element.getResponsiveSetting('menu');

    const menus = window.appStore.getState().altrpMenus;
  console.log(guid, "g")
  if(guid) {
    const menu = menus.find((m) => {
      return m.guid === guid
    });

    const items = mbParseJSON(menu.children);
    const type = props.element.getResponsiveSetting("type", "", "vertical");
    const gap =  props.element.getResponsiveSetting("gap");

    return <Container gap={gap} type={type}>
      {
        items.map((i) => (
          <div style={divStyles} key={i.id}><Skeleton/></div>
        ))
      }
    </Container>
  } else {
    return <SkeletonPlaceholder {...props}/>
  }

}

export default MenuPlaceholder;

