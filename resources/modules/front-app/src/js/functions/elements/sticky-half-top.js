import '../../../sass/sticky-half-top.scss'

let elements = []

export default function stickyHalfTop(element) {
  if (!elements.includes(element)) {
    elements.push(element)
  }
  elements = elements.filter(e => document.contains(e))

  elements = elements.map(element => {
    let height = element.offsetHeight
    let width = element.offsetWidth
    const styles = window.getComputedStyle(element.parentElement)
    height += parseInt(styles.paddingTop)
    height += parseInt(styles.paddingBottom)
    element.parentElement.style.height = height + 'px'
    return {
      element,
      width
    }
  })
}

const _scrollDownHandler = _.throttle(function _scrollDownHandler() {
  elements.forEach(({
                      element,
                      width,
                    }) => {
    const height = element.offsetHeight
    if (window.scrollY > height) {
      if (element.classList.contains('altrp-sticky-half-top_down')) {
        element.classList.add('altrp-sticky-half-top_up')
      }
    } else {

      element.classList.remove('altrp-sticky-half-top_up')
    }
    element.classList.remove('altrp-sticky-half-top_down')
  })
}, 100)
const _scrollUpHandler = _.throttle(function _scrollUpHandler() {
  elements.forEach(({
                      element,
                      width,
                    }) => {
    const height = element.offsetHeight

    if (window.scrollY > 0) {

      element.classList.add('altrp-sticky-half-top_down')

    } else {
      element.classList.remove('altrp-sticky-half-top')
      element.classList.remove('altrp-sticky-half-top_down')
      element.classList.remove('altrp-sticky-half-top_up')

    }
  })

}, 100)
const _scrollHandler = _.throttle(function _scrollHandler() {
  elements.forEach(({
                      element,
                      width,
                    }) => {
    const height = element.offsetHeight

    if (window.scrollY > height) {
      element.classList.add('altrp-sticky-half-top')

      element.style.width = width+'px'

    } else {
      //element.classList.remove('altrp-sticky-half-top')

    }
  })

}, 100)

window.addEventListener('altrp-scroll-down', _scrollDownHandler)
window.addEventListener('altrp-scroll-up', _scrollUpHandler)
window.addEventListener('scroll', _scrollHandler)

