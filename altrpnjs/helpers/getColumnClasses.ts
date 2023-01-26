import getResponsiveSetting from "./getResponsiveSetting";

export default function getColumnClasses(settings, device){
  const background_image = getResponsiveSetting(
    settings,
    "background_image",
    device,
  )
  const path_image = getResponsiveSetting(
    settings,
    "path_image",
    device,
  )
  let classes = ''

  if(background_image?.url || path_image){
    classes += ' altrp-background-image-columns '
  }
  return classes
}
