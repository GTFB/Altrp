import mbParseJSON from "../functions/mb-parse-JSON";

export default function dataRevealElements(){

  const elements = [...document.querySelectorAll('[data-async-content-load]')]
  elements.forEach(e=>{
    let options = e.dataset.asyncContentLoad
    options = mbParseJSON(options)
    if(!options.url){
      return
    }

    let xhr = new XMLHttpRequest();
    xhr.open('GET', options.url, true);
    xhr.send();
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== 4) {
        return;
      }

      if(!xhr.responseText){
        return
      }
      let html = mbParseJSON(xhr.responseText)
      html = html?.data || ''
      e.innerHTML = html
    }
  })
}
