import Skeleton from "../../../resources/modules/editor/src/js/components/altrp-image/Skeleton";
import styled from "styled-components";

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
    height: props.element.getResponsiveSetting('skeleton_height') || '50px',
  };

  const items = [1, 2, 3];
  const type = props.element.getResponsiveSetting("type", "", "vertical");
  const gap =  props.element.getResponsiveSetting("gap");

  return <Container gap={gap} type={type}>
    {
      items.map((i) => (
        <div style={divStyles} key={i}><Skeleton/></div>
      ))
    }
  </Container>
}

export default MenuPlaceholder;

