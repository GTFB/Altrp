import getResponsiveSetting from '../getResponsiveSetting';

type Destructuring = {
  unit: string;
  size?: string;
};

export default function renderCarousel(settings, device) {
  let carouselItems = getResponsiveSetting(settings, 'slides_repeater', device, []);
  let width_slides_content = getResponsiveSetting(settings, 'width_slides_content', device);
  let overlayType = getResponsiveSetting(
    settings,
    'overlay_select_heading_additional_content',
    device,
    'none'
  );
  let img_content = getResponsiveSetting(settings, 'img_content', device);
  let arrowsToggle = getResponsiveSetting(settings, 'arrows_navigation_content', device);
  let dotsToggle = getResponsiveSetting(settings, 'dots_navigation_content', device);
  let slides = getResponsiveSetting(settings, 'slides_repeater', device, []);

  let { unit, size }: Destructuring = width_slides_content;
  let destructuringSize: number = size ? +size : 1420;
  let sizeSlide: number | string = '';
  switch (unit) {
    case '%':
      sizeSlide = destructuringSize === 1420 ? 1420 : Math.round((1420 * destructuringSize) / 100);
      break;
    case 'px':
      sizeSlide = destructuringSize;
      break;
  }

  let slickTrackSize: number = +sizeSlide * carouselItems.length;

  if (slides.length === 0) {
    return 'No Slides';
  }

  return `<div class="sc-bkkeKt fRdskG altrp-carousel">
            <div class="${
              'altrp-carousel-container' +
              (arrowsToggle ? '' : ' altrp-carousel-container-no-arrow')
            }">
               ${
                 arrowsToggle
                   ? `<div class="altrp-carousel-arrows-container altrp-carousel-arrow-top-left altrp-carousel-arrow-top-wrapper"><div class="altrp-carousel-arrow-prev altrp-carousel-arrow"><svg width="38" height="38" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="1.03" d="M13 16l-6-6 6-6"></path></svg></div><div class="altrp-carousel-arrow-next altrp-carousel-arrow"><svg width="38" height="38" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="1.03" d="M13 16l-6-6 6-6"></path></svg></div></div>`
                   : ''
               }
               <div class="slick-slider altrp-carousel-slides altrp-carousel-slides-dots-bottom slick-initialized">
                   <div class="slick-list">
                      <div class="slick-track" style="${
                        'opacity: 1; transform: translate3d(0px, 0px, 0px);' +
                        (carouselItems.length > 0 ? ' width: ' + slickTrackSize + 'px;' : '')
                      }">
                         ${carouselItems
                           .map((slide, idx) => {
                             const url = slide.image_slides_repeater?.url
                               ? slide.image_slides_repeater?.url
                               : '/img/nullImage.png';

                             return `<div data-index="${idx}" class="${
                               idx === 0 ? 'slick-slide slick-active slick-current' : 'slick-slide'
                             }" tabindex="-1" aria-hidden="${
                               idx === 0 ? 'false' : 'true'
                             }" style="${'outline: none; width: ' + sizeSlide + 'px;'}">
                                <div>
                                  <div class="altrp-carousel-slide" tabindex="-1" style="width: 100%; display: inline-block;">
                                    ${
                                      img_content
                                        ? `<img class="altrp-carousel-slide-img" src="${url}" alt="image slider">`
                                        : `<div class="altrp-carousel-slide-img" style="background-image: url(${url});"></div>`
                                    }
                                    ${
                                      overlayType === 'text'
                                        ? `<div class="altrp-carousel-slide-overlay"><p class="altrp-carousel-slide-overlay-text">${
                                            slide.overlay_text_repeater || ''
                                          }</p></div>`
                                        : ''
                                    }
                                  </div>
                                </div>
                             </div>`;
                           })
                           .join(' ')}
                      </div>
                   </div>
                   ${
                     carouselItems.length >= 2 && dotsToggle
                       ? `<ul class="altrp-carousel-dots" style="display: block;">
                           ${carouselItems
                             .map(
                               (_, idx) =>
                                 `<li class="${idx === 0 ? 'slick-active' : ''}"><a><div class="${
                                   idx === 0
                                     ? 'altrp-carousel-paging active'
                                     : 'altrp-carousel-paging '
                                 }"></div></a></li>`
                             )
                             .join(' ')}
                     </ul>`
                       : ''
                   }
               </div>
            </div>
           </div>`;
}
