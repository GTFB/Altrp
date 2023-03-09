import getResponsiveSetting from '../getResponsiveSetting'

export default function renderGallery(settings, device) {
  const layout = getResponsiveSetting(settings,"layout_settings", device, "grid");
  const hoverAnimationType = getResponsiveSetting(settings,"image_hover_animation", device, "none");
  const overlaySwitcher = getResponsiveSetting(settings,"overlay_switcher", device, false);
  const overlayType = getResponsiveSetting(settings, "overlay_title_and_description", device, "none");
  const overlayAnimationType = getResponsiveSetting(settings,"hover_animation_overlay", device, "none");

  let repeater = getResponsiveSetting(settings,"repeater_simple_settings", device,[]);


  const emptyRepeater: string = `<div class="altrp-gallery-empty-container">
 <svg class="altrp-gallery-icon" width="37" height="28" viewBox="0 0 37 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path stroke="#515F81" stroke-width="1.3" d="M.65.65H8.6v6.336H.65zM28.4.65h7.95v6.336H28.4zM16.507 10.832h7.95v6.336h-7.95zM28.4 10.832h7.95v6.336H28.4zM.65 21.014h5.307v6.336H.65zM12.543.65h11.914v6.336H12.543zM.65 10.832h11.914v6.336H.65zM9.9 21.014h10.593v6.336H9.9zM24.436 21.014H36.35v6.336H24.436z"></path></svg>
 </div>`

  let images: string | string[] = "";

  if (repeater.length > 0) {
    images = repeater.map((img, idx) => {
      let url = img.simple_media_settings?.url ? img.simple_media_settings?.url : '/img/nullImage.png';

      // if(url) {
      //   url = "/ajax" + url
      // }

      let containerClassNames = "altrp-gallery-img-container";

      if(hoverAnimationType && hoverAnimationType !== "none" ) {
        containerClassNames += " altrp-hover-parent-image";
      }

      if(overlayAnimationType && overlayAnimationType !== "none" ) {
        containerClassNames += " altrp-hover-parent-overlay";
      }

      let overlay: string = `<div class="altrp-gallery-overlay" style="position: absolute; height: 100%; width: 100%; display: flex; flex-direction: column;">
                                ${overlayType !== 'none' ? `<div class="altrp-gallery-overlay-title" style="z-index: 6;">${img.simple_title_media_settings || ""}</div>` : ""}
                                ${overlayType === "titleAndDescription" ? `<div class="altrp-gallery-overlay-description" style="z-index: 6;">${img.simple_description_media_settings || ""}</div>` : ""}
                                <div class="altrp-gallery-overlay-bg" style="position: absolute; height: 100%; width: 100%; z-index: 4; left: 0; top: 0;"></div>
                             </div>`

      let image: string = `<div data-idx="${idx}" key="${idx}" class="${containerClassNames}">
        <div class="altrp-gallery-img" style="background-image: url(${url})" ></div>
      ${overlaySwitcher ? overlay : ""}
      </div>`

      switch(layout) {
        case "justified":
          break
      }

      if(hoverAnimationType && hoverAnimationType !== "none" ) {
        image = `<div data-idx="${idx}" key="${idx}" class="${containerClassNames}">
        ${overlaySwitcher ? overlay : ""}
        </div>`
      }

      return image
    })
  }

  let layoutContainer: string = `<div class="altrp-gallery-grid">${Array.isArray(images) ? images.join(" ") : images}</div>`


  switch (layout) {
    case "justified":
      break
  }

  return repeater.length > 0 ? layoutContainer : emptyRepeater
}
