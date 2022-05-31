
import {  ProgressBar,Intent } from "@blueprintjs/core";
export default function progressBar(value){
  let progressBar = document.getElementById('altrp-progress-bar')
  if(! progressBar){
    progressBar = document.createElement('div')
    progressBar.id = 'altrp-progress-bar'
    document.body.appendChild(progressBar)
  }
  if (value){
    console.log(value);
    ReactDOM.render(<ProgressBar value={value} intent={Intent.PRIMARY}/>, progressBar)
  } else {
    document.body.removeChild(progressBar)
  }
}
