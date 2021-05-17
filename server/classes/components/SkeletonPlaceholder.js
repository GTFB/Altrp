import Skeleton from "../../../resources/modules/editor/src/js/components/altrp-image/Skeleton";

const SkeletonPlaceholder = props=>{
  const divStyles = {
    position: 'relative',
    width: props.element.getResponsiveSetting('skeleton_width') || '100%',
    height: props.element.getResponsiveSetting('skeleton_height') || '50px',
  };
  return <div style={divStyles}><Skeleton /></div>
}

export default SkeletonPlaceholder;
