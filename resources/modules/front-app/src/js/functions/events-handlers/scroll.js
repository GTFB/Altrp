let lastPosition = 0
window.addEventListener('scroll', _.throttle(function () {
  if(lastPosition > window.scrollY){
    fireScrollUp()
  } else if(lastPosition < window.scrollY){
    fireScrollDown()
  }
  lastPosition = window.scrollY
}, 1))


const fireScrollUp = _.throttle(function (){
  const event = new Event('altrp-scroll-up')
  document.dispatchEvent(event)
  window.dispatchEvent(event)
}, 1)
const fireScrollDown = _.throttle(function (){
  const event = new Event('altrp-scroll-down')
  document.dispatchEvent(event)
  window.dispatchEvent(event)
}, 1)
