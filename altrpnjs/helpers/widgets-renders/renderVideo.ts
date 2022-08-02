import _ from 'lodash';
import getResponsiveSetting from '../getResponsiveSetting';

export default function renderVideo(settings, device, context) {
  const is_youtube = getResponsiveSetting(settings, 'youtube_id', device);
  const youtube_id = getResponsiveSetting(settings, 'youtube_id', device);
  const content_path = getResponsiveSetting(settings, 'content_path', device);
  const parseIDFromYoutubeURL = (youtubeURL) => {
    const startIndex = youtubeURL.indexOf('v=') + 2;
    const endIndex = youtubeURL.indexOf('&', startIndex);

    return youtubeURL.substring(startIndex, endIndex);
  };
  let dynamicID;
  const url = _.get(context, content_path);
  if (content_path) {
    if (url) dynamicID = parseIDFromYoutubeURL(url);
  }

  return is_youtube
    ? `<iframe class="altrp-video" allow="fullscreen" src="https://www.youtube.com/embed/${
        dynamicID || youtube_id
      }"></iframe>`
    : `<video class="altrp-video" controls src='${url}'></video>`;
}
