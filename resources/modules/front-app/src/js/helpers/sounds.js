import {delay} from "../helpers";
/**
 * Воспроизведение звука
 * @param {string} src
 * @param {boolean} loop
 * @param {int} duration
 */
export async function playSound(src = '', loop = false, duration = 0) {
  if(! src || ! _.isString(src)){
    return;
  }
  const audioElement = document.createElement('audio');
  audioElement.style.display = 'none';
  audioElement.setAttribute('src', src);
  audioElement.setAttribute('autoplay', true);
  if(loop){
    audioElement.setAttribute('loop', loop);
  }
  document.body.appendChild(audioElement);
  if(duration){
    await delay(duration)
    document.body.removeChild(audioElement);
  }
  // if(! loop){
  //   document.body.removeChild(audioElement);
  // }
}
