import checkAppearTopElement from "./elements/check-appear-top-element";
import mbParseJSON from "../functions/mb-parse-JSON";

export default function dataRevealElements(){
  const revealElements = document.querySelectorAll('[data-reveal-options]')
  doRevealAction(revealElements)

  window.addEventListener('scroll', ()=>{
    const revealElements = document.querySelectorAll('[data-reveal-options]')
    doRevealAction(revealElements)

  })
}

function doRevealAction(revealElements){
  for(const element of revealElements){
    //if(checkAppearTopElement(element)){
      let options = element.dataset.revealOptions
      element.removeAttribute('data-reveal-options')
      options = mbParseJSON(options, {})
      if(options.addClasses){
        if(typeof options.addClasses === 'string'){
          try {
            element.classList.add(options.addClasses)
          }catch (e) {
            console.error(e);
          }
        } else if(typeof options.addClasses === 'object'
          && options.addClasses.length){
          for(const className of options.addClasses){
            try {
              element.classList.add(className)
            }catch (e) {
              console.error(e);
            }
          }
        }
      }
    //}
  }
}
