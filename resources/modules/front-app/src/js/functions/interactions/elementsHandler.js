import IterationElement from "../../classes/IterationElement";

let _elements = []

export default function elementsHandler(){
  _elements.forEach(e=>{
    e.removeAnimationFrameRequest()
  })
  _elements = []
  const elements = document.querySelectorAll('[data-altrp-settings]')
  elements.forEach(element=>{
    _elements.push(new IterationElement(element))
  })
}
