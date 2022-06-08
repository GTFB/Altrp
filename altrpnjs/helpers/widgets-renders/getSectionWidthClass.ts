export default function getSectionWidthClass(settings){
  const {layout_content_width_type:widthType, isFixed} = settings

  let section_classes = 'altrp-section_boxed'
  if (widthType === "boxed" && !isFixed) {
    section_classes = "  ";
  }
  if (widthType === "section_boxed" && !isFixed) {
    section_classes = " altrp-section_section-boxed "
  }

  if (widthType === "full" && !isFixed) {
    section_classes = " altrp-section--full-width "
  }
  return section_classes
}
