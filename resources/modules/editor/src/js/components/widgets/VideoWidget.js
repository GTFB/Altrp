import {
  getDataByPath,
  parseIDFromYoutubeURL
} from "../../../../../front-app/src/js/helpers";
class VideoWidget extends Component {

  render() {
    const {
      is_youtube,
      youtube_id,
      content_path
    } = this.props.element.settingsLock;

    let dynamicID;
    const url = getDataByPath(content_path);
    if (content_path) {
      if (url) dynamicID = parseIDFromYoutubeURL(url);
    }
    return is_youtube ? (
      <iframe
        className={`altrp-video`}
        allowFullScreen
        src={`https://www.youtube.com/embed/${dynamicID || youtube_id}`}
      />
    ) : (
      <video className="altrp-video" controls src={url} />
    );
  }
}

export default VideoWidget;
