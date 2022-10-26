import getResponsiveSetting from './getResponsiveSetting';
import {encode} from 'html-entities';
import empty from './empty';

export default function renderSectionBG(settings, element_id, device){

  let sectionBackground = [
    'background_section',
  ]

  const background_image = getResponsiveSetting(settings,
    'background_image',device,
    {}
  );
  const background_image_lazy = getResponsiveSetting(settings,
    'background_image_lazy',device,
  );

  if(! background_image?.url){
    sectionBackground.push('altrp-background-image' + element_id)
  }

  const revealOptions = background_image?.url ? {
    addClasses: 'altrp-background-image' + element_id
  } : {}

  const background_video_poster = getResponsiveSetting(settings, 'url_video-poster', device) || '';
  const background_video_url = getResponsiveSetting(settings,'url_video', device) || '';
  const background_video_url_webm = getResponsiveSetting(settings,'url_video-webm', device) || '';
  let imageSection = `
      <span class="${sectionBackground.join(" ")} altrp-background-image${element_id}"></span>
    `
  if(background_image_lazy){
    imageSection = `
    <noscript>
      <span class="${sectionBackground.join(" ")} altrp-background-image${element_id}"></span>
    </noscript>
    <span class="${sectionBackground.join(" ")}" ${empty(revealOptions) ? '' : `data-reveal-options="${encode(JSON.stringify(revealOptions))}`}" ></span>
    `
  }
  console.log(background_image_lazy);
  return  background_video_url || background_video_url_webm ?
    `<video preload='metadata' poster="${background_video_poster}" muted loop autoPlay playsInline class="section-video section-video-controllers">
    ${background_video_url_webm ? `<source src="${background_video_url_webm}" type="video/webm" class="section-video-source"/>` : ''}
    ${background_video_url ? `<source src="${background_video_url}" type="video/mp4" class="section-video-source"/>` : ''}
      </video>`
    : imageSection

}
