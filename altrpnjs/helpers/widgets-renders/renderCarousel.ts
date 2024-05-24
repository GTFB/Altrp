import getResponsiveSetting from "../getResponsiveSetting";

type Destructuring = {
  unit: string,
  size?: string
}

export default function renderCarousel(settings, device) {
  let carouselItems: any[] = getResponsiveSetting(settings,"slides_repeater", device,[]);
  let width_slides_content = getResponsiveSetting(settings,"width_slides_content", device);
  let overlayType = getResponsiveSetting(settings, "overlay_select_heading_additional_content", device, "none")
  let img_content = getResponsiveSetting(settings,"img_content", device);
  let slides = getResponsiveSetting(settings,'slides_repeater', device, []) ;
  let vertical = getResponsiveSetting(settings,'vertical', device, false) ;
  let per_view_slides_content = getResponsiveSetting(settings,'per_view_slides_content', device, 1)

  let {unit, size}: Destructuring = width_slides_content
  let destructuringSize: number = size ? +size : 1420
  let sizeSlide: number | string = ""
  switch(unit) {
    case "%":
      sizeSlide = (destructuringSize === 1420 ? 1420 : Math.round((1420 * destructuringSize) / 100)) + 'px'
      break
    case "px":
      if(destructuringSize){
        destructuringSize = destructuringSize / per_view_slides_content
      }
      sizeSlide = destructuringSize +'px'
      break
  }


  let slickTrackSize: string
  if (slides.length === 0) {
    return 'No Slides'
  }
  if(vertical || per_view_slides_content == 1){
    slickTrackSize = '100%'
    sizeSlide = '100%'
  } else {
    slickTrackSize = (parseFloat(sizeSlide) * carouselItems.length) + 'px'
  }
  carouselItems = carouselItems.slice(0, per_view_slides_content)

  return `<div class="altrp-carousel">
            <div class="altrp-carousel-container">

               <div class="slick-slider altrp-carousel-slides altrp-carousel-slides-dots-bottom slick-initialized">
                   <div class="slick-list">
                      <div class="slick-track" style="${"opacity: 1; transform: translate3d(0px, 0px, 0px);" + (carouselItems.length > 0 ? " width: " + slickTrackSize + ";" : "")}">
                         ${carouselItems.map((slide, idx) => {

                           const url = slide.image_slides_repeater?.url ? slide.image_slides_repeater?.url : '/img/nullImage.png';

                           return (
                             `<div data-index="${idx}" class="${idx === 0 ? "slick-slide slick-active slick-current" : "slick-slide"}" tabindex="-1" aria-hidden="${idx === 0 ? "false" : "true"}"
                                style="${"outline: none; width: " + sizeSlide + ";"}">
                                <div>
                                  <div class="altrp-carousel-slide" tabindex="-1" style="width: 100%; display: inline-block;">
                                    ${img_content ? (
                                      `<img class="altrp-carousel-slide-img" src="${url}" alt="image slider">`
                                    ) : (
                                      `<div class="altrp-carousel-slide-img" style="background-image: url(${url});"></div>`
                                    )}
                                    ${overlayType === "text" ? (
                                      `<div class="altrp-carousel-slide-overlay"><p class="altrp-carousel-slide-overlay-text">${slide.overlay_text_repeater || ""}</p></div>`
                                    ) : ""}
                                  </div>
                                </div>
                             </div>`
                           )
                         }).join(" ")}
                      </div>
                   </div>
               </div>
            </div>
           </div>`
}
