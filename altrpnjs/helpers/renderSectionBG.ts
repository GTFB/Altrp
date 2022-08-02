import getResponsiveSetting from './getResponsiveSetting';

export default function renderSectionBG(settings, element_id, device) {
  let sectionBackground = ['background_section'];

  const background_image = getResponsiveSetting(settings, 'background_image', device, {});
  sectionBackground.push('altrp-background-image' + element_id);
  if (background_image?.url) {
    sectionBackground.push('altrp-background-image');
  }

  const background_video_poster = getResponsiveSetting(settings, 'url_video-poster', device) || '';
  const background_video_url = getResponsiveSetting(settings, 'url_video', device) || '';
  const background_video_url_webm = getResponsiveSetting(settings, 'url_video-webm', device) || '';
  return background_video_url || background_video_url_webm
    ? `<video preload='metadata' poster="${background_video_poster}" muted loop autoPlay playsInline class="section-video section-video-controllers">
    <source src="${
      background_video_url_webm || 'none'
    }" type="video/webm" class="section-video-source"/>
    <source src="${background_video_url || 'none'}" type="video/mp4" class="section-video-source"/>
      </video>`
    : `<span class="${sectionBackground.join(' ')}" ></span>`;
}
