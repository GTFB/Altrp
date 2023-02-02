import _ from 'lodash'
import getResponsiveSetting from '../getResponsiveSetting'


export default function renderVideo(settings, device,) {
  const is_youtube = getResponsiveSetting(settings,'youtube_id', device);
  const youtube_id = getResponsiveSetting(settings,'youtube_id', device);
  const content_path = getResponsiveSetting(settings,'content_path', device);

  let dynamicID;


  return is_youtube
    ? (`<iframe class="altrp-video" allow="fullscreen" src="https://www.youtube.com/embed/${dynamicID || youtube_id}"></iframe>`)
    : (`<video class="altrp-video" controls src='${content_path}'></video>`);
}
