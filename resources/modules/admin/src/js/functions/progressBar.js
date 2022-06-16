import '../../sass/components/altrp-progress-bar.scss'
import {  ProgressBar,Intent } from "@blueprintjs/core";
import '../../../../editor/src/sass/blueprint.scss';
export default function progressBar(value){
  let progressBar = document.getElementById('altrp-progress-bar')
  if(! progressBar){
    progressBar = document.createElement('div')
    progressBar.id = 'altrp-progress-bar'
    document.body.appendChild(progressBar)
  }
  if (value){
    ReactDOM.render(<ProgressBar value={value} intent={Intent.PRIMARY}/>, progressBar)
  } else {
    document.body.removeChild(progressBar)
  }
}
