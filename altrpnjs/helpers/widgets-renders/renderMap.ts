import objectToStylesString from "../objectToStylesString"
import getResponsiveSetting from "../getResponsiveSetting"
//@ts-ignore
export default function renderMap(settings, device, ) {
  const height = getResponsiveSetting(settings, 'style_height', device, {size: 400, unit: 'px'})
  const margin = getResponsiveSetting(settings, 'style_margin', device, {top: 0, bottom: 0, left: 0, right: 0, unit: 'px'})

  const styles = {
    height: height.size + height.unit,
    marginTop: margin?.top + margin?.unit,
    marginBottom: margin?.bottom + margin?.unit,
    marginLeft: margin?.left + margin?.unit,
    marginRight: margin?.right + margin?.unit,
    pointerEvents: 'auto',
  }

  return `
    <div class="altrp-map" style="${objectToStylesString(styles)}">
      <div class="altrp-map__container leaflet-container leaflet-touch leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom" style="height: ${styles.height};">
        <div class="leaflet-control-container">
          <div class="leaflet-top leaflet-left">
            <div class="leaflet-control-zoom leaflet-bar leaflet-control">
              <a class="leaflet-control-zoom-in" href="#" title="Zoom in" role="button" aria-label="Zoom in">+</a><a class="leaflet-control-zoom-out" href="#" title="Zoom out" role="button" aria-label="Zoom out">
                −
              </a>
            </div>
            <div class="leaflet-draw leaflet-control"></div>
          </div>
          <div class="leaflet-top leaflet-right"></div>
          <div class="leaflet-bottom leaflet-left"></div>
          <div class="leaflet-bottom leaflet-right">
            <div class="leaflet-control-attribution leaflet-control">
              <a href="https://leafletjs.com" title="A JS library for interactive maps">
                Leaflet
              </a>
              | ©
              <a href="http://osm.org/copyright">
                OpenStreetMap
              </a>
              contributors
            </div>
          </div>
        </div>
      </div>
    </div>
  `
}
