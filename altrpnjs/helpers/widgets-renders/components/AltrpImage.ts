export default function AltrpImage(props: any){
  return `<div class="altrp-image-placeholder" style="${"position: relative; max-width: 100%; overflow: hidden; height: auto;" + " width: " + props.width + ";"}"><img class="altrp-image" width="${props.width}" height="${props.height}" /></div>`
}
