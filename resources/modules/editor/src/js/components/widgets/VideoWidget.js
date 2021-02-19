import React, { Component } from 'react';

class VideoWidget extends Component {

  render() {
    const { is_youtube, youtube_id } = this.props.element.settings;

    return is_youtube && youtube_id ? 
      <iframe className="altrp-video"/*  width="100%" height="345" */ src={`https://www.youtube.com/embed/${youtube_id}`} /> : 
      <video className="altrp-video" controls src="" />
  }
}

export default VideoWidget;
